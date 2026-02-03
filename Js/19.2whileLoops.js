/*While loops = repeat some code while a condition is true*/

// Initialize userName as empty string so the while condition is true and the loop runs at least once
//let userName = "";

// Keep running while userName is exactly "" (empty string).
// === checks both value and type (strict equality).
// When the user enters a name, userName is no longer "", so the condition becomes false and the loop exits.
//while(userName === ""){
    // Show a dialog asking for the name; whatever the user types is stored in userName
    //userName = window.prompt("Enter your name:");
//}

// After the loop exits, greet the user. Template literal `${userName}` inserts the variable value into the string.
//console.log(`Hello ${userName}`);

// Example 2: Same idea, but also handle when the user clicks "Cancel" on the prompt.
// window.prompt() returns null if the user cancels, and "" if they submit with nothing typed.0
//let userName2 = "";

// Keep looping while userName2 is empty OR null.
// || = logical OR (condition is true if either side is true).
// So we keep asking until the user enters at least one character (then we get a non-empty string, not "" or null).
//while(userName2 === "" || userName2 === null){
    //userName2 = window.prompt("Enter your name:");
//}

// Once we have a non-empty, non-null value, exit the loop and greet the user.
//console.log(`Hello ${userName2}`);

// Example 3: do-while loop — same behavior as Example 2, different structure.
// do-while runs the body first, then checks the condition. So the prompt always shows at least once.
/*let userName3 = "";

do{
    // Run this first: show the prompt and store the result in userName3
    userName3 = window.prompt("Enter your name:");
// Then check: if userName3 is "" or null, run the block again. Otherwise exit.
}while(userName3 === "" || userName3 === null);

console.log(`Hello ${userName3}`);*/

// Example 4: Simple login loop — keep asking until correct credentials.
/*let loggedIn = false;
let userName4;
let password;
while(!loggedIn){
    userName4 = window.prompt("Enter your username:");
    password = window.prompt("Enter your password:");
    // If user clicks Cancel on either prompt, we get null — exit the loop instead of saying "Invalid"
    if(userName4 === "hasan" && password === "1234"){
        loggedIn = true;
        console.log("Welcome to the system");
    }
    else{
        console.log("Invalid username or password");
    }
}*/

// Example 5: do-while version of the login loop.
// Difference from Example 4 (while): do-while runs the body at least once, then checks the condition.
// So the prompts always appear first; only after that do we check !loggedIn5 to see if we repeat.
let userName5;
let password5;
let loggedIn5 = false;
do{
    userName5 = window.prompt("Enter your username:");
    password5 = window.prompt("Enter your password:");
    if(userName5 === null || password5 === null){
        console.log("Login cancelled");
        break;
    }
    if(userName5.trim() === "hasan" && password5.trim() === "1234"){
        loggedIn5 = true;
        console.log("Welcome to the system");
    }
    else{
        console.log("Invalid username or password");
    }
}while(!loggedIn5);
    
  






