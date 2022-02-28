import { PrismaClient } from "@prisma/client";
const bcrypt = { hash: (t: any, v: any) => null };

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("test", 10);
  const wiki = await prisma.wiki.create({
    data: {
      title: "Alphaby",
    },
  });
  const user = await prisma.user.create({
    data: {
      email: "adrien@alphaby.fr",
      name: "Adrien",
      password,
    },
  });
  const member = await prisma.member.create({
    data: {
      userId: user.id,
      wikiId: wiki.id,
      role: "admin",
      default: true,
    },
  });
  const folder = await prisma.folder.create({
    data: {
      title: "Dossier 1",
      wiki: {
        connect: {
          id: wiki.id,
        },
      },
      children: {
        create: {
          title: "Dossier 2",
          wiki: {
            connect: {
              id: wiki.id,
            },
          },
        },
      },
      documents: {
        create: {
          title: "Document 1",
          content: "<p>Hello world!</p>",
          wiki: {
            connect: {
              id: wiki.id,
            },
          },
          tags: {
            create: {
              title: "Tech",
              color: "yellow",
              wiki: {
                connect: {
                  id: wiki.id,
                },
              },
            },
          },
        },
      },
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
