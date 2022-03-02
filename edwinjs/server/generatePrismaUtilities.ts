import fs from "fs";
import chokidar from "chokidar";

const utilitiesDict = {
  FindUnique: "Result",
  FindFirst: "Result",
  FindMany: "ManyResult",
  Create: "Result",
  Delete: "Result",
  DeleteMany: "BatchPayload",
  Update: "Result",
  UpdateMany: "BatchPayload",
  Upsert: "Result",
};

const header = `
type Args<GivenArgs, FullArgs> = Prisma.SelectSubset<GivenArgs, FullArgs>;

type InputType<GivenArgs, FullArgs, PropsType> =
  | GetArgs<GivenArgs, FullArgs, PropsType, User>
  | Args<GivenArgs, FullArgs>;

type Result<GivenArgs, Model, Payload> = Prisma.CheckSelect<
  GivenArgs,
  Model,
  Payload
>;
type ManyResult<GivenArgs, Model, Payload> = Prisma.CheckSelect<
  GivenArgs,
  Array<Model>,
  Array<Payload>
>;

function getQueryObject<
  ResultType,
  GivenArgs extends FullArgs,
  FullArgs,
  PropsType
>(
  input: InputType<GivenArgs, FullArgs, PropsType>,
  model: Prisma.ModelName,
  action: Prisma.PrismaAction
): QueryObject<
  Prisma.ModelName,
  Prisma.PrismaAction,
  ResultType,
  GivenArgs,
  FullArgs,
  PropsType,
  User
> {
  return {
    getArgs: typeof input === "function" ? input : () => input,
    model,
    action,
    result: {} as ResultType,
  };
}`;

const hoc = `
type EdwinObject = { [key: string]: unknown };
type EdwinStringObject = { [key: string]: string };

type PagePropsWithoutData = {
  params: Params<string>;
  searchParams: EdwinStringObject;
  user: User;
} & { [key: string]: unknown };

export type PageProps<
  T = unknown,
  U = unknown,
  V = unknown
> = T extends QueryObject
  ? U extends QueryObject
    ? V extends QueryObject
      ? {
          data: [T["result"], U["result"], V["result"]];
        } & PagePropsWithoutData
      : {
          data: [T["result"], U["result"]];
        } & PagePropsWithoutData
    : {
        data: [T["result"]];
      } & PagePropsWithoutData
  : PagePropsWithoutData;

export function withParams(Component: FunctionComponent<any>) {
  return (props: EdwinObject) => {
    const params = useParams();
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const searchParams = Object.fromEntries(urlSearchParams.entries());
    return <Component {...props} params={params} searchParams={searchParams} />;
  };
}

export function withQuery(
  Component: FunctionComponent<any>,
  ...queries: Array<QueryObject>
) {
  return withParams((props: PageProps): ReactElement => {
    const user = useUser();
    const t = useTranslation();
    const [data, setData] = useState<Array<any>>([]);
    const [error, setError] = useState<ServerMessage | null>(null);

    useEffect(() => {
      async function fetchAllData(
        queries: Array<QueryObject>,
        prevData: any = []
      ) {
        await axios
          .post("/api", {
            ...queries[0],
            args: JSON.stringify(
              queries[0].getArgs({ ...props, user, data: prevData })
            ),
          })
          .then(async (res) => {
            if (queries.length === 1) {
              setData([...prevData, res.data]);
            } else {
              await fetchAllData(queries.slice(1), [...prevData, res.data]);
            }
          })
          .catch((res) => {
            setError({
              status: res.response.status,
              message: t(res.response.data),
            });
          });
      }
      fetchAllData(queries);
    }, []);

    if (data.length < queries.length) {
      if (!error) return <Loading />;
      else return <Error {...error} />;
    }
    return <Component {...props} data={data} />;
  });
}
`;

function lowerFirst(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function generateEnums(models: string[]) {
  return `
export const prismaModels = ["${models.join('", "')}"];
  `;
}

function generateImports(models: string[]) {
  return `
import { Prisma, ${models.join(", ")} } from "@prisma/client";
import { ServerMessage, GetArgs, QueryObject, useTranslation, useUser } from "@edwin/client";
import axios from "axios";
import {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Params, useParams, useSearchParams } from "react-router-dom";
import Loading from "../src/components/loading";
import Error from "../src/components/error";
`;
}

function generateUtilities(model: string) {
  return Object.entries(utilitiesDict)
    .map(
      ([action, result]) => `
export function ${lowerFirst(
        model
      )}${action}<T extends Prisma.${model}${action}Args, PropsType>(
  input: InputType<T, Prisma.${model}${action}Args, PropsType>
) {
  return getQueryObject<
    ${
      result === "BatchPayload"
        ? "Prisma.BatchPayload"
        : result + `<T, ${model}, Prisma.${model}GetPayload<T>>`
    },
    Args<T, Prisma.${model}${action}Args>,
    Prisma.${model}${action}Args,
    PropsType
  >(input, "${model}", "${lowerFirst(action)}");
}
  `
    )
    .join("\n");
}

function generateFile(models: string[]) {
  return `// DO NOT TOUCH THIS FILE, THIS IS AUTO-GENERATED

  ${generateImports(models)}

  ${generateEnums(models)}

  ${header}

  ${hoc}

  ${models.map((model) => generateUtilities(model)).join("\n\n")}
  `;
}

export default (path: string): string[] => {
  if (!fs.existsSync(path)) {
    console.log("❌ ERROR: Cannot find Prisma schema");
    return [];
  }
  const buf = fs.readFileSync(path);
  const models = [...buf.toString().matchAll(/model (.+?) {/g)].map(
    (match) => match[1]
  );
  console.log("Prisma models found : " + models.join(", "));
  fs.writeFile("./.edwin/querying.tsx", generateFile(models), (err) => {
    if (err) console.log(err);
    console.log("✅ Querying functions generated");
  });

  chokidar
    .watch("./prisma/schema.prisma", {
      cwd: process.cwd(),
      ignoreInitial: true,
    })
    .on("change", () =>
      console.log(
        "📣 Your Prisma schema has changed, run 'prisma migrate dev' and restart the server to see changes effective!"
      )
    );

  return models;
};
