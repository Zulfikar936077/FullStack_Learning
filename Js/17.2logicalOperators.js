/*logical operators = used to check if two or more conditions are true/false
          && = AND operator - both conditions must be true
          || = OR operator - one condition must be true
          ! = NOT operator - reverses the condition*/

let temp = 15;
if(temp > 0 && temp < 30){
    console.log("The weather is good!");
}
    else{
        console.log("The weather is not good!");
    }

if(temp <= 0 || temp >= 30){
    console.log("The weather is not good!");
}
    else{
        console.log("The weather is good!");
    }

if(!(temp > 0 && temp < 30)){
    console.log("The weather is not good!");
}
    else{
        console.log("The weather is good!");
    }
//!(temp > 0 && temp < 30) is the same as temp <= 0 || temp >= 30

const isSunny = false;
if(isSunny){
    console.log("It is sunny outside!");
}
    else{
        console.log("It is cloudy outside!");
    }
//!(isSunny) is the same as !isSunny
if(!isSunny){
    console.log("It is cloudy outside!");
}
    else{
        console.log("It is sunny outside!");
    }