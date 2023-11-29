// Get HTML elements
const numberButtons = document.querySelectorAll<HTMLButtonElement>('.number');
const operatorButtons = document.querySelectorAll<HTMLButtonElement>('.operator');
const equalButton = document.querySelector<HTMLButtonElement>('.equal');
const clearButton = document.querySelector<HTMLButtonElement>('.clear');
const display = document.querySelector<HTMLDivElement>('.calculator__display');
const log = document.querySelector<HTMLDivElement>('.calculator-log');

// Check if all elements are found
if (!numberButtons || !operatorButtons || !equalButton || !clearButton) {
  throw new Error("Buttons not found!");
}
if (!display || !log) {
  throw new Error("Display not found!");
}

// Global variables
let number1: number
let number2: number 
let operator: string;
let result: number;

// Handle number button clicks
const handleNumberButtonClick = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    console.log(buttonValue);
    if (buttonValue === "." && !display.textContent?.trim()) {
        display.textContent = ''
    } else {
        display.textContent += buttonValue;
    }
    
}

// Handle operator button clicks
const handleOperatorButtonClick = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    console.log(buttonValue);
    // Stop adding operators if display is empty
    // Trim to clear invisible characters
    if (!display.textContent?.trim() && !log.textContent?.trim()) {
        display.textContent = ''
        log.textContent = '';
    } else if (!number1) {
        console.log(display.textContent)
        console.log("2e")
        number1 = Number(display.textContent);
        operator = buttonValue;
        log.textContent += number1 + operator;
        display.textContent = '';
    } else if (!operator) {
        operator = buttonValue
        log.textContent += operator
    } else if (!number2) {
        number2 = Number(display.textContent);
        result = calulateResult(number1, number2, operator);
        log.textContent = String(result);
        display.textContent = '';
        number1 = result;
        number2 = 0;
        operator = buttonValue;
        log.textContent += operator;
    }
    
}

// Clear display
const handleClearButtonClick = () => {
    display.textContent = '';
    log.textContent = '';
    number1 = 0;
    number2 = 0;
    result = 0;
    operator = '';
}

// Calculate result on equal button click
const handleEqualButtonClick = () => {
    if (display.textContent === '') {
        display.textContent = ''
    } else if (!number2) {
        number2 = Number(display.textContent);
        result = calulateResult(number1, number2, operator);
        number1 = Number(result)
        operator = '';
        log.textContent = String(result);
        display.textContent = '';
        number2 = 0
    } 
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