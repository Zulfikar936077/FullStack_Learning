import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { app as secretIndexApp } from "./ExpressJS/3.5 Secrets Project/index.js";
import { app as secretSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosError as formatRestIndexError } from "./API(Application Programming Interface)/REST APIs/index.js";
import { formatAxiosError as formatRestSolutionError } from "./API(Application Programming Interface)/REST APIs/solution.js";

async function withServer(app, callback) {
  const server = app.listen(0);
  await once(server, "listening");
  const { port } = server.address();

  try {
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

async function postPassword(baseUrl, password) {
  return fetch(`${baseUrl}/check`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ password }).toString(),
  });
}

for (const [name, app] of [
  ["index.js", secretIndexApp],
  ["solution.js", secretSolutionApp],
]) {
  test(`${name} rejects a bad password after a successful login`, async () => {
    await withServer(app, async (baseUrl) => {
      const successResponse = await postPassword(baseUrl, "ILoveProgramming");
      assert.equal(successResponse.status, 200);
      assert.match(await successResponse.text(), /WiFi password/);

      const failureResponse = await postPassword(baseUrl, "wrong-password");
      assert.equal(failureResponse.status, 200);

      const failureBody = await failureResponse.text();
      assert.doesNotMatch(failureBody, /WiFi password/);
      assert.match(failureBody, /<form action="\/check" method="POST">/);
    });
  });
}

for (const [name, formatAxiosError] of [
  ["starter", formatRestIndexError],
  ["solution", formatRestSolutionError],
]) {
  test(`${name} REST API error formatting handles response-less Axios failures`, () => {
    assert.equal(
      formatAxiosError({ message: "connect ECONNREFUSED 127.0.0.1:443" }),
      JSON.stringify({ error: "connect ECONNREFUSED 127.0.0.1:443" })
    );
    assert.equal(
      formatAxiosError({ response: { data: { error: "Not found" } } }),
      JSON.stringify({ error: "Not found" })
    );
  });
}

test("Secrets API examples do not contain committed credential literals", async () => {
  const apiAuthIndex = await readFile(
    new URL("./API(Application Programming Interface)/API+Authentication/index.js", import.meta.url),
    "utf8"
  );
  const restSolution = await readFile(
    new URL("./API(Application Programming Interface)/REST APIs/solution.js", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(apiAuthIndex, /const your(Username|Password) = "hasan"/);
  assert.doesNotMatch(apiAuthIndex, /const your(APIKey|BearerToken) = "[^"]+"/);
  assert.doesNotMatch(restSolution, /const yourBearerToken = "[^"]+"/);

  assert.match(apiAuthIndex, /process\.env\.SECRETS_API_KEY/);
  assert.match(apiAuthIndex, /process\.env\.SECRETS_API_BEARER_TOKEN/);
  assert.match(restSolution, /process\.env\.SECRETS_API_BEARER_TOKEN/);
});
