import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { app as secretsApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosError as formatStarterAxiosError } from "./API(Application Programming Interface)/REST APIs/index.js";
import { formatAxiosError as formatSolutionAxiosError } from "./API(Application Programming Interface)/REST APIs/solution.js";

async function withServer(app, run) {
  const server = await new Promise((resolve) => {
    const listeningServer = app.listen(0, () => resolve(listeningServer));
  });

  try {
    const { port } = server.address();
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function postForm(url, body) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body),
  });
}

test("secrets project does not reuse a previous request's authorization", async () => {
  await withServer(secretsApp, async (baseUrl) => {
    const authorisedResponse = await postForm(`${baseUrl}/check`, {
      password: "ILoveProgramming",
    });
    assert.match(await authorisedResponse.text(), /When making chocolate desserts/);

    const rejectedResponse = await postForm(`${baseUrl}/check`, {
      password: "wrong-password",
    });
    const rejectedHtml = await rejectedResponse.text();

    assert.doesNotMatch(rejectedHtml, /When making chocolate desserts/);
    assert.match(rejectedHtml, /<form action="\/check" method="POST">/);
  });
});

test("REST API examples handle Axios failures without an HTTP response", () => {
  const networkError = new Error("connect ECONNREFUSED");
  const apiError = { response: { data: { message: "Secret not found" } } };

  for (const formatAxiosError of [
    formatStarterAxiosError,
    formatSolutionAxiosError,
  ]) {
    assert.equal(
      formatAxiosError(networkError),
      JSON.stringify({ error: "connect ECONNREFUSED" })
    );
    assert.equal(
      formatAxiosError(apiError),
      JSON.stringify({ message: "Secret not found" })
    );
  }
});

test("Secrets API credentials are not committed as source literals", async () => {
  const filesToCheck = [
    "API(Application Programming Interface)/API+Authentication/index.js",
    "API(Application Programming Interface)/REST APIs/solution.js",
  ];
  const leakedCredentialPatterns = [
    /bac77d6-d655-4f5e-883b-fc6bca90ce77/,
    /158504fa-13bb-4091-abbf-2e3bce7d2e53/,
    /08f3026d-9c6c-4d88-a3b2-c579dc106247/,
    /const yourPassword = "hasan"/,
  ];

  for (const file of filesToCheck) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");

    assert.match(source, /process\.env\.SECRETS_API_/);
    for (const pattern of leakedCredentialPatterns) {
      assert.doesNotMatch(source, pattern);
    }
  }
});
