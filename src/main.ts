import { config } from "./config.ts";
import { info } from "./logger.ts";
import { handleRequest } from "./server.ts";

Deno.serve({
  hostname: config.host,
  port: config.port,
  onListen: () => {
    info(`Listening on http://${config.host}:${config.port}`);
  },
}, handleRequest);
