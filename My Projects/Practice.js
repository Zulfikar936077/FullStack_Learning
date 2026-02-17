function getMilk(money){
    var numberOfBottles = money / 1.5;
    console.log("You have bought " + numberOfBottles + " bottles of milk.");
    return  money % 1.5;
}
var change = getMilk(5);
console.log("You have " + change + " dollars left.");

