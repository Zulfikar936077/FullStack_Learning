import express from "express"; //import express from express package

const app = express(); //create a new express application and the app object is my express application
const port = 3000; //7choose port = 3000 as the door number

function logger(req, res, next) {                   //define a middleware function called logger
  console.log(`Request method: ${req.method}`);     //the HTTP method of the request (GET, POST, PUT, DELETE, etc.)
  console.log(`Request URL: ${req.url}`);            //the URL of the request (/, /submit, /user/hasan, etc.)
  next();                                            //call the next middleware function in the chain
}
app.use(logger);                                    //use the logger middleware function for all requests

app.get("/", (req, res) => {                        //define a route handler for the root path
  res.send("Hello");                                //the route handler sends a response (ex. Hello) to the client
});

app.listen(port, () => {                            //listen on the port number
  console.log(`Listening on port ${port}`);           //log a message to the console when the server is running
});
