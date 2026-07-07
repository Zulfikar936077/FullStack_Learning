import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { test } from "node:test";

import {
  formatAxiosError as formatRestStarterError,
} from "./API(Application Programming Interface)/REST APIs/index.js";
import {
  formatAxiosError as formatRestSolutionError,
} from "./API(Application Programming Interface)/REST APIs/solution.js";
import {
  app as secretsStarterApp,
  isAuthorizedPassword as isStarterAuthorizedPassword,
} from "./ExpressJS/3.5 Secrets Project/index.js";
import {
  app as secretsSolutionApp,
  isAuthorizedPassword as isSolutionAuthorizedPassword,
} from "./ExpressJS/3.5 Secrets Project/solution.js";

const credentialAssignmentPattern =
  /const\s+your(?:Username|Password|APIKey|BearerToken)\s*=\s*["'][^"']+["']/;

async function readBackendFile(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function listen(app) {
  const server = createServer(app);

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, () => resolve(server));
  });
}

async function close(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function postPassword(server, password) {
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/check`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ password }),
  });

  return response.text();
}

test("Secrets API credentials are not hard-coded in backend examples", async () => {
  const apiAuthSource = await readBackendFile(
    "./API(Application Programming Interface)/API+Authentication/index.js"
  );
  const restSolutionSource = await readBackendFile(
    "./API(Application Programming Interface)/REST APIs/solution.js"
  );

  assert.doesNotMatch(apiAuthSource, credentialAssignmentPattern);
  assert.doesNotMatch(restSolutionSource, credentialAssignmentPattern);
  assert.match(apiAuthSource, /process\.env\.SECRETS_USERNAME/);
  assert.match(apiAuthSource, /process\.env\.SECRETS_API_KEY/);
  assert.match(restSolutionSource, /process\.env\.SECRETS_BEARER_TOKEN/);
});

test("REST API error formatting handles response-less Axios failures", () => {
  const networkError = new Error("network unavailable");
  const httpError = { response: { data: { error: "not found" } } };

  assert.equal(formatRestStarterError(networkError), "network unavailable");
  assert.equal(formatRestSolutionError(networkError), "network unavailable");
  assert.equal(formatRestStarterError(httpError), '{"error":"not found"}');
  assert.equal(formatRestSolutionError(httpError), '{"error":"not found"}');
});

test("Secrets Project password checks are request-scoped", () => {
  assert.equal(isStarterAuthorizedPassword("ILoveProgramming"), true);
  assert.equal(isStarterAuthorizedPassword("wrong"), false);
  assert.equal(isSolutionAuthorizedPassword("ILoveProgramming"), true);
  assert.equal(isSolutionAuthorizedPassword("wrong"), false);
});

test("Secrets Project solution rejects a wrong password after a prior success", async () => {
  const server = await listen(secretsSolutionApp);

  try {
    const firstResponse = await postPassword(server, "ILoveProgramming");
    const secondResponse = await postPassword(server, "wrong");

    assert.match(firstResponse, /When making chocolate desserts/);
    assert.doesNotMatch(secondResponse, /When making chocolate desserts/);
    assert.match(secondResponse, /<form action="\/check" method="POST">/);
  } finally {
    await close(server);
  }
});

test("Secrets Project starter rejects wrong passwords independently", async () => {
  const server = await listen(secretsStarterApp);

  try {
    const response = await postPassword(server, "wrong");

    assert.doesNotMatch(response, /When making chocolate desserts/);
    assert.match(response, /<form action="\/check" method="POST">/);
  } finally {
    await close(server);
  }
});
