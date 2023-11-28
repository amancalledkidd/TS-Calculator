const numberButtons = document.querySelectorAll<HTMLButtonElement>('.number');
const operatorButtons = document.querySelectorAll<HTMLButtonElement>('.operator');
const equalButton = document.querySelector<HTMLButtonElement>('.equal');
const clearButton = document.querySelector<HTMLButtonElement>('.clear');
const display = document.querySelector<HTMLDivElement>('.calculator__display');

if (!numberButtons || !operatorButtons || !equalButton || !clearButton) {
  throw new Error("Buttons not found!");
}
if (!display) {
  throw new Error("Display not found!");
}

const handleNumberButtonClick = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    console.log(buttonValue);
    display.textContent += buttonValue;
}

const handleOperatorButtonClick = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    console.log(buttonValue);
    display.textContent += buttonValue;
}

const handleClearButtonClick = () => {
    display.textContent = '';
}

const handleEqualButtonClick = () => {
    const displayValue = display.textContent;
    const result = calulatetResult(displayValue);
    display.textContent = result;
}

const calulatetResult = (displayValue: string) => {
    return new Function('return ' + displayValue)();
}

numberButtons.forEach(button => {
    button.addEventListener('click', handleNumberButtonClick);
});

operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorButtonClick);
});

clearButton.addEventListener('click', handleClearButtonClick);
equalButton.addEventListener('click', handleEqualButtonClick);