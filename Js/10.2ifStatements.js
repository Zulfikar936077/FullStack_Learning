/*
 if statements = if a condition is true, then do something
                 if a condition is false, then do something else
            */
//SIMPLE IF STATEMENT
let age = 13;

if(age >= 18){
    console.log("You are an adult");
}
else{
    console.log("You are not an adult");
}

//Boolean If Statement
let isStudent = true;
if(isStudent){
    console.log("You are a student"); //This will be executed if isStudent is true
}
else{
    console.log("You are not a student"); //This will be executed if isStudent is false
}

//Nested If Statements
let age2 = 18;
let hasLicense = true;
if(age2 >= 18){
    console.log("You are old enough to drive");
    if(hasLicense){
        console.log("You have a license");
    }
    else{
        console.log("You do not have a license");
    }
}
else{
    console.log("You are not old enough to drive");
}

//else if statements
const myText = document.getElementById("myText");
const myButton = document.getElementById("myButton");
const result = document.getElementById("result");
let score;
myButton.onclick = function() {
    score = myText.value;
    score = Number(score);
if(score >= 80){
    result.textContent = `You got an A+`;
}
else if(score >= 75){
    result.textContent = `You got an A`;
}
else if(score >= 70){
    result.textContent = `You got an A-`;
}
else if(score >= 65){
    result.textContent = `You got a B+`;
}
else if(score >= 60){
    result.textContent = `You got a B`;
}
else if(score >= 55){
    result.textContent = `You got a B-`;
}
else if(score >= 50){
    result.textContent = `You got a C+`;
}
else if(score >= 45){
    result.textContent = `You got a C`;
}
else if(score > 40){
    result.textContent = `You got a D+`;
}
else if(score == 40){
    result.textContent = `You got a D`; //== is used to to indicate the exact value
}
else{
    result.textContent = `You got a F`;
}
}

