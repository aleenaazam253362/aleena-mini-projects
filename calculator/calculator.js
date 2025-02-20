let inputBox = document.getElementById('inputBox');
let buttons = Array.from(document.getElementsByTagName('button'));
let currentInput = ''; // Track current input
let firstOperand = null; // First number in the operation
let operator = null; // Current operator (+, -, *, /)

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    handleInput(e.target.innerText);
  });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Map keyboard keys to calculator buttons
  const keyMap = {
    'Enter': '=',
    'Backspace': 'Del',
    'Escape': 'AC',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '%': '%',
    '.': '.'
  };

  // Handle number keys
  if (!isNaN(key) || key === '.') {
    handleInput(key);
  } else if (keyMap[key]) {
    handleInput(keyMap[key]);
  }
});

// Function to handle input from both buttons and keyboard
function handleInput(value) {
  switch (value) {
    case 'AC':
      // Clear everything
      currentInput = '';
      firstOperand = null;
      operator = null;
      inputBox.value = '0';
      break;

    case 'Del':
      // Delete last character
      currentInput = currentInput.slice(0, -1);
      inputBox.value = currentInput || '0';
      break;

    case '%':
      // Percentage calculation
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        inputBox.value = currentInput;
      }
      break;

    case '=':
      // Perform calculation
      if (firstOperand !== null && operator && currentInput) {
        const result = calculate(
          firstOperand,
          operator,
          parseFloat(currentInput)
        );
        inputBox.value = result;
        currentInput = result.toString();
        firstOperand = null;
        operator = null;
      }
      break;

    case '+':
    case '-':
    case '*':
    case '/':
      // Handle operators
      if (currentInput) {
        if (firstOperand === null) {
          firstOperand = parseFloat(currentInput);
        } else if (operator) {
          // Calculate intermediate result
          firstOperand = calculate(
            firstOperand,
            operator,
            parseFloat(currentInput)
          );
          inputBox.value = firstOperand;
        }
        operator = value;
        currentInput = ''; // Reset for next input
      }
      break;

    default:
      // Handle numbers and decimal
      if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
      currentInput += value;
      inputBox.value = currentInput;
      break;
  }
}

// Calculation logic
function calculate(a, op, b) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error';
    default:
      return b;
  }
}