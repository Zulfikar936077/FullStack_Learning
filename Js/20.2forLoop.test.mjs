import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "20.2forLoop.js",
);

const result = spawnSync(process.execPath, [scriptPath], {
  encoding: "utf8",
  timeout: 2000,
});

assert.equal(
  result.error,
  undefined,
  `for-loop script failed to finish: ${result.error?.message ?? "unknown error"}`,
);
assert.equal(result.status, 0, `expected exit 0, got ${result.status}\n${result.stderr}`);

const lines = result.stdout
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const expected = [];
for (let k = 0; k <= 3; k++) expected.push(String(k));
for (let j = 10; j >= 0; j -= 2) expected.push(String(j));
expected.push("Happy New Year!");
for (let k = 1; k <= 20; k++) {
  if (k !== 13) expected.push(String(k));
}

assert.deepEqual(lines, expected);
console.log("20.2forLoop.test.mjs passed");
