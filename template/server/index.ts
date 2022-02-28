import { launchServer } from "edwinjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

launchServer(prisma, {
  port: 3000,
  cookieSecret: "mA0astLPZ3tUB7mnqjEABAZ1Ys9oAC7r",
  prod: process.env.NODE_ENV === "production",
});
