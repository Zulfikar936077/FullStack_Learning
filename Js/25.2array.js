//array = a special variable that can hold multiple values
let fruits = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(fruits);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);
console.log(fruits[4]);

//To change the value of an array, we can use the index number
fruits[0] = "pineapple";
console.log(fruits);

//to add an element to the end of the array
fruits.push("grape");
console.log(fruits);

//to add an element to the beginning of the array
fruits.unshift("mango");
console.log(fruits);


//to remove the last element of the array
fruits.pop();
console.log(fruits);

//to remove the first element of the array
fruits.shift();
console.log(fruits);

//to count the number of elements in the array
let numOfFruits = fruits.length;
console.log(numOfFruits);

//to find the index of an element in the array
let indexOfFruits = fruits.indexOf("cherry");
console.log(indexOfFruits);

//if we try to find an element that does not exist in the array, it will return -1
let indexOfFruits2 = fruits.indexOf("watermelon");
console.log(indexOfFruits2);


//using for loop to iterate through the array
for(let i =0; i<fruits.length; i+=2){
    console.log(fruits[i]);
}

//reverse the array, //here fruit.length-1 is the last index of the array
for(let i = fruits.length-1; i>=0; i--){ 
    console.log(fruits[i]);
}

//an interesting shortcut to show every element of the array
for(let fruit of fruits){
    console.log(fruit);
}

//to sort the array
fruits.sort();
console.log(fruits);
//to sort the array in reverse order
fruits.sort().reverse();
console.log(fruits);

//to find the maximum and minimum value in the array
let max = Math.max(...fruits);
console.log(max);
let min = Math.min(...fruits);
console.log(min);

//to find the sum of the array
let sum = fruits.reduce((total, fruit) => total + fruit, 0);
console.log(sum);