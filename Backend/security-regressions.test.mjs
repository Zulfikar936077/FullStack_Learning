import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import axios from "./API(Application Programming Interface)/REST APIs/node_modules/axios/index.js";
import { app as secretsApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { app as restApiApp } from "./API(Application Programming Interface)/REST APIs/solution.js";

const backendDir = dirname(fileURLToPath(import.meta.url));

async function withServer(app, callback) {
  const server = createServer(app);

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const { port } = server.address();

  try {
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

async function postForm(baseUrl, path, fields) {
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields),
  });
}

test("Secrets Project denies a wrong password after a successful request", async () => {
  await withServer(secretsApp, async (baseUrl) => {
    const success = await postForm(baseUrl, "/check", {
      password: "ILoveProgramming",
    });
    const successBody = await success.text();
    assert.equal(success.status, 200);
    assert.match(successBody, /When making chocolate desserts/);

    const failure = await postForm(baseUrl, "/check", {
      password: "wrong-password",
    });
    const failureBody = await failure.text();
    assert.equal(failure.status, 200);
    assert.match(failureBody, /<form action="\/check" method="POST">/);
    assert.doesNotMatch(failureBody, /When making chocolate desserts/);
  });
});

test("REST API routes render response-less Axios errors instead of crashing", async () => {
  restApiApp.set(
    "views",
    join(backendDir, "API(Application Programming Interface)", "REST APIs", "views")
  );

  const originalGet = axios.get;
  axios.get = async () => {
    throw new Error("simulated network failure");
  };

  try {
    await withServer(restApiApp, async (baseUrl) => {
      const response = await postForm(baseUrl, "/get-secret", { id: "42" });
      const body = await response.text();

      assert.equal(response.status, 200);
      assert.match(body, /simulated network failure/);
    });
  } finally {
    axios.get = originalGet;
  }
});

test("Secrets API lesson credentials are not committed as non-empty literals", async () => {
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
    assert.doesNotMatch(
      source,
      /const your(?:Username|Password|APIKey|BearerToken)\s*=\s*["'][^"']+["']/,
      `${file} must read Secrets API credentials from the environment`
    );
  }
});
