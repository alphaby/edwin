import { Prisma, PrismaClient, User } from "@prisma/client";
import { PermissionsObject } from "edwinjs";

export default (
  prisma: PrismaClient
): PermissionsObject<Prisma.ModelName, User> => ({
  User: {
    update: ["admin"],
  },
  Document: {
    update: async (user, ids, data: Prisma.DocumentUpdateInput) => {
      const docs = await prisma.document.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      });
      return docs.every((doc) =>
        doc.users.map((user) => user.id).includes(user.id)
      );
    },
  },
});
