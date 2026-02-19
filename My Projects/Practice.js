/*
function getMilk(money){
    var numberOfBottles = money / 1.5;
    console.log("You have bought " + numberOfBottles + " bottles of milk.");
    return  money % 1.5;
}
var change = getMilk(5);
console.log("You have " + change + " dollars left.");
*/
var lyrics = [];
var bottleNumber = 99;
while(bottleNumber >= 1){
    if(bottleNumber >= 2){
        var nextBottles = bottleNumber - 1;
        var nextBottleText = nextBottles === 1 ? "bottle" : "bottles";
        lyrics.push(`${bottleNumber} bottles of beer on the wall, ${bottleNumber} bottles of beer.
Take one down and pass it around, ${nextBottles} ${nextBottleText} of beer on the wall.`);
    }else{
        lyrics.push(`${bottleNumber} bottle of beer on the wall, ${bottleNumber} bottle of beer.
Take one down and pass it around, no more bottles of beer on the wall.`);
    }
    bottleNumber--;
}
lyrics.push(`No more bottles of beer on the wall, no more bottles of beer.
                          Go to the store and buy some more, 99 bottles of beer on the wall.`);
console.log(lyrics);

