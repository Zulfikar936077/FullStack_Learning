import test from "node:test";
import assert from "node:assert/strict";

import { formatAxiosError } from "./errorUtils.js";

test("formatAxiosError preserves API response payloads", () => {
  const content = formatAxiosError({
    response: {
      data: { error: "Unauthorized" },
    },
  });

  assert.equal(content, JSON.stringify({ error: "Unauthorized" }));
});

test("formatAxiosError handles network errors without an Axios response", () => {
  const content = formatAxiosError(new Error("connect ETIMEDOUT"));

  assert.equal(content, JSON.stringify({ error: "connect ETIMEDOUT" }));
});
