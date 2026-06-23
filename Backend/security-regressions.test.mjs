import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";

import { app as secretsIndexApp } from "./ExpressJS/3.5 Secrets Project/index.js";
import { app as secretsSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";
import { getErrorContent as getIndexErrorContent } from "./API(Application Programming Interface)/REST APIs/index.js";
import { getErrorContent as getSolutionErrorContent } from "./API(Application Programming Interface)/REST APIs/solution.js";

const secretPage = await readFile(
  new URL("./ExpressJS/3.5 Secrets Project/public/secret.html", import.meta.url),
  "utf8"
);

async function withServer(app, callback) {
  const server = app.listen(0);
  await once(server, "listening");

  try {
    const { port } = server.address();
    await callback(`http://127.0.0.1:${port}`);
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

async function postForm(url, fields) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields),
  });
}

for (const [name, app] of [
  ["index", secretsIndexApp],
  ["solution", secretsSolutionApp],
]) {
  test(`Secrets Project ${name} keeps authorization scoped to /check requests`, async () => {
    await withServer(app, async (baseUrl) => {
      await postForm(`${baseUrl}/`, { password: "ILoveProgramming" });

      const unauthorizedResponse = await postForm(`${baseUrl}/check`, {
        password: "",
      });
      const unauthorizedBody = await unauthorizedResponse.text();

      assert.equal(unauthorizedResponse.status, 200);
      assert.doesNotMatch(unauthorizedBody, /chocolate desserts/);
      assert.notEqual(unauthorizedBody, secretPage);

      const authorizedResponse = await postForm(`${baseUrl}/check`, {
        password: "ILoveProgramming",
      });
      const authorizedBody = await authorizedResponse.text();

      assert.equal(authorizedResponse.status, 200);
      assert.match(authorizedBody, /chocolate desserts/);
    });
  });
}

for (const [name, getErrorContent] of [
  ["index", getIndexErrorContent],
  ["solution", getSolutionErrorContent],
]) {
  test(`REST APIs ${name} formats response-less Axios errors safely`, () => {
    const errorContent = getErrorContent(new Error("network down"));

    assert.equal(errorContent, JSON.stringify({ error: "network down" }));
  });

  test(`REST APIs ${name} preserves upstream response payloads`, () => {
    const upstreamPayload = { message: "not found" };
    const errorContent = getErrorContent({ response: { data: upstreamPayload } });

    assert.equal(errorContent, JSON.stringify(upstreamPayload));
  });
}
