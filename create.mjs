#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const templateNames = ["web-lite", "ts-platform", "ai-platform"];

function usage() {
  console.log(`Usage: pnpm scaffold <template> <project-name> [options]\n\nTemplates:\n  web-lite     Next.js full-stack for MVP and straightforward SaaS\n  ts-platform  Next.js + NestJS + BullMQ modular monolith\n  ai-platform  Next.js + FastAPI + Celery for AI and data systems\n\nOptions:\n  --output <dir>  Parent output directory (default: current directory)\n  --no-install    Do not install dependencies\n  --no-git        Do not initialize a Git repository\n  --force         Write into an existing empty directory\n  --help          Show this help`);
}

function fail(message) {
  console.error(`vibe-create: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const positional = [];
  let output = process.cwd();
  let install = true;
  let git = true;
  let force = false;
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--help" || value === "-h") return { help: true };
    if (value === "--no-install") install = false;
    else if (value === "--no-git") git = false;
    else if (value === "--force") force = true;
    else if (value === "--output") {
      output = argv[index + 1] ?? fail("--output requires a directory");
      index += 1;
    } else if (value.startsWith("--")) fail(`unknown option ${value}`);
    else positional.push(value);
  }
  return { template: positional[0], name: positional[1], output, install, git, force };
}

function validateName(name) {
  if (!name || !/^[a-z][a-z0-9-]{1,62}$/.test(name)) {
    fail("project-name must be a lowercase slug, for example my-product");
  }
}

function replaceInTree(path, replacements) {
  for (const entry of readdirSync(path)) {
    const current = join(path, entry);
    const stats = statSync(current);
    if (stats.isDirectory()) {
      replaceInTree(current, replacements);
      continue;
    }
    if (stats.size > 1024 * 1024) continue;
    let content = readFileSync(current, "utf8");
    for (const [needle, replacement] of Object.entries(replacements)) {
      content = content.replaceAll(needle, replacement);
    }
    writeFileSync(current, content);
  }
}

function revealDotfiles(path) {
  for (const entry of readdirSync(path)) {
    const current = join(path, entry);
    if (statSync(current).isDirectory()) revealDotfiles(current);
    if (entry.startsWith("dot-")) renameSync(current, join(path, `.${entry.slice(4)}`));
  }
}

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  execFileSync(command, args, { cwd, stdio: "inherit" });
}

const options = parseArgs(process.argv.slice(2));
if (options.help || !options.template || !options.name) {
  usage();
  process.exit(options.help ? 0 : 1);
}
if (!templateNames.includes(options.template)) fail(`unknown template ${options.template}`);
validateName(options.name);

const destination = resolve(options.output, options.name);
if (existsSync(destination)) {
  const entries = readdirSync(destination);
  if (!options.force || entries.length > 0) fail(`destination is not empty: ${destination}`);
} else {
  mkdirSync(destination, { recursive: true });
}

const source = join(root, "templates", options.template);
if (!existsSync(source)) fail(`template files are missing: ${source}`);
cpSync(source, destination, { recursive: true, force: false });
revealDotfiles(destination);

const title = options.name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
const postgresPassword = randomBytes(24).toString("base64url");
const authSecret = randomBytes(48).toString("base64url");
replaceInTree(destination, {
  "__PROJECT_SLUG__": options.name,
  "__PROJECT_TITLE__": title,
  "__PROJECT_DB__": options.name.replaceAll("-", "_"),
});

const example = join(destination, ".env.example");
if (existsSync(example)) {
  const localEnv = readFileSync(example, "utf8")
    .replaceAll("change-me-postgres", postgresPassword)
    .replaceAll("change-me-auth-secret", authSecret);
  writeFileSync(join(destination, ".env"), localEnv, { mode: 0o600 });
}

if (options.install) {
  run("pnpm", ["install", "--frozen-lockfile=false"], destination);
  if (options.template === "ai-platform") {
    run("uv", ["sync", "--project", "apps/api", "--all-groups"], destination);
  } else {
    run("pnpm", ["db:generate"], destination);
  }
}
if (options.git) {
  run("git", ["init", "-q"], destination);
  run("git", ["add", "."], destination);
}

console.log(`\nCreated ${options.template} project at ${destination}`);
console.log(`\nNext steps:\n  cd ${basename(destination)}\n  docker compose up -d postgres${options.template === "web-lite" ? "" : " redis"}\n  pnpm db:deploy\n  pnpm dev\n\nBefore production, review .env and docs/ARCHITECTURE.md.`);
