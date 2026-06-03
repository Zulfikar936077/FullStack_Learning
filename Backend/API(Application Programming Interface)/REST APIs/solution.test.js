import assert from "node:assert/strict";
import http from "node:http";
import { after, test } from "node:test";

const failingUpstream = http.createServer((req, res) => {
  req.socket.destroy();
});

await new Promise((resolve) => {
  failingUpstream.listen(0, "127.0.0.1", resolve);
});

const upstreamAddress = failingUpstream.address();
process.env.SECRETS_API_URL = `http://127.0.0.1:${upstreamAddress.port}`;

const { app, getErrorContent } = await import("./solution.js");

after(() => {
  failingUpstream.close();
});

test("getErrorContent handles axios errors without a response", () => {
  assert.equal(
    getErrorContent({ message: "socket hang up" }),
    JSON.stringify({ error: "socket hang up" })
  );
});

test("get-secret renders network errors instead of throwing", async (t) => {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => {
    server.once("listening", resolve);
  });
  t.after(() => {
    server.close();
  });

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/get-secret`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "id=1",
  });
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /socket hang up/);
});
