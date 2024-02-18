const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "=", "(", ")"];
const validChars = /[0-9\.]/;
let output = "";

const updateDisplay = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        try {
            
            output = eval(output.replace(/(\d+)%/g, "($1/100)")); 
            if (!isFinite(output)) {
                throw new Error("Error: Division by zero or invalid operation");
            }
            display.value = output;
        } catch (error) {
            display.value = error.message;
        }
    } else if (btnValue === "AC") {
        clearDisplay();
    } else {
        if (!isValidInput(btnValue)) return;
        if (isConsecutiveSpecialChars(btnValue)) return;

        handleSpecialCases(btnValue);
        output += btnValue;
        display.value = output;
    }
};

const clearDisplay = () => {
    output = "";
    display.value = "";
};

const isValidInput = (btnValue) => {
    return validChars.test(btnValue) || specialChars.includes(btnValue);
};

const isConsecutiveSpecialChars = (btnValue) => {
    return specialChars.includes(btnValue) && specialChars.includes(output[output.length - 1]);
};

const handleSpecialCases = (btnValue) => {
    if (btnValue === "(" && output !== "" && !isNaN(output[output.length - 1])) {
        output += "*";
    }

    if (btnValue === ")" && output !== "" && output[output.length - 1] === "(") {
        output += "0";
    }

    if ((btnValue === "(" && output !== "" && !isNaN(output[output.length - 1])) ||
        (btnValue !== ")" && output !== "" && output[output.length - 1] === ")")) {
        output += "*";
    }
};

buttons.forEach((button) => {
    button.addEventListener("click", (e) => updateDisplay(e.target.dataset.value));
});

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Enter") {
        updateDisplay("=");
    } else if (key === "Escape") {
        updateDisplay("AC");
    } else if (key === "Backspace") {
        if (output === "") {
            updateDisplay("AC");
        } else {
            output = output.slice(0, -1);
            display.value = output;
        }
    } else if (key.match(validChars)) {
        updateDisplay(key);
    } else if (specialChars.includes(key)) {
        if (isConsecutiveSpecialChars(key)) return;
        updateDisplay(key);
    }
});






