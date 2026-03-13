import express from "express"; //import express from express package
import bodyParser from "body-parser"; //bodyParser is used because the input is a Form Data
import { dirname } from "path"; //must be used with bodyParser to work
import { fileURLToPath } from "url"; //must be used with bodyParser to work

const __dirname = dirname(fileURLToPath(import.meta.url)); //must be used with bodyParser to work

const app = express(); //create a new express application and the app object is my express application
const port = 3000;
var bandName = ""; //define a variable to store the band name

app.use(bodyParser.urlencoded({ extended: true })); //bodyParser middleware is used to parse the form data

function bandNameGenerator(req, res, next) {    //the function is used as I am using customized middleware to get the result in my required format
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator); //customized middleware is used to get the result in my required format

app.get("/", (req, res) => {     
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {  
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
