import assert from "node:assert/strict";
import http from "node:http";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { app as secretsApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { formatAxiosErrorContent } from "./API(Application Programming Interface)/REST APIs/solution.js";

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

function request(server, method, path, body = "") {
  const { port } = server.address();
  const payload = Buffer.from(body);

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        method,
        path,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": payload.length,
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      }
    );

    req.on("error", reject);
    req.end(payload);
  });
}

test("Secrets solution does not authorize a bad password after a valid login", async () => {
  const server = await listen(secretsApp);

  try {
    const authorized = await request(
      server,
      "POST",
      "/check",
      "password=ILoveProgramming"
    );
    assert.equal(authorized.statusCode, 200);
    assert.match(authorized.body, /When making chocolate desserts/);

    const rejected = await request(server, "POST", "/check", "password=wrong");
    assert.equal(rejected.statusCode, 200);
    assert.doesNotMatch(rejected.body, /When making chocolate desserts/);
    assert.match(rejected.body, /<form action="\/check" method="POST">/);
  } finally {
    await close(server);
  }
});

test("REST API solution handles Axios errors without a response", () => {
  assert.equal(
    formatAxiosErrorContent(new Error("connect ECONNREFUSED")),
    JSON.stringify({ error: "connect ECONNREFUSED" })
  );

  assert.equal(
    formatAxiosErrorContent({ response: { data: { message: "Not found" } } }),
    JSON.stringify({ message: "Not found" })
  );
});

test("Secrets API examples do not commit credential literals", async () => {
  const files = [
    "./API(Application Programming Interface)/API+Authentication/index.js",
    "./API(Application Programming Interface)/REST APIs/solution.js",
  ];
  const credentialLiteral = /"[-0-9a-f]{20,}"/i;

  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");
    assert.doesNotMatch(source, credentialLiteral, file);
  }
});
