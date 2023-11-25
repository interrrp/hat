import { config } from "./config.ts";
import { handleRequest } from "./server.ts";

Deno.serve({ hostname: config.host, port: config.port }, handleRequest);
