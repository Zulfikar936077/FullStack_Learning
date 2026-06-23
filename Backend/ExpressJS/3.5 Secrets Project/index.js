//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
const secretPassword = process.env.SECRETS_PROJECT_PASSWORD || "ILoveProgramming";

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  res.locals.userIsAuthorised = password === secretPassword;
  next();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", passwordCheck, (req, res) => {
  if (res.locals.userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

if (process.argv[1] === __filename) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

export { app, passwordCheck };