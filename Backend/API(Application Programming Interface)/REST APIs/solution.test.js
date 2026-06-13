import assert from "node:assert/strict";
import test from "node:test";

process.env.NODE_ENV = "test";

const { renderAxiosError } = await import("./solution.js");

test("renderAxiosError renders API response errors", () => {
  const renders = [];
  const res = {
    render(view, data) {
      renders.push({ view, data });
    },
  };

  renderAxiosError(res, { response: { data: { error: "Not found" } } });

  assert.deepEqual(renders, [
    {
      view: "index.ejs",
      data: { content: JSON.stringify({ error: "Not found" }) },
    },
  ]);
});

test("renderAxiosError renders network errors without crashing", () => {
  const renders = [];
  const res = {
    render(view, data) {
      renders.push({ view, data });
    },
  };

  assert.doesNotThrow(() => renderAxiosError(res, new Error("ECONNRESET")));
  assert.deepEqual(renders, [
    {
      view: "index.ejs",
      data: { content: JSON.stringify({ error: "ECONNRESET" }) },
    },
  ]);
});
