export function formatAxiosError(error) {
  if (error?.response?.data !== undefined) {
    return JSON.stringify(error.response.data);
  }

  return JSON.stringify({
    error: error?.message || "Request failed",
  });
}
