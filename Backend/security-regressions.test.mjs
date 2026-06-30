import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { app as secretsSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosError as formatRestStarterError } from "./API(Application Programming Interface)/REST APIs/index.js";
import { formatAxiosError as formatRestSolutionError } from "./API(Application Programming Interface)/REST APIs/solution.js";

const backendDir = dirname(fileURLToPath(import.meta.url));

async function withServer(app, run) {
  const server = app.listen(0);
  await once(server, "listening");

  try {
    const { port } = server.address();
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function formRequest(password) {
  return {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ password }),
  };
}

test("Secrets Project denies a bad password after a successful request", async () => {
  await withServer(secretsSolutionApp, async (baseUrl) => {
    const success = await fetch(
      `${baseUrl}/check`,
      formRequest("ILoveProgramming")
    );
    assert.match(await success.text(), /When making chocolate desserts/);

    const failure = await fetch(`${baseUrl}/check`, formRequest("wrong"));
    const failureBody = await failure.text();

    assert.doesNotMatch(failureBody, /When making chocolate desserts/);
    assert.match(failureBody, /<form action="\/check" method="POST">/);
  });
});

test("REST API error formatter handles Axios failures without responses", () => {
  const networkError = new Error("connect ECONNREFUSED 127.0.0.1:443");

  assert.deepEqual(formatRestStarterError(networkError), {
    error: "Request failed",
    message: "connect ECONNREFUSED 127.0.0.1:443",
  });
  assert.deepEqual(formatRestSolutionError(networkError), {
    error: "Request failed",
    message: "connect ECONNREFUSED 127.0.0.1:443",
  });
});

test("REST API error formatter preserves API response payloads", () => {
  const responseError = new Error("Request failed with status code 404");
  responseError.response = { data: { message: "Secret not found" } };

  assert.deepEqual(formatRestStarterError(responseError), {
    message: "Secret not found",
  });
  assert.deepEqual(formatRestSolutionError(responseError), {
    message: "Secret not found",
  });
});

test("Secrets API examples do not commit credential literals", async () => {
  const apiAuthSource = await readFile(
    join(
      backendDir,
      "API(Application Programming Interface)",
      "API+Authentication",
      "index.js"
    ),
    "utf8"
  );
  const restSolutionSource = await readFile(
    join(
      backendDir,
      "API(Application Programming Interface)",
      "REST APIs",
      "solution.js"
    ),
    "utf8"
  );

  const hardcodedCredentialAssignment =
    /const your(?:Username|Password|APIKey|BearerToken) = "(?!")/;

  assert.doesNotMatch(apiAuthSource, hardcodedCredentialAssignment);
  assert.doesNotMatch(restSolutionSource, hardcodedCredentialAssignment);
  assert.match(apiAuthSource, /process\.env\.SECRETS_API_/);
  assert.match(restSolutionSource, /process\.env\.SECRETS_API_BEARER_TOKEN/);
});
