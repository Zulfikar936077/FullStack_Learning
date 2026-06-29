import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";

import axios from "./API(Application Programming Interface)/REST APIs/node_modules/axios/index.js";
import {
  app as restStarterApp,
  formatAxiosError as formatStarterAxiosError,
} from "./API(Application Programming Interface)/REST APIs/index.js";
import {
  app as restSolutionApp,
  formatAxiosError as formatSolutionAxiosError,
} from "./API(Application Programming Interface)/REST APIs/solution.js";
import { app as secretsStarterApp } from "./ExpressJS/3.5 Secrets Project/index.js";
import { app as secretsSolutionApp } from "./ExpressJS/3.5 Secrets Project/solution.js";

async function withServer(app, run) {
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await run(baseUrl);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

async function postForm(url, fields) {
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields),
  });
}

async function assertWrongPasswordDoesNotInheritPriorSuccess(app) {
  await withServer(app, async (baseUrl) => {
    const successfulResponse = await postForm(`${baseUrl}/check`, {
      password: "ILoveProgramming",
    });
    const successfulBody = await successfulResponse.text();
    assert.match(successfulBody, /When making chocolate desserts/);

    const rejectedResponse = await postForm(`${baseUrl}/check`, {
      password: "wrong-password",
    });
    const rejectedBody = await rejectedResponse.text();

    assert.doesNotMatch(rejectedBody, /When making chocolate desserts/);
    assert.match(rejectedBody, /Password:/);
  });
}

function assertFormatsResponseLessAxiosErrors(formatAxiosError) {
  assert.deepEqual(formatAxiosError(new Error("network down")), {
    error: "network down",
  });
  assert.deepEqual(formatAxiosError({ response: { data: { error: "denied" } } }), {
    error: "denied",
  });
}

async function assertRouteRendersResponseLessAxiosErrors(app) {
  const originalGet = axios.get;
  const originalRender = app.response.render;

  axios.get = async () => {
    throw new Error("network down");
  };
  app.response.render = function renderForTest(_view, options) {
    this.type("application/json").send(options.content);
  };

  try {
    await withServer(app, async (baseUrl) => {
      const response = await postForm(`${baseUrl}/get-secret`, { id: "42" });
      const body = await response.text();

      assert.equal(response.status, 200);
      assert.equal(body, '{"error":"network down"}');
    });
  } finally {
    axios.get = originalGet;
    app.response.render = originalRender;
  }
}

test("secrets starter uses request-scoped password authorization", async () => {
  await assertWrongPasswordDoesNotInheritPriorSuccess(secretsStarterApp);
});

test("secrets solution uses request-scoped password authorization", async () => {
  await assertWrongPasswordDoesNotInheritPriorSuccess(secretsSolutionApp);
});

test("REST starter formats response-less Axios errors", async () => {
  assertFormatsResponseLessAxiosErrors(formatStarterAxiosError);
  await assertRouteRendersResponseLessAxiosErrors(restStarterApp);
});

test("REST solution formats response-less Axios errors", async () => {
  assertFormatsResponseLessAxiosErrors(formatSolutionAxiosError);
  await assertRouteRendersResponseLessAxiosErrors(restSolutionApp);
});
