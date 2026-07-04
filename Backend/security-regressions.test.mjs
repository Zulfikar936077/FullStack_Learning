import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const readSource = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("Secrets API credentials are not committed as non-empty literals", () => {
  const apiAuthIndex = readSource(
    "./API(Application Programming Interface)/API+Authentication/index.js"
  );
  const restSolution = readSource(
    "./API(Application Programming Interface)/REST APIs/solution.js"
  );

  assert.doesNotMatch(
    apiAuthIndex,
    /const your(?:Username|Password|APIKey|BearerToken) = "(?!")/
  );
  assert.match(apiAuthIndex, /process\.env\.SECRETS_API_/);
  assert.doesNotMatch(restSolution, /const yourBearerToken = "(?!")/);
});

test("Secrets Project authorization is request scoped", () => {
  for (const path of [
    "./ExpressJS/3.5 Secrets Project/index.js",
    "./ExpressJS/3.5 Secrets Project/solution.js",
  ]) {
    const source = readSource(path);

    assert.doesNotMatch(source, /\b(?:var|let|const)\s+userIsAuthorised\b/);
    assert.match(
      source,
      /res\.locals\.userIsAuthorised = password === "ILoveProgramming"/
    );
    assert.match(source, /if \(res\.locals\.userIsAuthorised\)/);
  }
});

test("REST API examples handle response-less Axios failures", () => {
  const unsafeAxiosErrorAccess = new RegExp(String.raw`error\.response\.data`);

  for (const path of [
    "./API(Application Programming Interface)/REST APIs/index.js",
    "./API(Application Programming Interface)/REST APIs/solution.js",
  ]) {
    const source = readSource(path);

    assert.doesNotMatch(source, unsafeAxiosErrorAccess);
    assert.match(source, /error\.response\?\.data \?\? \{ error: error\.message \}/);
  }
});
