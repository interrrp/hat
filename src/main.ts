import { loadConfigFromYAMLFile } from "./config.ts";
import { info } from "./logger.ts";
import { createJSONResponse } from "./utils.ts";

const config = await loadConfigFromYAMLFile("./hat.yaml");

Deno.serve({ hostname: config.host, port: config.port }, async (req) => {
  // Prevent path traversal
  if (!config.allowPathTraversal && req.url.includes("..")) {
    return createJSONResponse({ message: "Attempted path traversal" }, 400);
  }

  const pathParts = req.url.split("/");
  const path = pathParts.slice(3).join("/");
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
});
