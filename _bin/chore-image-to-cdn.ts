import { readdir, readFile, writeFile } from "fs/promises";
import * as path from "path";

async function getFilesRecursively(directory: string) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: (string | (string | null)[] | null)[] = await Promise.all(
    entries.map(async (entry) => {
      const pathToEntry = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return getFilesRecursively(pathToEntry);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".html") || entry.name.endsWith(".md"))
      ) {
        return pathToEntry;
      }
      return null;
    })
  );
  return files.flat().filter(Boolean) as string[];
}

async function replaceImagePaths() {
  const uploadResultsPath = "./uploadResults.json";
  let uploadResults;

  try {
    const results = await readFile(uploadResultsPath, "utf8");
    uploadResults = JSON.parse(results);
  } catch (error) {
    console.error("Failed to read upload results:", error);
    return;
  }

  const htmlAndMdFiles = await getFilesRecursively("_posts");
  htmlAndMdFiles.concat(await getFilesRecursively("_layouts"));
  htmlAndMdFiles.concat(await getFilesRecursively("_includes"));
  htmlAndMdFiles.concat(await getFilesRecursively("_drafts"));
  htmlAndMdFiles.concat([
    "./blog/index.html",
    "./blog/about.html",
    "./consulting/index.md",
    "./contact/index.md",
  ]);
  // const htmlAndMdFiles = [
  //   "./_posts/2024-02-08-that-time-i-accidentally-terminated-600-instances.md",
  // ];
  // console.log(JSON.stringify(htmlAndMdFiles, null, 2));
  for (const file of htmlAndMdFiles) {
    const filePath = path.join(".", file);
    let content = await readFile(filePath, "utf8");

    const regex = /\/assets\/img\/([^\)"'\n]+)(?=\n|$)/g;
    content = content.replace(regex, (match, filename) => {
      console.log({ match, filename, r: uploadResults[filename] });
      const imageId = uploadResults[filename];
      if (!imageId) {
        console.warn(`No upload result for ${filename}`);
        return match; // Return the original string if no upload result found
      }

      const width = filePath.includes("blog/index.html") ? "w=400" : "w=800";
      return `https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/${imageId}/${width}`;
    });

    await writeFile(filePath, content, "utf8");
    console.log(`Processed ${filePath}`);
  }
}

replaceImagePaths().catch(console.error);
