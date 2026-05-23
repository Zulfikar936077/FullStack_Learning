import { after, test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

process.env.NODE_ENV = "test";

let mockApiClosed = false;

const listen = (server) =>
  new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server.address()));
  });

const close = (server) =>
  new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

const mockApi = http.createServer((req, res) => {
  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        method: req.method,
        path: req.url,
        body: Buffer.concat(chunks).toString(),
      })
    );
  });
});

const mockAddress = await listen(mockApi);
process.env.SECRETS_API_URL = `http://${mockAddress.address}:${mockAddress.port}`;

const { default: app } = await import("../index.js");
const appServer = http.createServer(app);
const appAddress = await listen(appServer);
const appUrl = `http://${appAddress.address}:${appAddress.port}`;

after(async () => {
  await close(appServer);
  if (!mockApiClosed) {
    await close(mockApi);
  }
});

const postForm = async (path, values = {}) => {
  const response = await fetch(`${appUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(values).toString(),
    signal: AbortSignal.timeout(1000),
  });

  assert.equal(response.status, 200);
  return response.text();
};

test("all form routes complete with rendered API responses", async () => {
  const cases = [
    ["/get-secret", "GET", "/secrets/123"],
    ["/post-secret", "POST", "/secrets"],
    ["/put-secret", "PUT", "/secrets/123"],
    ["/patch-secret", "PATCH", "/secrets/123"],
    ["/delete-secret", "DELETE", "/secrets/123"],
  ];

  for (const [route, method, apiPath] of cases) {
    const html = await postForm(route, {
      id: "123",
      secret: "test secret",
      score: "7",
    });

    assert.match(html, new RegExp(method));
    assert.match(html, new RegExp(apiPath.replace("/", "\\/")));
  }
});

test("network errors render instead of throwing from the catch block", async () => {
  await close(mockApi);
  mockApiClosed = true;

  const html = await postForm("/get-secret", { id: "123" });
  assert.match(html, /ECONNREFUSED|socket hang up|fetch failed|Request failed/);
});
