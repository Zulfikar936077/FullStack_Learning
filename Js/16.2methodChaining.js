/*method chaining = calling multiple methods sequentially*/


//No method chaining
let userName = window.prompt("Enter your username:");
userName = userName.trim()
let firstChar = userName.charAt(0);
firstChar = firstChar.toUpperCase();

let restChar = userName.slice(1);
restChar = restChar.toLowerCase();

userName = firstChar + restChar;
//console.log(userName);

//Method chaining
//Method chaining is way to bypass so many codes of no method chaining
// (first char uppercased) + (rest of name lowercased)
userName = userName.trim().charAt(0).toUpperCase() + userName.trim().slice(1).toLowerCase();
console.log(userName);