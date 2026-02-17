// Unicode dice faces 1-6 (work without image files)
const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function rollDice(){
    const numDice = parseInt(document.getElementById("diceValue").value, 10) || 1;
    const diceResults = document.getElementById("diceResults");
    const diceImages = document.getElementById("diceImages");
    const values = [];
    const display = [];

    for (let i = 0; i < numDice; i++) {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        values.push(randomNum);
        display.push(`<span class="dice-face" title="Dice ${randomNum}">${DICE_FACES[randomNum - 1]}</span>`);
    }
    diceResults.textContent = `Dice: ${values.join(", ")}`;
    diceImages.innerHTML = display.join('');
}