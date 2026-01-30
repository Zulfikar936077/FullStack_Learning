//counter program using JavaScript
const dBtn = document.getElementById("dBtn");
const rBtn = document.getElementById("rBtn");
const iBtn = document.getElementById("iBtn");
const countLabel = document.getElementById("countLabel");

let count = 0;

iBtn.onclick = function() {
    count+=5;
    countLabel.textContent = count;
}
dBtn.onclick = function() {
    count-=3;
    countLabel.textContent = count;
}
rBtn.onclick = function() {
    count = 0;
    countLabel.textContent = count;
}