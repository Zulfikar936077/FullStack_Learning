import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import http from "node:http";
import test from "node:test";

import { app as secretsSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosError as formatStarterRestError } from "./API(Application Programming Interface)/REST APIs/index.js";
import { formatAxiosError as formatRestSolutionError } from "./API(Application Programming Interface)/REST APIs/solution.js";

async function listen(app) {
  const server = app.listen(0);
  await once(server, "listening");
  return server;
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

function postForm(server, path, fields) {
  const body = new URLSearchParams(fields).toString();
  const { port } = server.address();

  return new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "content-length": Buffer.byteLength(body),
        },
      },
      (response) => {
        let responseBody = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          responseBody += chunk;
        });
        response.on("end", () => {
          resolve({ statusCode: response.statusCode, body: responseBody });
        });
      }
    );

    request.on("error", reject);
    request.end(body);
  });
}

test("Secrets Project authorization is scoped to the current request", async () => {
  const server = await listen(secretsSolutionApp);

  try {
    const success = await postForm(server, "/check", {
      password: "ILoveProgramming",
    });
    assert.equal(success.statusCode, 200);
    assert.match(success.body, /chocolate desserts/);

    const failure = await postForm(server, "/check", {
      password: "wrong-password",
    });
    assert.equal(failure.statusCode, 200);
    assert.match(failure.body, /<form action="\/check" method="POST">/);
    assert.doesNotMatch(failure.body, /chocolate desserts/);
  } finally {
    await close(server);
  }
});

test("REST API error formatter handles response-less Axios failures", () => {
  const networkError = new Error("connect ECONNREFUSED 127.0.0.1:1");

  assert.equal(
    formatStarterRestError(networkError),
    JSON.stringify({ error: networkError.message })
  );
  assert.equal(
    formatRestSolutionError(networkError),
    JSON.stringify({ error: networkError.message })
  );
});

test("Secrets API example credentials are not committed as literals", async () => {
  const files = [
    "API(Application Programming Interface)/API+Authentication/index.js",
    "API(Application Programming Interface)/REST APIs/solution.js",
  ];
  const hardCodedCredential =
    /const\s+your(?:Username|Password|APIKey|BearerToken)\s*=\s*["'][^"']+["']/;

  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");
    assert.doesNotMatch(source, hardCodedCredential, file);
  }
});
