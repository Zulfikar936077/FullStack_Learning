import assert from "node:assert/strict";
import http from "node:http";
import { after, test } from "node:test";

process.env.NODE_ENV = "test";
delete process.env.SECRETS_API_BEARER_TOKEN;

const restModule = await import(
  "./API(Application Programming Interface)/REST APIs/solution.js"
);
const axios = (
  await import(
    "./API(Application Programming Interface)/REST APIs/node_modules/axios/index.js"
  )
).default;
const secretsModule = await import("./ExpressJS/3.5 Secrets Project/solution.js");

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function postForm(server, path, body) {
  const payload = new URLSearchParams(body).toString();
  const { port } = server.address();

  return new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: "127.0.0.1",
        method: "POST",
        path,
        port,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (response) => {
        let text = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          text += chunk;
        });
        response.on("end", () => {
          resolve({ statusCode: response.statusCode, text });
        });
      }
    );

    request.on("error", reject);
    request.end(payload);
  });
}

test("REST API solution does not build an auth header without an environment token", () => {
  assert.deepEqual(restModule.config, {});
});

test("REST API solution renders response-less Axios failures", async (t) => {
  const originalGet = axios.get;
  axios.get = async () => {
    throw new Error("socket hang up");
  };
  t.after(() => {
    axios.get = originalGet;
  });

  const server = await listen(restModule.app);
  t.after(() => close(server));

  const response = await postForm(server, "/get-secret", { id: "42" });

  assert.equal(response.statusCode, 200);
  assert.match(response.text, /socket hang up/);
});

test("Express secrets solution rejects a bad password after a successful login", async (t) => {
  const server = await listen(secretsModule.app);
  t.after(() => close(server));

  const success = await postForm(server, "/check", {
    password: "ILoveProgramming",
  });
  assert.equal(success.statusCode, 200);
  assert.match(success.text, /When making chocolate desserts/);

  const failure = await postForm(server, "/check", { password: "wrong" });
  assert.equal(failure.statusCode, 200);
  assert.doesNotMatch(failure.text, /When making chocolate desserts/);
  assert.match(failure.text, /<form action="\/check" method="POST">/);
});

after(() => {
  process.env.NODE_ENV = "";
});
