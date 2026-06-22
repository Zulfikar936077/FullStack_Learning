import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { request } from "node:http";
import test from "node:test";

import secretsIndexApp from "./ExpressJS/3.5 Secrets Project/index.js";
import secretsSolutionApp from "./ExpressJS/3.5 Secrets Project/solution.js";
import { getErrorContent as getIndexErrorContent } from "./API(Application Programming Interface)/REST APIs/index.js";
import { getErrorContent as getSolutionErrorContent } from "./API(Application Programming Interface)/REST APIs/solution.js";

function postForm(port, path, formData) {
  const body = new URLSearchParams(formData).toString();

  return new Promise((resolve, reject) => {
    const req = request(
      {
        host: "127.0.0.1",
        port,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let responseBody = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, body: responseBody });
        });
      }
    );

    req.on("error", reject);
    req.end(body);
  });
}

async function withServer(app, callback) {
  const server = app.listen(0);
  await once(server, "listening");

  try {
    const { port } = server.address();
    return await callback(port);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test("API authentication example does not contain committed Secrets API credentials", async () => {
  const source = await readFile(
    new URL("./API(Application Programming Interface)/API+Authentication/index.js", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(source, /bac77d6-d655-4f5e-883b-fc6bca90ce77/);
  assert.doesNotMatch(source, /158504fa-13bb-4091-abbf-2e3bce7d2e53/);
  assert.doesNotMatch(source, /const yourUsername = "hasan"/);
  assert.doesNotMatch(source, /const yourPassword = "hasan"/);
  assert.match(source, /process\.env\.SECRETS_API_/);
});

test("REST API examples render response-less Axios errors instead of throwing", () => {
  const networkError = new Error("connect ECONNREFUSED");
  const apiError = { response: { data: { error: "not found" } } };

  assert.equal(
    getIndexErrorContent(networkError),
    JSON.stringify({ error: "connect ECONNREFUSED" })
  );
  assert.equal(
    getSolutionErrorContent(networkError),
    JSON.stringify({ error: "connect ECONNREFUSED" })
  );
  assert.equal(getSolutionErrorContent(apiError), JSON.stringify({ error: "not found" }));
});

for (const [name, app] of [
  ["index", secretsIndexApp],
  ["solution", secretsSolutionApp],
]) {
  test(`Secrets Project ${name}.js rejects a bad password after a successful login`, async () => {
    await withServer(app, async (port) => {
      const allowed = await postForm(port, "/check", { password: "ILoveProgramming" });
      assert.equal(allowed.statusCode, 200);
      assert.match(allowed.body, /If you ever forget your WiFi password/);

      const rejected = await postForm(port, "/check", { password: "wrong-password" });
      assert.equal(rejected.statusCode, 200);
      assert.match(rejected.body, /<form action="\/check" method="POST">/);
      assert.doesNotMatch(rejected.body, /If you ever forget your WiFi password/);
    });
  });
}
