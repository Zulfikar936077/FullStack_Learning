// ========== Number guessing game ==========
const minNum = 50;   // Lowest possible secret number
const maxNum = 100;  // Highest possible secret number
// Random int from minNum to maxNum: random 0–1 × (count of numbers), floor, then + minNum.
const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
console.log(randomNum);  // (remove when done testing — shows the answer)

// Game state: count guesses, store current guess, and a flag to keep the loop running
let attempts = 0;
let guess;
let running = true;

while(running){
    guess = window.prompt(`Enter a guess between ${minNum} and ${maxNum}:`);
    guess = Number(guess);  // Convert string input to number
    console.log(guess, typeof guess);

    if (isNaN(guess)){  // Not a valid number (e.g. user typed text or clicked Cancel)
        window.alert("Please enter a valid number");
        continue;  // Skip rest of loop, ask again
    }
    else if (guess < minNum || guess > maxNum){  // Outside allowed range
        window.alert(`Please enter a number between ${minNum} and ${maxNum}`);
        continue;
    }
    else{  // Valid guess — count it and check vs secret
        attempts++;
        if (guess < randomNum){
            window.alert("Too low");
        }
        else if (guess > randomNum){
            window.alert("Too high");
        }
        else{  // guess === randomNum — win
            window.alert(`Congratulations! You guessed the number in ${attempts} attempts`);
            running = false;  // Stop the loop
        }
    }
}
