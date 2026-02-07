let randomNum = Math.random(); //Math.random () will create a random number between 0 and 1
console.log(randomNum);

//Now, if I want a random number between 1 to 5
//Here, 5 is the max value and 1 is the min value
let randomNum2 = Math.random() * 5 + 1; //+1 is to make the random number between 1 and 5
console.log(randomNum2);

//Now, if I want the random number to be an integer, I can use Math.floor()
let randomNum3 = Math.floor(Math.random() * 5 + 1);
console.log(randomNum3);

//Now, if I want a random number between a certain range of 50 to 100
let min = 50;
let max = 100;

// Formula breakdown: Math.floor(Math.random() * (max - min + 1) + min)
// Step 1: Math.random() gives a number between 0 (inclusive) and 1 (exclusive)
//         Example: 0.0, 0.123, 0.456, 0.789, 0.999... (but never exactly 1.0)
//
// Step 2: (max - min + 1) calculates the total number of possible integers
//         Example: (100 - 50 + 1) = 51 possible numbers (50, 51, 52, ..., 100)
//
// Step 3: Math.random() * (max - min + 1) scales the random number
//         Example: 0.0 * 51 = 0.0
//                  0.5 * 51 = 25.5
//                  0.999 * 51 = 50.949 (but never exactly 51.0)
//         This gives us a range from 0.0 (inclusive) to 51.0 (exclusive)
//
// Step 4: + min shifts the range to start from min instead of 0
//         Example: 0.0 + 50 = 50.0
//                  25.5 + 50 = 75.5
//                  50.949 + 50 = 100.949
//         This gives us a range from 50.0 (inclusive) to 101.0 (exclusive)
//
// Step 5: Math.floor() rounds DOWN to the nearest integer
//         Example: Math.floor(50.0) = 50
//                  Math.floor(75.5) = 75
//                  Math.floor(100.949) = 100
//         Final result: integers from 50 to 100 (both inclusive!)

let randomNum4 = Math.floor(Math.random() * (max - min + 1) + min);
console.log(randomNum4);


// ===== INTERACTIVE RANDOM NUMBER GENERATOR =====
// This code creates a button that generates a random number when clicked

// Step 1: Get references to HTML elements
// document.getElementById() finds elements in the HTML by their ID attribute
const myButton = document.getElementById("myButton");  // Gets the button element (id="myButton")
const myLabel = document.getElementById("myLabel");    // Gets the label element (id="myLabel")

// Step 2: Define the range for random numbers
const min2  = 50;  // Minimum value (inclusive)
const max2 = 100;  // Maximum value (inclusive)

// Step 3: Add a click event listener to the button
// When the button is clicked, this function will run
myButton.onclick = function() {
    // Generate a random integer between min2 and max2 (50 to 100)
    const randomNum5 = Math.floor(Math.random() * (max2 - min2 + 1) + min2);
    
    // Display the random number in the label element
    // textContent sets the text that appears inside the label
    myLabel.textContent = randomNum5;
}
// ================================================