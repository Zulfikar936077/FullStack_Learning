export function getErrorContent(error) {
  if (error.response?.data) {
    return JSON.stringify(error.response.data);
  }

  return JSON.stringify({
    error: error.message || "Unable to reach the Secrets API.",
  });
}
