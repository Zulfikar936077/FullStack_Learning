import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { app as secretsSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosErrorContent as formatStarterRestError } from "./API(Application Programming Interface)/REST APIs/index.js";
import { formatAxiosErrorContent as formatRestSolutionError } from "./API(Application Programming Interface)/REST APIs/solution.js";

const backendDir = dirname(fileURLToPath(import.meta.url));

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

function serverUrl(server, path) {
  const { port } = server.address();
  return `http://127.0.0.1:${port}${path}`;
}

async function postPassword(server, password) {
  return fetch(serverUrl(server, "/check"), {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ password }),
  });
}

test("Secrets Project rejects a wrong password after a successful request", async (t) => {
  const server = await listen(secretsSolutionApp);
  t.after(() => server.close());

  const successResponse = await postPassword(server, "ILoveProgramming");
  assert.match(await successResponse.text(), /When making chocolate desserts/);

  const deniedResponse = await postPassword(server, "wrong-password");
  const deniedHtml = await deniedResponse.text();
  assert.match(deniedHtml, /<form action="\/check" method="POST">/);
  assert.doesNotMatch(deniedHtml, /When making chocolate desserts/);
});

test("REST API error formatting handles response-less Axios failures", () => {
  const networkError = new Error("connect ECONNREFUSED");
  const apiError = { response: { data: { message: "not found" } } };

  for (const formatError of [formatStarterRestError, formatRestSolutionError]) {
    assert.equal(
      formatError(networkError),
      JSON.stringify({ error: "connect ECONNREFUSED" })
    );
    assert.equal(formatError(apiError), JSON.stringify({ message: "not found" }));
  }
});

test("Secrets API examples do not commit personal credential literals", async () => {
  const credentialLiteralPattern =
    /const\s+(?:yourUsername|yourPassword|yourAPIKey|yourBearerToken)\s*=\s*["'][^"']+["'];/;
  const files = [
    join(
      backendDir,
      "API(Application Programming Interface)",
      "API+Authentication",
      "index.js"
    ),
    join(
      backendDir,
      "API(Application Programming Interface)",
      "REST APIs",
      "solution.js"
    ),
  ];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    assert.doesNotMatch(source, credentialLiteralPattern);
  }
});
