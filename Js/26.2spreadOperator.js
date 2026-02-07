// Spread Operator = ...
// Allows an iterable such as an array or string to be expanded into sperate elements

//Example 1:
let number =[1,2,3,4,5,6,7,8,9,10];
let maximum = Math.max(...number); //... is the spread operator to only show the maximum number in the array
console.log(maximum);
let minimum = Math.min(...number);
console.log(minimum);

//Example 2:
let userName = "Hasan";
let letter = [...userName];
console.log(letter);
//if I have to place "-" between each letter, I can do this:
let newLetter = [...userName].join("-");
console.log(newLetter);

//Example 3: (Combine two arrays)
let fruits = ["apple", "banana", "cherry"];
let vegetables = ["carrot", "potato", "onion"];

let food = [...fruits, ...vegetables, "orange", "pineapple"]; //beside the two arrays, I can add more items to the new array
console.log(food);