import assert from "node:assert/strict";
import test from "node:test";

import { getErrorContent } from "./apiError.js";

test("uses API response data when Axios provides a response", () => {
  const content = getErrorContent({
    response: {
      data: { error: "Not authorized" },
    },
  });

  assert.equal(content, JSON.stringify({ error: "Not authorized" }));
});

test("uses the error message when the request has no response", () => {
  const content = getErrorContent(new Error("connect ECONNREFUSED 127.0.0.1:9"));

  assert.equal(
    content,
    JSON.stringify({ error: "connect ECONNREFUSED 127.0.0.1:9" })
  );
});

test("falls back for non-error values", () => {
  const content = getErrorContent(undefined);

  assert.equal(content, JSON.stringify({ error: "Request failed" }));
});
