import { PrismaClient } from "@prisma/client";
import { Express } from "edwinjs";

export default (app: Express, prisma: PrismaClient) => {
  app.get("/api/test", function (req, res) {
    res.send("ok");
  });
};
