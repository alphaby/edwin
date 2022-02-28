import { PrismaClient } from "@prisma/client";
import { Express } from "edwinserver";

export default (app: Express, prisma: PrismaClient) => {
  app.get("/api/test", function (req, res) {
    res.send("ok");
  });
};
