import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import app from "./solution.js";

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });

  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
});

async function submitPassword(password) {
  const response = await fetch(`${baseUrl}/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ password }),
  });

  assert.equal(response.status, 200);
  return response.text();
}

test("wrong password is rejected after a previous successful request", async () => {
  const secretPage = await submitPassword("ILoveProgramming");
  assert.match(secretPage, /When making chocolate desserts/);

  const rejectedPage = await submitPassword("wrong-password");
  assert.match(rejectedPage, /<form action="\/check" method="POST">/);
  assert.doesNotMatch(rejectedPage, /When making chocolate desserts/);
});
