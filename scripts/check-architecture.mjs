import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("src");
const violations = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  if (entries.length === 0) {
    violations.push(`${path.relative(root, directory)}: empty directory`);
  }

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolutePath));
    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) files.push(absolutePath);
  }

  return files;
}

const files = await walk(root);

for (const file of files) {
  const source = await readFile(file, "utf8");
  const relativePath = path.relative(root, file).replaceAll("\\", "/");
  const imports = [...source.matchAll(/from\s+["'](@\/[^"']+)["']/g)].map((match) => match[1]);
  const isClient = /^\s*["']use client["'];/m.test(source);

  if (isClient && imports.some((item) => item.startsWith("@/server/"))) {
    violations.push(`${relativePath}: client module imports server infrastructure`);
  }

  if (relativePath.startsWith("shared/") && imports.some((item) => /^@\/(app|features|server)\//.test(item))) {
    violations.push(`${relativePath}: shared code depends on an upper layer`);
  }

  if (relativePath.startsWith("features/") && imports.some((item) => item.startsWith("@/app/"))) {
    violations.push(`${relativePath}: feature imports the routing layer`);
  }

  if (relativePath.startsWith("server/") && imports.some((item) => item.startsWith("@/app/"))) {
    violations.push(`${relativePath}: server infrastructure imports the routing layer`);
  }
}

if (violations.length > 0) {
  console.error("Architecture check failed:\n" + violations.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Architecture check passed (${files.length} source files, no empty directories).`);
