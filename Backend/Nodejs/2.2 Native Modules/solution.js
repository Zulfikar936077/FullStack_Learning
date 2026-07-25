const fs = require("fs");

fs.writeFile("message.txt", "Hello Node", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");

  // Read only after write completes; parallel read races and can throw ENOENT.
  fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});
