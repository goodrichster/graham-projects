// Modern Polygon Explorer Implementation
// No jQuery or external dependencies - using vanilla JavaScript

// Polygon names mapping
const POLYGON_NAMES = {
    3: 'Triangle',
    4: 'Square',
    5: 'Pentagon',
    6: 'Hexagon',
    7: 'Heptagon',
    8: 'Octagon',
    9: 'Nonagon',
    10: 'Decagon',
    11: 'Undecagon',
    12: 'Dodecagon',
    13: 'Triskaidecagon',
    14: 'Tetradecagon',
    15: 'Pentadecagon',
    16: 'Hexadecagon',
    17: 'Heptadecagon',
    18: 'Octadecagon',
    19: 'Nonadecagon',
    20: 'Icosagon',
    40: 'Tetracontagon'
};

// Get the current number of sides from the select element
function getSides() {
    const selectElement = document.getElementById('polygon-select');
    const sides = parseInt(selectElement.value);
    console.log('Number of sides:', sides);
    return sides;
}

// Calculate the interior angle of a regular polygon
function getAngle(sides) {
    const degrees = 180 * (sides - 2) / sides;
    console.log('Interior angle:', degrees);
    return degrees;
}

// Get polygon name from the number of sides
function getPolygonName(sides) {
    return POLYGON_NAMES[sides] || `${sides}-gon`;
}

// Update the UI when slider changes
function updateFromSlider() {
    const slider = document.getElementById('sides-slider');
    const sides = parseInt(slider.value);
    
    // Update select dropdown
    const select = document.getElementById('polygon-select');
    select.value = sides;
    
    // Update display
    draw();
}

// Update the UI when select dropdown changes
function updateFromSelect() {
    const select = document.getElementById('polygon-select');
    const sides = parseInt(select.value);
    
    // Update slider if the value is within range
    const slider = document.getElementById('sides-slider');
    if (sides >= 3 && sides <= 20) {
        slider.value = sides;
    }
    
    // Update display
    draw();
}

// Main drawing and update function
function draw() {
    const sides = getSides();
    const angle = getAngle(sides);
    const name = getPolygonName(sides);
    
    // Update UI elements
    document.getElementById('sides-display').textContent = sides;
    document.getElementById('sides-info').textContent = sides;
    document.getElementById('angle-info').textContent = angle.toFixed(1) + '°';
    document.getElementById('name-info').textContent = name;
    
    // Draw the polygon and get coordinates
    const coordinates = drawPolygon(sides);
    
    // Update coordinates table
    updateCoordinatesTable(coordinates);
}

// Draw the polygon on the canvas
function drawPolygon(sides) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Polygon settings
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 30; // Leave some margin
    
    // Calculate vertices
    const vertices = [];
    const angleStep = (2 * Math.PI) / sides;
    
    // Start from the top (adjust by -π/2 to start at 12 o'clock)
    const startAngle = -Math.PI / 2;
    
    for (let i = 0; i < sides; i++) {
        const angle = startAngle + (i * angleStep);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        vertices.push({ x: x.toFixed(2), y: y.toFixed(2) });
    }
    
    // Draw the polygon
    ctx.beginPath();
    ctx.moveTo(parseFloat(vertices[0].x), parseFloat(vertices[0].y));
    
    for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(parseFloat(vertices[i].x), parseFloat(vertices[i].y));
    }
    
    ctx.closePath();
    
    // Style the polygon
    ctx.fillStyle = 'rgba(67, 233, 123, 0.3)'; // Semi-transparent green
    ctx.strokeStyle = '#43e97b'; // Solid green border
    ctx.lineWidth = 3;
    
    ctx.fill();
    ctx.stroke();
    
    // Draw vertices as small circles
    vertices.forEach((vertex, index) => {
        ctx.beginPath();
        ctx.arc(parseFloat(vertex.x), parseFloat(vertex.y), 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
        
        // Add vertex labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
            (index + 1).toString(), 
            parseFloat(vertex.x), 
            parseFloat(vertex.y) - 8
        );
    });
    
    return vertices;
}

// Update the coordinates table
function updateCoordinatesTable(coordinates) {
    const tbody = document.getElementById('coordinates-body');
    tbody.innerHTML = ''; // Clear existing rows
    
    coordinates.forEach((vertex, index) => {
        const row = tbody.insertRow();
        
        const vertexCell = row.insertCell(0);
        const xCell = row.insertCell(1);
        const yCell = row.insertCell(2);
        
        vertexCell.textContent = index + 1;
        xCell.textContent = vertex.x;
        yCell.textContent = vertex.y;
    });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial values
    const initialSides = 3;
    document.getElementById('polygon-select').value = initialSides;
    document.getElementById('sides-slider').value = initialSides;
    
    // Draw initial polygon
    draw();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        const currentSides = getSides();
        
        if (event.key === 'ArrowUp' && currentSides < 20) {
            const newSides = currentSides + 1;
            document.getElementById('polygon-select').value = newSides;
            document.getElementById('sides-slider').value = newSides;
            draw();
            event.preventDefault();
        } else if (event.key === 'ArrowDown' && currentSides > 3) {
            const newSides = currentSides - 1;
            document.getElementById('polygon-select').value = newSides;
            document.getElementById('sides-slider').value = newSides;
            draw();
            event.preventDefault();
        }
    });
});

// Legacy function support (keeping old function names for compatibility)
function getSides() {
    const selectElement = document.getElementById('polygon-select');
    const sides = parseInt(selectElement.value);
    return sides;
}

function getAngle(sides) {
    const degrees = 180 * (sides - 2) / sides;
    return degrees;
}

function drawPoly(sides) {
    return drawPolygon(sides);
}