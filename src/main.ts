// Get HTML elements
const numberButtons = document.querySelectorAll<HTMLButtonElement>('.number');
const operatorButtons = document.querySelectorAll<HTMLButtonElement>('.operator');
const equalButton = document.querySelector<HTMLButtonElement>('.equal');
const clearButton = document.querySelector<HTMLButtonElement>('.clear');
const display = document.querySelector<HTMLDivElement>('.calculator__display');
const log = document.querySelector<HTMLDivElement>('.calculator__log');
const sqrtButton = document.querySelector<HTMLButtonElement>('.sqrt')
const inverseButton = document.querySelector<HTMLButtonElement>('.inverse')
const percentButton = document.querySelector<HTMLButtonElement>('.percent')

// Check if all elements are found
if (!numberButtons || 
    !operatorButtons || 
    !equalButton || 
    !clearButton || 
    !sqrtButton || 
    !inverseButton ||
    !percentButton) {
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
        display.textContent = '0.'
    } else if (display.textContent?.includes(".") && buttonValue === ".") {
        return 
    } else if (display.textContent?.trim() == "0" && buttonValue == "0") {
        return 
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

const handleSquareRootButtonClick = () => {
    if (number1) {
        result = specialCalculateResult(number1, '√');
        number1 = result;
        log.textContent = String(result);
        display.textContent = '';
    } else if (!number1 && display.textContent?.trim()) {
        number1 = Number(display.textContent);
        result = specialCalculateResult(number1, '√');
        number1 = result;
        log.textContent = String(result);
        display.textContent = '';
    
    }
}


const handleInverseButtonClick = () => {
    if (number1) {
        result = specialCalculateResult(number1, '+/-');
        number1 = result;
        log.textContent = String(result);
        display.textContent = '';
    } else if (!number1 && display.textContent?.trim()) {
        number1 = Number(display.textContent);
        result = specialCalculateResult(number1, '+/-');
        number1 = result;
        log.textContent = String(result);
        display.textContent = '';
    
    }
}


const handlePercentButtonClick = () => {
    if (number1) {
        result = specialCalculateResult(number1, '%');
        number1 = result;
        log.textContent = String(result);
        display.textContent = '';
    } else if (!number1 && display.textContent?.trim()) {
        number1 = Number(display.textContent);
        result = specialCalculateResult(number1, '%');
        number1 = result;
        log.textContent = String(result);
        display.textContent = '';
    
    }
}

// Reset calculator
const handleClearButtonClick = () => {
    display.textContent = '';
    log.textContent = '';
    number1 = 0;
    number2 = 0;
    result = 0;
    operator = '';
    return 
}

// Calculate result on equal button click
const handleEqualButtonClick = () => {
    if (display.textContent === '') {
        display.textContent = ''
        return 
    } else if (!operator) {
        return
    } else if (!number2) {
        number2 = Number(display.textContent);
        result = calulateResult(number1, number2, operator);
        number1 = Number(result)
        operator = '';
        log.textContent = String(result);
        display.textContent = '';
        number2 = 0
        return
    } 
}



// Function to calculate result
const calulateResult = (number1: number, number2: number, operator: string) => {
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
        case '^':
            result = number1 ** number2;
            break;
        default:
            throw new Error("Invalid operator!");
    }
    return result;
}

const specialCalculateResult = (number: number, specialOperator: string) => {
    switch (specialOperator) {
        case '√':
            result = Math.sqrt(number)
            break
        case '+/-':
            result = number * -1
            break
        case '%':
            result = number / 100
            break
    default:
            throw new Error("Invalid operator!")
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
sqrtButton.addEventListener('click', handleSquareRootButtonClick);
inverseButton.addEventListener('click', handleInverseButtonClick);
percentButton.addEventListener('click', handlePercentButtonClick);