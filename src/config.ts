import { parse as parseYAML } from "std/yaml/mod.ts";
import { info } from "./logger.ts";

export type Config = {
  host: string;
  port: number;

  basePath: string;
  allowPathTraversal: boolean;
};

const defaultConfig = {
  host: "localhost",
  port: 8080,

  basePath: Deno.cwd(),
  allowPathTraversal: false,
};

async function loadConfigFromYAMLFile(path: string): Promise<Config> {
  const yaml = await Deno.readTextFile(path);
  return {
    ...defaultConfig,
    ...parseYAML(yaml) as object,
  } as Config;
}

export const config = defaultConfig;
try {
  const configPath = Deno.env.get("HAT_CONFIG_PATH") || "./config.yml";
  const loadedConfig = await loadConfigFromYAMLFile(configPath);
  Object.assign(config, loadedConfig);
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    info("No config file found, using default config");
  }
}
