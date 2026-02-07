//for loop = repeat some code a certain number of times
//Example 1:
for(i = 0; i<=3; i++){
    console.log(i);
}
//Example 2:
for(let j =10; j>=0; j-=2){
    console.log(j);
}
console.log("Happy New Year!");
//Example 3:
for(let k = 1; k <= 20; k--){
    if(k==13){
        continue;//continue skips the current iteration of the loop and moves to the next iteration
    }
    else{
        console.log(k);
    }
}
