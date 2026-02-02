/*assignment operators = assigns a value to a variable
== comparision operator
=== strict equality operator (checks value and type)
!= not equal operator (checks value only)
!== strict not equal operator (checks value and type)
> greater than operator
< less than operator
>= greater than or equal to operator
<= less than or equal to operator
*/

const PI = 3.14;

if(PI == "3.14"){ //== checks only the value, not the type
    console.log("The value of PI is 3.14");
}
else{
    console.log("The value of PI is not 3.14");
}
//=== checks both the value and the type
if(PI === "3.14"){
    console.log("The value of PI is 3.14");
}
else{
    console.log("The value of PI is not 3.14");
}
//!= checks only the value, not the type
if(PI != "3.14"){
    console.log("The value of PI is not 3.14");
}
else{
    console.log("The value of PI is 3.14");
}
//!== checks both the value and the type
if(PI !== "3.14"){
    console.log("The value of PI is not 3.14");
}
else{
    console.log("The value of PI is 3.14");
}
