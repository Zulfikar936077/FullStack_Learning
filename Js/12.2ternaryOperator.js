/*
ternary operator = shortcut for an if/else statement
                Takes 3 operands
                A ? B : C
                A = a condition
                B = the code to execute if the condition is true
                C = the code to execute if the condition is false
                Works the same as an if/else statement*/

let age = 18;
let adult = age >= 18 ? "You are an adult" : "You are not an adult";
console.log(adult);
/* It is the same as:
if(age >= 18){
    adult = "You are an adult";
}
else{
    adult = "You are not an adult";
}
console.log(adult);*/
let time  = 16;
let greeting = time <12 ? "Good morning!" : "Good afternoon!";
console.log(greeting);

/*
if(time < 12){
    greeting = "Good morning!";
}
else{
    greeting = "Good afternoon!";
}
console.log(greeting);*/
let isStudent = true;
let message = isStudent ? "You are a student" : "You are not a student";
console.log(message);
/*
if(isStudent){
    message = "You are a student";
}
else{
    message = "You are not a student";
}
console.log(message);*/
let purchaseAmount = 100;
let discount = purchaseAmount >= 100 ? 0.1 : 0;
console.log(`You have to pay ${purchaseAmount - purchaseAmount * discount}`);