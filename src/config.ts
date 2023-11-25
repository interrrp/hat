import { parse as parseYAML } from "std/yaml/mod.ts";

type Config = {
  host: string;
  port: number;

  allowPathTraversal: boolean;
};

const defaultConfig = {
  host: "localhost",
  port: 8080,

  allowPathTraversal: false,
};

export async function loadConfigFromYAMLFile(path: string) {
  const yaml = await Deno.readTextFile(path);
  return {
    ...defaultConfig,
    ...parseYAML(yaml) as object,
  } as Config;
}
