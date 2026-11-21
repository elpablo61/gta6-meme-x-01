// gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json to
// /output/POST.json, where the gate reads it. The entry is the post itself: the
// meme was posted on X from a public account with a make.fun link, a tag of
// @makefunai and the play code in its text; POST.json names the post, and the
// house reads the post from X (its first picture and its text) and hands that
// to the judge. Nothing this program writes about the post is judged.
//
// POST.json is resolved robustly, in this order:
//   1. MAKEFUN_BOT_DIR, when the grader sets it (the repository root in the
//      grader's container, usually /bot)
//   2. the directory containing this file (import.meta.url) — the repo root
//      wherever this entry is checked out
//   3. the current working directory
// The first candidate that exists wins. The output goes to
// MAKEFUN_OUTPUT_DIR (default /output) as POST.json (uppercase — the gate
// reads exactly that name).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR;
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const candidates: string[] = [];
if (BOT_DIR) candidates.push(join(BOT_DIR, "POST.json"));
candidates.push(join(dirname(fileURLToPath(import.meta.url)), "POST.json"));
candidates.push(join(process.cwd(), "POST.json"));

let source: string | null = null;
for (const candidate of candidates) {
  if (existsSync(candidate)) {
    source = candidate;
    break;
  }
}
if (!source) {
  console.error(
    "POST.json not found in MAKEFUN_BOT_DIR, the entry directory, or the working directory",
  );
  process.exit(1);
}

let post: unknown;
try {
  post = JSON.parse(readFileSync(source, "utf8"));
} catch {
  console.error(`POST.json at ${source} is not valid JSON`);
  process.exit(1);
}
if (
  !post ||
  typeof (post as { url?: unknown }).url !== "string" ||
  !(post as { url: string }).url.startsWith("https://x.com/")
) {
  console.error(
    "POST.json must contain a url field with a real https://x.com/... post address (not the placeholder)",
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "POST.json"), JSON.stringify(post, null, 2) + "\n");
console.log(
  `Wrote POST.json to ${join(OUTPUT_DIR, "POST.json")} (from ${source}): ${(post as { url: string }).url}`,
);
