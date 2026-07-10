import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

process.env.NODE_ENV = "test";

const backendUrl = new URL("./", import.meta.url);

function backendFile(relativePath) {
  return new URL(relativePath, backendUrl);
}

async function readBackendFile(relativePath) {
  return readFile(backendFile(relativePath), "utf8");
}

async function importBackendModule(relativePath) {
  return import(backendFile(relativePath).href);
}

async function closeServer(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function assertRequestScopedAuthorization(relativePath) {
  const { app } = await importBackendModule(relativePath);
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const successfulResponse = await fetch(`${baseUrl}/check`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ password: "ILoveProgramming" }),
    });
    const successfulBody = await successfulResponse.text();
    assert.match(successfulBody, /When making chocolate desserts/);

    const failedResponse = await fetch(`${baseUrl}/check`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ password: "wrong password" }),
    });
    const failedBody = await failedResponse.text();
    assert.doesNotMatch(failedBody, /When making chocolate desserts/);
    assert.match(failedBody, /<form action="\/check" method="POST">/);
  } finally {
    await closeServer(server);
  }
}

test("Secrets API examples do not commit credential values", async () => {
  const sourcePaths = [
    "API(Application Programming Interface)/API+Authentication/index.js",
    "API(Application Programming Interface)/REST APIs/solution.js",
  ];

  for (const sourcePath of sourcePaths) {
    const source = await readBackendFile(sourcePath);
    assert.doesNotMatch(
      source,
      /const\s+your(?:Username|Password|APIKey|BearerToken)\s*=\s*"[^"]+"/,
      `${sourcePath} contains a non-empty credential literal`,
    );
    assert.doesNotMatch(
      source,
      /Bearer\s+[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
      `${sourcePath} contains a bearer token literal`,
    );
  }
});

test("REST API examples render response-less Axios errors", async () => {
  const modules = [
    "API(Application Programming Interface)/REST APIs/index.js",
    "API(Application Programming Interface)/REST APIs/solution.js",
  ];

  for (const modulePath of modules) {
    const { formatAxiosError } = await importBackendModule(modulePath);
    assert.equal(
      formatAxiosError(new Error("network unavailable")),
      JSON.stringify({ error: "network unavailable" }),
    );
    assert.equal(
      formatAxiosError({ response: { data: { message: "not found" } } }),
      JSON.stringify({ message: "not found" }),
    );
  }
});

test("Secrets Project solution authorization is request scoped", async () => {
  await assertRequestScopedAuthorization("ExpressJS/3.5 Secrets Project/solution.js");
});

test("Secrets Project exercise authorization is request scoped", async () => {
  await assertRequestScopedAuthorization("ExpressJS/3.5 Secrets Project/index.js");
});
