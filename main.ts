import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

let raw: string;
try {
  raw = readFileSync("POST.json", "utf8");
} catch {
  throw new Error("POST.json not found in the repository root — fill it with the X post URL first");
}
const post = JSON.parse(raw);
if (!post || typeof post.url !== "string" || !post.url.startsWith("https://x.com/")) {
  throw new Error("POST.json must contain a url field with a real https://x.com/... post address (not the placeholder)");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "post.json"), JSON.stringify(post, null, 2) + "\n");
