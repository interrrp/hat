import { parse as parseYAML } from "std/yaml/mod.ts";

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

export const config = await loadConfigFromYAMLFile("./hat.yaml");
