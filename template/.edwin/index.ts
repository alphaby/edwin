export { default as EdwinRouting } from "./routing";
export * from "./querying";
export * from "edwinjs/dist/client";

import { User } from "@prisma/client";
import { useUser as useBaseUser } from "edwinjs/dist/client"
export const useUser = () => useBaseUser() as User;