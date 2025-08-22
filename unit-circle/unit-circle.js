// Modern Unit Circle Explorer Implementation
// Using vanilla JavaScript with modern practices

// Global variables
let currentAngle = 0;
let animationId = null;
let isAnimating = false;
let animationSpeed = 0.02;

// Common angles for easy reference
const COMMON_ANGLES = [
    { radians: 0, label: '0', degrees: 0 },
    { radians: Math.PI/6, label: 'π/6', degrees: 30 },
    { radians: Math.PI/4, label: 'π/4', degrees: 45 },
    { radians: Math.PI/3, label: 'π/3', degrees: 60 },
    { radians: Math.PI/2, label: 'π/2', degrees: 90 },
    { radians: 2*Math.PI/3, label: '2π/3', degrees: 120 },
    { radians: 3*Math.PI/4, label: '3π/4', degrees: 135 },
    { radians: 5*Math.PI/6, label: '5π/6', degrees: 150 },
    { radians: Math.PI, label: 'π', degrees: 180 },
    { radians: 7*Math.PI/6, label: '7π/6', degrees: 210 },
    { radians: 5*Math.PI/4, label: '5π/4', degrees: 225 },
    { radians: 4*Math.PI/3, label: '4π/3', degrees: 240 },
    { radians: 3*Math.PI/2, label: '3π/2', degrees: 270 },
    { radians: 5*Math.PI/3, label: '5π/3', degrees: 300 },
    { radians: 7*Math.PI/4, label: '7π/4', degrees: 315 },
    { radians: 11*Math.PI/6, label: '11π/6', degrees: 330 },
    { radians: 2*Math.PI, label: '2π', degrees: 360 }
];

// Utility functions
function formatNumber(num, decimals = 2) {
    if (Math.abs(num) < 1e-10) return '0.00';
    return num.toFixed(decimals);
}

// Function to get exact trigonometric values as fractions/radicals
function getExactValue(angle, func) {
    const tolerance = 0.001;
    const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    // Define exact values for common angles
    const exactValues = {
        0: { sin: '0', cos: '1', x: '1', y: '0' },
        [Math.PI/6]: { sin: '1/2', cos: '√3/2', x: '√3/2', y: '1/2' },
        [Math.PI/4]: { sin: '√2/2', cos: '√2/2', x: '√2/2', y: '√2/2' },
        [Math.PI/3]: { sin: '√3/2', cos: '1/2', x: '1/2', y: '√3/2' },
        [Math.PI/2]: { sin: '1', cos: '0', x: '0', y: '1' },
        [2*Math.PI/3]: { sin: '√3/2', cos: '-1/2', x: '-1/2', y: '√3/2' },
        [3*Math.PI/4]: { sin: '√2/2', cos: '-√2/2', x: '-√2/2', y: '√2/2' },
        [5*Math.PI/6]: { sin: '1/2', cos: '-√3/2', x: '-√3/2', y: '1/2' },
        [Math.PI]: { sin: '0', cos: '-1', x: '-1', y: '0' },
        [7*Math.PI/6]: { sin: '-1/2', cos: '-√3/2', x: '-√3/2', y: '-1/2' },
        [5*Math.PI/4]: { sin: '-√2/2', cos: '-√2/2', x: '-√2/2', y: '-√2/2' },
        [4*Math.PI/3]: { sin: '-√3/2', cos: '-1/2', x: '-1/2', y: '-√3/2' },
        [3*Math.PI/2]: { sin: '-1', cos: '0', x: '0', y: '-1' },
        [5*Math.PI/3]: { sin: '-√3/2', cos: '1/2', x: '1/2', y: '-√3/2' },
        [7*Math.PI/4]: { sin: '-√2/2', cos: '√2/2', x: '√2/2', y: '-√2/2' },
        [11*Math.PI/6]: { sin: '-1/2', cos: '√3/2', x: '√3/2', y: '-1/2' },
        [2*Math.PI]: { sin: '0', cos: '1', x: '1', y: '0' }
    };
    
    // Check if the angle matches any exact value
    for (const [exactAngle, values] of Object.entries(exactValues)) {
        if (Math.abs(normalizedAngle - parseFloat(exactAngle)) < tolerance) {
            return values[func] || formatNumber(func === 'sin' ? Math.sin(angle) : 
                                              func === 'cos' ? Math.cos(angle) :
                                              func === 'x' ? Math.cos(angle) :
                                              Math.sin(angle));
        }
    }
    
    // Return decimal approximation if no exact match
    const value = func === 'sin' ? Math.sin(angle) : 
                  func === 'cos' ? Math.cos(angle) :
                  func === 'x' ? Math.cos(angle) :
                  Math.sin(angle);
    return formatNumber(value);
}

// Function to get exact coordinate representation
function getExactCoordinate(x, y) {
    const exactX = getExactValue(currentAngle, 'x');
    const exactY = getExactValue(currentAngle, 'y');
    return `(${exactX}, ${exactY})`;
}

function formatAngle(radians) {
    // Try to express as a fraction of π if close to common values
    const piRatio = radians / Math.PI;
    const tolerance = 0.001;
    
    // Check for common fractions
    const commonFractions = [
        { value: 0, label: '0' },
        { value: 1/6, label: 'π/6' },
        { value: 1/4, label: 'π/4' },
        { value: 1/3, label: 'π/3' },
        { value: 1/2, label: 'π/2' },
        { value: 2/3, label: '2π/3' },
        { value: 3/4, label: '3π/4' },
        { value: 5/6, label: '5π/6' },
        { value: 1, label: 'π' },
        { value: 7/6, label: '7π/6' },
        { value: 5/4, label: '5π/4' },
        { value: 4/3, label: '4π/3' },
        { value: 3/2, label: '3π/2' },
        { value: 5/3, label: '5π/3' },
        { value: 7/4, label: '7π/4' },
        { value: 11/6, label: '11π/6' },
        { value: 2, label: '2π' }
    ];
    
    for (const fraction of commonFractions) {
        if (Math.abs(piRatio - fraction.value) < tolerance) {
            return fraction.label;
        }
    }
    
    return formatNumber(radians);
}

// Function to format angle with both decimal and π representation
function formatAngleWithPi(radians) {
    const piRatio = radians / Math.PI;
    const tolerance = 0.001;
    
    // Check for common fractions
    const commonFractions = [
        { value: 0, label: '0' },
        { value: 1/6, label: 'π/6' },
        { value: 1/4, label: 'π/4' },
        { value: 1/3, label: 'π/3' },
        { value: 1/2, label: 'π/2' },
        { value: 2/3, label: '2π/3' },
        { value: 3/4, label: '3π/4' },
        { value: 5/6, label: '5π/6' },
        { value: 1, label: 'π' },
        { value: 7/6, label: '7π/6' },
        { value: 5/4, label: '5π/4' },
        { value: 4/3, label: '4π/3' },
        { value: 3/2, label: '3π/2' },
        { value: 5/3, label: '5π/3' },
        { value: 7/4, label: '7π/4' },
        { value: 11/6, label: '11π/6' },
        { value: 2, label: '2π' }
    ];
    
    // First check for exact matches
    for (const fraction of commonFractions) {
        if (Math.abs(piRatio - fraction.value) < tolerance) {
            return `${formatNumber(radians)} (${fraction.label})`;
        }
    }
    
    // If no exact match, show decimal and simplified π representation
    if (Math.abs(piRatio) < tolerance) {
        return `${formatNumber(radians)} (0)`;
    } else if (Math.abs(piRatio - 1) < tolerance) {
        return `${formatNumber(radians)} (π)`;
    } else if (Math.abs(piRatio - 2) < tolerance) {
        return `${formatNumber(radians)} (2π)`;
    } else if (Math.abs(piRatio % 1) < tolerance && Math.abs(piRatio) > tolerance) {
        // Whole number multiples of π
        const multiplier = Math.round(piRatio);
        return `${formatNumber(radians)} (${multiplier}π)`;
    } else {
        // General case - show decimal with approximate π value
        return `${formatNumber(radians)} (≈${formatNumber(piRatio)}π)`;
    }
}

function radiansToDegrees(radians) {
    return (radians * 180 / Math.PI) % 360;
}

// Set angle from different sources
function setAngle(angle) {
    currentAngle = angle;
    updateUI();
    drawUnitCircle();
    highlightTableRow();
}

function updateFromInput() {
    const input = document.getElementById('angle-input');
    const angle = parseFloat(input.value) || 0;
    
    // Update slider
    const slider = document.getElementById('angle-slider');
    slider.value = angle % (2 * Math.PI);
    
    setAngle(angle);
}

function updateFromSlider() {
    const slider = document.getElementById('angle-slider');
    const angle = parseFloat(slider.value);
    
    // Update input
    const input = document.getElementById('angle-input');
    input.value = formatNumber(angle);
    
    setAngle(angle);
}

// Update all UI elements
function updateUI() {
    const cos = Math.cos(currentAngle);
    const sin = Math.sin(currentAngle);
    const tan = Math.abs(cos) > 1e-10 ? sin / cos : (sin > 0 ? 'Infinity' : '-Infinity');
    
    // Get exact values
    const exactCos = getExactValue(currentAngle, 'cos');
    const exactSin = getExactValue(currentAngle, 'sin');
    
    // Calculate exact tan
    let exactTan;
    if (exactCos === '0') {
        exactTan = exactSin === '0' ? 'undefined' : (parseFloat(exactSin) > 0 ? '∞' : '-∞');
    } else if (exactSin === '0') {
        exactTan = '0';
    } else if (exactCos === '1') {
        exactTan = exactSin;
    } else if (exactCos === '-1') {
        exactTan = exactSin.startsWith('-') ? exactSin.substring(1) : '-' + exactSin;
    } else if (exactCos === '√3/2' && exactSin === '1/2') {
        exactTan = '√3/3';
    } else if (exactCos === '1/2' && exactSin === '√3/2') {
        exactTan = '√3';
    } else if (exactCos === '√2/2' && exactSin === '√2/2') {
        exactTan = '1';
    } else if (exactCos === '-1/2' && exactSin === '√3/2') {
        exactTan = '-√3';
    } else if (exactCos === '-√2/2' && exactSin === '√2/2') {
        exactTan = '-1';
    } else if (exactCos === '-√3/2' && exactSin === '1/2') {
        exactTan = '-√3/3';
    } else if (exactCos === '-√3/2' && exactSin === '-1/2') {
        exactTan = '√3/3';
    } else if (exactCos === '-1/2' && exactSin === '-√3/2') {
        exactTan = '√3';
    } else if (exactCos === '-√2/2' && exactSin === '-√2/2') {
        exactTan = '1';
    } else if (exactCos === '1/2' && exactSin === '-√3/2') {
        exactTan = '-√3';
    } else if (exactCos === '√2/2' && exactSin === '-√2/2') {
        exactTan = '-1';
    } else if (exactCos === '√3/2' && exactSin === '-1/2') {
        exactTan = '-√3/3';
    } else {
        exactTan = typeof tan === 'number' ? formatNumber(tan) : tan;
    }
    
    // Update display elements
    document.getElementById('angle-display').textContent = formatAngleWithPi(currentAngle);
    document.getElementById('current-theta').textContent = formatAngleWithPi(currentAngle);
    document.getElementById('current-cos').textContent = exactCos;
    document.getElementById('current-sin').textContent = exactSin;
    document.getElementById('current-tan').textContent = exactTan;
}

// Draw the unit circle
function drawUnitCircle() {
    const canvas = document.getElementById('unit-circle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    // Calculate current point
    const x = Math.cos(currentAngle);
    const y = Math.sin(currentAngle);
    const pointX = centerX + x * radius;
    const pointY = centerY - y * radius; // Flip Y for canvas coordinates
    
    // Draw axes
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // X-axis
    ctx.moveTo(20, centerY);
    ctx.lineTo(canvas.width - 20, centerY);
    // Y-axis
    ctx.moveTo(centerX, 20);
    ctx.lineTo(centerX, canvas.height - 20);
    ctx.stroke();
    
    // Draw unit circle
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw angle arc
    if (Math.abs(currentAngle) > 0.01) {
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.3, 0, -currentAngle, currentAngle < 0);
        ctx.stroke();
    }
    
    // Draw radius line
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(pointX, pointY);
    ctx.stroke();
    
    // Draw coordinate lines
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    // Vertical line (sin)
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineTo(pointX, centerY);
    ctx.stroke();
    
    // Horizontal line (cos)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(pointX, centerY);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Draw the point
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(pointX, pointY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    
    // Axis labels
    ctx.fillText('1', centerX + radius + 15, centerY + 5);
    ctx.fillText('-1', centerX - radius - 15, centerY + 5);
    ctx.fillText('i', centerX + 5, centerY - radius - 10);
    ctx.fillText('-i', centerX + 5, centerY + radius + 20);
    
    // Point coordinates
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'left';
    const exactCoordinates = getExactCoordinate(x, y);
    ctx.fillText(exactCoordinates, pointX + 10, pointY - 10);
    
    // Angle label
    if (Math.abs(currentAngle) > 0.01) {
        ctx.fillStyle = '#667eea';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        const labelRadius = radius * 0.4;
        const labelX = centerX + Math.cos(currentAngle / 2) * labelRadius;
        const labelY = centerY - Math.sin(currentAngle / 2) * labelRadius;
        ctx.fillText('θ', labelX, labelY);
    }
    
    // Value labels
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 12px monospace';
    
    // cos label
    ctx.textAlign = 'center';
    const exactCos = getExactValue(currentAngle, 'cos');
    ctx.fillText(`cos(θ) = ${exactCos}`, (centerX + pointX) / 2, centerY + 20);
    
    // sin label
    ctx.textAlign = 'left';
    const sinLabelX = pointX + 10;
    const sinLabelY = (pointY + centerY) / 2;
    const exactSin = getExactValue(currentAngle, 'sin');
    ctx.fillText(`sin(θ) = ${exactSin}`, sinLabelX, sinLabelY);
}

// Create the values table
function createValuesTable() {
    const tbody = document.getElementById('values-table-body');
    tbody.innerHTML = '';
    
    COMMON_ANGLES.forEach((angle, index) => {
        const row = tbody.insertRow();
        row.dataset.angle = angle.radians;
        
        const cos = Math.cos(angle.radians);
        const sin = Math.sin(angle.radians);
        const tan = Math.abs(cos) > 1e-10 ? sin / cos : '∞';
        
        // Get exact values
        const exactCos = getExactValue(angle.radians, 'cos');
        const exactSin = getExactValue(angle.radians, 'sin');
        const exactX = getExactValue(angle.radians, 'x');
        const exactY = getExactValue(angle.radians, 'y');
        
        // Calculate exact tan
        let exactTan;
        if (exactCos === '0') {
            exactTan = '∞';
        } else if (exactSin === '0') {
            exactTan = '0';
        } else if (exactCos === '1') {
            exactTan = exactSin;
        } else if (exactCos === '-1') {
            exactTan = exactSin.startsWith('-') ? exactSin.substring(1) : '-' + exactSin;
        } else if (exactCos === '√3/2' && exactSin === '1/2') {
            exactTan = '√3/3';
        } else if (exactCos === '1/2' && exactSin === '√3/2') {
            exactTan = '√3';
        } else if (exactCos === '√2/2' && exactSin === '√2/2') {
            exactTan = '1';
        } else if (exactCos === '-1/2' && exactSin === '√3/2') {
            exactTan = '-√3';
        } else if (exactCos === '-√2/2' && exactSin === '√2/2') {
            exactTan = '-1';
        } else if (exactCos === '-√3/2' && exactSin === '1/2') {
            exactTan = '-√3/3';
        } else if (exactCos === '-√3/2' && exactSin === '-1/2') {
            exactTan = '√3/3';
        } else if (exactCos === '-1/2' && exactSin === '-√3/2') {
            exactTan = '√3';
        } else if (exactCos === '-√2/2' && exactSin === '-√2/2') {
            exactTan = '1';
        } else if (exactCos === '1/2' && exactSin === '-√3/2') {
            exactTan = '-√3';
        } else if (exactCos === '√2/2' && exactSin === '-√2/2') {
            exactTan = '-1';
        } else if (exactCos === '√3/2' && exactSin === '-1/2') {
            exactTan = '-√3/3';
        } else {
            exactTan = typeof tan === 'number' ? formatNumber(tan) : tan;
        }
        
        // θ (radians)
        const radiansCell = row.insertCell(0);
        if (angle.label === '0') {
            radiansCell.textContent = '0';
        } else {
            radiansCell.textContent = `${formatNumber(angle.radians)} (${angle.label})`;
        }
        
        // θ (degrees)
        const degreesCell = row.insertCell(1);
        degreesCell.textContent = angle.degrees + '°';
        
        // x
        const xCell = row.insertCell(2);
        xCell.textContent = exactX;
        
        // y
        const yCell = row.insertCell(3);
        yCell.textContent = exactY;
        
        // sin(θ)
        const sinCell = row.insertCell(4);
        sinCell.textContent = exactSin;
        
        // cos(θ)
        const cosCell = row.insertCell(5);
        cosCell.textContent = exactCos;
        
        // tan(θ)
        const tanCell = row.insertCell(6);
        tanCell.textContent = exactTan;
    });
}

// Highlight the current row in the table
function highlightTableRow() {
    const rows = document.querySelectorAll('#values-table-body tr');
    const tolerance = 0.01;
    
    rows.forEach(row => {
        row.classList.remove('current-row');
        const rowAngle = parseFloat(row.dataset.angle);
        
        // Check if current angle is close to this row's angle
        const normalizedCurrent = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const normalizedRow = ((rowAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        
        if (Math.abs(normalizedCurrent - normalizedRow) < tolerance || 
            Math.abs(normalizedCurrent - normalizedRow - 2 * Math.PI) < tolerance ||
            Math.abs(normalizedCurrent - normalizedRow + 2 * Math.PI) < tolerance) {
            row.classList.add('current-row');
        }
    });
}

// Animation functions
function startAnimation() {
    if (isAnimating) return;
    
    isAnimating = true;
    animate();
}

function stopAnimation() {
    isAnimating = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function animate() {
    if (!isAnimating) return;
    
    currentAngle += animationSpeed;
    
    // Update controls
    const input = document.getElementById('angle-input');
    const slider = document.getElementById('angle-slider');
    
    input.value = formatNumber(currentAngle);
    slider.value = (currentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    
    updateUI();
    drawUnitCircle();
    highlightTableRow();
    
    animationId = requestAnimationFrame(animate);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Create the values table
    createValuesTable();
    
    // Set initial angle
    setAngle(0);
    
    // Add keyboard controls
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            setAngle(currentAngle - 0.1);
            event.preventDefault();
        } else if (event.key === 'ArrowRight') {
            setAngle(currentAngle + 0.1);
            event.preventDefault();
        } else if (event.key === ' ') {
            if (isAnimating) {
                stopAnimation();
            } else {
                startAnimation();
            }
            event.preventDefault();
        }
    });
    
    // Handle canvas resize
    window.addEventListener('resize', function() {
        setTimeout(drawUnitCircle, 100);
    });
});

// Export functions for global access (for onclick handlers)
window.setAngle = setAngle;
window.updateFromInput = updateFromInput;
window.updateFromSlider = updateFromSlider;
window.startAnimation = startAnimation;
window.stopAnimation = stopAnimation;