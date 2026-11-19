import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const postFile = join(botDir, "POST.json");

if (!existsSync(postFile)) {
  throw new Error(`POST.json not found in ${botDir}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postFile, join(outDir, "POST.json"));
