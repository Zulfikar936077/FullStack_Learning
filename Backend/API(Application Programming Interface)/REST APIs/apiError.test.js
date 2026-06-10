import assert from "node:assert/strict";
import test from "node:test";

import { getErrorContent } from "./apiError.js";

test("formats API response errors", () => {
  const content = getErrorContent({
    response: {
      data: { message: "Not authorized" },
    },
  });

  assert.equal(content, JSON.stringify({ message: "Not authorized" }));
});

test("formats network errors without crashing", () => {
  const content = getErrorContent(new Error("getaddrinfo ENOTFOUND secrets-api.appbrewery.com"));

  assert.equal(
    content,
    JSON.stringify({ error: "getaddrinfo ENOTFOUND secrets-api.appbrewery.com" })
  );
});
