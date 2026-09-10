let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    if (operator !== null && !shouldResetDisplay) {
        // Показываем полное выражение: 2+2
        display.value = previousInput + ' ' + operator + ' ' + currentInput;
    } else if (operator !== null && shouldResetDisplay) {
        // После нажатия оператора
        display.value = previousInput + ' ' + operator;
    } else {
        // Обычный ввод
        display.value = currentInput;
    }
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else if (num === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetDisplay) {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'ERROR: Division by Zero';
                currentInput = '0';
                previousInput = '';
                operator = null;
                shouldResetDisplay = false;
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = parseFloat(result.toFixed(10)).toString();
    previousInput = '';
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-') {
        appendOperator(e.key);
    } else if (e.key === '*') {
        e.preventDefault();
        appendOperator('*');
    } else if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

updateDisplay();
