//Function = a section of reusable code that can be called anywhere in your program

//Example 1
function suggestion(userName, pageCount){
    console.log("Read and Forget");
    console.log("Read and Forget");
    console.log("But never forget to read");
    console.log(`${userName} has to read ${pageCount} pages`);
}
suggestion("Hasan", 700);

// Example 2: function that takes two numbers, adds them, and returns the sum
//function add(x, y){       // x and y are parameters — values passed in when we call add(...)
 //   let result = x + y;   // compute sum
 //   return result;        // send the value back to the caller
//}
//let result = add(5, 3);  // call add with 5 and 3; returned value (8) is stored in result
//console.log(result);     // prints 8

//Other way to o it
//function add(x, y){
  //  let result = x + y;
  //  return result;
//}
//console.log(add(5, 3));

//Other way to do the same thing
function add(x, y){
    return x + y;
}
console.log(add(5, 3));

//Example 3
function subtract(x, y){
    return x - y;
}
console.log(subtract(5, 3));
//Example 4
function multiply(x, y){
    return x * y;
}
console.log(multiply(5, 3));
//Example 5
function divide(x, y){
    return x / y;
}
console.log(divide(5, 3));

//Example 6
function isEven(number){
    if(number % 2 === 0){
        return true;
    }
    else{
        return false;
    }
}
console.log(isEven(7));

//other way to do the same thing
function isOdd(number){
    return number % 2 !== 0 ? true : false; //ternary operator
}
console.log(isOdd(7));

//Example 7
function isValidEmail(email){
    if(email.includes("@")){
        return true;
    }
    else{
        return false;
    }   
}
console.log(isValidEmail("test@example.com"));

//other way
function isValidEmail(email){
    return email.includes("@") ? true : false; //ternary operator
}
console.log(isValidEmail("test@example.com"));

