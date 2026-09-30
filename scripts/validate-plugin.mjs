import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const requiredPaths = [
  "plugin.json",
  ".codex-plugin/plugin.json",
  ".agents/plugins/marketplace.json",
  "skills/technology-selector/SKILL.md",
  "skills/technology-selector/references/scaffold-catalog.md",
  "skills/technology-selector/agents/openai.yaml",
  "assets/hero.svg",
  "assets/workflow.svg",
  "templates/web-lite",
  "templates/ts-platform",
  "templates/ai-platform",
];

await Promise.all(requiredPaths.map((path) => access(join(root, path))));

const readJson = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));
const portable = await readJson("plugin.json");
const compatibility = await readJson(".codex-plugin/plugin.json");
const marketplace = await readJson(".agents/plugins/marketplace.json");
const entry = marketplace.plugins?.find((plugin) => plugin.name === portable.name);

if (portable.name !== compatibility.name || portable.version !== compatibility.version) {
  throw new Error("Portable and compatibility plugin manifests must share name and version.");
}
if ("skills" in portable || compatibility.skills !== "./skills/") {
  throw new Error("Portable skills use fixed discovery; the compatibility manifest must expose ./skills/.");
}
if (!entry || entry.source?.source !== "url" || !entry.source.url || !entry.source.ref) {
  throw new Error("Marketplace must contain a pinned Git URL source for the plugin.");
}
if (entry.policy?.installation !== "AVAILABLE" || entry.policy?.authentication !== "ON_INSTALL") {
  throw new Error("Marketplace installation and authentication policies are incomplete.");
}

const portableFiles = [
  "README.md",
  "skills/technology-selector/SKILL.md",
  "skills/technology-selector/references/scaffold-catalog.md",
];
for (const path of portableFiles) {
  const content = await readFile(join(root, path), "utf8");
  if (/\/Users\/|\/home\//u.test(content)) {
    throw new Error(`${path} contains a user-specific absolute path.`);
  }
}

console.log("Plugin manifests, marketplace entry, bundled skill, and templates are valid.");
