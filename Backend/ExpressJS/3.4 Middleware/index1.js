import express from "express";
import bodyParser from "body-parser"; //body parser is a middleware that parses the body of the request
import { dirname } from "path"; //needed for middleware to work
import { fileURLToPath } from "url"; //needed for middleware to work
const __dirname = dirname(fileURLToPath(import.meta.url)); //needed for middleware to work

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true})); //for body parser to work, we need to use the bodyParser middleware

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); //needed for the middleware to work
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
