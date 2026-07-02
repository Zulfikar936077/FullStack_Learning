import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { app as secretsStarterApp } from "./ExpressJS/3.5 Secrets Project/index.js";
import { app as secretsSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosError as formatStarterRestError } from "./API(Application Programming Interface)/REST APIs/index.js";
import { formatAxiosError as formatSolutionRestError } from "./API(Application Programming Interface)/REST APIs/solution.js";

async function postForm(app, path, fields) {
  const server = app.listen(0);

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}${path}`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fields),
    });

    return {
      status: response.status,
      text: await response.text(),
    };
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

test("Secrets Project authorization is scoped to each request", async () => {
  for (const app of [secretsStarterApp, secretsSolutionApp]) {
    const success = await postForm(app, "/check", {
      password: "ILoveProgramming",
    });
    assert.equal(success.status, 200);
    assert.match(success.text, /chocolate desserts/);

    const failure = await postForm(app, "/check", {
      password: "wrong-password",
    });
    assert.equal(failure.status, 200);
    assert.match(failure.text, /Password:/);
    assert.doesNotMatch(failure.text, /chocolate desserts/);
  }
});

test("REST API examples render response-less Axios failures safely", () => {
  for (const formatAxiosError of [
    formatStarterRestError,
    formatSolutionRestError,
  ]) {
    assert.equal(
      formatAxiosError(new Error("socket hang up")),
      JSON.stringify({ error: "socket hang up" })
    );
    assert.equal(
      formatAxiosError({ response: { data: { message: "not found" } } }),
      JSON.stringify({ message: "not found" })
    );
  }
});

test("Secrets API example credentials come from environment variables", async () => {
  const files = [
    "API(Application Programming Interface)/API+Authentication/index.js",
    "API(Application Programming Interface)/API+Authentication/solution.js",
    "API(Application Programming Interface)/REST APIs/solution.js",
  ];

  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");
    assert.match(source, /process\.env\.SECRETS_API_/);
    assert.doesNotMatch(
      source,
      /const your(?:Username|Password|APIKey|BearerToken) = "[^"]+"/
    );
  }
});
