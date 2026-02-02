/*switche are used to replace long if else statements*/

let day = "pizza"; 
//Here, switch(day) is used to match the condition exactly and there is no range]
switch(day){
    case 1:
        console.log("It is Monday"); //break is used to exit the switch statement
        break;
    case 2:
        console.log("It is Tuesday");
        break;
    case 3:
        console.log("It is Wednesday");
        break;
    case 4:
        console.log("It is Thursday");
        break;
    case 5:
        console.log("It is Friday");
        break;
    case 6:
        console.log("It is Saturday");
        break;
    default:
        console.log(`${day} is not a day of the week`);
        break;
}
let testScore = 85; 
let letterGrade;
/*Here, switch(true) is used instead of switch(testScore);
because switch(testScore) means testsScore===85, no chance to check the range and condition*/
switch(true){
    case testScore >= 90:
        letterGrade = "A";
        break;
    case testScore >= 80:
        letterGrade = "B";
        break;
    case testScore >= 70:
        letterGrade = "C";
        break;
    default:
        letterGrade = "F";
        break;
}
console.log(letterGrade);