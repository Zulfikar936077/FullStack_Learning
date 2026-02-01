
/*
The checked property is used to check if a checkbox is checked.
The checked property is used to check if a radio button is checked.
The checked property is used to check if a radio button is checked.
*/
const myCheckbox = document.getElementById("myCheckbox");
const visaBtn = document.getElementById("visaBtn");
const mastercardBtn = document.getElementById("mastercardBtn");
const paypalBtn = document.getElementById("paypalBtn");
const subResult = document.getElementById("subResult");
const paymentResult = document.getElementById("paymentResult");
const mySubmit = document.getElementById("myButton"); // Get the submit button element

mySubmit.onclick = function() {
    if(myCheckbox.checked){
        subResult.textContent = `You are subscribed to our newsletter`;
    } else {
        subResult.textContent = `You are not subscribed to our newsletter`;
    }
    if(visaBtn.checked){
        paymentResult.textContent = `You are paying with Visa`;
    } else if(mastercardBtn.checked){
        paymentResult.textContent = `You are paying with Mastercard`;
    } else if(paypalBtn.checked){
        paymentResult.textContent = `You are paying with Paypal`;
    } else {
        paymentResult.textContent = `You must select a payment method`;
    }
}
