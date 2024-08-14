import * as dotenv from "dotenv";
dotenv.config();
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

async function uploadSingleImage(
  apiToken: string,
  file: string
): Promise<string | null> {
  console.log(`Uploading ${file}...`);
  const command = `curl -X POST -F file=@${file} -H "Authorization: Bearer ${apiToken}" https://api.cloudflare.com/client/v4/accounts/e6764d5bc3ad48a191acbcf9bbf00aec/images/v1 -s`;
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

// Example usage
//const process = require("process");

async function main() {
  const apiToken = process.env.CLOUDFLARE_IMAGES_API_TOKEN;
  if (!apiToken) {
    console.error("CLOUDFLARE_IMAGES_API_TOKEN is not set.");
    return;
  }
  const file = process.argv[2]; // Get the image file name from the command line
  if (!file) {
    console.error("No file specified. Usage: bun sync-new-image.js <filename>");
    return;
  }
  const uploadId = await uploadSingleImage(apiToken, file);
  if (uploadId) {
    console.log(`Image uploaded successfully. ID: ${uploadId}`);
  } else {
    console.log("Failed to upload image.");
  }
}

main();
