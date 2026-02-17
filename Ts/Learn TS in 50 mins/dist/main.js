/*
The topics covered here are:
1. Env setup
2. Variable Declarations
3. Variable types
4. Functions
5. Interface
6. Classes
7. Access modifiers
*/
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
let randomValue = 10;
randomValue = true;
randomValue = "Optimistics";
console.log(randomValue);
/*let myVariable: any = 10;
myVariable();
myVariable.toUpperCase();

/*let myvariable: unknown =10;
 function hasName(obj: any): obj is {name:string} {
    return !!obj && typeof obj === "object" && "name" in obj;
 }

 //if(hasName(myvariable)){
   // console.log(myvariable.name);
//}
 
    //console.log((myvariable as {name: string}).name.toUpperCase());
 */
let multiType;
multiType = 10;
multiType = true;
console.log(multiType);
function add(num1, num2) {
    return num1 + num2;
}
add(1, 2);
console.log(add(1, 2));
function fullName(person) {
    console.log(`${person.firstname} ${person.lastName}`);
}
let p = {
    firstname: "John",
    lastName: "Doe",
};
fullName(p);
class Employee {
    constructor(name) {
        this.employeeName = name;
    }
    greet() {
        console.log(`Hello ${this.employeeName}`);
    }
}
let emp1 = new Employee("John");
console.log(emp1.employeeName);
emp1.greet();
class Manager extends Employee {
    constructor(managerName) {
        super(managerName);
    }
    delegateWork() {
        console.log(`Manager delegating tasks`);
    }
}
let m = new Manager("Jane");
m.greet();
m.delegateWork();
console.log(m.employeeName);
export {};
