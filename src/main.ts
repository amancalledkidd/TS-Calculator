import { re } from "mathjs";


// Get HTML elements
const numberButtons = document.querySelectorAll<HTMLButtonElement>('.number');
const operatorButtons = document.querySelectorAll<HTMLButtonElement>('.operator');
const equalButton = document.querySelector<HTMLButtonElement>('.equal');
const clearButton = document.querySelector<HTMLButtonElement>('.clear');
const display = document.querySelector<HTMLDivElement>('.calculator__display');

// Check if all elements are found
if (!numberButtons || !operatorButtons || !equalButton || !clearButton) {
  throw new Error("Buttons not found!");
}
if (!display) {
  throw new Error("Display not found!");
}

let number1: number | null;
let number2: number | null;
let operator: string;


// Handle number button clicks
const handleNumberButtonClick = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    console.log(buttonValue);
    display.textContent += buttonValue;
}

// Handle operator button clicks
const handleOperatorButtonClick = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    console.log(buttonValue);
    // Stop adding operators if display is empty
    if (display.textContent === '') {
        display.textContent = '';
    } else {
        if (!number1) {
            number1 = Number(display.textContent);
            operator = buttonValue;
            display.textContent = '';
        } else if (!number2) {
            number2 = Number(display.textContent);
            const result = calulateResult(number1, number2, operator);
            operator = buttonValue;
            number1 = Number(result);
            display.textContent = String(result);
            number2 = null;
        }
        display.textContent += buttonValue;
    }
    
}

// Clear display
const handleClearButtonClick = () => {
    display.textContent = '';
}

// Calculate result on equal button click
const handleEqualButtonClick = () => {
    // const displayValue = display.textContent;
    // const result = calulateResult(number1, number2, operator);
    // display.textContent = String(result);
}



// Function to calculate result
const calulateResult = (number1: number, number2: number, operator: string) => {
    let result: number;
    switch (operator) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
        default:
            throw new Error("Invalid operator!");
    }
    return result;
}



// Add event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', handleNumberButtonClick);
});

operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorButtonClick);
});

clearButton.addEventListener('click', handleClearButtonClick);
equalButton.addEventListener('click', handleEqualButtonClick);