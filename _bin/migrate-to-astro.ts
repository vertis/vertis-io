/**
 * Migrates Jekyll posts (_posts/*.md, *.html) into the Astro content
 * collection at src/content/posts/.
 *
 * - Converts {% highlight lang %} blocks to fenced code blocks
 * - Strips {% raw %}/{% endraw %} wrappers
 * - Removes the Jekyll `layout` frontmatter key, adds `date` from filename
 * - Skips unpublished posts and malformed filenames
 * - Converts _data/related_content.yml to src/data/related-content.json
 *
 * NOTE: one-time migration script, kept for reference. The Jekyll _posts,
 * _drafts and _data directories no longer exist in the repo.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const POSTS_DIR = "_posts";
const OUT_DIR = "src/content/posts";
const FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.(md|html)$/;

function transformBody(body: string): string {
  return body
    .replace(/\{%\s*highlight\s+(\w+)\s*%\}/g, "```$1")
    .replace(/\{%\s*endhighlight\s*%\}/g, "```")
    .replace(/^\s*\{%\s*raw\s*%\}\s*$/gm, "")
    .replace(/^\s*\{%\s*endraw\s*%\}\s*$/gm, "");
}

async function migrateDir(dir: string, isDraft: boolean) {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(dir)).filter((f) => /\.(md|html)$/.test(f));
  let migrated = 0;
  const skipped: string[] = [];

  for (const file of files.sort()) {
    const match = file.match(FILENAME_RE);
    if (!match) {
      skipped.push(`${file} (malformed filename)`);
      continue;
    }
    const [, date, slug] = match;
    if (!slug) {
      skipped.push(`${file} (empty slug)`);
      continue;
    }

    const raw = (await readFile(path.join(dir, file), "utf8")).replace(
      /\r\n/g,
      "\n",
    );
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!fmMatch) {
      skipped.push(`${file} (no frontmatter)`);
      continue;
    }
    const [, fmRaw, body] = fmMatch;
    const frontmatter = (yaml.load(fmRaw) ?? {}) as Record<string, unknown>;

    if (frontmatter.published === false) {
      skipped.push(`${file} (unpublished)`);
      continue;
    }

    delete frontmatter.layout;
    frontmatter.date = date;
    if (isDraft) frontmatter.published = false;
    if (!frontmatter.title) {
      // Jekyll derives a titleized slug when no title is set
      frontmatter.title = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    const out = `---\n${yaml.dump(frontmatter, { lineWidth: -1 })}---\n${transformBody(body)}`;
    await writeFile(path.join(OUT_DIR, `${date}-${slug}.md`), out);
    migrated++;
  }

  console.log(`Migrated ${migrated} from ${dir}`);
  if (skipped.length) console.log("Skipped:\n  " + skipped.join("\n  "));
}

async function migratePosts() {
  // Drafts first so that a published post wins over a same-named draft
  await migrateDir("_drafts", true);
  await migrateDir(POSTS_DIR, false);
}

async function migrateRelatedContent() {
  const raw = await readFile("_data/related_content.yml", "utf8");
  const data = yaml.load(raw) ?? {};
  await mkdir("src/data", { recursive: true });
  await writeFile(
    "src/data/related-content.json",
    JSON.stringify(data, null, 2),
  );
  console.log(
    `Related content: ${Object.keys(data as object).length} entries -> src/data/related-content.json`,
  );
}

await migratePosts();
await migrateRelatedContent();
