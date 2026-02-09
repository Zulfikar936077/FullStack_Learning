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