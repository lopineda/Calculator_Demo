let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    isNaN(value) ? handleSymbol(value) : handleNumber(value);
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) return;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = `${runningTotal}`;
            runningTotal = 0;
            break;
        case '←':
            buffer = buffer.length > 1 ? buffer.substring(0, buffer.length - 1) : "0";
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") return;

    const intBuffer = parseFloat(buffer);
    runningTotal = runningTotal === 0 ? intBuffer : flushOperation(intBuffer);
    
    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+': runningTotal += intBuffer; break;
        case '−': runningTotal -= intBuffer; break;
        case '×': runningTotal *= intBuffer; break;
        case '÷': 
            if (intBuffer === 0) {
                alert("Error: Cannot divide by zero");
                return runningTotal;
            }
            runningTotal /= intBuffer; 
            break;
    }
    return runningTotal;
}

function handleNumber(numberString) {
    buffer = buffer === "0" ? numberString : buffer + numberString;
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();


