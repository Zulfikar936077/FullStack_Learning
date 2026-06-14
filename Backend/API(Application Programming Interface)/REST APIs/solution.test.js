import { test } from "node:test";
import assert from "node:assert/strict";
import { formatAxiosErrorContent } from "./solution.js";

test("formats API response errors without changing response data", () => {
  const content = formatAxiosErrorContent({
    response: {
      data: { message: "Secret not found" },
    },
  });

  assert.equal(content, JSON.stringify({ message: "Secret not found" }));
});

test("formats response-less Axios failures without throwing", () => {
  const content = formatAxiosErrorContent(new Error("socket hang up"));

  assert.equal(content, JSON.stringify({ error: "socket hang up" }));
});
