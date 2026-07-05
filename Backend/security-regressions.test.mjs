import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer, request as httpRequest } from "node:http";
import test from "node:test";

import { app as secretsApp } from "./ExpressJS/3.5 Secrets Project/index.js";
import { app as secretsSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosError as formatRestIndexAxiosError } from "./API(Application Programming Interface)/REST APIs/index.js";
import { formatAxiosError as formatRestSolutionAxiosError } from "./API(Application Programming Interface)/REST APIs/solution.js";

function postForm(app, path, formBody) {
  return new Promise((resolve, reject) => {
    const server = createServer(app);

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      const req = httpRequest(
        {
          host: "127.0.0.1",
          port,
          path,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(formBody),
          },
        },
        (res) => {
          let responseBody = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => {
            responseBody += chunk;
          });
          res.on("end", () => {
            server.close(() => {
              resolve({ statusCode: res.statusCode, body: responseBody });
            });
          });
        }
      );

      req.on("error", (error) => {
        server.close(() => {
          reject(error);
        });
      });
      req.end(formBody);
    });

    server.on("error", reject);
  });
}

async function assertWrongPasswordDoesNotReusePreviousAuthorization(app) {
  const success = await postForm(app, "/check", "password=ILoveProgramming");
  assert.equal(success.statusCode, 200);
  assert.match(success.body, /chocolate desserts/);

  const failure = await postForm(app, "/check", "password=wrong");
  assert.equal(failure.statusCode, 200);
  assert.match(failure.body, /<form action="\/check" method="POST">/);
  assert.doesNotMatch(failure.body, /chocolate desserts/);
}

test("Secrets Project authorization is scoped to the current request", async () => {
  await assertWrongPasswordDoesNotReusePreviousAuthorization(secretsApp);
  await assertWrongPasswordDoesNotReusePreviousAuthorization(secretsSolutionApp);
});

test("REST API error formatting handles Axios errors without responses", () => {
  const networkError = new Error("connect ECONNREFUSED");
  const apiError = { response: { data: { error: "bad request" } } };

  for (const formatAxiosError of [
    formatRestIndexAxiosError,
    formatRestSolutionAxiosError,
  ]) {
    assert.equal(
      formatAxiosError(networkError),
      JSON.stringify({ message: "connect ECONNREFUSED" })
    );
    assert.equal(formatAxiosError(apiError), JSON.stringify(apiError.response.data));
  }
});

test("Secrets API credentials are loaded from environment variables", async () => {
  const apiAuthSource = await readFile(
    new URL("./API(Application Programming Interface)/API+Authentication/index.js", import.meta.url),
    "utf8"
  );
  const restSolutionSource = await readFile(
    new URL("./API(Application Programming Interface)/REST APIs/solution.js", import.meta.url),
    "utf8"
  );

  assert.match(apiAuthSource, /process\.env\.SECRETS_API_USERNAME \?\? ""/);
  assert.match(apiAuthSource, /process\.env\.SECRETS_API_PASSWORD \?\? ""/);
  assert.match(apiAuthSource, /process\.env\.SECRETS_API_KEY \?\? ""/);
  assert.match(apiAuthSource, /process\.env\.SECRETS_API_BEARER_TOKEN \?\? ""/);
  assert.match(restSolutionSource, /process\.env\.SECRETS_API_BEARER_TOKEN \?\? ""/);
});
