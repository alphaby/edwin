#!/usr/bin/env node

const { execSync } = require("child_process");

const command = process.argv[2];

function execute(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

switch (command) {
  case "dev":
    execute(
      'ts-node-dev --compiler-options \'{"module":"CommonJS"}\' server/index.ts'
    );
    break;
  case "build":
    execute("tsc && vite build --config .edwin/build.config.ts");
    break;
  case "postinstall":
    execute("node node_modules/edwinjs/dist/bin/postinstall.js");
    break;
  case "generate":
    execute(
      'npx prisma generate && ts-node --compiler-options \'{"module":"CommonJS"}\' .edwin/generate.ts'
    );
    break;
  default:
    execute(
      'NODE_ENV=production ts-node --compiler-options \'{"module":"CommonJS"}\' server/index.ts'
    );
}
