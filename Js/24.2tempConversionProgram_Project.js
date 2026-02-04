//Temp conversion program
//Celcius to Fahrenheit: (Celcius * 9/5) + 32
//Fahrenheit to Celcius: (Fahrenheit - 32) * 5/9

const temperature = document.getElementById("temperature");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelcius = document.getElementById("toCelcius");
const result = document.getElementById("result");

function convertTemperature() {
    const temp = Number(temperature.value);
    if (toFahrenheit.checked) {
        const fahrenheit = (temp * 9 / 5) + 32;
        result.textContent = `${temp}°C = ${fahrenheit.toFixed(1)}°F`; 
        //toFixed(1) is used to round the number to 1 decimal place
        //Alt+0176 is the degree symbol
    } else if (toCelcius.checked) {
        const celcius = (temp - 32) * 5 / 9;
        result.textContent = `${temp}°F = ${celcius.toFixed(1)}°C`;
    } else {
        result.textContent = "Select a unit";
    }
}