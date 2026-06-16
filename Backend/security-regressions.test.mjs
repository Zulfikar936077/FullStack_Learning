import { strict as assert } from "assert";
import { readFile } from "fs/promises";
import http from "http";
import test from "node:test";

process.env.NODE_ENV = "test";

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

function postForm(server, path, form) {
  const body = new URLSearchParams(form).toString();
  const { port } = server.address();

  return new Promise((resolve, reject) => {
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
          resolve({ statusCode: response.statusCode, body: responseBody });
        });
      }
    );

    request.on("error", reject);
    request.end(body);
  });
}

test("Secrets API credentials are read from environment variables", async () => {
  const [apiAuthSource, restApiSource] = await Promise.all([
    readFile(
      new URL(
        "./API(Application Programming Interface)/API+Authentication/index.js",
        import.meta.url
      ),
      "utf8"
    ),
    readFile(
      new URL(
        "./API(Application Programming Interface)/REST APIs/solution.js",
        import.meta.url
      ),
      "utf8"
    ),
  ]);

  assert.match(apiAuthSource, /const yourUsername = process\.env\.SECRETS_API_USERNAME \?\? "";/);
  assert.match(apiAuthSource, /const yourPassword = process\.env\.SECRETS_API_PASSWORD \?\? "";/);
  assert.match(apiAuthSource, /const yourAPIKey = process\.env\.SECRETS_API_KEY \?\? "";/);
  assert.match(apiAuthSource, /const yourBearerToken = process\.env\.SECRETS_API_BEARER_TOKEN \?\? "";/);
  assert.match(restApiSource, /const yourBearerToken = process\.env\.SECRETS_API_BEARER_TOKEN \?\? "";/);

  assert.doesNotMatch(apiAuthSource, /const your(?:Username|Password|APIKey|BearerToken)\s*=\s*"[^"]+"/);
  assert.doesNotMatch(restApiSource, /const yourBearerToken\s*=\s*"[^"]+"/);
});

test("REST API routes render response-less Axios failures instead of crashing", async () => {
  const { apiClient, app } = await import(
    "./API(Application Programming Interface)/REST APIs/solution.js"
  );
  const originalGet = apiClient.get;
  apiClient.get = async () => {
    throw new Error("connect ECONNREFUSED 127.0.0.1:443");
  };

  const server = await listen(app);

  try {
    const response = await postForm(server, "/get-secret", { id: "42" });

    assert.equal(response.statusCode, 200);
    assert.match(response.body, /connect ECONNREFUSED/);
  } finally {
    apiClient.get = originalGet;
    await close(server);
  }
});

test("Secrets project rejects a bad password after a previous successful request", async () => {
  const { app } = await import("./ExpressJS/3.5 Secrets Project/solution.js");
  const server = await listen(app);

  try {
    const allowed = await postForm(server, "/check", {
      password: "ILoveProgramming",
    });
    const denied = await postForm(server, "/check", {
      password: "wrong-password",
    });

    assert.equal(allowed.statusCode, 200);
    assert.match(allowed.body, /When making chocolate desserts/);
    assert.equal(denied.statusCode, 200);
    assert.doesNotMatch(denied.body, /When making chocolate desserts/);
    assert.match(denied.body, /<form action="\/check" method="POST">/);
  } finally {
    await close(server);
  }
});
