let message = "Welcome to TypeScript";
console.log(message);
let x = 10;
const y = 20;
let sum;
const title = "Optimistic";
let isBeginner = true;
let total = 0;
let name = "harry";
let sentence = `My name is ${name}
and I am a ${isBeginner} in Typescript`;
console.log(sentence);
let n = null;
let u = undefined;
let isNew = null;
let myName = undefined;
let list1 = [1, 2, 3];
let list2 = [1, 2, 3];
let list3 = [1, "cookie"];
var color;
(function (color) {
    color[color["Red"] = 5] = "Red";
    color[color["Green"] = 6] = "Green";
    color[color["Blue"] = 7] = "Blue";
})(color || (color = {}));
;
let c = color.Green;
console.log(c);
export {};
