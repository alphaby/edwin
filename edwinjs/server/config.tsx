import path from "path";

export type ServerMessage = { status: number; message: string | null };

export type EdwinConfig = {
  port: number;
  cookieSecret: string;
  prod: boolean;
  cssPath: string;
  schemaPath: string;
};

let config: EdwinConfig = {
  port: 3000,
  cookieSecret: "mA0astLPZ3tUB7mnqjEABAZ1Ys9oAC7r",
  prod: false,
  cssPath: "./src/assets/**/[a-z[]*.css",
  schemaPath: "./prisma/schema.prisma",
};

export default () => {
  return config;
};

export function setConfig(configValue: any): void {
  config = { ...config, ...configValue };
}

export function getPath(fromProjectRoot: string) {
  return path.join(process.cwd(), fromProjectRoot);
}
