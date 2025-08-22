// Modern Calculator Implementation
// No jQuery dependency - using vanilla JavaScript

// Get input values and validate them
function getInputValues() {
    const firstInput = document.getElementById('first-number');
    const secondInput = document.getElementById('second-number');
    
    const firstValue = parseFloat(firstInput.value);
    const secondValue = parseFloat(secondInput.value);
    
    // Clear previous error states
    clearErrors();
    
    // Validate inputs
    if (isNaN(firstValue)) {
        showError('Please enter a valid first number', firstInput);
        return null;
    }
    
    if (isNaN(secondValue)) {
        showError('Please enter a valid second number', secondInput);
        return null;
    }
    
    return { first: firstValue, second: secondValue };
}

// Main function to perform operations
function performOperation(operation) {
    const values = getInputValues();
    if (!values) return;
    
    let result;
    let errorMessage = '';
    
    try {
        switch (operation) {
            case 'add':
                result = values.first + values.second;
                break;
            case 'subtract':
                result = values.first - values.second;
                break;
            case 'multiply':
                result = values.first * values.second;
                break;
            case 'divide':
                if (values.second === 0) {
                    errorMessage = 'Cannot divide by zero';
                    result = null;
                } else {
                    result = values.first / values.second;
                }
                break;
            default:
                errorMessage = 'Unknown operation';
                result = null;
        }
        
        if (result !== null) {
            displayResult(result);
        } else {
            showError(errorMessage);
        }
    } catch (error) {
        showError('An error occurred during calculation');
        console.error('Calculation error:', error);
    }
}

// Display the result with animation
function displayResult(value) {
    const resultElement = document.getElementById('result');
    
    // Format the result to handle decimal places nicely
    let formattedResult;
    if (Number.isInteger(value)) {
        formattedResult = value.toString();
    } else {
        // Round to 6 decimal places and remove trailing zeros
        formattedResult = parseFloat(value.toFixed(6)).toString();
    }
    
    // Add animation class
    resultElement.classList.add('animated');
    resultElement.textContent = formattedResult;
    
    // Remove animation class after animation completes
    setTimeout(() => {
        resultElement.classList.remove('animated');
    }, 500);
}

// Show error message
function showError(message, inputElement = null) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Add error styling to input if provided
    if (inputElement) {
        inputElement.classList.add('error');
    }
    
    // Clear error after 3 seconds
    setTimeout(() => {
        clearErrors();
    }, 3000);
}

// Clear all error states
function clearErrors() {
    const errorElement = document.getElementById('error-message');
    const inputs = document.querySelectorAll('.calculator-input');
    
    errorElement.classList.remove('show');
    errorElement.textContent = '';
    
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Add keyboard support
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to trigger addition (most common operation)
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performOperation('add');
        }
    });
    
    // Clear errors when user starts typing
    const inputs = document.querySelectorAll('.calculator-input');
    inputs.forEach(input => {
        input.addEventListener('input', clearErrors);
    });
    
    // Add keyboard shortcuts for operations
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case '=':
                case '+':
                    event.preventDefault();
                    performOperation('add');
                    break;
                case '-':
                    event.preventDefault();
                    performOperation('subtract');
                    break;
                case '*':
                    event.preventDefault();
                    performOperation('multiply');
                    break;
                case '/':
                    event.preventDefault();
                    performOperation('divide');
                    break;
            }
        }
    });
});

// Legacy function support (keeping old function names for compatibility)
function add() {
    performOperation('add');
}

function subtract() {
    performOperation('subtract');
}

function multiply() {
    performOperation('multiply');
}

function divide() {
    performOperation('divide');
}
