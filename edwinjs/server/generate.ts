import runtimeConfig, { getPath } from "./config";
import generatePrismaUtilities from "./generatePrismaUtilities";
import generateRoutes from "./generateRoutes";

export default function generate() {
  generatePrismaUtilities(getPath(runtimeConfig().schemaPath));
  generateRoutes();
}
