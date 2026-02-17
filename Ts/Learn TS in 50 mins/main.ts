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


export {}
let message = "Welcome to TypeScript";
console.log(message);

let x = 10;
const y = 20;

let sum;
const title = "Optimistic";

let isBeginner: boolean = true;
let total: number = 0;
let name: string = "harry";
let sentence: string = `My name is ${name}
and I am a ${isBeginner} in Typescript`;
console.log(sentence);

let n: null = null;
let u: undefined = undefined;

let isNew: boolean = null;
let myName: string = undefined;

let list1: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];
let list3: [number, string] = [1, "cookie"];

enum color {Red =5, Green, Blue};
let c: color = color.Green;
console.log(c);

let randomValue: any =10;
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

    let multiType: number | boolean;
    multiType = 10;
    multiType = true;
    console.log(multiType);


    function add(num1: number, num2: number): number{
        return num1 + num2;
    }
    add(1,2);
    console.log(add(1,2));




interface Person {
    firstname: string;
    lastName: string;
}
  function fullName(person: Person){
    console.log(`${person.firstname} ${person.lastName}`);
  }
  let p ={
    firstname: "John",
    lastName: "Doe",
  }
fullName(p);


class Employee {
    public employeeName: string;

    constructor(name: string){
        this.employeeName = name;
    }
    greet(){
        console.log(`Hello ${this.employeeName}`);
    }
}

let emp1 = new Employee("John");
console.log(emp1.employeeName);
emp1.greet();


class Manager extends Employee {
    constructor(managerName: string){
        super(managerName);
    }
    delegateWork(){
        console.log(`Manager delegating tasks`);
    }
}

let m = new Manager("Jane");
m.greet();
m.delegateWork();
console.log(m.employeeName);

