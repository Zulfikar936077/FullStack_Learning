/*Math = built-in object that provides basic math functionality 
         and constants*/

console.log(Math.PI);
console.log(Math.E);

let a = 3.14;
let b = 2;
let c = 3.99;
let d = 3;
let e = 81;
let f = 45;
let g = -3;
let z;

//z = Math.round(a); //rounds to the nearest integer
//z = Math.floor(c); //rounds down to the nearest integer
//z = Math.ceil(c); //rounds up to the nearest integer
//z = Math.trunc(a); //removes the decimal part
//z = Math.pow(b, d); //b to the power of d 
//z = Math.sqrt(e); //square root of e
//z = Math.log(d); //logarithm of d
//z = Math.sin(f); //sine of f
//z = Math.cos(f); //cosine of f
//z = Math.tan(f); //tangent of f
//z = Math.abs(g); //absolute value of g
z = Math.sign(g); //sign of g
let min = Math.min(a, b, c, d, e, f, g); //minimum value
let max = Math.max(a, b, c, d, e, f, g); //maximum value
console.log(z);
console.log(max);
console.log(min);
