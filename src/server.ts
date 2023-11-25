import { config } from "./config.ts";
import { info } from "./logger.ts";
import {
  createJSONResponse,
  didAttemptPathTraversal,
  getFilePathFromURL,
} from "./utils.ts";

export async function handleRequest(
  req: Request,
): Promise<Response> {
  // Prevent path traversal
  if (!config.allowPathTraversal && didAttemptPathTraversal(req.url)) {
    return createJSONResponse({ message: "Attempted path traversal" }, 400);
  }

  const path = getFilePathFromURL(req.url);
  info(`${req.method} /${path}`);

  try {
    const fileContents = await Deno.readTextFile(path);
    return new Response(fileContents);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return createJSONResponse({ message: "File not found" }, 404);
    }
  }

  return createJSONResponse({ message: "Internal server error" }, 500);
}
