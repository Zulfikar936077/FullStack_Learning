const fs = require("fs"); //fs is the short form of file system

//got to File System of Nodejs documentation
//select fs.writeFile(file, data[, options], callback)
//copy the code portion starting with  (err) => {
//} and paste it in the index.js file
//replace the file name with message.txt
//replace the data with Hello from nodejs
//replace the callback with (err) => {
//    if (err) throw no error, then it will show the file has been saved!;
//    console.log('The file has been saved!');
//}

//run the code by typing node index.js in the terminal
//you can see the Hello from nodejs in the message.txt file


//now we want to read the message.txt file
//got to File System of Nodejs documentation
//select fs.readFile(file[, options], callback)
//copy the code portion starting with  (err) => {
//} and paste it in the index.js file
//replace the file name with message.txt
//replace the callback with (err) => {
//    if (err) throw no error, then it will show the file has been read!;
//    console.log('The file has been read!');
//}

fs.writeFile("message.txt", "Hello from Hasan\nHello from Soha", (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
   
    fs.readFile("./message.txt", "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
});



//run the code by typing node index.js in the terminal
//you can see the Hello from nodejs in the message.txt file


//now we want to read the message.txt file
//got to File System of Nodejs documentation
//select fs.readFile(file[, options], callback)
//copy the code portion starting with  (err) => {
//} and paste it in the index.js file
//replace the file name with message.txt
//replace the callback with (err) => {
//    if (err) throw no error, then it will show the file has been read!;
//    console.log('The file has been read!');
//}


