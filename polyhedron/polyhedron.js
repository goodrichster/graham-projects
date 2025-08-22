// Modern Polyhedron Explorer Implementation
// Using vanilla JavaScript with 3D projection and Euler's formula verification

// Global variables for 3D rendering
let rotationX = 15;
let rotationY = 25;
let animationId = null;
let isRotating = false;
let autoRotateSpeed = 1;
let currentPolyhedron = 'tetrahedron';

// Polyhedron data structures with vertices, edges, and faces
const POLYHEDRA = {
    tetrahedron: {
        name: 'Tetrahedron',
        vertices: [
            [0, 1, 0],      // Top vertex
            [-0.866, -0.5, -0.5],  // Bottom vertices
            [0.866, -0.5, -0.5],
            [0, -0.5, 1]
        ],
        edges: [
            [0, 1], [0, 2], [0, 3],  // Top to bottom vertices
            [1, 2], [1, 3], [2, 3]   // Bottom triangle edges
        ],
        faces: [
            [0, 1, 2],  // Front face
            [0, 2, 3],  // Right face
            [0, 3, 1],  // Left face
            [1, 3, 2]   // Bottom face
        ],
        V: 4, E: 6, F: 4
    },
    
    cube: {
        name: 'Cube (Hexahedron)',
        vertices: [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],  // Back face
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]       // Front face
        ],
        edges: [
            [0, 1], [1, 2], [2, 3], [3, 0],  // Back face edges
            [4, 5], [5, 6], [6, 7], [7, 4],  // Front face edges
            [0, 4], [1, 5], [2, 6], [3, 7]   // Connecting edges
        ],
        faces: [
            [0, 1, 2, 3],  // Back face
            [4, 7, 6, 5],  // Front face
            [0, 4, 5, 1],  // Bottom face
            [2, 6, 7, 3],  // Top face
            [0, 3, 7, 4],  // Left face
            [1, 5, 6, 2]   // Right face
        ],
        V: 8, E: 12, F: 6
    },
    
    octahedron: {
        name: 'Octahedron',
        vertices: [
            [0, 0, 1.414],   // Top vertex
            [1, 1, 0], [1, -1, 0], [-1, -1, 0], [-1, 1, 0],  // Middle square
            [0, 0, -1.414]   // Bottom vertex
        ],
        edges: [
            [0, 1], [0, 2], [0, 3], [0, 4],  // Top pyramid edges
            [5, 1], [5, 2], [5, 3], [5, 4],  // Bottom pyramid edges
            [1, 2], [2, 3], [3, 4], [4, 1]   // Middle square edges
        ],
        faces: [
            [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],  // Top faces
            [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]   // Bottom faces
        ],
        V: 6, E: 12, F: 8
    },
    
    dodecahedron: {
        name: 'Dodecahedron',
        vertices: [
            // This is a simplified representation - actual dodecahedron has 20 vertices
            [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
            [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
            [0, 1.618, 0.618], [0, 1.618, -0.618], [0, -1.618, 0.618], [0, -1.618, -0.618],
            [1.618, 0.618, 0], [1.618, -0.618, 0], [-1.618, 0.618, 0], [-1.618, -0.618, 0],
            [0.618, 0, 1.618], [0.618, 0, -1.618], [-0.618, 0, 1.618], [-0.618, 0, -1.618]
        ],
        edges: [], // Simplified - would have 30 edges
        faces: [], // Simplified - would have 12 pentagonal faces
        V: 20, E: 30, F: 12
    },
    
    icosahedron: {
        name: 'Icosahedron',
        vertices: [
            // Golden ratio based vertices - simplified representation
            [0, 1, 1.618], [0, 1, -1.618], [0, -1, 1.618], [0, -1, -1.618],
            [1, 1.618, 0], [1, -1.618, 0], [-1, 1.618, 0], [-1, -1.618, 0],
            [1.618, 0, 1], [1.618, 0, -1], [-1.618, 0, 1], [-1.618, 0, -1]
        ],
        edges: [], // Would have 30 edges
        faces: [], // Would have 20 triangular faces
        V: 12, E: 30, F: 20
    },
    
    'triangular-prism': {
        name: 'Triangular Prism',
        vertices: [
            [-1, -0.577, -1], [1, -0.577, -1], [0, 1.155, -1],  // Bottom triangle
            [-1, -0.577, 1], [1, -0.577, 1], [0, 1.155, 1]      // Top triangle
        ],
        edges: [
            [0, 1], [1, 2], [2, 0],  // Bottom triangle
            [3, 4], [4, 5], [5, 3],  // Top triangle
            [0, 3], [1, 4], [2, 5]   // Connecting edges
        ],
        faces: [
            [0, 1, 2],      // Bottom triangle
            [3, 5, 4],      // Top triangle
            [0, 3, 4, 1],   // Side face 1
            [1, 4, 5, 2],   // Side face 2
            [2, 5, 3, 0]    // Side face 3
        ],
        V: 6, E: 9, F: 5
    },
    
    'pentagonal-prism': {
        name: 'Pentagonal Prism',
        vertices: [
            // Bottom pentagon
            [1, 0, -1], [0.309, 0.951, -1], [-0.809, 0.588, -1], [-0.809, -0.588, -1], [0.309, -0.951, -1],
            // Top pentagon
            [1, 0, 1], [0.309, 0.951, 1], [-0.809, 0.588, 1], [-0.809, -0.588, 1], [0.309, -0.951, 1]
        ],
        edges: [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],  // Bottom pentagon
            [5, 6], [6, 7], [7, 8], [8, 9], [9, 5],  // Top pentagon
            [0, 5], [1, 6], [2, 7], [3, 8], [4, 9]   // Connecting edges
        ],
        faces: [], // 2 pentagons + 5 rectangles = 7 faces
        V: 10, E: 15, F: 7
    },
    
    'square-pyramid': {
        name: 'Square Pyramid',
        vertices: [
            [0, 1.5, 0],                    // Apex
            [-1, 0, -1], [1, 0, -1], [1, 0, 1], [-1, 0, 1]  // Square base
        ],
        edges: [
            [0, 1], [0, 2], [0, 3], [0, 4],  // Apex to base
            [1, 2], [2, 3], [3, 4], [4, 1]   // Base edges
        ],
        faces: [
            [1, 2, 3, 4],  // Square base
            [0, 1, 2],     // Triangle face 1
            [0, 2, 3],     // Triangle face 2
            [0, 3, 4],     // Triangle face 3
            [0, 4, 1]      // Triangle face 4
        ],
        V: 5, E: 8, F: 5
    },
    
    'triangular-pyramid': {
        name: 'Triangular Pyramid',
        vertices: [
            [0, 1, 0],      // Apex
            [-1, -0.5, -0.577], [1, -0.5, -0.577], [0, -0.5, 1.155]  // Triangle base
        ],
        edges: [
            [0, 1], [0, 2], [0, 3],  // Apex to base
            [1, 2], [2, 3], [3, 1]   // Base triangle
        ],
        faces: [
            [1, 2, 3],  // Triangle base
            [0, 1, 2],  // Side face 1
            [0, 2, 3],  // Side face 2
            [0, 3, 1]   // Side face 3
        ],
        V: 4, E: 6, F: 4
    }
};

// All polyhedra for Euler's formula table
const ALL_POLYHEDRA = [
    { name: 'Tetrahedron', V: 4, E: 6, F: 4 },
    { name: 'Cube (Hexahedron)', V: 8, E: 12, F: 6 },
    { name: 'Octahedron', V: 6, E: 12, F: 8 },
    { name: 'Dodecahedron', V: 20, E: 30, F: 12 },
    { name: 'Icosahedron', V: 12, E: 30, F: 20 },
    { name: 'Triangular Prism', V: 6, E: 9, F: 5 },
    { name: 'Pentagonal Prism', V: 10, E: 15, F: 7 },
    { name: 'Square Pyramid', V: 5, E: 8, F: 5 },
    { name: 'Triangular Pyramid', V: 4, E: 6, F: 4 }
];

// 3D projection utilities
function project3D(vertex, canvas) {
    const [x, y, z] = vertex;
    const scale = 80;
    const distance = 5;
    
    // Apply rotations
    const cosX = Math.cos(rotationX * Math.PI / 180);
    const sinX = Math.sin(rotationX * Math.PI / 180);
    const cosY = Math.cos(rotationY * Math.PI / 180);
    const sinY = Math.sin(rotationY * Math.PI / 180);
    
    // Rotate around X-axis
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    
    // Rotate around Y-axis
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;
    
    // 3D to 2D projection
    const perspective = distance / (distance + z2);
    const screenX = canvas.width / 2 + x2 * scale * perspective;
    const screenY = canvas.height / 2 - y1 * scale * perspective;
    
    return [screenX, screenY, z2];
}

// Update polyhedron selection
function updatePolyhedron() {
    const select = document.getElementById('polyhedron-select');
    currentPolyhedron = select.value;
    
    const poly = POLYHEDRA[currentPolyhedron];
    document.getElementById('poly-name').textContent = poly.name;
    document.getElementById('poly-vertices').textContent = poly.V;
    document.getElementById('poly-edges').textContent = poly.E;
    document.getElementById('poly-faces').textContent = poly.F;
    
    const eulerResult = poly.V - poly.E + poly.F;
    document.getElementById('poly-euler').textContent = eulerResult + ' ✓';
    
    drawPolyhedron();
    highlightTableRow();
}

// Update rotation from sliders
function updateRotation() {
    rotationX = parseInt(document.getElementById('rotation-x').value);
    rotationY = parseInt(document.getElementById('rotation-y').value);
    drawPolyhedron();
}

// Draw the 3D polyhedron
function drawPolyhedron() {
    const canvas = document.getElementById('polyhedron-canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const poly = POLYHEDRA[currentPolyhedron];
    const projectedVertices = [];
    
    // Project all vertices
    poly.vertices.forEach(vertex => {
        projectedVertices.push(project3D(vertex, canvas));
    });
    
    // Draw faces (if available and for depth sorting)
    if (poly.faces && poly.faces.length > 0) {
        // Sort faces by average Z-depth for proper rendering
        const facesWithDepth = poly.faces.map(face => {
            const avgZ = face.reduce((sum, vertexIndex) => 
                sum + projectedVertices[vertexIndex][2], 0) / face.length;
            return { face, depth: avgZ };
        }).sort((a, b) => a.depth - b.depth);
        
        // Draw faces (back to front)
        facesWithDepth.forEach(({ face }) => {
            ctx.beginPath();
            ctx.moveTo(projectedVertices[face[0]][0], projectedVertices[face[0]][1]);
            
            for (let i = 1; i < face.length; i++) {
                ctx.lineTo(projectedVertices[face[i]][0], projectedVertices[face[i]][1]);
            }
            ctx.closePath();
            
            ctx.fillStyle = 'rgba(240, 147, 251, 0.2)';
            ctx.fill();
            ctx.strokeStyle = '#f093fb';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }
    
    // Draw edges
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    poly.edges.forEach(edge => {
        const [startIdx, endIdx] = edge;
        const start = projectedVertices[startIdx];
        const end = projectedVertices[endIdx];
        
        ctx.beginPath();
        ctx.moveTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]);
        ctx.stroke();
    });
    
    // Draw vertices
    projectedVertices.forEach((vertex, index) => {
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(vertex[0], vertex[1], 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Label vertices
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText((index + 1).toString(), vertex[0], vertex[1] - 8);
    });
    
    // Add polyhedron name
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(poly.name, canvas.width / 2, 30);
}

// Create Euler's formula table
function createEulerTable() {
    const tbody = document.getElementById('euler-table-body');
    tbody.innerHTML = '';
    
    ALL_POLYHEDRA.forEach(poly => {
        const row = tbody.insertRow();
        row.dataset.polyhedron = poly.name;
        
        const euler = poly.V - poly.E + poly.F;
        
        // Name
        const nameCell = row.insertCell(0);
        nameCell.textContent = poly.name;
        
        // Vertices
        const vCell = row.insertCell(1);
        vCell.textContent = poly.V;
        
        // Edges
        const eCell = row.insertCell(2);
        eCell.textContent = poly.E;
        
        // Faces
        const fCell = row.insertCell(3);
        fCell.textContent = poly.F;
        
        // V - E + F
        const eulerCell = row.insertCell(4);
        eulerCell.textContent = euler;
        
        // Verification
        const verifyCell = row.insertCell(5);
        verifyCell.className = 'verification-column';
        verifyCell.textContent = euler === 2 ? '✓ Valid' : '✗ Invalid';
    });
}

// Highlight current polyhedron in table
function highlightTableRow() {
    const rows = document.querySelectorAll('#euler-table-body tr');
    const currentPoly = POLYHEDRA[currentPolyhedron];
    
    rows.forEach(row => {
        row.classList.remove('current-row');
        if (row.dataset.polyhedron === currentPoly.name) {
            row.classList.add('current-row');
        }
    });
}

// Animation functions
function startRotation() {
    if (isRotating) return;
    isRotating = true;
    animateRotation();
}

function stopRotation() {
    isRotating = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function animateRotation() {
    if (!isRotating) return;
    
    rotationY = (rotationY + autoRotateSpeed) % 360;
    document.getElementById('rotation-y').value = rotationY;
    
    drawPolyhedron();
    animationId = requestAnimationFrame(animateRotation);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Create Euler's formula table
    createEulerTable();
    
    // Set initial polyhedron
    updatePolyhedron();
    
    // Add keyboard controls
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowLeft':
                rotationY = (rotationY - 5 + 360) % 360;
                document.getElementById('rotation-y').value = rotationY;
                drawPolyhedron();
                event.preventDefault();
                break;
            case 'ArrowRight':
                rotationY = (rotationY + 5) % 360;
                document.getElementById('rotation-y').value = rotationY;
                drawPolyhedron();
                event.preventDefault();
                break;
            case 'ArrowUp':
                rotationX = (rotationX - 5 + 360) % 360;
                document.getElementById('rotation-x').value = rotationX;
                drawPolyhedron();
                event.preventDefault();
                break;
            case 'ArrowDown':
                rotationX = (rotationX + 5) % 360;
                document.getElementById('rotation-x').value = rotationX;
                drawPolyhedron();
                event.preventDefault();
                break;
            case ' ':
                if (isRotating) {
                    stopRotation();
                } else {
                    startRotation();
                }
                event.preventDefault();
                break;
        }
    });
    
    // Handle canvas resize
    window.addEventListener('resize', function() {
        setTimeout(drawPolyhedron, 100);
    });
});

// Export functions for global access
window.updatePolyhedron = updatePolyhedron;
window.updateRotation = updateRotation;
window.startRotation = startRotation;
window.stopRotation = stopRotation;