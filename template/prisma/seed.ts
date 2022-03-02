import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Script de seeding pour ajouter un utilisateur à la base

async function main() {
  const password = await bcrypt.hash("demo", 10);
  await prisma.user.create({
    data: {
      email: "demo@demo.fr",
      name: "Demo",
      password,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
