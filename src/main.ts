const buttons = document.querySelectorAll<HTMLButtonElement>('button');
const display = document.querySelector<HTMLDivElement>('.calculator__display');

if (!buttons) {
  throw new Error("Buttons not found!");
}

const handleButtonClick = (event: Event) => {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    console.log(buttonValue);
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
