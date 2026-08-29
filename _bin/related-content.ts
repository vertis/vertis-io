/**
 * Generate related content for blog posts using local embeddings via Ollama.
 *
 * Usage: bun run _bin/related-content.ts
 *
 * Requires Ollama running locally (https://ollama.com) with an embedding model:
 *   ollama pull nomic-embed-text
 *
 * Reads:  src/content/posts/*.md (drafts excluded)
 * Writes: src/data/related-content.json  (filename -> related filenames)
 *
 * Consumed at build time by src/utils/posts.ts.
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const POSTS_DIR = "src/content/posts";
const OUTPUT_FILE = "src/data/related-content.json";
const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const MODEL = process.env.EMBED_MODEL ?? "qwen3-embedding:8b";

// Tune these after reviewing the printed similarity distribution.
// With qwen3-embedding:8b full-article embeddings, genuinely related posts
// score ~0.37-0.76 while unrelated pairs sit below ~0.40.
const TOP_N = 5;
const MIN_SIMILARITY = Number(process.env.MIN_SIMILARITY ?? 0.40);

interface PostDoc {
  filename: string;
  title: string;
  tags: string[];
  body: string;
}

interface Frontmatter {
  title?: string;
  published?: boolean;
  tags?: (string | null)[] | null;
}

function parsePost(filename: string, raw: string): PostDoc | null {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;
  let fm: Frontmatter;
  let body = raw;
  try {
    fm = yaml.load(match[1]) as Frontmatter;
    body = raw.slice(match[0].length);
  } catch {
    return null;
  }
  if (fm.published === false) return null; // skip drafts

  // Strip code blocks, HTML (imported posts carry raw markup), and comments;
  // they dilute the prose signal and blow up tokenization.
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/\{%-?[\s\S]*?-?%\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tags = (fm.tags ?? []).filter((t): t is string => !!t);
  // Embed the full cleaned article (qwen3-embedding has a 32k-token context,
  // far beyond any post here); title kept in front as an anchor.
  const input = `${fm.title ?? ""}\n${text}`;

  return { filename, title: fm.title ?? filename, tags, body: input };
}

async function embed(inputs: string[]): Promise<number[][]> {
  const res = await fetch(`${OLLAMA_URL}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, input: inputs, truncate: true }),
  });
  if (!res.ok) {
    throw new Error(`Ollama embed failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { embeddings: number[][] };
  return json.embeddings;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function main() {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const posts: PostDoc[] = [];
  for (const filename of files) {
    const post = parsePost(
      filename,
      fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8"),
    );
    if (post) posts.push(post);
  }
  console.log(
    `Embedding ${posts.length} posts (${files.length - posts.length} drafts skipped) with ${MODEL}...`,
  );

  // Batch to keep request payloads reasonable.
  const embeddings: number[][] = [];
  const BATCH = 16;
  for (let i = 0; i < posts.length; i += BATCH) {
    const batch = posts.slice(i, i + BATCH);
    embeddings.push(...(await embed(batch.map((p) => p.body))));
    process.stdout.write(`\r  ${Math.min(i + BATCH, posts.length)}/${posts.length}`);
  }
  process.stdout.write("\n");

  // All pairwise similarities (165 posts => ~13.5k pairs, trivial).
  const sims: number[] = [];
  const related: Record<string, string[]> = {};
  for (let i = 0; i < posts.length; i++) {
    const scored: { filename: string; sim: number }[] = [];
    for (let j = 0; j < posts.length; j++) {
      if (i === j) continue;
      const sim = cosineSimilarity(embeddings[i], embeddings[j]);
      sims.push(sim);
      scored.push({ filename: posts[j].filename, sim });
    }
    scored.sort((a, b) => b.sim - a.sim);
    related[posts[i].filename] = scored
      .filter((s) => s.sim >= MIN_SIMILARITY)
      .slice(0, TOP_N)
      .map((s) => s.filename);
  }

  sims.sort((a, b) => a - b);
  const pct = (p: number) => sims[Math.floor(sims.length * p)].toFixed(3);
  console.log(
    `Similarity distribution: min=${sims[0].toFixed(3)} p25=${pct(0.25)} p50=${pct(0.5)} p75=${pct(0.75)} p90=${pct(0.9)} max=${sims[sims.length - 1].toFixed(3)}`,
  );

  const withRelated = Object.values(related).filter((r) => r.length > 0).length;
  const counts = Object.values(related).map((r) => r.length);
  const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
  console.log(
    `Posts with related content: ${withRelated}/${posts.length}, avg ${avg.toFixed(1)} each (threshold ${MIN_SIMILARITY})`,
  );

  const sorted: typeof related = {};
  for (const key of Object.keys(related).sort()) sorted[key] = related[key];
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
