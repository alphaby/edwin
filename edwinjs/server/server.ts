import express from "express";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { ironSession } from "iron-session/express";
import runtimeConfig, { EdwinConfig, getPath, setConfig } from "./config";
import generatePrismaUtilities from "./generatePrismaUtilities";
import cors from "cors";
import bcrypt from "bcryptjs";
import generateRoutes from "./generateRoutes";
import path from "path";

type BaseUser = {
  id: string;
  email: string;
  password: string;
};

declare module "iron-session" {
  interface IronSessionData {
    user?: BaseUser;
  }
}

type PermissionAction = "find" | "update" | "create" | "delete";

type FindPermissionFunction<User extends BaseUser = BaseUser> = (
  user: User,
  ids: Array<string>
) => boolean | Promise<boolean>;
type UpdatePermissionFunction<User extends BaseUser = BaseUser> = (
  user: User,
  ids: Array<string>,
  data: any
) => boolean | Promise<boolean>;
type CreatePermissionFunction<User extends BaseUser = BaseUser> = (
  user: User,
  data: any
) => boolean | Promise<boolean>;
type DeletePermissionFunction<User extends BaseUser = BaseUser> = (
  user: User,
  ids: Array<string>
) => boolean | Promise<boolean>;

export type PermissionsObject<
  PrismaModelName extends string = string,
  User extends BaseUser = BaseUser
> = {
  [key in PrismaModelName]?: {
    find?: Array<string> | FindPermissionFunction<User>;
    update?: Array<string> | UpdatePermissionFunction<User>;
    create?: Array<string> | CreatePermissionFunction<User>;
    delete?: Array<string> | DeletePermissionFunction<User>;
  };
};

export type Express = express.Express;

type PrismaAction =
  | "findUnique"
  | "findFirst"
  | "findMany"
  | "create"
  | "delete"
  | "deleteMany"
  | "update"
  | "updateMany"
  | "upsert";

const prismaActions = [
  "findUnique",
  "findFirst",
  "findMany",
  "create",
  "delete",
  "deleteMany",
  "update",
  "updateMany",
  "upsert",
];

export default async <
  PrismaClient,
  PrismaModelName extends string,
  User extends BaseUser
>(
  prisma: PrismaClient,
  config?: Partial<EdwinConfig>,
  permissions?: (
    prisma: PrismaClient
  ) => PermissionsObject<PrismaModelName, User>,
  routes?: (app: express.Express, prisma: PrismaClient) => void
) => {
  if (config) setConfig(config);

  const prismaModels: string[] = generatePrismaUtilities(
    getPath(runtimeConfig().schemaPath)
  );

  generateRoutes();

  const app = express();

  const session = ironSession({
    cookieName: "framework/iron-session",
    password: runtimeConfig().cookieSecret,
    cookieOptions: {
      secure: runtimeConfig().prod,
    },
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session);

  // Auth routes

  app.post("/api/login", async (req, res) => {
    let user;
    try {
      // @ts-ignore: user is required to exist in prisma
      user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
    } catch {
      return res.status(500).send("500");
    }
    if (!user) return res.status(404).send("invalidUser");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(403).send("invalidPassword");
    user.password = "";
    req.session.user = user;
    // TO DO : permettre d'ajouter role dynamiquement à user ici ?
    await req.session.save();
    return res.json(user);
  });

  app.post("/api/logout", async (req, res) => {
    await req.session.destroy();
    res.sendStatus(200);
  });

  app.post("/api/session", async (req, res) => {
    if (req.session.user === undefined) return res.status(403).send("403");
    try {
      // @ts-ignore: user is required to exist in prisma
      const user = await prisma.user.findUnique({
        where: { id: req.session.user.id },
      });
      // ici on peut aussi checker un éventuel champs "banned" en plus de l'existence
      // ajouter role à user ici
      if (user) return res.send(req.session.user);
      else {
        await req.session.destroy();
        return res.send(403).send("403");
      }
    } catch {
      await req.session.destroy();
      return res.send(403).send("403");
    }
  });

  // Query route

  async function checkAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.session.user === undefined) return res.status(403).send("403");
    next();
  }

  async function checkRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { model, action, args } = req.body;
    if (!model || !action || !args) return res.status(400).send("400");
    try {
      const parsedArgs = JSON.parse(args);
      if (
        prismaModels.includes(model) &&
        prismaActions.includes(action) &&
        typeof parsedArgs === "object" &&
        !Array.isArray(parsedArgs)
      ) {
        return next();
      } else {
        return res.status(400).send("400");
      }
    } catch {
      return res.status(400).send("400");
    }
  }

  function lowerFirst(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  function getQuery(req: express.Request) {
    const model: PrismaModelName = req.body.model;
    const action: PrismaAction = req.body.action;
    const args: { [key: string]: any } = JSON.parse(req.body.args);
    return { model, action, args };
  }

  async function checkPermissions(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.session.user) return res.status(403).send("403");
    if (!permissions) return next();
    let { model, action, args } = getQuery(req);
    // @ts-ignore: can't instantiate prisma with model name as a string
    const prismaDelegate = prisma[lowerFirst(model)];
    const modelPermissions = permissions(prisma)[model];
    let baseAction = action.replace(
      /Many|Unique|First/,
      ""
    ) as PermissionAction;
    let authorized = false;

    // On regarde si des permissions existent
    if (!modelPermissions) return next();
    if (
      action === "upsert" &&
      (!modelPermissions.create || !modelPermissions.update)
    )
      return next();
    if (action !== "upsert" && !modelPermissions[baseAction]) return next();

    // Cas particulier upsert : on doit checker si l'objet existe pour ensuite transformer la requete en update ou create
    if (action === "upsert") {
      try {
        const object = await prismaDelegate["findUnique"]({
          where: args.where,
          select: { id: true },
        });
        if (object) {
          action = "update";
          args.data = args.update;
          baseAction = "update";
        } else {
          action = "create";
          args.data = args.create;
          baseAction = "update";
        }
      } catch {
        return res.status(500).send("500");
      }
    }

    const permission = modelPermissions[baseAction];

    // Si la permission est basée sur le role (donc est un array)
    if (typeof permission !== "function") {
      // @ts-ignore: role property may not exist on type User
      authorized = permission.includes(req.session.user.role);
      if (!authorized) return res.status(401).send("401");
      else return next();
    }

    // Si la permission est basée sur l'objet (donc est une fonction)
    switch (action) {
      case "findFirst":
      case "findMany":
        // Pour des raisons d'optimisations : on exécute les requêtes findFirst et findMany avant
        // de checker les permissions (donc 1 requete + permission au lieu de 2 requetes + permission)
        res.locals.checkFindNonUniquePermissions = true;
        return next();
      case "updateMany":
      case "deleteMany":
        try {
          const objects = await prismaDelegate.findMany({
            where: args.where,
            select: { id: true },
          });
          authorized = await (
            permission as UpdatePermissionFunction | DeletePermissionFunction
          )(
            req.session.user,
            objects.map((object: any) => object.id),
            action === "updateMany" ? args.data : undefined
          );
          break;
        } catch {
          return res.status(500).send("500");
        }
      case "findUnique":
      case "delete":
        authorized = await (
          permission as FindPermissionFunction | DeletePermissionFunction
        )(req.session.user, [args.where?.id]);
        break;
      case "update":
        authorized = await (permission as UpdatePermissionFunction)(
          req.session.user,
          [args.where.id],
          args.data
        );
        break;
      case "create":
        authorized = await (permission as CreatePermissionFunction)(
          req.session.user,
          args.data
        );
        break;
    }

    if (!authorized) return res.status(401).send("401");
    next();
  }

  function removePasswords(obj: any) {
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      if (obj.password) obj.password = "";
      Object.entries(obj).map(([key, value]) => {
        obj[key] = removePasswords(value);
      });
    } else if (Array.isArray(obj)) {
      obj.map((el) => removePasswords(el));
    }
    return obj;
  }

  app.post(
    "/api",
    checkAuth,
    checkRequest,
    checkPermissions,
    async (req, res, next) => {
      const { model, action, args } = getQuery(req);
      try {
        // Pour éventuellement checkFindNonUniquePermissions, on a besoin des ids
        if (args.select) {
          args.select.id = true;
        }
        // @ts-ignore: can't instantiate prisma with model name as a string
        let result = await prisma[lowerFirst(model)][action](args);
        // Ne jamais renvoyer de mot de passe coté frontend
        if (result) {
          result = removePasswords(result);
          if (
            ["findFirst", "findMany"].includes(action) &&
            res.locals.checkFindNonUniquePermissions
          ) {
            res.locals.result = result;
            return next();
          } else return res.json(result);
        } else return res.status(404).send("404");
      } catch (e) {
        console.log(e);
        return res.status(500).send("500");
      }
    },
    checkFindNonUniquePermissions
  );

  async function checkFindNonUniquePermissions(
    req: express.Request,
    res: express.Response
  ) {
    if (!permissions) return res.json(res.locals.result);
    // On arrive ici seulement si l'action est findFirst ou findMany
    // et qu'il existe une permission de type fonction pour find
    const { model, action } = getQuery(req);
    const permission = permissions(prisma)[model]![
      "find"
    ] as FindPermissionFunction;
    const ids =
      action === "findFirst"
        ? [res.locals.result.id]
        : res.locals.result.map((object: any) => object.id);
    const authorized = await permission(req.session.user!, ids);
    if (!authorized) return res.status(401).send("401");
    return res.json(res.locals.result);
  }

  // Custom routes

  if (routes) routes(app, prisma);

  // App route
  if (runtimeConfig().prod) {
    app.use(express.static(getPath("./dist")));
    app.get("*", function (req, res) {
      res.sendFile(getPath("./dist/index.html"));
    });
  } else {
    const vite = await createServer({
      plugins: [react()],
      resolve: {
        alias: {
          "@edwin/client": path.resolve(process.cwd(), "./.edwin"),
        },
      },
      server: {
        middlewareMode: "html",
      },
      envPrefix: "FRONTEND_",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res) => null);
  }

  app.listen(runtimeConfig().port, () =>
    console.log("🚀 App ready on port " + runtimeConfig().port)
  );
};
