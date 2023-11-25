function createLogFunction(level: string, color: string) {
  return function (message: string) {
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
