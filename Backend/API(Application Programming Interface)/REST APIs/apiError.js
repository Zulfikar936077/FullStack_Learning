export function getErrorContent(error) {
  if (error?.response?.data !== undefined) {
    return JSON.stringify(error.response.data);
  }

  const message =
    error instanceof Error && error.message ? error.message : "Request failed";

  return JSON.stringify({ error: message });
}
