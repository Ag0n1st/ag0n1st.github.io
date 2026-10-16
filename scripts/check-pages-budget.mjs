#!/usr/bin/env node
/**
 * GitHub Pages built-site budget: decimal 1 GB = 1,000,000,000 bytes.
 * Checks the deployable static dist tree, not source files or Git history.
 * Run after npm run build and before uploading the Pages artifact.
 */
import {readdir, stat} from "node:fs/promises";
import {join, resolve} from "node:path";

const MAX_BYTES = 1_000_000_000;

async function measure(path) {
  const info = await stat(path);
  if (info.isFile()) return {bytes:info.size, files:1};
  if (!info.isDirectory()) return {bytes:0, files:0};
  let bytes=0, files=0;
  for (const entry of await readdir(path)) {
    const item = await measure(join(path, entry));
    bytes += item.bytes;
    files += item.files;
  }
  return {bytes, files};
}

const folder = resolve("dist");
let size;
try { size = await measure(folder); }
catch(error) {
  if (error.code === "ENOENT") {
    console.error("Pages build directory dist/ does not exist. Run npm run build.");
    process.exit(1);
  }
  throw error;
}
const budget = {
  location: "dist/",
  limitBytes: MAX_BYTES,
  bytes: size.bytes,
  files: size.files,
  remainingBytes: MAX_BYTES - size.bytes,
  percent: Math.round(size.bytes / MAX_BYTES * 10000) / 100
};
console.log("PAGES_SITE_BUDGET", JSON.stringify(budget));
if (budget.bytes > MAX_BYTES) {
  console.error("GitHub Pages built-site 1 GB budget exceeded. No deployment permitted.");
  process.exitCode = 1;
}
