import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import http from "node:http";
import test from "node:test";
import axios from "./API(Application Programming Interface)/REST APIs/node_modules/axios/index.js";
import restStarterApp from "./API(Application Programming Interface)/REST APIs/index.js";
import restSolutionApp from "./API(Application Programming Interface)/REST APIs/solution.js";
import secretsStarterApp from "./ExpressJS/3.5 Secrets Project/index.js";
import secretsSolutionApp from "./ExpressJS/3.5 Secrets Project/solution.js";

function request(app, { method = "GET", path = "/", body = {} } = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      const payload = new URLSearchParams(body).toString();
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path,
          method,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(payload),
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
        server.close(() => reject(error));
      });
      req.end(payload);
    });
  });
}

test("Secrets Project authorization is scoped to each submitted password", async () => {
  for (const app of [secretsStarterApp, secretsSolutionApp]) {
    const authorized = await request(app, {
      method: "POST",
      path: "/check",
      body: { password: "ILoveProgramming" },
    });
    assert.equal(authorized.statusCode, 200);
    assert.match(authorized.body, /When making chocolate desserts/);

    const denied = await request(app, {
      method: "POST",
      path: "/check",
      body: { password: "wrong-password" },
    });
    assert.equal(denied.statusCode, 200);
    assert.doesNotMatch(denied.body, /When making chocolate desserts/);
    assert.match(denied.body, /<form action="\/check" method="POST">/);
  }
});

test("REST API routes render response-less Axios failures", async () => {
  const originalGet = axios.get;
  axios.get = async () => {
    throw new Error("network down");
  };

  try {
    for (const app of [restStarterApp, restSolutionApp]) {
      const response = await request(app, {
        method: "POST",
        path: "/get-secret",
        body: { id: "42" },
      });
      assert.equal(response.statusCode, 200);
      assert.match(response.body, /network down/);
    }
  } finally {
    axios.get = originalGet;
  }
});

test("Secrets API example files do not contain committed credentials", async () => {
  const files = [
    new URL(
      "./API(Application Programming Interface)/API+Authentication/index.js",
      import.meta.url
    ),
    new URL(
      "./API(Application Programming Interface)/REST APIs/solution.js",
      import.meta.url
    ),
  ];

  const exposedCredentialPattern =
    /hasan|bac77d6-d655-4f5e-883b-fc6bca90ce77|158504fa-13bb-4091-abbf-2e3bce7d2e53|08f3026d-9c6c-4d88-a3b2-c579dc106247/;

  for (const file of files) {
    const source = await readFile(file, "utf8");
    assert.doesNotMatch(source, exposedCredentialPattern);
  }
});
