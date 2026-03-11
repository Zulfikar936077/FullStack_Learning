import express from "express";
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  //console.log(req.rawHeaders); //To see the raw headers of the request
  res.send("<h1>Hello World!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is Hasan</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Me</h1><p>Phone: +44123456789</p>");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
