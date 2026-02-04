//variable scope = where a variable is accessible (global or local)
//in large program it is better to use local variables
//local variable = declared inside a function (accessible only to the function)
//if the same variable is declared in both global and local scope, the local variable will take precedence


//example of local variable
function function1(){
    let x = 10;
    console.log(x);
}
function1()
function function2(){
    let x = 20;
    console.log(x);
}
function2()

//example of global variable
let x = 10; //global variable
console.log(x); 
function function3(){
    console.log(x);  //first it will look for local variable, if not found, it will look for global variable
}
function3()
