import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const required = ["README.md", "AGENTS.md", "dot-env.example", "dot-gitignore", "compose.yml", "package.json"];
for (const template of ["web-lite", "ts-platform", "ai-platform"]) {
  for (const file of required) {
    const path = join(root, "templates", template, file);
    if (!existsSync(path)) throw new Error(`${template} is missing ${file}`);
  }
  const packageJson = JSON.parse(readFileSync(join(root, "templates", template, "package.json"), "utf8"));
  if (!packageJson.scripts?.dev || !packageJson.scripts?.check || !packageJson.scripts?.build) {
    throw new Error(`${template} must expose dev, check and build scripts`);
  }
  if (!packageJson.scripts?.["db:deploy"]) {
    throw new Error(`${template} must expose a db:deploy script`);
  }

  const compose = readFileSync(join(root, "templates", template, "compose.yml"), "utf8");
  if (!compose.includes("postgres:")) {
    throw new Error(`${template} must provide PostgreSQL`);
  }

  const webRoot = template === "web-lite" ? "" : "apps/web";
  const webPackage = JSON.parse(
    readFileSync(join(root, "templates", template, webRoot, "package.json"), "utf8"),
  );
  if (!webPackage.devDependencies?.tailwindcss) {
    throw new Error(`${template} web app must provide Tailwind CSS`);
  }
  if (!webPackage.dependencies?.shadcn || !webPackage.dependencies?.["radix-ui"]) {
    throw new Error(`${template} web app must provide shadcn/ui with Radix UI`);
  }
  if (!existsSync(join(root, "templates", template, webRoot, "components.json"))) {
    throw new Error(`${template} web app is missing components.json`);
  }
}

const migrationPaths = [
  ["web-lite", "prisma/migrations/20260930000000_init/migration.sql"],
  ["ts-platform", "packages/db/prisma/migrations/20260930000000_init/migration.sql"],
  ["ai-platform", "apps/api/migrations/versions/0001_initial.py"],
];
for (const [template, file] of migrationPaths) {
  if (!existsSync(join(root, "templates", template, file))) {
    throw new Error(`${template} is missing its initial migration`);
  }
}
console.log("All scaffold templates have the required contract.");
