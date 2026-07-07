import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

export function isAuthorizedPassword(password) {
  return password === "ILoveProgramming";
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (isAuthorizedPassword(req.body["password"])) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    //Alternatively res.redirect("/");
  }
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
