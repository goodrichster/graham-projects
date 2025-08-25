// Algebra 2 Simulations - Graham's Mathematical Applications
// Interactive mathematical modeling and analysis for Algebra 2 curriculum

class Algebra2Simulations {
    constructor() {
        this.currentSimulation = 'functions-features';
        this.canvases = {};
        this.contexts = {};
        this.animationFrames = {};
        
        // Wait for DOM to be fully loaded before initializing canvases
        setTimeout(() => {
            this.initializeCanvases();
            this.setupEventListeners();
            this.resetSimulation('functions-features');
        }, 100);
    }

    initializeCanvases() {
        const canvasIds = ['functionsCanvas', 'expressionCanvas', 'quadraticCanvas', 'expLogCanvas', 
                          'transformationCanvas', 'inverseCanvas', 'polynomialCanvas', 'trigCanvas', 'probabilityCanvas'];
        
        canvasIds.forEach(id => {
            const canvas = document.getElementById(id);
            if (canvas) {
                // Set canvas size to match its container
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                
                this.canvases[id] = canvas;
                const ctx = canvas.getContext('2d');
                this.contexts[id] = ctx;
                
                // Set up coordinate system
                ctx.save(); // Save the original state
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.scale(1, -1); // Flip y-axis for mathematical coordinate system
            }
        });
    }

    setupEventListeners() {
        // Keyboard controls for enhanced interactivity
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.adjustParameter(-0.1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.adjustParameter(0.1);
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAnimation();
                    break;
            }
        });
    }

    switchCanvas(canvasId) {
        // Reset and reinitialize the specific canvas
        const canvas = this.canvases[canvasId];
        const ctx = this.contexts[canvasId];
        
        if (canvas && ctx) {
            // Reset canvas size
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            // Reset context transformations
            ctx.restore();
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(1, -1); // Flip y-axis for mathematical coordinate system
        }
    }

    resetSimulation(simType) {
        this.currentSimulation = simType;
        
        switch(simType) {
            case 'functions-features':
                document.getElementById('functionType').value = 'linear';
                document.getElementById('paramA').value = '1';
                document.getElementById('paramB').value = '0';
                this.switchCanvas('functionsCanvas');
                this.updateFunctionFeatures();
                break;
            case 'expressions':
                document.getElementById('operationType').value = 'polynomial-add';
                document.getElementById('expression1').value = 'x^2 + 3x + 2';
                document.getElementById('expression2').value = '2x + 1';
                this.switchCanvas('expressionCanvas');
                this.updateExpressionOperation();
                break;
            case 'quadratics':
                document.getElementById('quadraticA').value = '1';
                document.getElementById('quadraticB').value = '0';
                document.getElementById('quadraticC').value = '0';
                this.switchCanvas('quadraticCanvas');
                this.updateQuadratic();
                break;
            case 'exponentials':
                document.getElementById('expLogType').value = 'exponential';
                document.getElementById('expLogBase').value = '2';
                this.switchCanvas('expLogCanvas');
                this.updateExpLog();
                break;
            case 'transformations':
                document.getElementById('baseFunction').value = 'quadratic';
                document.getElementById('verticalShift').value = '0';
                document.getElementById('horizontalShift').value = '0';
                this.switchCanvas('transformationCanvas');
                this.updateTransformation();
                break;
            case 'inverses':
                document.getElementById('inverseFunction').value = 'linear';
                this.switchCanvas('inverseCanvas');
                this.updateInverse();
                break;
            case 'polynomials':
                document.getElementById('polynomialType').value = 'polynomial';
                document.getElementById('polynomialFunction').value = 'x^3 - 2x^2 - x + 2';
                this.switchCanvas('polynomialCanvas');
                this.updatePolynomial();
                break;
            case 'trigonometric':
                document.getElementById('trigFunction').value = 'sine';
                document.getElementById('amplitude').value = '1';
                this.switchCanvas('trigCanvas');
                this.updateTrigonometric();
                break;
            case 'probability':
                document.getElementById('distributionType').value = 'normal';
                document.getElementById('param1').value = '0';
                document.getElementById('param2').value = '1';
                this.switchCanvas('probabilityCanvas');
                this.updateProbability();
                break;
        }
    }

    // Functions & Features Simulation
    updateFunctionFeatures() {
        const canvas = this.canvases.functionsCanvas;
        const ctx = this.contexts.functionsCanvas;
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const functionType = document.getElementById('functionType').value;
        const a = parseFloat(document.getElementById('paramA').value) || 1;
        const b = parseFloat(document.getElementById('paramB').value) || 0;

        // Draw axes
        this.drawAxes(ctx, canvas);

        // Draw function based on type
        this.drawFunction(ctx, canvas, functionType, a, b);

        // Update analysis
        this.analyzeFunctionFeatures();
    }

    drawFunction(ctx, canvas, type, a, b, c = 0, d = 0) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.1) {
            let y;
            
            switch(type) {
                case 'linear':
                    y = a * x + b;
                    break;
                case 'quadratic':
                    y = a * x * x + b * x + c;
                    break;
                case 'cubic':
                    y = a * x * x * x + b * x * x + c * x + d;
                    break;
                case 'exponential':
                    if (x > -10) y = a * Math.pow(Math.abs(b) || 2, x);
                    else continue;
                    break;
                case 'logarithmic':
                    if (x > 0) y = a * Math.log(x) / Math.log(Math.abs(b) || 10);
                    else continue;
                    break;
                case 'rational':
                    if (Math.abs(x) > 0.1) y = a / x + b;
                    else continue;
                    break;
                default:
                    y = x;
            }
            
            if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
                const canvasX = x * scale;
                const canvasY = y * scale;

                if (first) {
                    ctx.moveTo(canvasX, canvasY);
                    first = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            } else {
                first = true;
            }
        }
        ctx.stroke();
    }

    analyzeFunctionFeatures() {
        const functionType = document.getElementById('functionType').value;
        const a = parseFloat(document.getElementById('paramA').value) || 1;
        const b = parseFloat(document.getElementById('paramB').value) || 0;
        
        const analysisDiv = document.getElementById('functionAnalysis');
        let analysis = '';

        switch(functionType) {
            case 'linear':
                analysis = `
                    <div class="step-display">
                        <strong>Linear Function: f(x) = ${a}x + ${b}</strong><br>
                        Slope: ${a}<br>
                        Y-intercept: ${b}<br>
                        Domain: All real numbers<br>
                        Range: All real numbers<br>
                        ${a > 0 ? 'Increasing' : a < 0 ? 'Decreasing' : 'Constant'}
                    </div>
                `;
                break;
            case 'quadratic':
                const vertex = -b / (2 * a);
                const vertexY = a * vertex * vertex + b * vertex;
                analysis = `
                    <div class="step-display">
                        <strong>Quadratic Function: f(x) = ${a}x² + ${b}x</strong><br>
                        Vertex: (${vertex.toFixed(2)}, ${vertexY.toFixed(2)})<br>
                        Axis of symmetry: x = ${vertex.toFixed(2)}<br>
                        Opens ${a > 0 ? 'upward' : 'downward'}<br>
                        Domain: All real numbers<br>
                        Range: ${a > 0 ? `y ≥ ${vertexY.toFixed(2)}` : `y ≤ ${vertexY.toFixed(2)}`}
                    </div>
                `;
                break;
            case 'exponential':
                analysis = `
                    <div class="step-display">
                        <strong>Exponential Function: f(x) = ${a} × ${Math.abs(b) || 2}^x</strong><br>
                        Base: ${Math.abs(b) || 2}<br>
                        Initial value: ${a}<br>
                        ${a > 0 && b > 1 ? 'Exponential growth' : 'Exponential decay'}<br>
                        Domain: All real numbers<br>
                        Range: y > 0<br>
                        Horizontal asymptote: y = 0
                    </div>
                `;
                break;
            default:
                analysis = '<div class="step-display">Select a function type to analyze.</div>';
        }

        analysisDiv.innerHTML = analysis;
    }

    findDomainRange() {
        this.analyzeFunctionFeatures();
    }

    // Expression Operations Simulation
    updateExpressionOperation() {
        const canvas = this.canvases.expressionCanvas;
        const ctx = this.contexts.expressionCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const operationType = document.getElementById('operationType').value;
        const expr1 = document.getElementById('expression1').value;
        const expr2 = document.getElementById('expression2').value;

        this.drawAxes(ctx, canvas);
        
        // Visualize expressions as functions
        this.drawExpressionVisualization(ctx, canvas, expr1, '#2196F3');
        this.drawExpressionVisualization(ctx, canvas, expr2, '#4CAF50');

        this.performOperation();
    }

    drawExpressionVisualization(ctx, canvas, expression, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.1) {
            try {
                const y = this.evaluateExpression(expression, x);
                if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
                    const canvasX = x * scale;
                    const canvasY = y * scale;

                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                } else {
                    first = true;
                }
            } catch (e) {
                first = true;
            }
        }
        ctx.stroke();
    }

    evaluateExpression(expression, x) {
        try {
            // Replace x with the value and handle mathematical notation
            let expr = expression
                .replace(/\^/g, '**')
                .replace(/x/g, `(${x})`)
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/ln/g, 'Math.log')
                .replace(/log/g, 'Math.log10')
                .replace(/sqrt/g, 'Math.sqrt');

            return eval(expr);
        } catch (e) {
            return NaN;
        }
    }

    performOperation() {
        const operationType = document.getElementById('operationType').value;
        const expr1 = document.getElementById('expression1').value;
        const expr2 = document.getElementById('expression2').value;
        
        const resultDiv = document.getElementById('operationResult');
        let result = '';

        switch(operationType) {
            case 'polynomial-add':
                result = `
                    <div class="step-display">
                        <strong>Polynomial Addition:</strong><br>
                        (${expr1}) + (${expr2})<br>
                        <em>Combine like terms to get the result</em>
                    </div>
                `;
                break;
            case 'polynomial-multiply':
                result = `
                    <div class="step-display">
                        <strong>Polynomial Multiplication:</strong><br>
                        (${expr1}) × (${expr2})<br>
                        <em>Use distributive property (FOIL for binomials)</em>
                    </div>
                `;
                break;
            case 'rational-simplify':
                result = `
                    <div class="step-display">
                        <strong>Rational Expression:</strong><br>
                        (${expr1}) / (${expr2})<br>
                        <em>Factor and cancel common factors</em>
                    </div>
                `;
                break;
            case 'radical-operations':
                result = `
                    <div class="step-display">
                        <strong>Radical Operations:</strong><br>
                        √(${expr1}) operation √(${expr2})<br>
                        <em>Simplify radicals and combine</em>
                    </div>
                `;
                break;
        }

        resultDiv.innerHTML = result;
    }

    // Quadratic Functions Simulation
    updateQuadratic() {
        const canvas = this.canvases.quadraticCanvas;
        const ctx = this.contexts.quadraticCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const a = parseFloat(document.getElementById('quadraticA').value) || 1;
        const b = parseFloat(document.getElementById('quadraticB').value) || 0;
        const c = parseFloat(document.getElementById('quadraticC').value) || 0;

        this.drawAxes(ctx, canvas);
        this.drawFunction(ctx, canvas, 'quadratic', a, b, c);
        this.analyzeQuadratic();
    }

    analyzeQuadratic() {
        const a = parseFloat(document.getElementById('quadraticA').value) || 1;
        const b = parseFloat(document.getElementById('quadraticB').value) || 0;
        const c = parseFloat(document.getElementById('quadraticC').value) || 0;
        
        const analysisDiv = document.getElementById('quadraticAnalysis');
        
        // Calculate vertex
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + c;
        
        // Calculate discriminant
        const discriminant = b * b - 4 * a * c;
        
        // Calculate roots if they exist
        let rootsText = '';
        if (discriminant > 0) {
            const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            rootsText = `Two real roots: x = ${root1.toFixed(3)}, x = ${root2.toFixed(3)}`;
        } else if (discriminant === 0) {
            const root = -b / (2 * a);
            rootsText = `One real root: x = ${root.toFixed(3)}`;
        } else {
            rootsText = 'No real roots (complex roots)';
        }
        
        const analysis = `
            <div class="step-display">
                <strong>Quadratic Function: f(x) = ${a}x² + ${b}x + ${c}</strong><br>
                <strong>Vertex:</strong> (${vertexX.toFixed(3)}, ${vertexY.toFixed(3)})<br>
                <strong>Axis of symmetry:</strong> x = ${vertexX.toFixed(3)}<br>
                <strong>Opens:</strong> ${a > 0 ? 'Upward (minimum)' : 'Downward (maximum)'}<br>
                <strong>Y-intercept:</strong> (0, ${c})<br>
                <strong>Discriminant:</strong> ${discriminant.toFixed(3)}<br>
                <strong>Roots:</strong> ${rootsText}<br>
                <strong>Domain:</strong> All real numbers<br>
                <strong>Range:</strong> ${a > 0 ? `y ≥ ${vertexY.toFixed(3)}` : `y ≤ ${vertexY.toFixed(3)}`}
            </div>
        `;
        
        analysisDiv.innerHTML = analysis;
    }

    // Exponential & Logarithmic Functions
    updateExpLog() {
        const canvas = this.canvases.expLogCanvas;
        const ctx = this.contexts.expLogCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const type = document.getElementById('expLogType').value;
        const base = parseFloat(document.getElementById('expLogBase').value) || 2;

        this.drawAxes(ctx, canvas);
        
        if (type === 'exponential') {
            this.drawFunction(ctx, canvas, 'exponential', 1, base);
        } else {
            this.drawFunction(ctx, canvas, 'logarithmic', 1, base);
        }
        
        this.analyzeExpLog();
    }

    analyzeExpLog() {
        const type = document.getElementById('expLogType').value;
        const base = parseFloat(document.getElementById('expLogBase').value) || 2;
        
        const analysisDiv = document.getElementById('expLogAnalysis');
        let analysis = '';
        
        if (type === 'exponential') {
            analysis = `
                <div class="step-display">
                    <strong>Exponential Function: f(x) = ${base}^x</strong><br>
                    <strong>Base:</strong> ${base}<br>
                    <strong>Domain:</strong> All real numbers<br>
                    <strong>Range:</strong> y > 0<br>
                    <strong>Y-intercept:</strong> (0, 1)<br>
                    <strong>Horizontal asymptote:</strong> y = 0<br>
                    <strong>Behavior:</strong> ${base > 1 ? 'Exponential growth' : base < 1 ? 'Exponential decay' : 'Constant function'}<br>
                    <strong>Inverse:</strong> f⁻¹(x) = log₍${base}₎(x)
                </div>
            `;
        } else {
            analysis = `
                <div class="step-display">
                    <strong>Logarithmic Function: f(x) = log₍${base}₎(x)</strong><br>
                    <strong>Base:</strong> ${base}<br>
                    <strong>Domain:</strong> x > 0<br>
                    <strong>Range:</strong> All real numbers<br>
                    <strong>X-intercept:</strong> (1, 0)<br>
                    <strong>Vertical asymptote:</strong> x = 0<br>
                    <strong>Behavior:</strong> ${base > 1 ? 'Increasing' : 'Decreasing'}<br>
                    <strong>Inverse:</strong> f⁻¹(x) = ${base}^x
                </div>
            `;
        }
        
        analysisDiv.innerHTML = analysis;
    }

    // Utility Functions
    drawAxes(ctx, canvas) {
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(-canvas.width/2, 0);
        ctx.lineTo(canvas.width/2, 0);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(0, -canvas.height/2);
        ctx.lineTo(0, canvas.height/2);
        ctx.stroke();

        // Grid lines
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;
        const scale = 40;
        
        // Vertical grid lines
        for (let x = -canvas.width/2; x <= canvas.width/2; x += scale) {
            if (x !== 0) {
                ctx.beginPath();
                ctx.moveTo(x, -canvas.height/2);
                ctx.lineTo(x, canvas.height/2);
                ctx.stroke();
            }
        }
        
        // Horizontal grid lines
        for (let y = -canvas.height/2; y <= canvas.height/2; y += scale) {
            if (y !== 0) {
                ctx.beginPath();
                ctx.moveTo(-canvas.width/2, y);
                ctx.lineTo(canvas.width/2, y);
                ctx.stroke();
            }
        }

        // Axis labels
        ctx.save();
        ctx.scale(1, -1); // Flip text back to normal
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis numbers
        for (let x = -canvas.width/2 + scale; x < canvas.width/2; x += scale) {
            const value = Math.round((x / scale) * 10) / 10;
            if (value !== 0) {
                ctx.fillText(value.toString(), x, 15);
            }
        }
        
        // Y-axis numbers
        ctx.textAlign = 'right';
        for (let y = -canvas.height/2 + scale; y < canvas.height/2; y += scale) {
            const value = Math.round((-y / scale) * 10) / 10;
            if (value !== 0) {
                ctx.fillText(value.toString(), -5, y + 4);
            }
        }
        
        ctx.restore();
    }

    adjustParameter(delta) {
        switch(this.currentSimulation) {
            case 'functions-features':
                const paramA = document.getElementById('paramA');
                const newValue = parseFloat(paramA.value) + delta;
                paramA.value = newValue.toFixed(1);
                this.updateFunctionFeatures();
                break;
        }
    }

    toggleAnimation() {
        // Implement animation toggle for current simulation
        switch(this.currentSimulation) {
            case 'functions-features':
                this.animateFunctionTransformation();
                break;
        }
    }

    animateFunctionTransformation() {
        // Add animation logic here
        console.log('Animation started for function transformation');
    }

    // Function Transformations
    updateTransformation() {
        const canvas = this.canvases.transformationCanvas;
        const ctx = this.contexts.transformationCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const baseFunc = document.getElementById('baseFunction').value;
        const vShift = parseFloat(document.getElementById('verticalShift').value) || 0;
        const hShift = parseFloat(document.getElementById('horizontalShift').value) || 0;
        
        // Update display values
        document.getElementById('verticalShiftValue').textContent = vShift.toFixed(1);
        document.getElementById('horizontalShiftValue').textContent = hShift.toFixed(1);

        this.drawAxes(ctx, canvas);
        
        // Draw original function
        this.drawTransformedFunction(ctx, canvas, baseFunc, 0, 0, '#ccc', 2);
        
        // Draw transformed function
        this.drawTransformedFunction(ctx, canvas, baseFunc, hShift, vShift, '#2196F3', 3);
        
        this.analyzeTransformation();
    }

    drawTransformedFunction(ctx, canvas, baseFunc, h, k, color, lineWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.1) {
            let y;
            const transformedX = x - h; // Horizontal shift
            
            switch(baseFunc) {
                case 'quadratic':
                    y = transformedX * transformedX + k; // Vertical shift
                    break;
                case 'absolute':
                    y = Math.abs(transformedX) + k;
                    break;
                case 'sqrt':
                    if (transformedX >= 0) y = Math.sqrt(transformedX) + k;
                    else continue;
                    break;
                default:
                    y = transformedX + k;
            }
            
            if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
                const canvasX = x * scale;
                const canvasY = y * scale;

                if (first) {
                    ctx.moveTo(canvasX, canvasY);
                    first = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            } else {
                first = true;
            }
        }
        ctx.stroke();
    }

    analyzeTransformation() {
        const baseFunc = document.getElementById('baseFunction').value;
        const vShift = parseFloat(document.getElementById('verticalShift').value) || 0;
        const hShift = parseFloat(document.getElementById('horizontalShift').value) || 0;
        
        const analysisDiv = document.getElementById('transformationAnalysis');
        
        let baseFuncName = '';
        switch(baseFunc) {
            case 'quadratic': baseFuncName = 'f(x) = x²'; break;
            case 'absolute': baseFuncName = 'f(x) = |x|'; break;
            case 'sqrt': baseFuncName = 'f(x) = √x'; break;
        }
        
        const transformedFunc = `g(x) = ${baseFuncName.replace('f(x) = ', '').replace('x', `(x${hShift >= 0 ? '-' : '+'}${Math.abs(hShift)})`)}${vShift >= 0 ? '+' : ''}${vShift !== 0 ? vShift : ''}`;
        
        const analysis = `
            <div class="step-display">
                <strong>Base Function:</strong> ${baseFuncName}<br>
                <strong>Transformed Function:</strong> ${transformedFunc}<br>
                <strong>Horizontal Shift:</strong> ${hShift === 0 ? 'None' : hShift > 0 ? `${hShift} units right` : `${Math.abs(hShift)} units left`}<br>
                <strong>Vertical Shift:</strong> ${vShift === 0 ? 'None' : vShift > 0 ? `${vShift} units up` : `${Math.abs(vShift)} units down`}<br>
                <strong>Transformations:</strong> ${hShift === 0 && vShift === 0 ? 'No transformations applied' : 'Function has been translated'}
            </div>
        `;
        
        analysisDiv.innerHTML = analysis;
    }

    // Function Inverses
    updateInverse() {
        const canvas = this.canvases.inverseCanvas;
        const ctx = this.contexts.inverseCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const funcType = document.getElementById('inverseFunction').value;

        this.drawAxes(ctx, canvas);
        
        // Draw y = x line
        this.drawIdentityLine(ctx, canvas);
        
        // Draw original function
        this.drawInverseFunction(ctx, canvas, funcType, false, '#2196F3', 3);
        
        // Draw inverse function
        this.drawInverseFunction(ctx, canvas, funcType, true, '#F44336', 2);
        
        this.analyzeInverse();
    }

    drawIdentityLine(ctx, canvas) {
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        const scale = 40;
        const range = Math.min(canvas.width, canvas.height) / (2 * scale);
        
        ctx.moveTo(-range * scale, -range * scale);
        ctx.lineTo(range * scale, range * scale);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    drawInverseFunction(ctx, canvas, funcType, isInverse, color, lineWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.1) {
            let y;
            
            if (!isInverse) {
                // Original function
                switch(funcType) {
                    case 'linear':
                        y = 2 * x + 1;
                        break;
                    case 'quadratic':
                        if (x >= 0) y = x * x;
                        else continue;
                        break;
                    case 'exponential':
                        y = Math.pow(2, x);
                        break;
                }
            } else {
                // Inverse function
                switch(funcType) {
                    case 'linear':
                        y = (x - 1) / 2;
                        break;
                    case 'quadratic':
                        if (x >= 0) y = Math.sqrt(x);
                        else continue;
                        break;
                    case 'exponential':
                        if (x > 0) y = Math.log2(x);
                        else continue;
                        break;
                }
            }
            
            if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
                const canvasX = x * scale;
                const canvasY = y * scale;

                if (first) {
                    ctx.moveTo(canvasX, canvasY);
                    first = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            } else {
                first = true;
            }
        }
        ctx.stroke();
    }

    analyzeInverse() {
        const funcType = document.getElementById('inverseFunction').value;
        const analysisDiv = document.getElementById('inverseAnalysis');
        
        let analysis = '';
        
        switch(funcType) {
            case 'linear':
                analysis = `
                    <div class="step-display">
                        <strong>Original Function:</strong> f(x) = 2x + 1<br>
                        <strong>Inverse Function:</strong> f⁻¹(x) = (x - 1)/2<br>
                        <strong>Domain of f:</strong> All real numbers<br>
                        <strong>Range of f:</strong> All real numbers<br>
                        <strong>Domain of f⁻¹:</strong> All real numbers<br>
                        <strong>Range of f⁻¹:</strong> All real numbers<br>
                        <strong>Verification:</strong> f(f⁻¹(x)) = f⁻¹(f(x)) = x
                    </div>
                `;
                break;
            case 'quadratic':
                analysis = `
                    <div class="step-display">
                        <strong>Original Function:</strong> f(x) = x² (x ≥ 0)<br>
                        <strong>Inverse Function:</strong> f⁻¹(x) = √x<br>
                        <strong>Domain of f:</strong> x ≥ 0<br>
                        <strong>Range of f:</strong> y ≥ 0<br>
                        <strong>Domain of f⁻¹:</strong> x ≥ 0<br>
                        <strong>Range of f⁻¹:</strong> y ≥ 0<br>
                        <strong>Note:</strong> Domain restriction needed for one-to-one function
                    </div>
                `;
                break;
            case 'exponential':
                analysis = `
                    <div class="step-display">
                        <strong>Original Function:</strong> f(x) = 2ˣ<br>
                        <strong>Inverse Function:</strong> f⁻¹(x) = log₂(x)<br>
                        <strong>Domain of f:</strong> All real numbers<br>
                        <strong>Range of f:</strong> y > 0<br>
                        <strong>Domain of f⁻¹:</strong> x > 0<br>
                        <strong>Range of f⁻¹:</strong> All real numbers<br>
                        <strong>Relationship:</strong> Exponential and logarithmic functions are inverses
                    </div>
                `;
                break;
        }
        
        analysisDiv.innerHTML = analysis;
    }

    // Polynomial & Rational Functions
    updatePolynomial() {
        const canvas = this.canvases.polynomialCanvas;
        const ctx = this.contexts.polynomialCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const funcType = document.getElementById('polynomialType').value;
        const funcStr = document.getElementById('polynomialFunction').value;

        this.drawAxes(ctx, canvas);
        this.drawPolynomialFunction(ctx, canvas, funcStr, funcType);
        this.analyzePolynomial();
    }

    drawPolynomialFunction(ctx, canvas, funcStr, type) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.05) {
            try {
                const y = this.evaluateExpression(funcStr, x);
                if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
                    const canvasX = x * scale;
                    const canvasY = y * scale;

                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                } else {
                    first = true;
                }
            } catch (e) {
                first = true;
            }
        }
        ctx.stroke();
    }

    analyzePolynomial() {
        const funcType = document.getElementById('polynomialType').value;
        const funcStr = document.getElementById('polynomialFunction').value;
        const analysisDiv = document.getElementById('polynomialAnalysis');
        
        let analysis = '';
        
        if (funcType === 'polynomial') {
            analysis = `
                <div class="step-display">
                    <strong>Polynomial Function:</strong> f(x) = ${funcStr}<br>
                    <strong>Degree:</strong> Determined by highest power of x<br>
                    <strong>End Behavior:</strong> Depends on leading coefficient and degree<br>
                    <strong>Zeros:</strong> Values of x where f(x) = 0<br>
                    <strong>Y-intercept:</strong> f(0) = constant term<br>
                    <strong>Domain:</strong> All real numbers<br>
                    <strong>Continuity:</strong> Continuous everywhere
                </div>
            `;
        } else {
            analysis = `
                <div class="step-display">
                    <strong>Rational Function:</strong> f(x) = ${funcStr}<br>
                    <strong>Vertical Asymptotes:</strong> Where denominator = 0<br>
                    <strong>Horizontal Asymptotes:</strong> Based on degree comparison<br>
                    <strong>Holes:</strong> Common factors in numerator and denominator<br>
                    <strong>Domain:</strong> All real numbers except vertical asymptotes<br>
                    <strong>Discontinuities:</strong> At vertical asymptotes and holes
                </div>
            `;
        }
        
        analysisDiv.innerHTML = analysis;
    }

    // Trigonometric Functions
    updateTrigonometric() {
        const canvas = this.canvases.trigCanvas;
        const ctx = this.contexts.trigCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const funcType = document.getElementById('trigFunction').value;
        const amplitude = parseFloat(document.getElementById('amplitude').value) || 1;
        
        document.getElementById('amplitudeValue').textContent = amplitude.toFixed(1);

        this.drawAxes(ctx, canvas);
        this.drawTrigFunction(ctx, canvas, funcType, amplitude);
        this.analyzeTrigonometric();
    }

    drawTrigFunction(ctx, canvas, funcType, amplitude) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.05) {
            let y;
            
            switch(funcType) {
                case 'sine':
                    y = amplitude * Math.sin(x);
                    break;
                case 'cosine':
                    y = amplitude * Math.cos(x);
                    break;
                case 'tangent':
                    y = amplitude * Math.tan(x);
                    // Handle vertical asymptotes
                    if (Math.abs(y) > 10) {
                        first = true;
                        continue;
                    }
                    break;
            }
            
            if (!isNaN(y) && isFinite(y)) {
                const canvasX = x * scale;
                const canvasY = y * scale;

                if (first) {
                    ctx.moveTo(canvasX, canvasY);
                    first = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            } else {
                first = true;
            }
        }
        ctx.stroke();
    }

    analyzeTrigonometric() {
        const funcType = document.getElementById('trigFunction').value;
        const amplitude = parseFloat(document.getElementById('amplitude').value) || 1;
        const analysisDiv = document.getElementById('trigAnalysis');
        
        let analysis = '';
        
        switch(funcType) {
            case 'sine':
                analysis = `
                    <div class="step-display">
                        <strong>Function:</strong> f(x) = ${amplitude}sin(x)<br>
                        <strong>Amplitude:</strong> ${amplitude}<br>
                        <strong>Period:</strong> 2π<br>
                        <strong>Domain:</strong> All real numbers<br>
                        <strong>Range:</strong> [${-amplitude}, ${amplitude}]<br>
                        <strong>Zeros:</strong> x = nπ (n is integer)<br>
                        <strong>Maximum:</strong> ${amplitude} at x = π/2 + 2πn<br>
                        <strong>Minimum:</strong> ${-amplitude} at x = 3π/2 + 2πn
                    </div>
                `;
                break;
            case 'cosine':
                analysis = `
                    <div class="step-display">
                        <strong>Function:</strong> f(x) = ${amplitude}cos(x)<br>
                        <strong>Amplitude:</strong> ${amplitude}<br>
                        <strong>Period:</strong> 2π<br>
                        <strong>Domain:</strong> All real numbers<br>
                        <strong>Range:</strong> [${-amplitude}, ${amplitude}]<br>
                        <strong>Zeros:</strong> x = π/2 + nπ (n is integer)<br>
                        <strong>Maximum:</strong> ${amplitude} at x = 2πn<br>
                        <strong>Minimum:</strong> ${-amplitude} at x = π + 2πn
                    </div>
                `;
                break;
            case 'tangent':
                analysis = `
                    <div class="step-display">
                        <strong>Function:</strong> f(x) = ${amplitude}tan(x)<br>
                        <strong>Amplitude:</strong> ${amplitude} (stretches vertically)<br>
                        <strong>Period:</strong> π<br>
                        <strong>Domain:</strong> x ≠ π/2 + nπ (n is integer)<br>
                        <strong>Range:</strong> All real numbers<br>
                        <strong>Zeros:</strong> x = nπ (n is integer)<br>
                        <strong>Vertical Asymptotes:</strong> x = π/2 + nπ<br>
                        <strong>Behavior:</strong> Increases on each interval
                    </div>
                `;
                break;
        }
        
        analysisDiv.innerHTML = analysis;
    }

    // Probability & Statistics
    updateProbability() {
        const canvas = this.canvases.probabilityCanvas;
        const ctx = this.contexts.probabilityCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const distType = document.getElementById('distributionType').value;
        const param1 = parseFloat(document.getElementById('param1').value) || 0;
        const param2 = parseFloat(document.getElementById('param2').value) || 1;

        this.drawAxes(ctx, canvas);
        this.drawDistribution(ctx, canvas, distType, param1, param2);
        this.analyzeProbability();
    }

    drawDistribution(ctx, canvas, distType, param1, param2) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.1) {
            let y;
            
            switch(distType) {
                case 'normal':
                    // Normal distribution: param1 = mean, param2 = standard deviation
                    const variance = param2 * param2;
                    y = (1 / (param2 * Math.sqrt(2 * Math.PI))) * 
                        Math.exp(-0.5 * Math.pow((x - param1) / param2, 2));
                    y *= 5; // Scale for visibility
                    break;
                case 'uniform':
                    // Uniform distribution: param1 = a, param2 = b
                    if (x >= param1 && x <= param2) {
                        y = 1 / (param2 - param1);
                    } else {
                        y = 0;
                    }
                    y *= 2; // Scale for visibility
                    break;
                case 'exponential':
                    // Exponential distribution: param1 = lambda
                    if (x >= 0 && param1 > 0) {
                        y = param1 * Math.exp(-param1 * x);
                    } else {
                        y = 0;
                    }
                    break;
            }
            
            if (!isNaN(y) && isFinite(y) && y >= 0) {
                const canvasX = x * scale;
                const canvasY = y * scale;

                if (first) {
                    ctx.moveTo(canvasX, canvasY);
                    first = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            } else {
                first = true;
            }
        }
        ctx.stroke();
    }

    analyzeProbability() {
        const distType = document.getElementById('distributionType').value;
        const param1 = parseFloat(document.getElementById('param1').value) || 0;
        const param2 = parseFloat(document.getElementById('param2').value) || 1;
        const analysisDiv = document.getElementById('probabilityAnalysis');
        
        let analysis = '';
        
        switch(distType) {
            case 'normal':
                analysis = `
                    <div class="step-display">
                        <strong>Normal Distribution</strong><br>
                        <strong>Mean (μ):</strong> ${param1}<br>
                        <strong>Standard Deviation (σ):</strong> ${param2}<br>
                        <strong>Variance (σ²):</strong> ${(param2 * param2).toFixed(3)}<br>
                        <strong>Properties:</strong><br>
                        • Bell-shaped and symmetric<br>
                        • 68% of data within 1σ of mean<br>
                        • 95% of data within 2σ of mean<br>
                        • 99.7% of data within 3σ of mean
                    </div>
                `;
                break;
            case 'uniform':
                const mean = (param1 + param2) / 2;
                const variance = Math.pow(param2 - param1, 2) / 12;
                analysis = `
                    <div class="step-display">
                        <strong>Uniform Distribution</strong><br>
                        <strong>Lower bound (a):</strong> ${param1}<br>
                        <strong>Upper bound (b):</strong> ${param2}<br>
                        <strong>Mean:</strong> ${mean.toFixed(3)}<br>
                        <strong>Variance:</strong> ${variance.toFixed(3)}<br>
                        <strong>Properties:</strong><br>
                        • Constant probability density<br>
                        • All outcomes equally likely<br>
                        • Rectangular shape
                    </div>
                `;
                break;
            case 'exponential':
                const expMean = 1 / param1;
                const expVariance = 1 / (param1 * param1);
                analysis = `
                    <div class="step-display">
                        <strong>Exponential Distribution</strong><br>
                        <strong>Rate parameter (λ):</strong> ${param1}<br>
                        <strong>Mean:</strong> ${expMean.toFixed(3)}<br>
                        <strong>Variance:</strong> ${expVariance.toFixed(3)}<br>
                        <strong>Properties:</strong><br>
                        • Models waiting times<br>
                        • Memoryless property<br>
                        • Decreasing exponential shape
                    </div>
                `;
                break;
        }
        
        analysisDiv.innerHTML = analysis;
    }
}

// Global functions for HTML event handlers
function switchSimulation(simType) {
    // Hide all simulation content
    const allContent = document.querySelectorAll('.simulation-content');
    allContent.forEach(content => content.classList.remove('active'));
    
    // Show selected simulation
    const targetContent = document.getElementById(simType);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Update tab buttons
    const allTabs = document.querySelectorAll('.tab-button');
    allTabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Reset simulation
    if (window.algebra2Sim) {
        window.algebra2Sim.resetSimulation(simType);
    }
}

function updateFunctionFeatures() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateFunctionFeatures();
    }
}

function analyzeFunctionFeatures() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzeFunctionFeatures();
    }
}

function findDomainRange() {
    if (window.algebra2Sim) {
        window.algebra2Sim.findDomainRange();
    }
}

function updateExpressionOperation() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateExpressionOperation();
    }
}

function performOperation() {
    if (window.algebra2Sim) {
        window.algebra2Sim.performOperation();
    }
}

function updateQuadratic() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateQuadratic();
    }
}

function analyzeQuadratic() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzeQuadratic();
    }
}

function updateExpLog() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateExpLog();
    }
}

function analyzeExpLog() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzeExpLog();
    }
}

function updateTransformation() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateTransformation();
    }
}

function analyzeTransformation() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzeTransformation();
    }
}

function updateInverse() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateInverse();
    }
}

function analyzeInverse() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzeInverse();
    }
}

function updatePolynomial() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updatePolynomial();
    }
}

function analyzePolynomial() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzePolynomial();
    }
}

function updateTrigonometric() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateTrigonometric();
    }
}

function analyzeTrigonometric() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzeTrigonometric();
    }
}

function updateProbability() {
    if (window.algebra2Sim) {
        window.algebra2Sim.updateProbability();
    }
}

function analyzeProbability() {
    if (window.algebra2Sim) {
        window.algebra2Sim.analyzeProbability();
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', function() {
    window.algebra2Sim = new Algebra2Simulations();
});