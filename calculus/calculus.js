// Calculus Simulations - Graham's Mathematical Applications
// Interactive AP Calculus AB concepts including derivatives and differentiation rules

class CalculusSimulations {
    constructor() {
        this.currentSimulation = 'limit-definition';
        this.canvases = {};
        this.contexts = {};
        this.animationFrames = {};
        this.integrationScale = null;
        
        // Flashcard system
        this.initializeFlashcards();
        
        // Wait for DOM to be fully loaded before initializing canvases
        setTimeout(() => {
            this.initializeCanvases();
            this.setupEventListeners();
            this.resetSimulation('limit-definition');
        }, 100);
    }

    initializeCanvases() {
        const canvasIds = ['limitCanvas', 'powerCanvas', 'productCanvas', 'quotientCanvas', 'chainCanvas', 'criticalCanvas', 'analysisCanvas', 'integrationCanvas', 'rationalCanvas'];
        
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

    adjustParameter(delta) {
        switch(this.currentSimulation) {
            case 'limit-definition':
                const deltaXSlider = document.getElementById('deltaX');
                const newValue = Math.max(0.01, Math.min(2, parseFloat(deltaXSlider.value) + delta));
                deltaXSlider.value = newValue;
                this.updateLimitVisualization();
                break;
            case 'power-rule':
                const powerInput = document.getElementById('powerValue');
                const newPower = Math.max(1, Math.min(6, parseInt(powerInput.value) + Math.sign(delta)));
                powerInput.value = newPower;
                this.updatePowerRule();
                break;
        }
    }

    toggleAnimation() {
        switch(this.currentSimulation) {
            case 'limit-definition':
                this.animateLimit();
                break;
            case 'product-rule':
                this.animateProductRule();
                break;
            case 'quotient-rule':
                this.animateQuotientRule();
                break;
            case 'chain-rule':
                this.animateChainRule();
                break;
        }
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

    drawCurrentSimulation() {
        switch(this.currentSimulation) {
            case 'limit-definition':
                this.updateLimitVisualization();
                break;
            case 'power-rule':
                this.updatePowerRule();
                break;
            case 'product-rule':
                this.updateProductRule();
                break;
            case 'quotient-rule':
                this.updateQuotientRule();
                break;
            case 'chain-rule':
                this.updateChainRule();
                break;
            case 'critical-points':
                this.updateCriticalPoints();
                break;
            case 'function-analysis':
                this.updateFunctionAnalysis();
                break;
            case 'numerical-integration':
                this.updateNumericalIntegration();
                break;
            case 'rational-functions':
                this.updateRationalFunction();
                break;
        }
    }

    resetSimulation(simType) {
        switch(simType) {
            case 'limit-definition':
                document.getElementById('limitFunction').value = 'x^2';
                document.getElementById('limitPoint').value = '1';
                document.getElementById('deltaX').value = '1';
                this.switchCanvas('limitCanvas');
                this.updateLimitVisualization();
                break;
            case 'power-rule':
                document.getElementById('powerValue').value = '2';
                document.getElementById('coefficient').value = '1';
                this.switchCanvas('powerCanvas');
                this.updatePowerRule();
                break;
            case 'product-rule':
                document.getElementById('productF').value = 'x';
                document.getElementById('productG').value = 'x';
                this.switchCanvas('productCanvas');
                this.updateProductRule();
                break;
            case 'quotient-rule':
                document.getElementById('quotientF').value = 'x^2';
                document.getElementById('quotientG').value = 'x';
                this.switchCanvas('quotientCanvas');
                this.updateQuotientRule();
                break;
            case 'chain-rule':
                document.getElementById('chainOuter').value = 'sin';
                document.getElementById('chainInner').value = 'x^2';
                this.switchCanvas('chainCanvas');
                this.updateChainRule();
                break;
            case 'critical-points':
                document.getElementById('coeffA').value = '1';
                document.getElementById('coeffB').value = '-3';
                document.getElementById('coeffC').value = '0';
                document.getElementById('coeffD').value = '0';
                this.switchCanvas('criticalCanvas');
                this.updateCriticalPoints();
                break;
            case 'function-analysis':
                document.getElementById('analysisCoeffA').value = '1';
                document.getElementById('analysisCoeffB').value = '-6';
                document.getElementById('analysisCoeffC').value = '9';
                document.getElementById('analysisCoeffD').value = '-4';
                document.getElementById('analysisFocus').value = 'complete';
                this.switchCanvas('analysisCanvas');
                this.updateFunctionAnalysis();
                break;
            case 'numerical-integration':
                document.getElementById('integrationMethod').value = 'left';
                document.getElementById('dataInputMethod').value = 'table';
                document.getElementById('numSubintervals').value = '5';
                this.switchCanvas('integrationCanvas');
                this.updateNumericalIntegration();
                break;
            case 'rational-functions':
                document.getElementById('numerator').value = 'x^3-3*x^2+6*x-4';
                document.getElementById('denominator').value = 'x^2-3*x+2';
                document.getElementById('rationalAnalysisType').value = 'complete';
                document.getElementById('xRange').value = '10';
                this.switchCanvas('rationalCanvas');
                this.updateRationalFunction();
                break;
            case 'flashcards':
                this.initializeFlashcardUI();
                break;
        }
    }
    updateLimitVisualization() {
        const canvas = this.canvases.limitCanvas;
        const ctx = this.contexts.limitCanvas;
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const func = document.getElementById('limitFunction').value;
        const a = parseFloat(document.getElementById('limitPoint').value);
        const h = parseFloat(document.getElementById('deltaX').value);
        
        document.getElementById('deltaXValue').textContent = h.toFixed(2);

        // Draw axes
        this.drawAxes(ctx, canvas);

        // Draw function
        this.drawFunction(ctx, canvas, func, '#2196F3', 2);

        // Draw limit visualization
        this.drawLimitVisualization(ctx, canvas, func, a, h);

        // Update calculation display
        this.updateLimitCalculation(func, a, h);
    }

    drawFunction(ctx, canvas, funcStr, color = '#2196F3', lineWidth = 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.1) {
            const y = this.evaluateFunction(funcStr, x);
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

    drawLimitVisualization(ctx, canvas, func, a, h) {
        const scale = 40;
        
        // Calculate points
        const fa = this.evaluateFunction(func, a);
        const fah = this.evaluateFunction(func, a + h);
        
        if (isNaN(fa) || isNaN(fah) || !isFinite(fa) || !isFinite(fah)) return;

        // Draw points
        ctx.fillStyle = '#F44336';
        ctx.beginPath();
        ctx.arc(a * scale, fa * scale, 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#FF9800';
        ctx.beginPath();
        ctx.arc((a + h) * scale, fah * scale, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Draw secant line
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a * scale, fa * scale);
        ctx.lineTo((a + h) * scale, fah * scale);
        ctx.stroke();

        // Draw vertical and horizontal lines for visualization
        ctx.strokeStyle = '#9E9E9E';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(a * scale, -canvas.height/2);
        ctx.lineTo(a * scale, canvas.height/2);
        ctx.moveTo((a + h) * scale, -canvas.height/2);
        ctx.lineTo((a + h) * scale, canvas.height/2);
        ctx.stroke();

        // Reset line dash
        ctx.setLineDash([]);

        // Draw tangent line approximation
        const derivative = this.approximateDerivative(func, a, 0.001);
        if (!isNaN(derivative) && isFinite(derivative)) {
            ctx.strokeStyle = '#E91E63';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const range = 2;
            const x1 = a - range;
            const y1 = fa + derivative * (x1 - a);
            const x2 = a + range;
            const y2 = fa + derivative * (x2 - a);
            
            ctx.moveTo(x1 * scale, y1 * scale);
            ctx.lineTo(x2 * scale, y2 * scale);
            ctx.stroke();
        }
    }

    updateLimitCalculation(func, a, h) {
        const fa = this.evaluateFunction(func, a);
        const fah = this.evaluateFunction(func, a + h);
        const slope = (fah - fa) / h;
        const exactDerivative = this.approximateDerivative(func, a, 0.001);

        const calculation = document.getElementById('limitCalculation');
        calculation.innerHTML = `
            <div class="step-display">
                <strong>Current Calculation:</strong><br>
                f(${a}) = ${fa.toFixed(4)}<br>
                f(${a} + ${h.toFixed(2)}) = ${fah.toFixed(4)}<br>
                Slope = ${slope.toFixed(4)}<br>
                <em>Exact derivative ≈ ${exactDerivative.toFixed(4)}</em>
            </div>
        `;
    }

    animateLimit() {
        const deltaXSlider = document.getElementById('deltaX');
        let currentH = 2.0;
        const targetH = 0.01;
        const step = -0.05;

        const animate = () => {
            if (currentH > targetH) {
                currentH += step;
                deltaXSlider.value = Math.max(targetH, currentH);
                this.updateLimitVisualization();
                this.animationFrames.limit = requestAnimationFrame(animate);
            }
        };

        if (this.animationFrames.limit) {
            cancelAnimationFrame(this.animationFrames.limit);
        }
        animate();
    }

    // Power Rule Visualization
    updatePowerRule() {
        const canvas = this.canvases.powerCanvas;
        const ctx = this.contexts.powerCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const n = parseInt(document.getElementById('powerValue').value);
        const a = parseFloat(document.getElementById('coefficient').value);

        this.drawAxes(ctx, canvas);

        // Draw original function
        const originalFunc = `${a}*x^${n}`;
        this.drawFunction(ctx, canvas, originalFunc, '#2196F3', 3);

        // Draw derivative
        if (n > 0) {
            const derivativeFunc = `${a * n}*x^${n - 1}`;
            this.drawFunction(ctx, canvas, derivativeFunc, '#F44336', 2);
        }

        this.showPowerRuleSteps();
    }

    showPowerRuleSteps() {
        const n = parseInt(document.getElementById('powerValue').value);
        const a = parseFloat(document.getElementById('coefficient').value);

        const steps = document.getElementById('powerSteps');
        steps.innerHTML = `
            <div class="step-display">
                <strong>Given:</strong> f(x) = ${a}x^${n}<br>
                <strong>Apply Power Rule:</strong><br>
                f'(x) = ${a} · ${n} · x^${n-1}<br>
                <strong>Result:</strong> f'(x) = ${a * n}x^${n > 1 ? '^' + (n-1) : ''}
            </div>
            <div style="margin-top: 10px; font-size: 0.9em;">
                <span style="color: #2196F3;">■</span> Original function<br>
                <span style="color: #F44336;">■</span> Derivative
            </div>
        `;
    }

    // Product Rule Visualization
    updateProductRule() {
        const canvas = this.canvases.productCanvas;
        const ctx = this.contexts.productCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const f = document.getElementById('productF').value;
        const g = document.getElementById('productG').value;

        this.drawAxes(ctx, canvas);

        // Draw individual functions
        this.drawFunction(ctx, canvas, f, '#2196F3', 2);
        this.drawFunction(ctx, canvas, g, '#4CAF50', 2);

        // Draw product
        this.drawFunction(ctx, canvas, `(${f})*(${g})`, '#FF9800', 3);

        this.updateProductCalculation(f, g);
    }

    updateProductCalculation(f, g) {
        const fPrime = this.getDerivativeExpression(f);
        const gPrime = this.getDerivativeExpression(g);

        const calculation = document.getElementById('productCalculation');
        calculation.innerHTML = `
            <div class="step-display">
                <strong>Given:</strong><br>
                f(x) = ${f}, f'(x) = ${fPrime}<br>
                g(x) = ${g}, g'(x) = ${gPrime}<br><br>
                <strong>Product Rule:</strong><br>
                d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)<br>
                = (${fPrime})(${g}) + (${f})(${gPrime})
            </div>
            <div style="margin-top: 10px; font-size: 0.9em;">
                <span style="color: #2196F3;">■</span> f(x)<br>
                <span style="color: #4CAF50;">■</span> g(x)<br>
                <span style="color: #FF9800;">■</span> f(x)·g(x)
            </div>
        `;
    }

    animateProductRule() {
        // Visual demonstration of product rule components
        const canvas = this.canvases.productCanvas;
        const ctx = this.contexts.productCanvas;
        
        // Highlight different components with animation
        let step = 0;
        const animate = () => {
            if (step < 3) {
                this.updateProductRule();
                // Add highlighting effect here
                step++;
                this.animationFrames.product = setTimeout(animate, 1000);
            }
        };
        animate();
    }

    // Quotient Rule Visualization
    updateQuotientRule() {
        const canvas = this.canvases.quotientCanvas;
        const ctx = this.contexts.quotientCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const f = document.getElementById('quotientF').value;
        const g = document.getElementById('quotientG').value;

        this.drawAxes(ctx, canvas);

        // Draw numerator and denominator
        this.drawFunction(ctx, canvas, f, '#2196F3', 2);
        this.drawFunction(ctx, canvas, g, '#4CAF50', 2);

        // Draw quotient (handling division by zero)
        this.drawQuotientFunction(ctx, canvas, f, g);

        this.updateQuotientCalculation(f, g);
    }

    drawQuotientFunction(ctx, canvas, f, g) {
        ctx.strokeStyle = '#FF9800';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.05) {
            const fVal = this.evaluateFunction(f, x);
            const gVal = this.evaluateFunction(g, x);
            
            if (Math.abs(gVal) > 0.01) { // Avoid division by zero
                const y = fVal / gVal;
                if (!isNaN(y) && isFinite(y) && Math.abs(y) < 10) {
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
            } else {
                first = true;
            }
        }
        ctx.stroke();
    }

    updateQuotientCalculation(f, g) {
        const fPrime = this.getDerivativeExpression(f);
        const gPrime = this.getDerivativeExpression(g);

        const calculation = document.getElementById('quotientCalculation');
        calculation.innerHTML = `
            <div class="step-display">
                <strong>Given:</strong><br>
                f(x) = ${f}, f'(x) = ${fPrime}<br>
                g(x) = ${g}, g'(x) = ${gPrime}<br><br>
                <strong>Quotient Rule:</strong><br>
                d/dx[f(x)/g(x)] = [f'(x)g(x) - f(x)g'(x)] / [g(x)]²<br>
                = [(${fPrime})(${g}) - (${f})(${gPrime})] / (${g})²
            </div>
            <div style="margin-top: 10px; font-size: 0.9em;">
                <span style="color: #2196F3;">■</span> f(x) (numerator)<br>
                <span style="color: #4CAF50;">■</span> g(x) (denominator)<br>
                <span style="color: #FF9800;">■</span> f(x)/g(x)
            </div>
        `;
    }

    animateQuotientRule() {
        // Animate the quotient rule demonstration
        this.updateQuotientRule();
    }

    // Chain Rule Visualization
    updateChainRule() {
        const canvas = this.canvases.chainCanvas;
        const ctx = this.contexts.chainCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const outer = document.getElementById('chainOuter').value;
        const inner = document.getElementById('chainInner').value;

        this.drawAxes(ctx, canvas);

        // Draw inner function
        this.drawFunction(ctx, canvas, inner, '#4CAF50', 2);

        // Draw composite function
        const composite = this.createCompositeFunction(outer, inner);
        this.drawFunction(ctx, canvas, composite, '#FF9800', 3);

        this.updateChainCalculation(outer, inner);
    }

    createCompositeFunction(outer, inner) {
        switch(outer) {
            case 'sin': return `sin(${inner})`;
            case 'cos': return `cos(${inner})`;
            case 'ln': return `ln(${inner})`;
            case 'exp': return `exp(${inner})`;
            case 'square': return `(${inner})^2`;
            default: return inner;
        }
    }

    updateChainCalculation(outer, inner) {
        const outerPrime = this.getOuterDerivative(outer);
        const innerPrime = this.getDerivativeExpression(inner);
        const composite = this.createCompositeFunction(outer, inner);

        const calculation = document.getElementById('chainCalculation');
        calculation.innerHTML = `
            <div class="step-display">
                <strong>Given:</strong><br>
                Composite function: ${composite}<br>
                f(u) = ${outer}(u), g(x) = ${inner}<br><br>
                <strong>Chain Rule:</strong><br>
                d/dx[f(g(x))] = f'(g(x)) · g'(x)<br>
                = (${outerPrime})(${inner}) · (${innerPrime})<br>
                = ${outerPrime.replace('u', inner)} · (${innerPrime})
            </div>
            <div style="margin-top: 10px; font-size: 0.9em;">
                <span style="color: #4CAF50;">■</span> Inner function g(x)<br>
                <span style="color: #FF9800;">■</span> Composite f(g(x))
            </div>
        `;
    }

    animateChainRule() {
        // Animate chain rule visualization
        this.updateChainRule();
    }

    // Critical Points Analysis
    updateCriticalPoints() {
        const canvas = this.canvases.criticalCanvas;
        const ctx = this.contexts.criticalCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const a = parseFloat(document.getElementById('coeffA').value) || 1;
        const b = parseFloat(document.getElementById('coeffB').value) || 0;
        const c = parseFloat(document.getElementById('coeffC').value) || 0;
        const d = parseFloat(document.getElementById('coeffD').value) || 0;

        this.drawAxes(ctx, canvas);

        // Draw the cubic function
        this.drawCubicFunction(ctx, canvas, a, b, c, d, '#2196F3', 3);

        // Draw the derivative
        this.drawDerivativeFunction(ctx, canvas, a, b, c, '#FF9800', 2);

        // Find and display critical points
        const criticalPoints = this.findCubicCriticalPoints(a, b, c);
        this.drawCriticalPoints(ctx, canvas, criticalPoints, a, b, c, d);

        // Update display information
        this.updateCriticalPointsDisplay(a, b, c, d, criticalPoints);
    }

    drawCubicFunction(ctx, canvas, a, b, c, d, color = '#2196F3', lineWidth = 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.05) {
            const y = this.evaluateCubic(a, b, c, d, x);
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

    drawDerivativeFunction(ctx, canvas, a, b, c, color = '#FF9800', lineWidth = 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        const scale = 40;
        let first = true;

        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.05) {
            const y = this.evaluateDerivative(a, b, c, x);
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

    drawCriticalPoints(ctx, canvas, criticalPoints, a, b, c, d) {
        const scale = 40;
        
        criticalPoints.forEach((point, index) => {
            if (!isNaN(point) && isFinite(point)) {
                const x = point;
                const y = this.evaluateCubic(a, b, c, d, x);
                const secondDerivative = this.evaluateSecondDerivative(a, b, x);
                
                // Determine point type and color
                let color, label;
                if (Math.abs(secondDerivative) < 0.001) {
                    color = '#9C27B0'; // Purple for inflection point
                    label = 'Inflection';
                } else if (secondDerivative > 0) {
                    color = '#4CAF50'; // Green for local minimum
                    label = 'Local Min';
                } else {
                    color = '#F44336'; // Red for local maximum
                    label = 'Local Max';
                }
                
                // Draw critical point
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x * scale, y * scale, 6, 0, 2 * Math.PI);
                ctx.fill();
                
                // Draw vertical line to x-axis
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(x * scale, y * scale);
                ctx.lineTo(x * scale, 0);
                ctx.stroke();
                ctx.setLineDash([]);
                
                // Add label (note: text is upside down due to coordinate flip)
                ctx.save();
                ctx.scale(1, -1); // Flip text back to normal
                ctx.fillStyle = color;
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(label, x * scale, -(y * scale + 20));
                ctx.fillText(`(${x.toFixed(2)}, ${y.toFixed(2)})`, x * scale, -(y * scale + 35));
                ctx.restore();
            }
        });
    }

    findCubicCriticalPoints(a, b, c) {
        // For f(x) = ax³ + bx² + cx + d
        // f'(x) = 3ax² + 2bx + c
        // Solve 3ax² + 2bx + c = 0 using quadratic formula
        
        const A = 3 * a;
        const B = 2 * b;
        const C = c;
        
        if (Math.abs(A) < 1e-10) {
            // Linear case: Bx + C = 0
            if (Math.abs(B) < 1e-10) {
                return []; // No critical points
            }
            return [-C / B];
        }
        
        const discriminant = B * B - 4 * A * C;
        
        if (discriminant < 0) {
            return []; // No real critical points
        } else if (Math.abs(discriminant) < 1e-10) {
            return [-B / (2 * A)]; // One critical point
        } else {
            const sqrt_discriminant = Math.sqrt(discriminant);
            return [
                (-B + sqrt_discriminant) / (2 * A),
                (-B - sqrt_discriminant) / (2 * A)
            ].sort((a, b) => a - b); // Sort in ascending order
        }
    }

    evaluateCubic(a, b, c, d, x) {
        return a * x * x * x + b * x * x + c * x + d;
    }

    evaluateDerivative(a, b, c, x) {
        return 3 * a * x * x + 2 * b * x + c;
    }

    evaluateSecondDerivative(a, b, x) {
        return 6 * a * x + 2 * b;
    }

    updateCriticalPointsDisplay(a, b, c, d, criticalPoints) {
        // Update function display
        const functionDisplay = document.getElementById('functionDisplay');
        functionDisplay.innerHTML = this.formatCubicFunction(a, b, c, d);
        
        // Update derivative display
        const derivativeDisplay = document.getElementById('derivativeDisplay');
        derivativeDisplay.innerHTML = this.formatDerivativeFunction(a, b, c);
        
        // Update critical points results
        const resultsDiv = document.getElementById('criticalPointsResults');
        if (criticalPoints.length === 0) {
            resultsDiv.innerHTML = '<div class="step-display"><strong>No critical points found.</strong><br>The derivative does not equal zero for any real values.</div>';
        } else {
            let html = '<div class="step-display"><strong>Critical Points Found:</strong><br>';
            criticalPoints.forEach((point, index) => {
                const y = this.evaluateCubic(a, b, c, d, point);
                html += `x = ${point.toFixed(4)}, f(x) = ${y.toFixed(4)}<br>`;
            });
            html += '</div>';
            resultsDiv.innerHTML = html;
        }
        
        // Update classification results
        this.updateClassificationResults(a, b, criticalPoints);
    }

    updateClassificationResults(a, b, criticalPoints) {
        const classificationDiv = document.getElementById('classificationResults');
        
        if (criticalPoints.length === 0) {
            classificationDiv.innerHTML = '';
            return;
        }
        
        let html = '<div class="step-display"><strong>Second Derivative Test:</strong><br>';
        html += `f''(x) = ${6 * a}x + ${2 * b}<br><br>`;
        
        criticalPoints.forEach((point, index) => {
            const secondDerivative = this.evaluateSecondDerivative(a, b, point);
            let classification;
            
            if (Math.abs(secondDerivative) < 0.001) {
                classification = '<span style="color: #9C27B0;">Inconclusive (possible inflection point)</span>';
            } else if (secondDerivative > 0) {
                classification = '<span style="color: #4CAF50;">Local Minimum</span>';
            } else {
                classification = '<span style="color: #F44336;">Local Maximum</span>';
            }
            
            html += `At x = ${point.toFixed(4)}: f''(${point.toFixed(4)}) = ${secondDerivative.toFixed(4)} → ${classification}<br>`;
        });
        
        html += '</div>';
        classificationDiv.innerHTML = html;
    }

    formatCubicFunction(a, b, c, d) {
        let func = 'f(x) = ';
        
        // Handle coefficient a (x³ term)
        if (a !== 0) {
            if (a === 1) func += 'x³';
            else if (a === -1) func += '-x³';
            else func += `${a}x³`;
        }
        
        // Handle coefficient b (x² term)
        if (b !== 0) {
            if (func !== 'f(x) = ') func += b > 0 ? ' + ' : ' - ';
            else if (b < 0) func += '-';
            
            const absB = Math.abs(b);
            if (absB === 1) func += 'x²';
            else func += `${absB}x²`;
        }
        
        // Handle coefficient c (x term)
        if (c !== 0) {
            if (func !== 'f(x) = ') func += c > 0 ? ' + ' : ' - ';
            else if (c < 0) func += '-';
            
            const absC = Math.abs(c);
            if (absC === 1) func += 'x';
            else func += `${absC}x`;
        }
        
        // Handle coefficient d (constant term)
        if (d !== 0) {
            if (func !== 'f(x) = ') func += d > 0 ? ' + ' : ' - ';
            else if (d < 0) func += '-';
            func += Math.abs(d);
        }
        
        if (func === 'f(x) = ') func += '0';
        
        return func;
    }

    formatDerivativeFunction(a, b, c) {
        let func = "f'(x) = ";
        
        // Handle 3a (x² term)
        const coeff3a = 3 * a;
        if (coeff3a !== 0) {
            if (coeff3a === 1) func += 'x²';
            else if (coeff3a === -1) func += '-x²';
            else func += `${coeff3a}x²`;
        }
        
        // Handle 2b (x term)
        const coeff2b = 2 * b;
        if (coeff2b !== 0) {
            if (func !== "f'(x) = ") func += coeff2b > 0 ? ' + ' : ' - ';
            else if (coeff2b < 0) func += '-';
            
            const abs2b = Math.abs(coeff2b);
            if (abs2b === 1) func += 'x';
            else func += `${abs2b}x`;
        }
        
        // Handle c (constant term)
        if (c !== 0) {
            if (func !== "f'(x) = ") func += c > 0 ? ' + ' : ' - ';
            else if (c < 0) func += '-';
            func += Math.abs(c);
        }
        
        if (func === "f'(x) = ") func += '0';
        
        return func;
    }

    findCriticalPoints() {
        this.updateCriticalPoints();
    }

    animateCriticalAnalysis() {
        // Animate the analysis process
        const a = parseFloat(document.getElementById('coeffA').value) || 1;
        const b = parseFloat(document.getElementById('coeffB').value) || 0;
        const c = parseFloat(document.getElementById('coeffC').value) || 0;
        
        // Show step-by-step process
        const criticalPoints = this.findCubicCriticalPoints(a, b, c);
        
        let step = 0;
        const steps = [
            () => {
                // Step 1: Show function
                this.updateCriticalPoints();
            },
            () => {
                // Step 2: Highlight critical points
                this.updateCriticalPoints();
                // Additional highlighting could be added here
            }
        ];
        
        const animate = () => {
            if (step < steps.length) {
                steps[step]();
                step++;
                this.animationFrames.critical = setTimeout(animate, 1500);
            }
        };
        
        if (this.animationFrames.critical) {
            clearTimeout(this.animationFrames.critical);
        }
        animate();
    }

    // Comprehensive Function Analysis
    updateFunctionAnalysis() {
        const canvas = this.canvases.analysisCanvas;
        const ctx = this.contexts.analysisCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        const a = parseFloat(document.getElementById('analysisCoeffA').value) || 1;
        const b = parseFloat(document.getElementById('analysisCoeffB').value) || 0;
        const c = parseFloat(document.getElementById('analysisCoeffC').value) || 0;
        const d = parseFloat(document.getElementById('analysisCoeffD').value) || 0;
        const focus = document.getElementById('analysisFocus').value;

        this.drawAxes(ctx, canvas);

        // Draw the main function
        this.drawCubicFunction(ctx, canvas, a, b, c, d, '#2196F3', 3);

        // Draw derivatives based on focus
        if (focus === 'complete' || focus === 'derivatives' || focus === 'concavity') {
            this.drawDerivativeFunction(ctx, canvas, a, b, c, '#FF9800', 2);
        }

        // Perform and display analysis
        this.performFunctionAnalysis(a, b, c, d, focus);
        this.drawAnalysisPoints(ctx, canvas, a, b, c, d, focus);
    }

    performFunctionAnalysis(a, b, c, d, focus) {
        const resultsDiv = document.getElementById('analysisResults');
        let html = '';

        // a. f(x) is already displayed in coefficients
        const functionStr = this.formatCubicFunction(a, b, c, d);
        html += `<div class="formula-display">f(x) = ${this.formatCubicFunction(a, b, c, d).replace('f(x) = ', '')}</div>`;

        if (focus === 'complete' || focus === 'derivatives') {
            // b. Find f''(x)
            const firstDerivative = this.formatDerivativeFunction(a, b, c);
            const secondDerivative = this.formatSecondDerivativeFunction(a, b);
            html += `<div class="step-display">
                <strong>b. Second Derivative:</strong><br>
                f'(x) = ${firstDerivative.replace("f'(x) = ", '')}<br>
                <strong>f''(x) = ${secondDerivative.replace("f''(x) = ", '')}</strong><br>
                <strong>Justification:</strong> The second derivative is found by differentiating the first derivative using the power rule.
            </div>`;
        }

        if (focus === 'complete' || focus === 'zeros') {
            // c. Find rational zeros
            const rationalZeros = this.findRationalZeros(a, b, c, d);
            const factorsD = this.getFactors(Math.abs(d));
            const factorsA = this.getFactors(Math.abs(a));
            html += `<div class="step-display">
                <strong>c. Rational Zeros:</strong><br>
                Using Rational Root Theorem: ±factors(${Math.abs(d)})/±factors(${Math.abs(a)})<br>
                Factors of ${Math.abs(d)}: ${factorsD.join(', ')}<br>
                Factors of ${Math.abs(a)}: ${factorsA.join(', ')}<br>
                Possible rational roots: ±{${factorsD.join(', ')}}/±{${factorsA.join(', ')}}<br>`;
            if (rationalZeros.length > 0) {
                html += `<strong>Rational zeros found: ${rationalZeros.map(z => z.toFixed(3)).join(', ')}</strong><br>
                <strong>Justification:</strong> These values make f(x) = 0 when substituted into the original function.`;
            } else {
                html += `<strong>No rational zeros found.</strong><br>
                <strong>Justification:</strong> None of the possible rational roots from the theorem make f(x) = 0.`;
            }
            html += `</div>`;

            // d. Find relative extrema
            const criticalPoints = this.findCubicCriticalPoints(a, b, c);
            const extrema = this.classifyExtrema(a, b, c, d, criticalPoints);
            html += `<div class="step-display">
                <strong>d. Relative Extrema:</strong><br>
                Critical points found by solving f'(x) = 0: ${criticalPoints.length > 0 ? criticalPoints.map(cp => cp.toFixed(3)).join(', ') : 'None'}<br>`;
            if (extrema.maxima.length > 0) {
                html += `<strong>Local maxima:</strong> ${extrema.maxima.map(pt => `(${pt.x.toFixed(3)}, ${pt.y.toFixed(3)})`).join(', ')}<br>`;
            }
            if (extrema.minima.length > 0) {
                html += `<strong>Local minima:</strong> ${extrema.minima.map(pt => `(${pt.x.toFixed(3)}, ${pt.y.toFixed(3)})`).join(', ')}<br>`;
            }
            if (extrema.maxima.length === 0 && extrema.minima.length === 0) {
                if (criticalPoints.length === 0) {
                    html += `<strong>No relative extrema found.</strong><br>
                    <strong>Justification:</strong> No critical points exist where f'(x) = 0.`;
                } else {
                    html += `<strong>No relative extrema found.</strong><br>
                    <strong>Justification:</strong> All critical points are inflection points where f''(x) = 0.`;
                }
            } else {
                html += `<strong>Justification:</strong> Classification determined by the Second Derivative Test:<br>
                - If f''(c) > 0 at critical point c, then f has a local minimum at c<br>
                - If f''(c) < 0 at critical point c, then f has a local maximum at c`;
            }
            html += `</div>`;
        }

        if (focus === 'complete' || focus === 'concavity') {
            // e. Find where f''(x) = 0
            const inflectionCandidates = this.findInflectionCandidates(a, b);
            html += `<div class="step-display">
                <strong>e. Where f''(x) = 0:</strong><br>
                Setting f''(x) = ${this.formatSecondDerivativeFunction(a, b).replace("f''(x) = ", '')} = 0<br>`;
            if (inflectionCandidates.length > 0) {
                const candidate = inflectionCandidates[0];
                html += `Solving: ${6 * a}x + ${2 * b} = 0<br>
                x = ${candidate.toFixed(3)}<br>
                <strong>Justification:</strong> Points where f''(x) = 0 are potential inflection points where concavity may change.`;
            } else {
                html += `<strong>f''(x) is never zero.</strong><br>
                <strong>Justification:</strong> The second derivative ${this.formatSecondDerivativeFunction(a, b).replace("f''(x) = ", '')} has no real solutions.`;
            }
            html += `</div>`;

            // f. Find inflection points
            const inflectionPoints = this.findInflectionPoints(a, b, c, d);
            html += `<div class="step-display">
                <strong>f. Inflection Points:</strong><br>`;
            if (inflectionPoints.length > 0) {
                html += inflectionPoints.map(pt => {
                    return `(${pt.x.toFixed(3)}, ${pt.y.toFixed(3)}) - Concavity changes from ${pt.concavityChange}`;
                }).join('<br>');
                html += '<br><strong>Justification:</strong> At these points, f\'\'(x) changes sign, indicating a change in concavity.';
            } else {
                html += 'No inflection points found.<br>';
                html += '<strong>Justification:</strong> Although f\'\'(x) = 0 at candidate points, the concavity does not actually change.';
            }
            html += `</div>`;
        }

        if (focus === 'complete' || focus === 'intervals') {
            // g & h. Increasing/Decreasing intervals
            const intervals = this.findIncreasingDecreasingIntervals(a, b, c);
            const criticalPoints = this.findCubicCriticalPoints(a, b, c);
            html += `<div class="step-display">
                <strong>g. Intervals where f(x) is increasing:</strong><br>
                ${intervals.increasing.length > 0 ? intervals.increasing.join(', ') : 'None'}<br>
                <strong>Justification:</strong> f(x) is increasing where f'(x) > 0. Critical points at x = ${criticalPoints.length > 0 ? criticalPoints.map(cp => cp.toFixed(3)).join(', ') : 'none'} divide the domain into intervals to test.
            </div>`;
            html += `<div class="step-display">
                <strong>h. Intervals where f(x) is decreasing:</strong><br>
                ${intervals.decreasing.length > 0 ? intervals.decreasing.join(', ') : 'None'}<br>
                <strong>Justification:</strong> f(x) is decreasing where f'(x) < 0. We test the sign of f'(x) in each interval between critical points.
            </div>`;
        }

        if (focus === 'complete' || focus === 'concavity') {
            // i & j. Concave up/down intervals
            const concavityIntervals = this.findConcavityIntervals(a, b);
            const inflectionCandidates = this.findInflectionCandidates(a, b);
            html += `<div class="step-display">
                <strong>i. Intervals where f(x) is concave up:</strong><br>
                ${concavityIntervals.concaveUp.length > 0 ? concavityIntervals.concaveUp.join(', ') : 'None'}<br>
                <strong>Justification:</strong> f(x) is concave up where f''(x) > 0. Inflection candidates at x = ${inflectionCandidates.length > 0 ? inflectionCandidates.map(ic => ic.toFixed(3)).join(', ') : 'none'} divide the domain for testing.
            </div>`;
            html += `<div class="step-display">
                <strong>j. Intervals where f(x) is concave down:</strong><br>
                ${concavityIntervals.concaveDown.length > 0 ? concavityIntervals.concaveDown.join(', ') : 'None'}<br>
                <strong>Justification:</strong> f(x) is concave down where f''(x) < 0. We test the sign of f''(x) in each interval between inflection candidates.
            </div>`;
        }

        resultsDiv.innerHTML = html;
    }

    findRationalZeros(a, b, c, d) {
        // Use Rational Root Theorem: p/q where p divides d and q divides a
        const factorsD = this.getFactors(Math.abs(d));
        const factorsA = this.getFactors(Math.abs(a));
        const candidates = [];
        
        if (d === 0) {
            candidates.push(0); // x = 0 is always a zero when d = 0
        }
        
        for (let p of factorsD) {
            for (let q of factorsA) {
                candidates.push(p / q, -p / q);
            }
        }
        
        // Remove duplicates and test each candidate
        const uniqueCandidates = [...new Set(candidates)];
        const zeros = [];
        
        for (let candidate of uniqueCandidates) {
            const value = this.evaluateCubic(a, b, c, d, candidate);
            if (Math.abs(value) < 1e-10) {
                zeros.push(candidate);
            }
        }
        
        return zeros.sort((x, y) => x - y);
    }

    getFactors(n) {
        if (n === 0) return [1];
        const factors = [];
        for (let i = 1; i <= Math.abs(n); i++) {
            if (n % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    }

    classifyExtrema(a, b, c, d, criticalPoints) {
        const maxima = [];
        const minima = [];
        
        for (let x of criticalPoints) {
            const secondDerivative = this.evaluateSecondDerivative(a, b, x);
            const y = this.evaluateCubic(a, b, c, d, x);
            
            if (secondDerivative > 1e-10) {
                minima.push({x, y});
            } else if (secondDerivative < -1e-10) {
                maxima.push({x, y});
            }
        }
        
        return {maxima, minima};
    }

    findInflectionCandidates(a, b) {
        // f''(x) = 6ax + 2b = 0
        // x = -2b / (6a) = -b / (3a)
        if (Math.abs(a) < 1e-10) return [];
        return [-b / (3 * a)];
    }

    findInflectionPoints(a, b, c, d) {
        const candidates = this.findInflectionCandidates(a, b);
        const inflectionPoints = [];
        
        for (let x of candidates) {
            // Check if concavity actually changes
            const leftX = x - 0.1;
            const rightX = x + 0.1;
            const leftConcavity = this.evaluateSecondDerivative(a, b, leftX);
            const rightConcavity = this.evaluateSecondDerivative(a, b, rightX);
            
            if (leftConcavity * rightConcavity < 0) {
                const y = this.evaluateCubic(a, b, c, d, x);
                const concavityChange = leftConcavity > 0 ? 'concave up to concave down' : 'concave down to concave up';
                inflectionPoints.push({x, y, concavityChange});
            }
        }
        
        return inflectionPoints;
    }

    findIncreasingDecreasingIntervals(a, b, c) {
        const criticalPoints = this.findCubicCriticalPoints(a, b, c).sort((x, y) => x - y);
        const intervals = {increasing: [], decreasing: []};
        
        // Test intervals between critical points
        const testPoints = [-1000, ...criticalPoints, 1000];
        
        for (let i = 0; i < testPoints.length - 1; i++) {
            const midpoint = (testPoints[i] + testPoints[i + 1]) / 2;
            const derivative = this.evaluateDerivative(a, b, c, midpoint);
            
            let intervalStr;
            if (i === 0) {
                intervalStr = `(-∞, ${testPoints[i + 1].toFixed(3)})`;
            } else if (i === testPoints.length - 2) {
                intervalStr = `(${testPoints[i].toFixed(3)}, ∞)`;
            } else {
                intervalStr = `(${testPoints[i].toFixed(3)}, ${testPoints[i + 1].toFixed(3)})`;
            }
            
            if (derivative > 0) {
                intervals.increasing.push(intervalStr);
            } else if (derivative < 0) {
                intervals.decreasing.push(intervalStr);
            }
        }
        
        return intervals;
    }

    findConcavityIntervals(a, b) {
        const inflectionPoints = this.findInflectionCandidates(a, b);
        const intervals = {concaveUp: [], concaveDown: []};
        
        const testPoints = [-1000, ...inflectionPoints, 1000];
        
        for (let i = 0; i < testPoints.length - 1; i++) {
            const midpoint = (testPoints[i] + testPoints[i + 1]) / 2;
            const secondDerivative = this.evaluateSecondDerivative(a, b, midpoint);
            
            let intervalStr;
            if (i === 0 && testPoints.length > 2) {
                intervalStr = `(-∞, ${testPoints[i + 1].toFixed(3)})`;
            } else if (i === testPoints.length - 2 && testPoints.length > 2) {
                intervalStr = `(${testPoints[i].toFixed(3)}, ∞)`;
            } else if (testPoints.length === 2) {
                intervalStr = '(-∞, ∞)';
            } else {
                intervalStr = `(${testPoints[i].toFixed(3)}, ${testPoints[i + 1].toFixed(3)})`;
            }
            
            if (secondDerivative > 0) {
                intervals.concaveUp.push(intervalStr);
            } else if (secondDerivative < 0) {
                intervals.concaveDown.push(intervalStr);
            }
        }
        
        return intervals;
    }

    formatSecondDerivativeFunction(a, b) {
        let func = "f''(x) = ";
        
        // Handle 6a (constant term)
        const coeff6a = 6 * a;
        if (coeff6a !== 0) {
            if (coeff6a === 1) func += 'x';
            else if (coeff6a === -1) func += '-x';
            else func += `${coeff6a}x`;
        }
        
        // Handle 2b (constant term)
        const coeff2b = 2 * b;
        if (coeff2b !== 0) {
            if (func !== "f''(x) = ") func += coeff2b > 0 ? ' + ' : ' - ';
            else if (coeff2b < 0) func += '-';
            func += Math.abs(coeff2b);
        }
        
        if (func === "f''(x) = ") func += '0';
        
        return func;
    }

    drawAnalysisPoints(ctx, canvas, a, b, c, d, focus) {
        const scale = 40;
        
        // Draw critical points
        const criticalPoints = this.findCubicCriticalPoints(a, b, c);
        const extrema = this.classifyExtrema(a, b, c, d, criticalPoints);
        
        if (focus === 'complete' || focus === 'zeros') {
            // Draw rational zeros
            const zeros = this.findRationalZeros(a, b, c, d);
            zeros.forEach(zero => {
                const y = this.evaluateCubic(a, b, c, d, zero);
                ctx.fillStyle = '#9C27B0';
                ctx.beginPath();
                ctx.arc(zero * scale, y * scale, 5, 0, 2 * Math.PI);
                ctx.fill();
                
                // Label
                ctx.save();
                ctx.scale(1, -1);
                ctx.fillStyle = '#9C27B0';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Zero', zero * scale, -(y * scale + 15));
                ctx.restore();
            });
            
            // Draw extrema
            extrema.maxima.forEach(pt => {
                ctx.fillStyle = '#F44336';
                ctx.beginPath();
                ctx.arc(pt.x * scale, pt.y * scale, 6, 0, 2 * Math.PI);
                ctx.fill();
            });
            
            extrema.minima.forEach(pt => {
                ctx.fillStyle = '#4CAF50';
                ctx.beginPath();
                ctx.arc(pt.x * scale, pt.y * scale, 6, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
        
        if (focus === 'complete' || focus === 'concavity') {
            // Draw inflection points
            const inflectionPoints = this.findInflectionPoints(a, b, c, d);
            inflectionPoints.forEach(pt => {
                ctx.fillStyle = '#FF9800';
                ctx.beginPath();
                ctx.arc(pt.x * scale, pt.y * scale, 5, 0, 2 * Math.PI);
                ctx.fill();
                
                // Label
                ctx.save();
                ctx.scale(1, -1);
                ctx.fillStyle = '#FF9800';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Inflection', pt.x * scale, -(pt.y * scale + 15));
                ctx.restore();
            });
        }
    }

    performCompleteAnalysis() {
        document.getElementById('analysisFocus').value = 'complete';
        this.updateFunctionAnalysis();
    }

    animateAnalysisSteps() {
        const steps = ['derivatives', 'zeros', 'concavity', 'intervals', 'complete'];
        let currentStep = 0;
        
        const animate = () => {
            if (currentStep < steps.length) {
                document.getElementById('analysisFocus').value = steps[currentStep];
                this.updateFunctionAnalysis();
                currentStep++;
                this.animationFrames.analysis = setTimeout(animate, 2000);
            }
        };
        
        if (this.animationFrames.analysis) {
            clearTimeout(this.animationFrames.analysis);
        }
        animate();
    }

    // Numerical Integration Section
    updateNumericalIntegration() {
        const canvas = this.canvases.integrationCanvas;
        const ctx = this.contexts.integrationCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        this.drawAxes(ctx, canvas);
        
        const method = document.getElementById('integrationMethod').value;
        const dataInputMethod = document.getElementById('dataInputMethod').value;
        
        if (dataInputMethod === 'table') {
            this.drawDataPoints(ctx, canvas);
            this.drawIntegrationAxes(ctx, canvas);
            this.visualizeNumericalIntegration(ctx, canvas, method);
        } else {
            const func = document.getElementById('integrationFunction').value;
            this.drawFunction(ctx, canvas, func, '#2196F3', 2);
            this.visualizeFunctionIntegration(ctx, canvas, func, method);
        }
        
        this.calculateIntegration();
    }
    
    drawDataPoints(ctx, canvas) {
        const dataText = document.getElementById('dataTable').value;
        const points = this.parseDataTable(dataText);
        
        if (points.length === 0) return;
        
        // Calculate proper scaling for the data
        const minX = Math.min(...points.map(p => p.x));
        const maxX = Math.max(...points.map(p => p.x));
        const minY = Math.min(...points.map(p => p.y));
        const maxY = Math.max(...points.map(p => p.y));
        
        // Extend y-axis to ensure visibility up to 150
        const extendedMaxY = Math.max(maxY, 150);
        
        // Add generous padding to ensure all points are visible with good margins
        const xRange = maxX - minX;
        const yRange = extendedMaxY - minY;
        const xPadding = xRange * 0.08; // 8% padding on each side
        const yPadding = yRange * 0.12; // 12% padding on top and bottom for extended range
        
        const paddedMinX = minX - xPadding;
        const paddedMaxX = maxX + xPadding;
        const paddedMinY = minY - yPadding;
        const paddedMaxY = extendedMaxY + yPadding;
        
        const paddedXRange = paddedMaxX - paddedMinX;
        const paddedYRange = paddedMaxY - paddedMinY;
        
        // Use conservative canvas area to ensure everything fits with good margins
        const plotWidth = canvas.width * 0.72;   // Slightly increased for better visibility
        const plotHeight = canvas.height * 0.62; // Slightly increased for better visibility
        
        const xScale = plotWidth / paddedXRange;
        const yScale = plotHeight / paddedYRange;
        
        // Draw the curve connecting points
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < points.length; i++) {
            const x = (points[i].x - paddedMinX) * xScale - plotWidth/2;
            const y = (points[i].y - paddedMinY) * yScale;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw data points with larger radius for better visibility
        ctx.fillStyle = '#F44336';
        points.forEach(point => {
            const x = (point.x - paddedMinX) * xScale - plotWidth/2;
            const y = (point.y - paddedMinY) * yScale;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Store scaling info for use in visualization
        this.integrationScale = { 
            xScale, 
            yScale, 
            minX: paddedMinX, 
            minY: paddedMinY, 
            plotWidth, 
            plotHeight,
            dataMinX: minX,
            dataMaxX: maxX,
            dataMinY: minY,
            dataMaxY: maxY,
            extendedMaxY,
            paddedMinY,
            paddedMaxY
        };
        
        // Debug logging to verify the scaling includes extended y range
        console.log('Data Y-range:', { minY, maxY, extendedMaxY });
        console.log('Padded Y-range:', { paddedMinY, paddedMaxY });
        console.log('Plot dimensions:', { plotWidth, plotHeight });
    }
    
    drawIntegrationAxes(ctx, canvas) {
        if (!this.integrationScale) return;
        
        const { xScale, yScale, minX, minY, plotWidth, plotHeight, dataMinX, dataMaxX, dataMinY, dataMaxY, extendedMaxY, paddedMinY, paddedMaxY } = this.integrationScale;
        
        ctx.save();
        ctx.scale(1, -1); // Flip text back to normal
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // Calculate appropriate label intervals based on data range
        const xDataRange = dataMaxX - dataMinX;
        const yDataRange = extendedMaxY - dataMinY;
        
        // Determine x-axis label interval (aim for 5-8 labels)
        let xInterval = Math.pow(10, Math.floor(Math.log10(xDataRange / 6)));
        if (xDataRange / xInterval > 8) xInterval *= 2;
        if (xDataRange / xInterval > 8) xInterval *= 2.5;
        
        // For y-axis, use 25-unit intervals for better readability with extended range to 150
        let yInterval = 25; // Use 25-unit intervals for the 10-150 range
        
        // X-axis labels
        const xStart = Math.ceil(dataMinX / xInterval) * xInterval;
        for (let x = xStart; x <= dataMaxX; x += xInterval) {
            const canvasX = (x - minX) * xScale - plotWidth/2;
            if (canvasX >= -plotWidth/2 && canvasX <= plotWidth/2) {
                ctx.fillText(x.toString(), canvasX, 15);
            }
        }
        
        // Y-axis labels - ensure we include extended range up to 150
        ctx.textAlign = 'right';
        
        // Create a comprehensive set of y-labels
        const yLabels = [];
        
        // Add labels at regular intervals from data minimum to extended maximum
        for (let y = Math.ceil(dataMinY / yInterval) * yInterval; y <= extendedMaxY; y += yInterval) {
            yLabels.push(y);
        }
        
        // Ensure key values are explicitly included
        if (!yLabels.includes(dataMaxY)) {
            yLabels.push(dataMaxY);
        }
        if (!yLabels.includes(150)) {
            yLabels.push(150);
        }
        
        // Sort labels for proper display
        yLabels.sort((a, b) => a - b);
        
        // Draw all y-labels
        yLabels.forEach(y => {
            const canvasY = -((y - minY) * yScale);
            if (canvasY >= -plotHeight && canvasY <= 0) {
                ctx.fillText(y.toString(), -plotWidth/2 - 10, canvasY + 4);
                
                // Draw grid lines for major values
                ctx.save();
                ctx.strokeStyle = y % 50 === 0 ? '#e0e0e0' : '#f0f0f0'; // Stronger lines every 50 units
                ctx.lineWidth = y % 50 === 0 ? 1 : 0.5;
                ctx.scale(1, -1); // Flip back for grid lines
                ctx.beginPath();
                ctx.moveTo(-plotWidth/2, (y - minY) * yScale);
                ctx.lineTo(plotWidth/2, (y - minY) * yScale);
                ctx.stroke();
                ctx.restore();
            }
        });
        
        // Draw axis lines
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 2;
        ctx.scale(1, -1); // Flip back to canvas coordinates
        
        // X-axis line (at y = dataMinY level)
        const xAxisY = (dataMinY - minY) * yScale;
        ctx.beginPath();
        ctx.moveTo(-plotWidth/2, xAxisY);
        ctx.lineTo(plotWidth/2, xAxisY);
        ctx.stroke();
        
        // Y-axis line (at x = dataMinX level)
        const yAxisX = (dataMinX - minX) * xScale - plotWidth/2;
        ctx.beginPath();
        ctx.moveTo(yAxisX, 0);
        ctx.lineTo(yAxisX, plotHeight);
        ctx.stroke();
        
        ctx.restore();
    }
    
    parseDataTable(dataText) {
        const lines = dataText.trim().split('\n');
        const points = [];
        
        lines.forEach(line => {
            const parts = line.trim().split(/\s+/);
            if (parts.length >= 2) {
                const x = parseFloat(parts[0]);
                const y = parseFloat(parts[1]);
                if (!isNaN(x) && !isNaN(y)) {
                    points.push({x, y});
                }
            }
        });
        
        return points.sort((a, b) => a.x - b.x);
    }
    
    visualizeNumericalIntegration(ctx, canvas, method) {
        const points = this.parseDataTable(document.getElementById('dataTable').value);
        const n = parseInt(document.getElementById('numSubintervals').value);
        
        if (points.length < 2 || n < 1 || !this.integrationScale) return;
        
        const { xScale, yScale, minX, minY, plotWidth, plotHeight, dataMinX, dataMaxX } = this.integrationScale;
        const xRange = dataMaxX - dataMinX;
        const deltaX = xRange / n;
        
        // Calculate baseline y position (bottom of the data area)
        const baselineY = (this.integrationScale.dataMinY - minY) * yScale;
        
        console.log('Visualization debug:', { 
            method, 
            baselineY, 
            dataMinY: this.integrationScale.dataMinY, 
            minY, 
            yScale 
        });
        
        for (let i = 0; i < n; i++) {
            const x1 = dataMinX + i * deltaX;
            const x2 = dataMinX + (i + 1) * deltaX;
            
            const y1 = this.interpolateValue(points, x1);
            const y2 = this.interpolateValue(points, x2);
            
            const canvasX1 = (x1 - minX) * xScale - plotWidth/2;
            const canvasX2 = (x2 - minX) * xScale - plotWidth/2;
            const canvasY1 = (y1 - minY) * yScale;
            const canvasY2 = (y2 - minY) * yScale;
            
            const rectWidth = canvasX2 - canvasX1;
            
            if (i === 0) {
                console.log('First rectangle coords:', {
                    canvasX1, canvasX2, canvasY1, canvasY2, baselineY, rectWidth
                });
            }
            
            // Left Riemann Sum
            if (method === 'left' || method === 'compare-riemann' || method === 'compare-all') {
                ctx.fillStyle = method === 'compare-riemann' || method === 'compare-all' ? 'rgba(255, 152, 0, 0.4)' : 'rgba(255, 152, 0, 0.6)';
                ctx.strokeStyle = '#FF9800';
                ctx.lineWidth = 2;
                
                // Draw rectangle from baseline to function value at left endpoint
                const rectHeight = canvasY1 - baselineY;
                
                if (Math.abs(rectHeight) > 1 && Math.abs(rectWidth) > 1) {
                    ctx.fillRect(canvasX1, baselineY, rectWidth, rectHeight);
                    ctx.strokeRect(canvasX1, baselineY, rectWidth, rectHeight);
                }
            }
            
            // Right Riemann Sum
            if (method === 'right' || method === 'compare-riemann' || method === 'compare-all') {
                ctx.fillStyle = method === 'compare-riemann' || method === 'compare-all' ? 'rgba(156, 39, 176, 0.4)' : 'rgba(156, 39, 176, 0.6)';
                ctx.strokeStyle = '#9C27B0';
                ctx.lineWidth = 2;
                
                // Draw rectangle from baseline to function value at right endpoint
                const rectHeight = canvasY2 - baselineY;
                
                if (Math.abs(rectHeight) > 1 && Math.abs(rectWidth) > 1) {
                    ctx.fillRect(canvasX1, baselineY, rectWidth, rectHeight);
                    ctx.strokeRect(canvasX1, baselineY, rectWidth, rectHeight);
                }
            }
            
            // Midpoint Rule
            if (method === 'midpoint' || method === 'compare-all') {
                const midX = (x1 + x2) / 2;
                const midY = this.interpolateValue(points, midX);
                const canvasMidY = (midY - minY) * yScale;
                
                ctx.fillStyle = method === 'compare-all' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.6)';
                ctx.strokeStyle = '#4CAF50';
                ctx.lineWidth = 2;
                
                const rectHeight = canvasMidY - baselineY;
                
                if (Math.abs(rectHeight) > 1 && Math.abs(rectWidth) > 1) {
                    ctx.fillRect(canvasX1, baselineY, rectWidth, rectHeight);
                    ctx.strokeRect(canvasX1, baselineY, rectWidth, rectHeight);
                }
            }
            
            // Trapezoidal Rule
            if (method === 'trapezoidal' || method === 'compare-all') {
                ctx.fillStyle = method === 'compare-all' ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.6)';
                ctx.strokeStyle = '#F44336';
                ctx.lineWidth = 2;
                
                ctx.beginPath();
                ctx.moveTo(canvasX1, baselineY);
                ctx.lineTo(canvasX1, canvasY1);
                ctx.lineTo(canvasX2, canvasY2);
                ctx.lineTo(canvasX2, baselineY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }
    }
    
    interpolateValue(points, x) {
        if (points.length < 2) return 0;
        
        // Find the two points to interpolate between
        for (let i = 0; i < points.length - 1; i++) {
            if (x >= points[i].x && x <= points[i + 1].x) {
                const t = (x - points[i].x) / (points[i + 1].x - points[i].x);
                return points[i].y + t * (points[i + 1].y - points[i].y);
            }
        }
        
        // Extrapolate if outside range
        if (x < points[0].x) return points[0].y;
        if (x > points[points.length - 1].x) return points[points.length - 1].y;
        
        return 0;
    }
    
    calculateIntegration() {
        const points = this.parseDataTable(document.getElementById('dataTable').value);
        const n = parseInt(document.getElementById('numSubintervals').value);
        const method = document.getElementById('integrationMethod').value;
        
        if (points.length < 2 || n < 1) {
            document.getElementById('integrationResults').innerHTML = '<div class="step-display">Please provide valid data points.</div>';
            return;
        }
        
        const xRange = points[points.length - 1].x - points[0].x;
        const deltaX = xRange / n;
        
        let leftSum = 0;
        let rightSum = 0;
        let midpointSum = 0;
        let trapezoidalSum = 0;
        
        // Calculate all methods
        for (let i = 0; i < n; i++) {
            const x1 = points[0].x + i * deltaX;
            const x2 = points[0].x + (i + 1) * deltaX;
            
            // Left and Right Riemann sums
            const y1 = this.interpolateValue(points, x1);
            const y2 = this.interpolateValue(points, x2);
            leftSum += y1 * deltaX;
            rightSum += y2 * deltaX;
            
            // Midpoint rule
            const midX = (x1 + x2) / 2;
            const midY = this.interpolateValue(points, midX);
            midpointSum += midY * deltaX;
            
            // Trapezoidal rule
            trapezoidalSum += 0.5 * (y1 + y2) * deltaX;
        }
        
        let results = '';
        
        if (method === 'left') {
            results += `
                <div class="step-display">
                    <strong>Left Riemann Sum (n = ${n}):</strong><br>
                    Δx = (${points[points.length-1].x} - ${points[0].x})/${n} = ${deltaX.toFixed(1)}<br>
                    Area ≈ Σ f(x₍ᵢ₎)Δx = ${leftSum.toFixed(2)}<br>
                    <em>Uses left endpoint of each subinterval</em>
                </div>
            `;
        }
        
        if (method === 'right') {
            results += `
                <div class="step-display">
                    <strong>Right Riemann Sum (n = ${n}):</strong><br>
                    Δx = (${points[points.length-1].x} - ${points[0].x})/${n} = ${deltaX.toFixed(1)}<br>
                    Area ≈ Σ f(x₍ᵢ₊₁₎)Δx = ${rightSum.toFixed(2)}<br>
                    <em>Uses right endpoint of each subinterval</em>
                </div>
            `;
        }
        
        if (method === 'midpoint') {
            results += `
                <div class="step-display">
                    <strong>Midpoint Rule (n = ${n}):</strong><br>
                    Δx = (${points[points.length-1].x} - ${points[0].x})/${n} = ${deltaX.toFixed(1)}<br>
                    Area ≈ Σ f(m₍ᵢ₎)Δx = ${midpointSum.toFixed(2)}<br>
                    <em>Uses midpoint of each subinterval</em>
                </div>
            `;
        }
        
        if (method === 'trapezoidal') {
            results += `
                <div class="step-display">
                    <strong>Trapezoidal Rule (n = ${n}):</strong><br>
                    Δx = (${points[points.length-1].x} - ${points[0].x})/${n} = ${deltaX.toFixed(1)}<br>
                    Area ≈ Σ ½[f(x₍ᵢ₎)+f(x₍ᵢ₊₁₎)]Δx = ${trapezoidalSum.toFixed(2)}<br>
                    <em>Uses trapezoids connecting endpoints</em>
                </div>
            `;
        }
        
        if (method === 'compare-riemann') {
            const difference = Math.abs(leftSum - rightSum);
            results += `
                <div class="step-display">
                    <strong>Left Riemann Sum:</strong> ${leftSum.toFixed(2)}<br>
                    <strong>Right Riemann Sum:</strong> ${rightSum.toFixed(2)}<br>
                    <strong>Difference:</strong> |${leftSum.toFixed(2)} - ${rightSum.toFixed(2)}| = ${difference.toFixed(2)}<br>
                    <em>Orange = Left endpoints, Purple = Right endpoints</em>
                </div>
            `;
        }
        
        if (method === 'compare-all') {
            const avgRiemann = (leftSum + rightSum) / 2;
            results += `
                <div class="step-display">
                    <strong>All Methods Comparison (n = ${n}):</strong><br>
                    • <span style="color: #FF9800;">Left Riemann:</span> ${leftSum.toFixed(2)}<br>
                    • <span style="color: #9C27B0;">Right Riemann:</span> ${rightSum.toFixed(2)}<br>
                    • <span style="color: #4CAF50;">Midpoint Rule:</span> ${midpointSum.toFixed(2)}<br>
                    • <span style="color: #F44336;">Trapezoidal:</span> ${trapezoidalSum.toFixed(2)}<br>
                    <strong>Average of Riemann Sums:</strong> ${avgRiemann.toFixed(2)}<br>
                    <em>Note: Trapezoidal = Average of Left and Right Riemann</em>
                </div>
            `;
        }
        
        document.getElementById('integrationResults').innerHTML = results;
    }
    
    toggleDataInput() {
        const method = document.getElementById('dataInputMethod').value;
        const functionInput = document.getElementById('functionInput');
        const tableInput = document.getElementById('tableInput');
        
        if (method === 'function') {
            functionInput.style.display = 'block';
            tableInput.style.display = 'none';
        } else {
            functionInput.style.display = 'none';
            tableInput.style.display = 'block';
        }
        
        this.updateNumericalIntegration();
    }
    
    animateIntegration() {
        const n = parseInt(document.getElementById('numSubintervals').value);
        let currentN = 1;
        
        const animate = () => {
            document.getElementById('numSubintervals').value = currentN;
            this.updateNumericalIntegration();
            currentN++;
            
            if (currentN <= n) {
                setTimeout(animate, 1000);
            }
        };
        
        animate();
    }
    
    // Rational Functions Section
    updateRationalFunction() {
        const canvas = this.canvases.rationalCanvas;
        const ctx = this.contexts.rationalCanvas;
        if (!ctx) return;

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        this.drawAxes(ctx, canvas);
        
        const numerator = document.getElementById('numerator').value;
        const denominator = document.getElementById('denominator').value;
        const xRange = parseInt(document.getElementById('xRange').value);
        
        document.getElementById('xRangeValue').textContent = `±${xRange}`;
        
        // Update display
        const displayNum = numerator.replace(/\*/g, '').replace(/\^/g, '^');
        const displayDen = denominator.replace(/\*/g, '').replace(/\^/g, '^');
        document.getElementById('rationalDisplay').innerHTML = `f(x) = (${displayNum})/(${displayDen})`;
        
        // Draw the rational function
        this.drawRationalFunction(ctx, canvas, numerator, denominator, xRange);
        
        // Find and mark asymptotes and holes
        this.markAsymptotesAndHoles(ctx, canvas, numerator, denominator, xRange);
        
        this.analyzeRationalFunction();
    }
    
    drawRationalFunction(ctx, canvas, numerator, denominator, xRange) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        
        const scale = Math.min(canvas.width, canvas.height) / (2 * xRange) * 0.8;
        
        ctx.beginPath();
        let first = true;
        let lastY = null;
        
        for (let x = -xRange; x <= xRange; x += 0.1) {
            try {
                const numValue = this.evaluatePolynomial(numerator, x);
                const denValue = this.evaluatePolynomial(denominator, x);
                
                if (Math.abs(denValue) > 1e-10) {
                    const y = numValue / denValue;
                    
                    if (!isNaN(y) && isFinite(y) && Math.abs(y) < xRange * 2) {
                        const canvasX = x * scale;
                        const canvasY = y * scale;
                        
                        // Check for discontinuities
                        if (lastY !== null && Math.abs(y - lastY) > xRange) {
                            first = true;
                        }
                        
                        if (first) {
                            ctx.moveTo(canvasX, canvasY);
                            first = false;
                        } else {
                            ctx.lineTo(canvasX, canvasY);
                        }
                        
                        lastY = y;
                    } else {
                        first = true;
                        lastY = null;
                    }
                } else {
                    first = true;
                    lastY = null;
                }
            } catch (e) {
                first = true;
                lastY = null;
            }
        }
        ctx.stroke();
    }
    
    evaluatePolynomial(polyStr, x) {
        try {
            let expr = polyStr
                .replace(/\^/g, '**')
                .replace(/x/g, `(${x})`)
                .replace(/\*\*/g, '**');
            return eval(expr);
        } catch (e) {
            return NaN;
        }
    }
    
    findPolynomialRoots(polyStr) {
        // Simplified root finding for demonstration
        const roots = [];
        
        // Test integer values from -10 to 10
        for (let x = -10; x <= 10; x++) {
            if (Math.abs(this.evaluatePolynomial(polyStr, x)) < 1e-10) {
                roots.push(x);
            }
        }
        
        return roots;
    }
    
    getPolynomialDegree(polyStr) {
        // Extract the highest power of x in the polynomial
        const matches = polyStr.match(/x\^(\d+)/g);
        if (!matches) {
            // Check if polynomial contains x without explicit power
            if (polyStr.includes('x')) {
                return 1;
            }
            return 0; // Constant polynomial
        }
        
        let maxDegree = 0;
        matches.forEach(match => {
            const degree = parseInt(match.replace('x^', ''));
            if (degree > maxDegree) {
                maxDegree = degree;
            }
        });
        
        return maxDegree;
    }
    
    analyzeEndBehaviorAsymptotes(numerator, denominator, numDegree, denDegree) {
        let analysis = '<br><strong>End Behavior Analysis:</strong><br>';
        
        if (numDegree < denDegree) {
            analysis += '• <span style="color: #2196F3;">Horizontal Asymptote:</span> y = 0<br>';
            analysis += '  <em>Reason: Degree of numerator < Degree of denominator</em><br>';
        } else if (numDegree === denDegree) {
            const numLeading = this.getLeadingCoefficient(numerator, numDegree);
            const denLeading = this.getLeadingCoefficient(denominator, denDegree);
            const horizontalAsymptote = numLeading / denLeading;
            analysis += `• <span style="color: #2196F3;">Horizontal Asymptote:</span> y = ${horizontalAsymptote.toFixed(3)}<br>`;
            analysis += '  <em>Reason: Degrees are equal, ratio of leading coefficients</em><br>';
        } else if (numDegree === denDegree + 1) {
            // Slant asymptote exists
            const slantAsymptote = this.findSlantAsymptote(numerator, denominator);
            analysis += `• <span style="color: #9C27B0;">Slant Asymptote:</span> y = ${slantAsymptote.equation}<br>`;
            analysis += '  <em>Reason: Degree of numerator = Degree of denominator + 1</em><br>';
            analysis += `  <strong>Polynomial Long Division Process:</strong><br>`;
            analysis += slantAsymptote.steps;
        } else {
            analysis += '• <strong>No Horizontal or Slant Asymptote</strong><br>';
            analysis += '  <em>Reason: Degree of numerator > Degree of denominator + 1</em><br>';
            analysis += '  <em>End behavior: Function grows without bound</em><br>';
        }
        
        return analysis;
    }
    
    getLeadingCoefficient(polyStr, degree) {
        // Extract the coefficient of the highest degree term
        const pattern = new RegExp(`([+-]?\d*\.?\d*)x\^${degree}`);
        const match = polyStr.match(pattern);
        
        if (match && match[1]) {
            const coeff = match[1];
            if (coeff === '' || coeff === '+') return 1;
            if (coeff === '-') return -1;
            return parseFloat(coeff);
        }
        
        // If not found with explicit power, check for first degree when degree is 1
        if (degree === 1) {
            const pattern1 = /([+-]?\d*\.?\d*)x(?!\^)/;
            const match1 = polyStr.match(pattern1);
            if (match1 && match1[1]) {
                const coeff = match1[1];
                if (coeff === '' || coeff === '+') return 1;
                if (coeff === '-') return -1;
                return parseFloat(coeff);
            }
        }
        
        return 1; // Default coefficient
    }
    
    findSlantAsymptote(numerator, denominator) {
        // Perform polynomial long division to find slant asymptote
        const numCoeffs = this.parsePolynomialCoefficients(numerator);
        const denCoeffs = this.parsePolynomialCoefficients(denominator);
        
        const quotient = this.polynomialLongDivision(numCoeffs, denCoeffs);
        
        // Format the slant asymptote equation
        let equation = '';
        let steps = '    <em>Division steps:</em><br>';
        
        if (quotient.linear !== 0) {
            if (quotient.linear === 1) {
                equation = 'x';
            } else if (quotient.linear === -1) {
                equation = '-x';
            } else {
                equation = `${quotient.linear}x`;
            }
        }
        
        if (quotient.constant !== 0) {
            if (equation !== '') {
                equation += quotient.constant > 0 ? ' + ' : ' - ';
                equation += Math.abs(quotient.constant);
            } else {
                equation = quotient.constant.toString();
            }
        }
        
        if (equation === '') equation = '0';
        
        steps += `    • Quotient: ${equation}<br>`;
        steps += `    • This quotient represents the slant asymptote<br>`;
        steps += `    • As x → ±∞, the function approaches this line<br>`;
        
        return {
            equation: equation,
            steps: steps,
            slope: quotient.linear,
            intercept: quotient.constant
        };
    }
    
    parsePolynomialCoefficients(polyStr) {
        // Parse polynomial string into coefficient array [constant, x, x^2, x^3, ...]
        const degree = this.getPolynomialDegree(polyStr);
        const coeffs = new Array(degree + 1).fill(0);
        
        // Handle each possible term
        for (let i = 0; i <= degree; i++) {
            if (i === 0) {
                // Constant term
                const constantMatch = polyStr.match(/([+-]?\d+)(?!.*x)/);
                if (constantMatch) {
                    coeffs[0] = parseFloat(constantMatch[1]);
                }
            } else if (i === 1) {
                // Linear term (x)
                const linearMatch = polyStr.match(/([+-]?\d*\.?\d*)x(?!\^)/);
                if (linearMatch) {
                    const coeff = linearMatch[1];
                    if (coeff === '' || coeff === '+') coeffs[1] = 1;
                    else if (coeff === '-') coeffs[1] = -1;
                    else coeffs[1] = parseFloat(coeff);
                }
            } else {
                // Higher degree terms
                const pattern = new RegExp(`([+-]?\\d*\\.?\\d*)x\\^${i}`);
                const match = polyStr.match(pattern);
                if (match) {
                    const coeff = match[1];
                    if (coeff === '' || coeff === '+') coeffs[i] = 1;
                    else if (coeff === '-') coeffs[i] = -1;
                    else coeffs[i] = parseFloat(coeff);
                }
            }
        }
        
        return coeffs;
    }
    
    polynomialLongDivision(numCoeffs, denCoeffs) {
        // Simplified polynomial long division for slant asymptote
        // Returns the linear quotient (ax + b) when numerator degree = denominator degree + 1
        
        const numDegree = numCoeffs.length - 1;
        const denDegree = denCoeffs.length - 1;
        
        if (numDegree !== denDegree + 1) {
            return { linear: 0, constant: 0 };
        }
        
        // Get leading coefficients
        const numLeading = numCoeffs[numDegree];
        const denLeading = denCoeffs[denDegree];
        
        // First division step: linear coefficient
        const linearCoeff = numLeading / denLeading;
        
        // Second division step: constant coefficient
        // This is simplified - in practice would need full polynomial division
        let constantCoeff = 0;
        if (numDegree >= 1 && denDegree >= 1) {
            constantCoeff = (numCoeffs[numDegree - 1] - linearCoeff * denCoeffs[denDegree - 1]) / denLeading;
        }
        
        return {
            linear: linearCoeff,
            constant: constantCoeff
        };
    }
    
    markAsymptotesAndHoles(ctx, canvas, numerator, denominator, xRange) {
        const scale = Math.min(canvas.width, canvas.height) / (2 * xRange) * 0.8;
        const denRoots = this.findPolynomialRoots(denominator);
        
        // Mark vertical asymptotes and holes
        denRoots.forEach(root => {
            const numValue = this.evaluatePolynomial(numerator, root);
            const canvasX = root * scale;
            
            if (Math.abs(numValue) < 1e-10) {
                // Hole (common factor)
                ctx.strokeStyle = '#FF9800';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(canvasX, 0, 6, 0, 2 * Math.PI);
                ctx.stroke();
                
                ctx.fillStyle = 'white';
                ctx.fill();
            } else {
                // Vertical asymptote
                ctx.strokeStyle = '#F44336';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(canvasX, -canvas.height/2);
                ctx.lineTo(canvasX, canvas.height/2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });
        
        // Check for and draw slant asymptotes
        const numDegree = this.getPolynomialDegree(numerator);
        const denDegree = this.getPolynomialDegree(denominator);
        
        if (numDegree === denDegree + 1) {
            const slantAsymptote = this.findSlantAsymptote(numerator, denominator);
            this.drawSlantAsymptote(ctx, canvas, slantAsymptote, xRange, scale);
        } else if (numDegree === denDegree) {
            // Draw horizontal asymptote
            const numLeading = this.getLeadingCoefficient(numerator, numDegree);
            const denLeading = this.getLeadingCoefficient(denominator, denDegree);
            const horizontalAsymptote = numLeading / denLeading;
            this.drawHorizontalAsymptote(ctx, canvas, horizontalAsymptote, scale);
        } else if (numDegree < denDegree) {
            // Draw horizontal asymptote at y = 0
            this.drawHorizontalAsymptote(ctx, canvas, 0, scale);
        }
    }
    
    drawSlantAsymptote(ctx, canvas, slantAsymptote, xRange, scale) {
        ctx.strokeStyle = '#9C27B0';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        
        ctx.beginPath();
        
        const leftX = -xRange;
        const rightX = xRange;
        const leftY = slantAsymptote.slope * leftX + slantAsymptote.intercept;
        const rightY = slantAsymptote.slope * rightX + slantAsymptote.intercept;
        
        const canvasLeftX = leftX * scale;
        const canvasLeftY = leftY * scale;
        const canvasRightX = rightX * scale;
        const canvasRightY = rightY * scale;
        
        ctx.moveTo(canvasLeftX, canvasLeftY);
        ctx.lineTo(canvasRightX, canvasRightY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add label for slant asymptote
        ctx.save();
        ctx.scale(1, -1); // Flip text back to normal
        ctx.fillStyle = '#9C27B0';
        ctx.font = '12px Arial';
        ctx.fillText(`y = ${slantAsymptote.equation}`, canvasRightX - 100, -canvasRightY - 10);
        ctx.restore();
    }
    
    drawHorizontalAsymptote(ctx, canvas, yValue, scale) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        
        const canvasY = yValue * scale;
        
        ctx.beginPath();
        ctx.moveTo(-canvas.width/2, canvasY);
        ctx.lineTo(canvas.width/2, canvasY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add label for horizontal asymptote
        if (Math.abs(yValue) > 0.01) {
            ctx.save();
            ctx.scale(1, -1); // Flip text back to normal
            ctx.fillStyle = '#2196F3';
            ctx.font = '12px Arial';
            ctx.fillText(`y = ${yValue.toFixed(2)}`, canvas.width/2 - 80, -canvasY - 10);
            ctx.restore();
        }
    }
    
    analyzeRationalFunction() {
        const numerator = document.getElementById('numerator').value;
        const denominator = document.getElementById('denominator').value;
        const analysisType = document.getElementById('rationalAnalysisType').value;
        
        const numRoots = this.findPolynomialRoots(numerator);
        const denRoots = this.findPolynomialRoots(denominator);
        
        // Get polynomial degrees for asymptote analysis
        const numDegree = this.getPolynomialDegree(numerator);
        const denDegree = this.getPolynomialDegree(denominator);
        
        let results = '';
        
        if (analysisType === 'asymptotes' || analysisType === 'complete') {
            results += `
                <div class="step-display">
                    <strong>Asymptotes and Holes Analysis:</strong><br>
                    <strong>Polynomial Degrees:</strong> Numerator = ${numDegree}, Denominator = ${denDegree}<br>
            `;
            
            // Vertical Asymptotes and Holes
            if (denRoots.length > 0) {
                results += `<strong>Denominator zeros:</strong> x = ${denRoots.join(', ')}<br>`;
                
                denRoots.forEach(root => {
                    const numValue = this.evaluatePolynomial(numerator, root);
                    if (Math.abs(numValue) < 1e-10) {
                        results += `• x = ${root}: <span style="color: #FF9800;">Hole</span> (common factor)<br>`;
                    } else {
                        results += `• x = ${root}: <span style="color: #F44336;">Vertical Asymptote</span><br>`;
                    }
                });
            } else {
                results += 'No vertical asymptotes or holes found.<br>';
            }
            
            // Horizontal and Slant Asymptotes
            const asymptoteAnalysis = this.analyzeEndBehaviorAsymptotes(numerator, denominator, numDegree, denDegree);
            results += asymptoteAnalysis;
            
            results += `</div>`;
        }
        
        if (analysisType === 'extrema' || analysisType === 'complete') {
            results += `
                <div class="step-display">
                    <strong>Finding Relative Extrema:</strong><br>
                    To find extrema, we need f'(x) = 0.<br>
                    Using the quotient rule: f'(x) = [p'(x)q(x) - p(x)q'(x)] / [q(x)]²<br>
                    <em>Calculate the derivative and solve f'(x) = 0</em><br>
                    <em>Use the 1st or 2nd Derivative Test to classify critical points</em>
                </div>
            `;
        }
        
        if (analysisType === 'complete') {
            const yIntercept = this.evaluatePolynomial(numerator, 0) / this.evaluatePolynomial(denominator, 0);
            results += `
                <div class="step-display">
                    <strong>Complete Analysis Summary:</strong><br>
                    • Domain: All real numbers except x = ${denRoots.join(', ')}<br>
                    • X-intercepts: ${numRoots.length > 0 ? `x = ${numRoots.join(', ')}` : 'None found'}<br>
                    • Y-intercept: f(0) = ${isFinite(yIntercept) ? yIntercept.toFixed(3) : 'undefined'}<br>
                    • End behavior determined by degree comparison<br>
                    • Critical points found by solving f'(x) = 0
                </div>
            `;
        }
        
        document.getElementById('rationalResults').innerHTML = results;
    }
    
    findAsymptotesAndHoles() {
        document.getElementById('rationalAnalysisType').value = 'asymptotes';
        this.analyzeRationalFunction();
    }
    
    findRationalExtrema() {
        document.getElementById('rationalAnalysisType').value = 'extrema';
        this.analyzeRationalFunction();
    }
    
    drawFunction(ctx, canvas, funcStr, color, lineWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        
        const scale = 40;
        let first = true;
        
        for (let x = -canvas.width/(2*scale); x <= canvas.width/(2*scale); x += 0.1) {
            const y = this.evaluateFunction(funcStr, x);
            
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

    // Utility Functions
    evaluateFunction(funcStr, x) {
        try {
            // Replace mathematical notation with JavaScript equivalents
            let expr = funcStr
                .replace(/\^/g, '**')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/ln/g, 'Math.log')
                .replace(/exp/g, 'Math.exp')
                .replace(/e\*\*x/g, 'Math.exp(x)')
                .replace(/x/g, `(${x})`);

            return eval(expr);
        } catch (e) {
            return NaN;
        }
    }

    approximateDerivative(funcStr, x, h = 0.0001) {
        const fx = this.evaluateFunction(funcStr, x);
        const fxh = this.evaluateFunction(funcStr, x + h);
        return (fxh - fx) / h;
    }

    getDerivativeExpression(funcStr) {
        switch(funcStr) {
            case 'x': return '1';
            case 'x^2': return '2x';
            case 'x^3': return '3x²';
            case 'sin(x)': return 'cos(x)';
            case 'cos(x)': return '-sin(x)';
            case 'e^x': return 'eˣ';
            case 'ln(x)': return '1/x';
            case '2x': return '2';
            case '3x+1': return '3';
            case '1': return '0';
            default: return 'f\'(x)';
        }
    }

    getOuterDerivative(outer) {
        switch(outer) {
            case 'sin': return 'cos(u)';
            case 'cos': return '-sin(u)';
            case 'ln': return '1/u';
            case 'exp': return 'e^u';
            case 'square': return '2u';
            default: return 'f\'(u)';
        }
    }

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
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 0.5;
        
        const scale = 40;
        for (let i = -10; i <= 10; i++) {
            if (i !== 0) {
                // Vertical grid lines
                ctx.beginPath();
                ctx.moveTo(i * scale, -canvas.height/2);
                ctx.lineTo(i * scale, canvas.height/2);
                ctx.stroke();
                
                // Horizontal grid lines
                ctx.beginPath();
                ctx.moveTo(-canvas.width/2, i * scale);
                ctx.lineTo(canvas.width/2, i * scale);
                ctx.stroke();
            }
        }
    }

    // Flashcard System Implementation
    initializeFlashcards() {
        // Derivative rules flashcards based on the provided image
        this.flashcards = [
            {
                id: 1,
                function: "d(cu)/dx",
                derivative: "cu'",
                description: "Constant Multiple Rule"
            },
            {
                id: 2,
                function: "d(u ± v)/dx",
                derivative: "u' ± v'",
                description: "Sum/Difference Rule"
            },
            {
                id: 3,
                function: "d(uv)/dx",
                derivative: "u'v + uv'",
                description: "Product Rule"
            },
            {
                id: 4,
                function: "d(u/v)/dx",
                derivative: "(u'v - uv')/v²",
                description: "Quotient Rule"
            },
            {
                id: 5,
                function: "d(c)/dx",
                derivative: "0",
                description: "Constant Rule"
            },
            {
                id: 6,
                function: "d(uⁿ)/dx",
                derivative: "nuⁿ⁻¹u'",
                description: "Power Rule"
            },
            {
                id: 7,
                function: "d(x)/dx",
                derivative: "1",
                description: "Variable Rule"
            },
            {
                id: 8,
                function: "d(|u|)/dx",
                derivative: "u/|u| · u'",
                description: "Absolute Value Rule"
            },
            {
                id: 9,
                function: "d(sin u)/dx",
                derivative: "(cos u)u'",
                description: "Sine Rule"
            },
            {
                id: 10,
                function: "d(cos u)/dx",
                derivative: "(-sin u)u'",
                description: "Cosine Rule"
            },
            {
                id: 11,
                function: "d(tan u)/dx",
                derivative: "(sec² u)u'",
                description: "Tangent Rule"
            },
            {
                id: 12,
                function: "d(cot u)/dx",
                derivative: "(-csc² u)u'",
                description: "Cotangent Rule"
            },
            {
                id: 13,
                function: "d(sec u)/dx",
                derivative: "(sec u tan u)u'",
                description: "Secant Rule"
            },
            {
                id: 14,
                function: "d(csc u)/dx",
                derivative: "(-csc u cot u)u'",
                description: "Cosecant Rule"
            },
            {
                id: 15,
                function: "d(ln u)/dx",
                derivative: "u'/u",
                description: "Natural Logarithm Rule"
            },
            {
                id: 16,
                function: "d(eᵘ)/dx",
                derivative: "eᵘu'",
                description: "Exponential Rule"
            }
        ];
        
        this.currentCardIndex = 0;
        this.isFlipped = false;
        this.reviewedCards = new Set();
        this.cardOrder = [...Array(this.flashcards.length).keys()]; // [0, 1, 2, ..., 15]
    }

    initializeFlashcardUI() {
        this.updateCardDisplay();
        this.updateProgress();
        this.updateNavigationButtons();
    }

    updateCardDisplay() {
        const card = this.flashcards[this.cardOrder[this.currentCardIndex]];
        const flashcard = document.getElementById('flashcard');
        const frontFormula = document.getElementById('frontFormula');
        const backFormula = document.getElementById('backFormula');
        const cardCounter = document.getElementById('cardCounter');
        
        if (frontFormula) frontFormula.textContent = card.function;
        if (backFormula) backFormula.textContent = card.derivative;
        if (cardCounter) cardCounter.textContent = `${this.currentCardIndex + 1} / ${this.flashcards.length}`;
        
        // Reset flip state when changing cards
        if (flashcard) {
            flashcard.classList.remove('flipped');
            this.isFlipped = false;
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const percentage = (this.reviewedCards.size / this.flashcards.length) * 100;
        
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${this.reviewedCards.size} / ${this.flashcards.length} cards reviewed`;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.disabled = this.currentCardIndex === 0;
        if (nextBtn) nextBtn.disabled = this.currentCardIndex === this.flashcards.length - 1;
    }

    previousCard() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.updateCardDisplay();
            this.updateNavigationButtons();
        }
    }

    nextCard() {
        if (this.currentCardIndex < this.flashcards.length - 1) {
            this.currentCardIndex++;
            this.updateCardDisplay();
            this.updateNavigationButtons();
        }
    }

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.toggle('flipped');
            this.isFlipped = !this.isFlipped;
            
            // Mark card as reviewed when flipped to see the answer
            if (this.isFlipped) {
                this.reviewedCards.add(this.cardOrder[this.currentCardIndex]);
                this.updateProgress();
            }
        }
    }

    shuffleCards() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.cardOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cardOrder[i], this.cardOrder[j]] = [this.cardOrder[j], this.cardOrder[i]];
        }
        
        this.currentCardIndex = 0;
        this.updateCardDisplay();
        this.updateNavigationButtons();
    }

    resetProgress() {
        this.reviewedCards.clear();
        this.currentCardIndex = 0;
        this.cardOrder = [...Array(this.flashcards.length).keys()];
        this.updateCardDisplay();
        this.updateProgress();
        this.updateNavigationButtons();
    }

    showAllCards() {
        const allCardsView = document.getElementById('allCardsView');
        const cardsGrid = document.getElementById('cardsGrid');
        
        if (allCardsView && cardsGrid) {
            const isVisible = allCardsView.style.display !== 'none';
            
            if (isVisible) {
                allCardsView.style.display = 'none';
                return;
            }
            
            // Generate all cards HTML
            cardsGrid.innerHTML = this.flashcards.map(card => `
                <div class="mini-card">
                    <div class="mini-card-function">${card.function}</div>
                    <div style="text-align: center; margin: 8px 0; font-weight: bold; color: #666;">↓</div>
                    <div class="mini-card-derivative">${card.derivative}</div>
                </div>
            `).join('');
            
            allCardsView.style.display = 'block';
        }
    }

}

// Global Functions for HTML event handlers
function switchSimulation(simType) {
    // Update active tab
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update active content
    document.querySelectorAll('.simulation-content').forEach(content => content.classList.remove('active'));
    document.getElementById(simType).classList.add('active');
    
    // Update current simulation
    calculusApp.currentSimulation = simType;
    
    // Reset and initialize the selected simulation
    calculusApp.resetSimulation(simType);
}

function updateLimitVisualization() {
    calculusApp.updateLimitVisualization();
}

function animateLimit() {
    calculusApp.animateLimit();
}

function updatePowerRule() {
    calculusApp.updatePowerRule();
}

function showPowerRuleSteps() {
    calculusApp.showPowerRuleSteps();
}

function updateProductRule() {
    calculusApp.updateProductRule();
}

function animateProductRule() {
    calculusApp.animateProductRule();
}

function updateQuotientRule() {
    calculusApp.updateQuotientRule();
}

function animateQuotientRule() {
    calculusApp.animateQuotientRule();
}

function updateChainRule() {
    calculusApp.updateChainRule();
}

function animateChainRule() {
    calculusApp.animateChainRule();
}

function updateCriticalPoints() {
    calculusApp.updateCriticalPoints();
}

function findCriticalPoints() {
    calculusApp.findCriticalPoints();
}

function animateCriticalAnalysis() {
    calculusApp.animateCriticalAnalysis();
}

function updateFunctionAnalysis() {
    calculusApp.updateFunctionAnalysis();
}

function performCompleteAnalysis() {
    calculusApp.performCompleteAnalysis();
}

function animateAnalysisSteps() {
    calculusApp.animateAnalysisSteps();
}

// Numerical Integration Functions
function updateNumericalIntegration() {
    calculusApp.updateNumericalIntegration();
}

function calculateIntegration() {
    calculusApp.calculateIntegration();
}

function toggleDataInput() {
    calculusApp.toggleDataInput();
}

function animateIntegration() {
    calculusApp.animateIntegration();
}

// Rational Functions
function updateRationalFunction() {
    calculusApp.updateRationalFunction();
}

function analyzeRationalFunction() {
    calculusApp.analyzeRationalFunction();
}

function findAsymptotesAndHoles() {
    calculusApp.findAsymptotesAndHoles();
}

function findRationalExtrema() {
    calculusApp.findRationalExtrema();
}

// Flashcard Functions
function previousCard() {
    calculusApp.previousCard();
}

function nextCard() {
    calculusApp.nextCard();
}

function flipCard() {
    calculusApp.flipCard();
}

function shuffleCards() {
    calculusApp.shuffleCards();
}

function resetProgress() {
    calculusApp.resetProgress();
}

function showAllCards() {
    calculusApp.showAllCards();
}

// Initialize the application when the page loads
let calculusApp;
document.addEventListener('DOMContentLoaded', () => {
    calculusApp = new CalculusSimulations();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (calculusApp) {
        calculusApp.initializeCanvases();
        // Redraw current simulation
        calculusApp.drawCurrentSimulation();
    }
});