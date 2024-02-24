let currentInputValue: string = '';
let previousInputValue: string = '';
let currentOperation: string | null = null;

// Get all the calculator buttons
const one = document.getElementById('one') as HTMLButtonElement;
const two = document.getElementById('two') as HTMLButtonElement;
const three = document.getElementById('three') as HTMLButtonElement;
const four = document.getElementById('four') as HTMLButtonElement;
const five = document.getElementById('five') as HTMLButtonElement;
const six = document.getElementById('six') as HTMLButtonElement;
const seven = document.getElementById('seven') as HTMLButtonElement;
const eight = document.getElementById('eight') as HTMLButtonElement;
const nine = document.getElementById('nine') as HTMLButtonElement;
const zero = document.getElementById('zero') as HTMLButtonElement;

const add = document.getElementById('add') as HTMLButtonElement;
const subtract = document.getElementById('subtract') as HTMLButtonElement;
const multiply = document.getElementById('multiply') as HTMLButtonElement;
const divide = document.getElementById('divide') as HTMLButtonElement;
const equals = document.getElementById('equal-sign') as HTMLButtonElement;

const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;

// Add event listeners to the calculator buttons
one.addEventListener('click', () => inputNumber(1));
two.addEventListener('click', () => inputNumber(2));
three.addEventListener('click', () => inputNumber(3));
four.addEventListener('click', () => inputNumber(4));
five.addEventListener('click', () => inputNumber(5));
six.addEventListener('click', () => inputNumber(6));
seven.addEventListener('click', () => inputNumber(7));
eight.addEventListener('click', () => inputNumber(8));
nine.addEventListener('click', () => inputNumber(9));
zero.addEventListener('click', () => inputNumber(0));

add.addEventListener('click', () => inputOperator('+'));
subtract.addEventListener('click', () => inputOperator('-'));
multiply.addEventListener('click', () => inputOperator('*'));
divide.addEventListener('click', () => inputOperator('/'));
equals.addEventListener('click', () => calculateResult());

clearBtn.addEventListener('click', () => clearDisplay());

/**
 * Calculates the result of the current operation and updates the current input value.
 * If the previous or current input values are not valid numbers, or the operation is null, does nothing.
 */
function calculateResult(): void {
    if (currentInputValue && previousInputValue && currentOperation) {
        const currentValue = parseFloat(currentInputValue);
        const previousValue = parseFloat(previousInputValue);

        if (!isNaN(currentValue) && !isNaN(previousValue)) {
            if (currentOperation === '+') currentInputValue = (previousValue + currentValue).toString();
            if (currentOperation === '-') currentInputValue = (previousValue - currentValue).toString();
            if (currentOperation === '*') currentInputValue = (previousValue * currentValue).toString();
            if (currentOperation === '/') {
                if (currentValue === 0) {
                    currentInputValue = 'Syntax Error';
                } else {
                    currentInputValue = (previousValue / currentValue).toString();
                }
            }
        }

        previousInputValue = '';
        currentOperation = null;
        updateDisplay();
    }
}


/**
 * Appends a number to the current input value and updates the display.
 * @param num - The number to append.
 */

function inputNumber(num: number): void {
    currentInputValue += num.toString();
    updateDisplay();
}

/**
 * Sets the current operation and moves the current input value to the previous input value.
 * If there is already a previous input value, calculates the result first.
 * @param op - The operation symbol to set.
 */
function inputOperator(op: string): void {
    if (currentOperation || !currentInputValue) return; // If there is already an operation or no current input value, do nothing.
    if (previousInputValue) calculateResult(); // If there is already a previous input value, calculate the result.

    previousInputValue = currentInputValue;
    currentInputValue = '';
    currentOperation = op;
}

/**
 * Clears the current and previous input values and the operation and updates the display.
 */
function clearDisplay(): void {
    currentInputValue = '';
    previousInputValue = '';
    currentOperation = null;
    updateDisplay();
}


/**
 * Updates the display element with the current input value.
 */
function updateDisplay(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    display.value = currentInputValue;
}


// Initialize the display with the current input value.
updateDisplay();
