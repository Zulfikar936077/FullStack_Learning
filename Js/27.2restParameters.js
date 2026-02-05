// ========== REST PARAMETERS ==========
// Rest parameters = (...rest) in function parameters
// Does the opposite of the spread operator:
//   - Spread operator = splits array/iterable into separate elements
//   - Rest parameters = merge a list of arguments into a single array

// ---------- Example 1: openFriedge ----------
// (...food) = rest parameter: collects all arguments into one array "food"
// console.log(...food) = spread: turns array back into separate arguments for logging

function openFriedge(...food) {
    console.log(...food); // e.g. openFriedge(a,b,c) → food is [a,b,c], logs a b c
}

// ---------- getFood: same rest, but RETURN so we can reuse the array ----------
// return food = sends the array back to the caller (so we can store it in a variable)

function getFood(...food) {
    return food;
}

const food1 = "pizza";
const food2 = "burger";
const food3 = "pasta";
let food4 = "soda";

// openFriedge(food1, food2, food3, food4); // would log: pizza burger pasta soda

// ---------- Example 2: Reusing the returned value ----------
// getFood(...) returns the array ["pizza", "burger", "pasta", "soda"]
// We store it in "food", then spread it again for console.log

const food = getFood(food1, food2, food3, food4); // food = ["pizza", "burger", "pasta", "soda"]
console.log(...food); // spread: logs pizza burger pasta soda (as separate arguments)

// Example 3: sum any amount of numbers using rest + for...of
function add(...numbers){        // rest: (1,2,3,4,5) → numbers = [1,2,3,4,5]
    let total = 0;              // running sum, starts at 0
    for(let number of numbers){ // loop through each value: 1, then 2, then 3, 4, 5
        total += number;        // add current number to total (total = total + number)
    }
    return total;                // after all 5 numbers: 0+1+2+3+4+5 = 15, return it
}
console.log(add(1, 2, 3, 4, 5)); // calls add, gets 15 back, logs 15

// Example 4: average of the numbers
function average(...numbers){
    return add(...numbers) / numbers.length;
}
console.log(average(1, 2, 3, 4, 5));

//Example 5: Joining strings with rest
function fullName(...names){
    return names.join( " " );
}
const strings = fullName("Mr.", "Zulfikar", "Ali");
console.log(strings);
