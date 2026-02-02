/*string slicing = extracting a part of a string*/
let phoneNumber = "123-456-7890";
//slice(start, end) = returns the part of the string between the start and end indices
console.log(phoneNumber.slice(0, 3));

const fullName = "John Doe";
let firstName = fullName.slice(0, 4);
let lastname = fullName.slice(5, 8);
//or, let lastname = fullName.slice(5); will give you the same results
console.log(firstName);
console.log(lastname);

let firstChar = fullName.slice(0, 1); 
//Here, (0, 1) means it will start from 0 and end at 1
//if 1 is not mentioned, it will start from 0 and end at the last character
console.log(firstChar);

let lastChar = fullName.slice(-3);
//Here, -1 means it will start from the last character and end at the last character
console.log(lastChar);

//another way to slice a string is to use substring(start, end)
let firsstName = fullName.slice(0, fullName.indexOf(" "));
console.log(firsstName);

let lastName = fullName.slice(fullName.indexOf(" ") + 1); 
//Here, +1 is used to skip the space
//No ending index is used because the last name is the rest of the string after the space
console.log(lastName);

//Example 2
let email = "john.doe@example.com";
let fullName2 = email.slice(0, email.indexOf("@"));
console.log(fullName2);
let extension = email.slice(email.indexOf("@") + 1);
console.log(extension);