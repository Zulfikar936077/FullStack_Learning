/**
 * Regression: Cancel on the guess prompt must exit, not infinite-loop.
 * Number(null) === 0, so Cancel must be detected before Number() conversion.
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(__dirname, "21.2numberGuessing_Project.js"), "utf8");

function runGame({ prompts }) {
  let promptIndex = 0;
  const alerts = [];
  const context = {
    Math,
    console: { log() {} },
    window: {
      prompt() {
        if (promptIndex >= prompts.length) {
          throw new Error("prompt called more times than expected (possible infinite loop)");
        }
        return prompts[promptIndex++];
      },
      alert(msg) {
        alerts.push(String(msg));
      },
    },
  };
  vm.createContext(context);
  // Hard timeout guard in case the infinite loop regresses
  const script = new vm.Script(source, { filename: "21.2numberGuessing_Project.js" });
  script.runInContext(context, { timeout: 1000 });
  return { promptCalls: promptIndex, alerts };
}

// Cancel immediately — must exit after one prompt, no alerts
{
  const { promptCalls, alerts } = runGame({ prompts: [null] });
  if (promptCalls !== 1) {
    throw new Error(`expected 1 prompt on Cancel, got ${promptCalls}`);
  }
  if (alerts.length !== 0) {
    throw new Error(`expected no alerts on Cancel, got ${JSON.stringify(alerts)}`);
  }
}

// Cancel after an invalid-range attempt — must not loop forever
{
  const { promptCalls } = runGame({ prompts: ["1", null] });
  if (promptCalls !== 2) {
    throw new Error(`expected 2 prompts (out-of-range then Cancel), got ${promptCalls}`);
  }
}

console.log("ok: Cancel exits number guessing game without infinite loop");
// Keep import side-effect free for tooling that resolves this file URL
void pathToFileURL;
