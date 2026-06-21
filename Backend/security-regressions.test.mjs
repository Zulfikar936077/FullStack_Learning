import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import http from "node:http";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const backendDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(backendDir);

async function importFromRepo(relativePath) {
  return import(pathToFileURL(resolve(repoRoot, relativePath)).href);
}

function listen(app) {
  return new Promise((resolveServer) => {
    const server = app.listen(0, () => resolveServer(server));
  });
}

function close(server) {
  return new Promise((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
}

function postForm(server, path, formData) {
  const body = new URLSearchParams(formData).toString();
  const { port } = server.address();

  return new Promise((resolveResponse, rejectResponse) => {
    const request = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (response) => {
        let responseBody = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          responseBody += chunk;
        });
        response.on("end", () => {
          resolveResponse({ statusCode: response.statusCode, body: responseBody });
        });
      }
    );

    request.on("error", rejectResponse);
    request.end(body);
  });
}

test("Secrets solution does not authorize failed requests after a successful login", async () => {
  const { default: app } = await importFromRepo(
    "Backend/ExpressJS/3.5 Secrets Project/solution.js"
  );
  const server = await listen(app);

  try {
    const successfulLogin = await postForm(server, "/check", {
      password: "ILoveProgramming",
    });
    assert.equal(successfulLogin.statusCode, 200);
    assert.match(successfulLogin.body, /When making chocolate desserts/);

    const failedLogin = await postForm(server, "/check", {
      password: "wrong-password",
    });
    assert.equal(failedLogin.statusCode, 200);
    assert.match(failedLogin.body, /<form action="\/check" method="POST">/);
    assert.doesNotMatch(failedLogin.body, /When making chocolate desserts/);
  } finally {
    await close(server);
  }
});

test("REST API error formatter handles Axios errors without responses", async () => {
  const { formatAxiosError } = await importFromRepo(
    "Backend/API(Application Programming Interface)/REST APIs/solution.js"
  );

  assert.deepEqual(JSON.parse(formatAxiosError({ message: "Network Error" })), {
    error: "Network Error",
  });
  assert.equal(
    JSON.parse(formatAxiosError({ response: { data: "not found" } })),
    "not found"
  );
});

test("API examples do not keep known Secrets API credentials in source", async () => {
  const filesToCheck = [
    "Backend/API(Application Programming Interface)/API+Authentication/index.js",
    "Backend/API(Application Programming Interface)/REST APIs/solution.js",
  ];
  const forbiddenLiterals = [
    "hasan",
    "bac77d6-d655-4f5e-883b-fc6bca90ce77",
    "158504fa-13bb-4091-abbf-2e3bce7d2e53",
    "08f3026d-9c6c-4d88-a3b2-c579dc106247",
  ];

  for (const file of filesToCheck) {
    const source = await readFile(resolve(repoRoot, file), "utf8");
    for (const literal of forbiddenLiterals) {
      assert.equal(source.includes(literal), false, `${file} contains ${literal}`);
    }
  }
});
