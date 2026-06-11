import assert from "node:assert/strict";
import test from "node:test";

process.env.NODE_ENV = "test";

const { isPasswordAuthorised } = await import("./solution.js");

test("authorisation is calculated per submitted password", () => {
  assert.equal(isPasswordAuthorised("ILoveProgramming"), true);
  assert.equal(isPasswordAuthorised("wrong-password"), false);
});
