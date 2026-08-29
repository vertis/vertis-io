/** One-off: full-article vs summary embeddings, both qwen3-embedding:8b. */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const POSTS_DIR = "src/content/posts";
const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")).sort();
const docs: { f: string; title: string; full: string; summary: string }[] = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf-8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) continue;
  const fm = yaml.load(m[1]) as any;
  if (fm.published === false) continue;
  const clean = raw
    .slice(m[0].length)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const summary = [
    fm.title ?? "",
    fm.meta_description ?? "",
    (fm.tags ?? []).filter(Boolean).join(", "),
    clean.slice(0, 1500),
  ].filter(Boolean).join("\n");
  docs.push({ f, title: fm.title ?? f, full: `${fm.title}\n${clean}`, summary });
}

async function embedAll(inputs: string[]): Promise<number[][]> {
  const embs: number[][] = [];
  for (let i = 0; i < inputs.length; i += 8) {
    const r = await fetch("http://localhost:11434/api/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "qwen3-embedding:8b", input: inputs.slice(i, i + 8) }),
    });
    if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
    embs.push(...(await r.json()).embeddings);
  }
  return embs;
}
function cos(a: number[], b: number[]) {
  let d = 0, x = 0, y = 0;
  for (let i = 0; i < a.length; i++) { d += a[i] * b[i]; x += a[i] ** 2; y += b[i] ** 2; }
  return d / Math.sqrt(x * y);
}

console.log(`Embedding ${docs.length} docs x2 variants...`);
const fullEmbs = await embedAll(docs.map((d) => d.full));
const sumEmbs = await embedAll(docs.map((d) => d.summary));

const seeds = [
  "2009-05-04-d6-5-experiments-part-2.md",
  "2013-12-16-unauthorised-litecoin-mining.md",
  "2015-04-23-newsfoundry.md",
  "2022-11-14-obsidian-image-layouts.md",
  "2018-04-27-rnfirebasemodule-tried-to-override.md",
  "2024-04-18-railscamp-tanks.md",
  "2006-01-30-the-0th-law-of-security.md",
];
for (const s of seeds) {
  const i = docs.findIndex((d) => d.f === s);
  if (i < 0) continue;
  const top = (embs: number[][]) =>
    docs
      .map((d, j) => ({ t: d.title, s: i === j ? -1 : cos(embs[i], embs[j]) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 5);
  const f = top(fullEmbs), sm = top(sumEmbs);
  console.log("\n" + "=".repeat(70));
  console.log("SEED: " + docs[i].title);
  console.log("-- full article:");
  console.log(f.map((x) => `  ${x.s.toFixed(3)}  ${x.t}`).join("\n"));
  console.log("-- summary:");
  console.log(sm.map((x) => `  ${x.s.toFixed(3)}  ${x.t}`).join("\n"));
}
