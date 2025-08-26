// Calculus Simulations - Graham's Mathematical Applications
// Interactive AP Calculus AB concepts including derivatives and differentiation rules

class CalculusSimulations {
    constructor() {
        this.currentSimulation = 'limit-definition';
        this.canvases = {};
        this.contexts = {};
        this.animationFrames = {};
        this.integrationScale = null;
        
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
                document.getElementById('integrationMethod').value = 'midpoint';
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
        
        const xRange = maxX - minX;
        const yRange = maxY - minY;
        
        // Use most of the canvas for the graph
        const plotWidth = canvas.width * 0.8;
        const plotHeight = canvas.height * 0.7;
        
        const xScale = plotWidth / xRange;
        const yScale = plotHeight / yRange;
        
        // Draw the curve connecting points
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < points.length; i++) {
            const x = (points[i].x - minX) * xScale - plotWidth/2;
            const y = (points[i].y - minY) * yScale;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#F44336';
        points.forEach(point => {
            const x = (point.x - minX) * xScale - plotWidth/2;
            const y = (point.y - minY) * yScale;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Store scaling info for use in visualization
        this.integrationScale = { xScale, yScale, minX, minY, plotWidth, plotHeight };
    }
    
    drawIntegrationAxes(ctx, canvas) {
        if (!this.integrationScale) return;
        
        const { xScale, yScale, minX, minY, plotWidth, plotHeight } = this.integrationScale;
        const points = this.parseDataTable(document.getElementById('dataTable').value);
        if (points.length === 0) return;
        
        const maxX = Math.max(...points.map(p => p.x));
        const maxY = Math.max(...points.map(p => p.y));
        
        ctx.save();
        ctx.scale(1, -1); // Flip text back to normal
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis labels (every 200 units)
        for (let x = minX; x <= maxX; x += 200) {
            const canvasX = (x - minX) * xScale - plotWidth/2;
            ctx.fillText(x.toString(), canvasX, 15);
        }
        
        // Y-axis labels
        ctx.textAlign = 'right';
        for (let y = Math.ceil(minY/20)*20; y <= maxY; y += 20) {
            const canvasY = -((y - minY) * yScale);
            if (y !== 0) {
                ctx.fillText(y.toString(), -plotWidth/2 - 10, canvasY + 4);
            }
        }
        
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
        
        const { xScale, yScale, minX, minY, plotWidth, plotHeight } = this.integrationScale;
        const xRange = points[points.length - 1].x - points[0].x;
        const deltaX = xRange / n;
        
        // Draw rectangles or trapezoids
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < n; i++) {
            const x1 = points[0].x + i * deltaX;
            const x2 = points[0].x + (i + 1) * deltaX;
            
            const y1 = this.interpolateValue(points, x1);
            const y2 = this.interpolateValue(points, x2);
            
            const canvasX1 = (x1 - minX) * xScale - plotWidth/2;
            const canvasX2 = (x2 - minX) * xScale - plotWidth/2;
            const canvasY1 = (y1 - minY) * yScale;
            const canvasY2 = (y2 - minY) * yScale;
            
            if (method === 'midpoint' || method === 'both') {
                const midX = (x1 + x2) / 2;
                const midY = this.interpolateValue(points, midX);
                const canvasMidX = (midX - minX) * xScale - plotWidth/2;
                const canvasMidY = (midY - minY) * yScale;
                
                // Draw rectangle
                ctx.fillStyle = method === 'both' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(76, 175, 80, 0.3)';
                ctx.strokeStyle = '#4CAF50';
                ctx.fillRect(canvasX1, 0, canvasX2 - canvasX1, canvasMidY);
                ctx.strokeRect(canvasX1, 0, canvasX2 - canvasX1, canvasMidY);
            }
            
            if (method === 'trapezoidal' || method === 'both') {
                // Draw trapezoid
                ctx.fillStyle = method === 'both' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(76, 175, 80, 0.3)';
                ctx.strokeStyle = method === 'both' ? '#F44336' : '#4CAF50';
                
                ctx.beginPath();
                ctx.moveTo(canvasX1, 0);
                ctx.lineTo(canvasX1, canvasY1);
                ctx.lineTo(canvasX2, canvasY2);
                ctx.lineTo(canvasX2, 0);
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
        
        let midpointSum = 0;
        let trapezoidalSum = 0;
        
        // Calculate both methods
        for (let i = 0; i < n; i++) {
            const x1 = points[0].x + i * deltaX;
            const x2 = points[0].x + (i + 1) * deltaX;
            
            // Midpoint rule
            const midX = (x1 + x2) / 2;
            const midY = this.interpolateValue(points, midX);
            midpointSum += midY * deltaX;
            
            // Trapezoidal rule
            const y1 = this.interpolateValue(points, x1);
            const y2 = this.interpolateValue(points, x2);
            trapezoidalSum += 0.5 * (y1 + y2) * deltaX;
        }
        
        let results = '';
        
        if (method === 'midpoint' || method === 'both') {
            results += `
                <div class="step-display">
                    <strong>Midpoint Rule (n = ${n}):</strong><br>
                    Δx = (${points[points.length-1].x} - ${points[0].x})/${n} = ${deltaX.toFixed(1)}<br>
                    Area ≈ Σ f(m₍ᵢ₎)Δx = ${midpointSum.toFixed(2)}
                </div>
            `;
        }
        
        if (method === 'trapezoidal' || method === 'both') {
            results += `
                <div class="step-display">
                    <strong>Trapezoidal Rule (n = ${n}):</strong><br>
                    Δx = (${points[points.length-1].x} - ${points[0].x})/${n} = ${deltaX.toFixed(1)}<br>
                    Area ≈ Σ ½[f(xᵢ)+f(xᵢ₊₁)]Δx = ${trapezoidalSum.toFixed(2)}
                </div>
            `;
        }
        
        if (method === 'both') {
            const difference = Math.abs(midpointSum - trapezoidalSum);
            results += `
                <div class="step-display">
                    <strong>Comparison:</strong><br>
                    Difference = |${midpointSum.toFixed(2)} - ${trapezoidalSum.toFixed(2)}| = ${difference.toFixed(2)}<br>
                    The ${midpointSum > trapezoidalSum ? 'midpoint' : 'trapezoidal'} rule gives the larger estimate.
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
    
    markAsymptotesAndHoles(ctx, canvas, numerator, denominator, xRange) {
        const scale = Math.min(canvas.width, canvas.height) / (2 * xRange) * 0.8;
        const denRoots = this.findPolynomialRoots(denominator);
        
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
    }
    
    analyzeRationalFunction() {
        const numerator = document.getElementById('numerator').value;
        const denominator = document.getElementById('denominator').value;
        const analysisType = document.getElementById('rationalAnalysisType').value;
        
        const numRoots = this.findPolynomialRoots(numerator);
        const denRoots = this.findPolynomialRoots(denominator);
        
        let results = '';
        
        if (analysisType === 'asymptotes' || analysisType === 'complete') {
            results += `
                <div class="step-display">
                    <strong>Asymptotes and Holes Analysis:</strong><br>
            `;
            
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