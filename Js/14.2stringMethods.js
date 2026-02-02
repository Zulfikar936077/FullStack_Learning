/*string methods = allows us to perform operations on strings*/

let userName = "Johnson  ";
//charAt(index) = returns the character at the specified index
//first character is 0
console.log(userName.charAt(3));

//indexOf(value) = returns the index of the first occurrence of the specified value
console.log(userName.indexOf("o"));
console.log(userName.lastIndexOf("o"));

//length = returns the length of the string
console.log(userName.length);

//trim() = removes whitespace from both ends of a string
userName = userName.trim();
console.log(userName);

//toUpperCase() = converts a string to uppercase
console.log(userName.toUpperCase());

//toLowerCase() = converts a string to lowercase
console.log(userName.toLowerCase());

//repeat(count) = returns a new string with the specified number of copies of the string
console.log(userName.repeat(3));

//startsWith(value) = returns true if the string starts with the specified value
//if I want to have a direct and same result without using result variable
console.log(userName.startsWith("J"));

//if i want to use result variable again
username2 = " Johnson";
let result2 = username2.startsWith(" "); 
console.log(result2);
if(result2){
    console.log("The username cannot begin with ' ' (space)");
}
else{
    console.log(username2);
}

//endsWith(value) = returns true if the string ends with the specified value
let result3 = username2.endsWith("n");
if(result3){
    console.log("The username cannot end with 'n'");
}
else{
    console.log(username2);
}
//replaceAll(oldValue, newValue) = replaces all occurrences of the old value with the new value
let phoneNumber = "123-456-7890";
console.log(phoneNumber.replaceAll("-", " "));

//padStart(length, fill) = pads the string with the specified fill character until the string reaches the specified length
console.log(phoneNumber.padStart(15, "0")); //adds 0 to the start of the string until the phoneNumber reaches 15 characters

//padEnd(length, fill) = pads the string with the specified fill character until the string reaches the specified length
console.log(phoneNumber.padEnd(15, "0")); //adds 0 to the end of the string until the phoneNumber reaches 15 characters

//substring(start, end) = returns the part of the string between the start and end indices
console.log(phoneNumber.substring(0, 3));

