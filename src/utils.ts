export function createJSONResponse(data: object, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function didAttemptPathTraversal(url: string): boolean {
  return url.includes("..");
}

export function getFilePathFromURL(url: string): string {
  return url.split("/").slice(3).join("/");
}
