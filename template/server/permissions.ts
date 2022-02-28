import { Prisma, PrismaClient, User } from "@prisma/client";
import { PermissionsObject } from "edwinserver";

export default (
  prisma: PrismaClient
): PermissionsObject<Prisma.ModelName, User> => ({
  User: {
    find: ["admin"],
  },
  Wiki: {
    update: async (user, ids, data: Prisma.WikiUpdateInput) => {
      const member = await prisma.member.findFirst({
        where: {
          wikiId: ids[0],
          userId: user.id,
        },
      });
      return !!(member && member.role === "admin");
    },
  },
});
