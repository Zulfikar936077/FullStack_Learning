import express from "express"; //import function express from express package
const app = express(); //create a new express application
const port = 3000; //define the port number

app.get("/", (req, res) => { //Here, / is the root and req is the request and res is the response
  res.send("Hello World");  //send is a function that will send the response to the client
}); 

app.listen(port, () => {       //now the app listens on the port number
    console.log(`Server is running on port ${port}`); // this is a callback function that will be triggered when the server is set up
});                                                                          