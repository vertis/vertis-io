import * as dotenv from "dotenv";
dotenv.config();
import { readdir, writeFile, readFile } from "fs/promises";
import fetch from "node-fetch";
import { createReadStream } from "fs";
import FormData from "form-data";
import { exec } from "child_process";
import { promisify } from "util";

interface CloudflareImageUploadResponse {
  result: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  };
  success: boolean;
  errors: unknown[];
  messages: unknown[];
}

const execAsync = promisify(exec);

async function uploadImage(
  apiToken: string,
  file: string
): Promise<string | null> {
  console.log(`Uploading ${file}...`);
  const command = `curl -X POST -F file=@./assets/img/${file} -H "Authorization: Bearer ${apiToken}" https://api.cloudflare.com/client/v4/accounts/e6764d5bc3ad48a191acbcf9bbf00aec/images/v1 -s`;
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      console.error(`Error uploading ${file}:`, stderr);
      return null;
    }
    const data: CloudflareImageUploadResponse = JSON.parse(stdout);
    console.log(`Uploaded ${file}: ${JSON.stringify(data)}`);
    if (data.success && data.result && data.result.id) {
      return data.result.id;
    }
    return null;
  } catch (error) {
    console.error(`Error executing upload command for ${file}:`, error);
    return null;
  }
}

async function uploadImages() {
  const apiToken = process.env.CLOUDFLARE_IMAGES_API_TOKEN;
  if (!apiToken) {
    console.error("CLOUDFLARE_IMAGES_API_TOKEN is not set.");
    return;
  }

  let uploadResults: Record<string, string> = {};

  try {
    // Attempt to read existing upload results to avoid re-uploading
    try {
      const existingResults = await readFile("./uploadResults.json", "utf8");
      uploadResults = JSON.parse(existingResults);
    } catch (readError) {
      console.log("No existing uploadResults.json found, starting fresh.");
    }

    const files = await readdir("./assets/img");
    for (const file of files) {
      if (uploadResults[file]) {
        console.log(`${file} has already been uploaded. Skipping...`);
        continue;
      }

      const uploadId = await uploadImage(apiToken, file);
      if (uploadId) {
        uploadResults[file] = uploadId;
      }
    }

    await writeFile(
      "./uploadResults.json",
      JSON.stringify(uploadResults, null, 2)
    );
    console.log("Upload results saved to uploadResults.json");
  } catch (error) {
    console.error(
      "Failed to read directory, upload images, or write results:",
      error
    );
  }
}

uploadImages();
