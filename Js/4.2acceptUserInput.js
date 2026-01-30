/*
How to accept user input in JavaScript?
 1. Easy way using window.prompt()
 2. Professional way using HTML5 form validation
 */
 
 //Easy way using window.prompt()

//let username = window.prompt("Enter your username:");
//console.log(username);

//Professional way using HTML5 form validation
let username;
document.getElementById("mySubmit").onclick = function() { 
    username = document.getElementById("myText").value;
    //console.log(username); //this will show the username in the console
    document.getElementById("myH1").textContent = `Hello ${username}`;

}
