import fs from "fs";
import path from "path";
import * as glob from "glob";
import yaml from "js-yaml";

// Function to extract YAML content from a markdown file
function extractYamlContent(fileContent: string): {
  yamlContent: string;
  yamlStart: number;
  yamlEnd: number;
} {
  const yamlStart = fileContent.indexOf("---");
  const yamlEnd = fileContent.indexOf("---", yamlStart + 3) + 3;
  // Exclude the ending "---" from yamlContent for parsing
  const yamlContent = fileContent.substring(yamlStart + 3, yamlEnd - 3).trim();
  console.log(yamlContent);
  return { yamlContent, yamlStart, yamlEnd };
}

// Function to update the markdown file with preview_url
function updateMarkdownFile(filePath: string, previewUrl: string): void {
  let fileContent = fs.readFileSync(filePath, "utf8");
  const { yamlContent, yamlStart, yamlEnd } = extractYamlContent(fileContent);
  let doc = yaml.load(yamlContent);

  if (typeof doc === "object" && doc !== null && "feature_image" in doc) {
    doc["feature_image"]["preview_url"] = previewUrl;
    const newYamlContent = yaml.dump(doc);
    // Ensure the "---" at the start and end of the YAML block are preserved
    fileContent =
      fileContent.substring(0, yamlStart) +
      "---\n" +
      newYamlContent +
      "---\n" +
      fileContent.substring(yamlEnd);
    fs.writeFileSync(filePath, fileContent, "utf8");
  }
}

// Function to generate preview URL from the original URL
function generatePreviewUrl(originalUrl: string): string {
  return originalUrl.replace(/w=800$/, "w=450");
}

// Main function to find markdown files and update them
function addPreviewUrls(): void {
  const markdownFiles = glob.sync("_posts/*.md");

  markdownFiles.forEach((file: string) => {
    const content = fs.readFileSync(file, "utf8");
    const { yamlContent } = extractYamlContent(content);
    const doc = yaml.load(yamlContent);

    if (
      typeof doc === "object" &&
      doc !== null &&
      "feature_image" in doc &&
      !("preview_url" in doc["feature_image"])
    ) {
      const originalUrl = doc["feature_image"]["url"];
      if (typeof originalUrl === "string") {
        const previewUrl = generatePreviewUrl(originalUrl);
        updateMarkdownFile(file, previewUrl);
      }
    }
  });
}

// Execute the main function
addPreviewUrls();
