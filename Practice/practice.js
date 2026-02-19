/*
var guestList = ["Angela", "Jack", "Pam", "James", "Lara", "Jason"];

var guestName = prompt("Please enter your name:");

if(guestList.includes(guestName)){
  alert("Welcome to the party!");
}else {
  alert("Sorry, maybe next time.");
}
*/

/*
var input = prompt("Please enter a number between 1 and 100:");

if(input % 3 === 0 && input % 5 === 0){
  alert("FizzBuzz");
}else if(input % 5 === 0){
  alert("Buzz");
}else if(input % 3 === 0){
  alert("Fizz");
}else {
  alert("Not divisible by 3 or 5");
}
*/


/*
var output = [];
var count = 1;

function fizzBuzz() {
  if (count % 3 === 0 && count % 5 === 0) {
    output.push("FizzBuzz");
  } else if (count % 5 === 0) {
    output.push("Buzz");
  } else if (count % 3 === 0) {
    output.push("Fizz");
  } else {
    output.push(count);
  }
  count++;
  console.log(output);
}

// Call it 100 times in one run
for (var i = 0; i < 100; i++) {
  fizzBuzz();
}
*/

var names = ["Angela", "Ben", "Jenny", "Michael", "Chole"];
function whosPaying(names) {
  var randomIndex = Math.floor(Math.random() * names.length);
  var selectedPerson = names[randomIndex];
  return selectedPerson + " is going to buy lunch today.";
}

var output = [];
var count = 1;

function fizzBuzz() {
  if (count % 3 === 0 && count % 5 === 0) {
    output.push("FizzBuzz");
  } else if (count % 5 === 0) {
    output.push("Buzz");
  } else if (count % 3 === 0) {
    output.push("Fizz");
  } else {
    output.push(count);
  }
  count++;
  console.log(output);
}

// Call it 100 times in one run
for (var i = 0; i < 100; i++) {
  fizzBuzz();
}

