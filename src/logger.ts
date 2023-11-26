function createLogFunction(
  level: string,
  color: string,
): (message: string) => void {
  return function (message: string): void {
    console.log(
      `%c${level}%c ${message}`,
      `color: ${color}; font-weight: bold;`,
      "color: inherit;",
    );
  };
}

export const info = createLogFunction("info", "blue");
export const warn = createLogFunction("warn", "orange");
export const error = createLogFunction("error", "red");
