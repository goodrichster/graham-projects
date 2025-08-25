/**
 * Physics Simulations for AP Physics 1
 * Interactive educational simulations covering projectile motion, forces, energy, momentum, and oscillations
 * Following modern JavaScript practices with exact mathematical representations
 */

class PhysicsSimulations {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.currentSimulation = 'projectile';
        this.animationId = null;
        this.isRunning = false;
        
        // Canvas references for each simulation
        this.canvases = {
            projectile: null,
            forces: null,
            energy: null,
            momentum: null,
            oscillations: null,
            circular: null
        };
        
        this.contexts = {
            projectile: null,
            forces: null,
            energy: null,
            momentum: null,
            oscillations: null,
            circular: null
        };
        
        // Simulation states
        this.projectile = {
            x: 50,
            y: 0,
            vx: 0,
            vy: 0,
            initialVelocity: 50,
            angle: 45,
            gravity: 9.8,
            time: 0,
            trail: [],
            maxHeight: 0,
            range: 0,
            flightTime: 0,
            airResistance: false,
            dragCoefficient: 0.01,
            comparisonMode: false,
            comparisonTrails: [],
            mass: 1
        };
        
        this.forces = {
            mass: 5,
            appliedForce: 20,
            frictionCoeff: 0.1,
            surfaceAngle: 0, // degrees
            gravity: 9.8,
            position: { x: 100, y: 250 },
            velocity: 0,
            acceleration: 0,
            netForce: 0,
            frictionForce: 0,
            normalForce: 0,
            weightForce: 0,
            isRunning: false,
            time: 0,
            objectWidth: 40,
            objectHeight: 30
        };
        
        this.energy = {
            scenario: 'ramp', // 'ramp', 'pendulum', 'spring'
            mass: 1,
            initialHeight: 5,
            initialVelocity: 0,
            currentHeight: 5,
            currentVelocity: 0,
            position: { x: 100, y: 100 },
            kinetic: 0,
            potential: 0,
            total: 0,
            isRunning: false,
            time: 0,
            gravity: 9.8,
            // Ramp specific
            rampAngle: 30,
            ballRadius: 15,
            // Pendulum specific
            pendulumLength: 200,
            angle: 0,
            maxAngle: Math.PI / 4
        };
        
        this.momentum = {
            collisionType: 'elastic', // 'elastic', 'inelastic', 'perfectly-inelastic'
            object1: { 
                mass: 2, 
                initialVelocity: 5, 
                velocity: 5, 
                finalVelocity: 0,
                x: 100, 
                y: 200, 
                radius: 20 
            },
            object2: { 
                mass: 3, 
                initialVelocity: -2, 
                velocity: -2, 
                finalVelocity: 0,
                x: 500, 
                y: 200, 
                radius: 25 
            },
            isRunning: false,
            hasCollided: false,
            time: 0,
            collisionTime: 0,
            initialMomentum: 0,
            finalMomentum: 0,
            initialKE: 0,
            finalKE: 0
        };
        
        this.oscillation = {
            type: 'spring', // 'spring' or 'pendulum'
            springConstant: 50,
            mass: 1,
            length: 1, // for pendulum
            amplitude: 100,
            frequency: 0,
            period: 0,
            displacement: 0,
            velocity: 0,
            acceleration: 0,
            time: 0,
            equilibrium: 200,
            isRunning: false,
            omega: 0 // angular frequency
        };
        
        this.circular = {
            mass: 2,
            radius: 2,
            angularVelocity: 2,
            angle: 0,
            centerX: 300,
            centerY: 200,
            isRunning: false,
            showVectors: true,
            time: 0,
            centripetalForce: 0,
            centripetalAcceleration: 0,
            tangentialSpeed: 0,
            period: 0,
            frequency: 0
        };
        
        this.pixelsPerMeter = 10; // Scale factor for visualization
        this.init();
    }
    
    init() {
        // Initialize all canvases and contexts
        this.initializeCanvases();
        
        // Set initial canvas to projectile
        this.switchCanvas('projectile');
        
        this.setupEventListeners();
        this.setupTabSwitching();
        this.updateProjectileCalculations();
        this.updateOscillationCalculations();
        this.updateEnergyCalculations();
        this.updateMomentumCalculations();
        this.updateForcesCalculations();
        this.updateCircularCalculations();
        
        // Draw the initial simulation
        this.drawCurrentSimulation();
        
        this.startAnimation();
    }
    
    initializeCanvases() {
        // Get all canvas elements and their contexts
        const canvasIds = ['projectileCanvas', 'forcesCanvas', 'energyCanvas', 'momentumCanvas', 'oscillationsCanvas', 'circularCanvas'];
        const simulations = ['projectile', 'forces', 'energy', 'momentum', 'oscillations', 'circular'];
        
        canvasIds.forEach((canvasId, index) => {
            const canvas = document.getElementById(canvasId);
            const simulation = simulations[index];
            if (canvas) {
                this.canvases[simulation] = canvas;
                this.contexts[simulation] = canvas.getContext('2d');
            }
        });
    }
    
    switchCanvas(simulationType) {
        if (this.canvases[simulationType] && this.contexts[simulationType]) {
            this.canvas = this.canvases[simulationType];
            this.ctx = this.contexts[simulationType];
        }
    }
    
    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.simulation-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${tabName}-content`).classList.add('active');
                
                // Update current simulation
                this.currentSimulation = tabName;
                
                // Switch to the appropriate canvas
                this.switchCanvas(tabName);
                
                this.resetSimulation();
                
                // Immediately draw the selected simulation
                this.drawCurrentSimulation();
            });
        });
    }
    
    drawCurrentSimulation() {
        // Draw the current simulation immediately
        switch (this.currentSimulation) {
            case 'projectile':
                this.drawProjectileMotion();
                break;
            case 'forces':
                this.drawForces();
                break;
            case 'energy':
                this.drawEnergy();
                break;
            case 'momentum':
                this.drawMomentum();
                break;
            case 'oscillations':
                this.drawOscillations();
                break;
            case 'circular':
                this.drawCircular();
                break;
        }
    }
    
    setupEventListeners() {
        // Projectile motion controls
        const velocitySlider = document.getElementById('projectileVelocitySlider');
        const angleSlider = document.getElementById('projectileAngleSlider');
        const gravitySlider = document.getElementById('projectileGravitySlider');
        const launchBtn = document.getElementById('projectileLaunchBtn');
        const resetBtn = document.getElementById('projectileResetBtn');
        const airResistanceCheck = document.getElementById('projectileAirResistanceCheck');
        const comparisonModeCheck = document.getElementById('projectileComparisonModeCheck');
        
        if (velocitySlider) {
            velocitySlider.addEventListener('input', (e) => {
                this.projectile.initialVelocity = parseFloat(e.target.value);
                document.getElementById('projectileVelocityValue').textContent = `${this.projectile.initialVelocity} m/s`;
                this.updateProjectileCalculations();
            });
        }
        
        if (angleSlider) {
            angleSlider.addEventListener('input', (e) => {
                this.projectile.angle = parseFloat(e.target.value);
                document.getElementById('projectileAngleValue').textContent = `${this.projectile.angle}°`;
                this.updateProjectileCalculations();
            });
        }
        
        if (gravitySlider) {
            gravitySlider.addEventListener('input', (e) => {
                this.projectile.gravity = parseFloat(e.target.value);
                document.getElementById('projectileGravityValue').textContent = `${this.projectile.gravity} m/s²`;
                this.updateProjectileCalculations();
            });
        }
        
        if (launchBtn) {
            launchBtn.addEventListener('click', () => this.launchProjectile());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSimulation());
        }
        
        if (airResistanceCheck) {
            airResistanceCheck.addEventListener('change', (e) => {
                this.projectile.airResistance = e.target.checked;
                this.updateProjectileCalculations();
            });
        }
        
        if (comparisonModeCheck) {
            comparisonModeCheck.addEventListener('change', (e) => {
                this.projectile.comparisonMode = e.target.checked;
                if (!this.projectile.comparisonMode) {
                    this.projectile.comparisonTrails = [];
                }
            });
        }
        
        // Oscillation controls
        const oscillationType = document.getElementById('oscillationsType');
        const springConstantSlider = document.getElementById('oscillationsSpringConstantSlider');
        const massSlider = document.getElementById('oscillationsMassSlider');
        const lengthSlider = document.getElementById('oscillationsLengthSlider');
        const amplitudeSlider = document.getElementById('oscillationsAmplitudeSlider');
        const startOscillationBtn = document.getElementById('oscillationsStartBtn');
        const stopOscillationBtn = document.getElementById('oscillationsStopBtn');
        const resetOscillationBtn = document.getElementById('oscillationsResetBtn');
        
        if (oscillationType) {
            oscillationType.addEventListener('change', (e) => {
                this.oscillation.type = e.target.value;
                this.toggleOscillationControls();
                this.updateOscillationCalculations();
            });
        }
        
        if (springConstantSlider) {
            springConstantSlider.addEventListener('input', (e) => {
                this.oscillation.springConstant = parseFloat(e.target.value);
                document.getElementById('oscillationsSpringConstantValue').textContent = `${this.oscillation.springConstant} N/m`;
                this.updateOscillationCalculations();
            });
        }
        
        if (massSlider) {
            massSlider.addEventListener('input', (e) => {
                this.oscillation.mass = parseFloat(e.target.value);
                document.getElementById('oscillationsMassValue').textContent = `${this.oscillation.mass.toFixed(1)} kg`;
                this.updateOscillationCalculations();
            });
        }
        
        if (lengthSlider) {
            lengthSlider.addEventListener('input', (e) => {
                this.oscillation.length = parseFloat(e.target.value);
                document.getElementById('oscillationsLengthValue').textContent = `${this.oscillation.length.toFixed(1)} m`;
                this.updateOscillationCalculations();
            });
        }
        
        if (amplitudeSlider) {
            amplitudeSlider.addEventListener('input', (e) => {
                this.oscillation.amplitude = parseFloat(e.target.value);
                document.getElementById('oscillationsAmplitudeValue').textContent = `${this.oscillation.amplitude} px`;
                this.updateOscillationCalculations();
            });
        }
        
        if (startOscillationBtn) {
            startOscillationBtn.addEventListener('click', () => this.startOscillation());
        }
        
        if (stopOscillationBtn) {
            stopOscillationBtn.addEventListener('click', () => this.stopOscillation());
        }
        
        if (resetOscillationBtn) {
            resetOscillationBtn.addEventListener('click', () => this.resetOscillation());
        }
        
        // Energy conservation controls
        const energyScenario = document.getElementById('energyScenario');
        const energyMassSlider = document.getElementById('energyMassSlider');
        const heightSlider = document.getElementById('energyHeightSlider');
        const energyVelocitySlider = document.getElementById('energyVelocitySlider');
        const startEnergyBtn = document.getElementById('energyStartBtn');
        const stopEnergyBtn = document.getElementById('energyStopBtn');
        const resetEnergyBtn = document.getElementById('energyResetBtn');
        
        if (energyScenario) {
            energyScenario.addEventListener('change', (e) => {
                this.energy.scenario = e.target.value;
                this.updateEnergyCalculations();
            });
        }
        
        if (energyMassSlider) {
            energyMassSlider.addEventListener('input', (e) => {
                this.energy.mass = parseFloat(e.target.value);
                document.getElementById('energyMassValue').textContent = `${this.energy.mass.toFixed(1)} kg`;
                this.updateEnergyCalculations();
            });
        }
        
        if (heightSlider) {
            heightSlider.addEventListener('input', (e) => {
                this.energy.initialHeight = parseFloat(e.target.value);
                this.energy.currentHeight = this.energy.initialHeight;
                document.getElementById('energyHeightValue').textContent = `${this.energy.initialHeight.toFixed(1)} m`;
                this.updateEnergyCalculations();
            });
        }
        
        if (energyVelocitySlider) {
            energyVelocitySlider.addEventListener('input', (e) => {
                this.energy.initialVelocity = parseFloat(e.target.value);
                this.energy.currentVelocity = this.energy.initialVelocity;
                document.getElementById('energyVelocityValue').textContent = `${this.energy.initialVelocity.toFixed(1)} m/s`;
                this.updateEnergyCalculations();
            });
        }
        
        if (startEnergyBtn) {
            startEnergyBtn.addEventListener('click', () => this.startEnergySimulation());
        }
        
        if (stopEnergyBtn) {
            stopEnergyBtn.addEventListener('click', () => this.stopEnergySimulation());
        }
        
        if (resetEnergyBtn) {
            resetEnergyBtn.addEventListener('click', () => this.resetEnergySimulation());
        }
        
        // Momentum and collision controls
        const collisionType = document.getElementById('momentumCollisionType');
        const mass1Slider = document.getElementById('momentumMass1Slider');
        const velocity1Slider = document.getElementById('momentumVelocity1Slider');
        const mass2Slider = document.getElementById('momentumMass2Slider');
        const velocity2Slider = document.getElementById('momentumVelocity2Slider');
        const startCollisionBtn = document.getElementById('momentumStartBtn');
        const stopCollisionBtn = document.getElementById('momentumStopBtn');
        const resetCollisionBtn = document.getElementById('momentumResetBtn');
        
        if (collisionType) {
            collisionType.addEventListener('change', (e) => {
                this.momentum.collisionType = e.target.value;
                this.updateMomentumCalculations();
            });
        }
        
        if (mass1Slider) {
            mass1Slider.addEventListener('input', (e) => {
                this.momentum.object1.mass = parseFloat(e.target.value);
                document.getElementById('momentumMass1Value').textContent = `${this.momentum.object1.mass.toFixed(1)} kg`;
                this.updateMomentumCalculations();
            });
        }
        
        if (velocity1Slider) {
            velocity1Slider.addEventListener('input', (e) => {
                this.momentum.object1.initialVelocity = parseFloat(e.target.value);
                this.momentum.object1.velocity = this.momentum.object1.initialVelocity;
                document.getElementById('momentumVelocity1Value').textContent = `${this.momentum.object1.initialVelocity.toFixed(1)} m/s`;
                this.updateMomentumCalculations();
            });
        }
        
        if (mass2Slider) {
            mass2Slider.addEventListener('input', (e) => {
                this.momentum.object2.mass = parseFloat(e.target.value);
                document.getElementById('momentumMass2Value').textContent = `${this.momentum.object2.mass.toFixed(1)} kg`;
                this.updateMomentumCalculations();
            });
        }
        
        if (velocity2Slider) {
            velocity2Slider.addEventListener('input', (e) => {
                this.momentum.object2.initialVelocity = parseFloat(e.target.value);
                this.momentum.object2.velocity = this.momentum.object2.initialVelocity;
                document.getElementById('momentumVelocity2Value').textContent = `${this.momentum.object2.initialVelocity.toFixed(1)} m/s`;
                this.updateMomentumCalculations();
            });
        }
        
        if (startCollisionBtn) {
            startCollisionBtn.addEventListener('click', () => this.startCollisionSimulation());
        }
        
        if (stopCollisionBtn) {
            stopCollisionBtn.addEventListener('click', () => this.stopCollisionSimulation());
        }
        
        if (resetCollisionBtn) {
            resetCollisionBtn.addEventListener('click', () => this.resetCollisionSimulation());
        }
        
        // Forces and motion controls
        const forcesMassSlider = document.getElementById('forcesMassSlider');
        const appliedForceSlider = document.getElementById('forcesAppliedForceSlider');
        const frictionSlider = document.getElementById('forcesFrictionSlider');
        const forcesAngleSlider = document.getElementById('forcesAngleSlider');
        const startForcesBtn = document.getElementById('forcesStartBtn');
        const stopForcesBtn = document.getElementById('forcesStopBtn');
        const resetForcesBtn = document.getElementById('forcesResetBtn');
        
        if (forcesMassSlider) {
            forcesMassSlider.addEventListener('input', (e) => {
                this.forces.mass = parseFloat(e.target.value);
                document.getElementById('forcesMassValue').textContent = `${this.forces.mass.toFixed(1)} kg`;
                this.updateForcesCalculations();
            });
        }
        
        if (appliedForceSlider) {
            appliedForceSlider.addEventListener('input', (e) => {
                this.forces.appliedForce = parseFloat(e.target.value);
                document.getElementById('forcesAppliedForceValue').textContent = `${this.forces.appliedForce} N`;
                this.updateForcesCalculations();
            });
        }
        
        if (frictionSlider) {
            frictionSlider.addEventListener('input', (e) => {
                this.forces.frictionCoeff = parseFloat(e.target.value);
                document.getElementById('forcesFrictionValue').textContent = `${this.forces.frictionCoeff.toFixed(2)}`;
                this.updateForcesCalculations();
            });
        }
        
        if (forcesAngleSlider) {
            forcesAngleSlider.addEventListener('input', (e) => {
                this.forces.surfaceAngle = parseFloat(e.target.value);
                document.getElementById('forcesAngleValue').textContent = `${this.forces.surfaceAngle}°`;
                this.updateForcesCalculations();
            });
        }
        
        if (startForcesBtn) {
            startForcesBtn.addEventListener('click', () => this.startForcesSimulation());
        }
        
        if (stopForcesBtn) {
            stopForcesBtn.addEventListener('click', () => this.stopForcesSimulation());
        }
        
        if (resetForcesBtn) {
            resetForcesBtn.addEventListener('click', () => this.resetForcesSimulation());
        }
        
        // Circular motion controls
        const circularMassSlider = document.getElementById('circularMassSlider');
        const radiusSlider = document.getElementById('circularRadiusSlider');
        const angularVelocitySlider = document.getElementById('circularAngularVelocitySlider');
        const showVectorsCheck = document.getElementById('circularShowVectorsCheck');
        const startCircularBtn = document.getElementById('circularStartBtn');
        const stopCircularBtn = document.getElementById('circularStopBtn');
        const resetCircularBtn = document.getElementById('circularResetBtn');
        
        if (circularMassSlider) {
            circularMassSlider.addEventListener('input', (e) => {
                this.circular.mass = parseFloat(e.target.value);
                document.getElementById('circularMassValue').textContent = `${this.circular.mass.toFixed(1)} kg`;
                this.updateCircularCalculations();
            });
        }
        
        if (radiusSlider) {
            radiusSlider.addEventListener('input', (e) => {
                this.circular.radius = parseFloat(e.target.value);
                document.getElementById('circularRadiusValue').textContent = `${this.circular.radius.toFixed(1)} m`;
                this.updateCircularCalculations();
            });
        }
        
        if (angularVelocitySlider) {
            angularVelocitySlider.addEventListener('input', (e) => {
                this.circular.angularVelocity = parseFloat(e.target.value);
                document.getElementById('circularAngularVelocityValue').textContent = `${this.circular.angularVelocity.toFixed(1)} rad/s`;
                this.updateCircularCalculations();
            });
        }
        
        if (showVectorsCheck) {
            showVectorsCheck.addEventListener('change', (e) => {
                this.circular.showVectors = e.target.checked;
            });
        }
        
        if (startCircularBtn) {
            startCircularBtn.addEventListener('click', () => this.startCircularMotion());
        }
        
        if (stopCircularBtn) {
            stopCircularBtn.addEventListener('click', () => this.stopCircularMotion());
        }
        
        if (resetCircularBtn) {
            resetCircularBtn.addEventListener('click', () => this.resetCircularMotion());
        }
    }
    
    updateProjectileCalculations() {
        const { initialVelocity, angle, gravity } = this.projectile;
        const angleRad = (angle * Math.PI) / 180;
        
        // Calculate theoretical values (without air resistance)
        this.projectile.maxHeight = (initialVelocity * initialVelocity * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * gravity);
        this.projectile.range = (initialVelocity * initialVelocity * Math.sin(2 * angleRad)) / gravity;
        this.projectile.flightTime = (2 * initialVelocity * Math.sin(angleRad)) / gravity;
        
        // Calculate exact radian representation
        const exactRadians = this.getExactRadianRepresentation(angle);
        
        // Update display with exact mathematical representations
        document.getElementById('projectileMaxHeight').textContent = `${this.projectile.maxHeight.toFixed(1)} m`;
        document.getElementById('projectileRange').textContent = `${this.projectile.range.toFixed(1)} m`;
        document.getElementById('projectileFlightTime').textContent = `${this.projectile.flightTime.toFixed(2)} s`;
        document.getElementById('projectileCurrentSpeed').textContent = '-';
        document.getElementById('projectileAngleRadians').textContent = `${angleRad.toFixed(3)} (${exactRadians})`;
        
        // Show optimal angle information
        const optimalAngle = gravity === 9.8 ? '45° (π/4 rad)' : `${(Math.asin(1/Math.sqrt(2)) * 180 / Math.PI).toFixed(1)}°`;
        document.getElementById('projectileOptimalAngle').textContent = optimalAngle;
    }
    
    getExactRadianRepresentation(degrees) {
        const commonAngles = {
            0: '0',
            30: 'π/6',
            45: 'π/4', 
            60: 'π/3',
            90: 'π/2',
            120: '2π/3',
            135: '3π/4',
            150: '5π/6',
            180: 'π'
        };
        
        return commonAngles[degrees] || `${degrees}° × π/180`;
    }
    
    toggleOscillationControls() {
        const springControls = document.getElementById('oscillationsSpringControls');
        const pendulumControls = document.getElementById('oscillationsPendulumControls');
        
        if (this.oscillation.type === 'spring') {
            springControls.style.display = 'block';
            pendulumControls.style.display = 'none';
        } else {
            springControls.style.display = 'none';
            pendulumControls.style.display = 'block';
        }
    }
    
    updateOscillationCalculations() {
        const { type, springConstant, mass, length } = this.oscillation;
        
        if (type === 'spring') {
            // Spring-mass system: T = 2π√(m/k)
            this.oscillation.omega = Math.sqrt(springConstant / mass);
            this.oscillation.period = (2 * Math.PI) / this.oscillation.omega;
            this.oscillation.frequency = 1 / this.oscillation.period;
        } else {
            // Simple pendulum: T = 2π√(L/g)
            const gravity = 9.8;
            this.oscillation.omega = Math.sqrt(gravity / length);
            this.oscillation.period = (2 * Math.PI) / this.oscillation.omega;
            this.oscillation.frequency = 1 / this.oscillation.period;
        }
        
        // Update display
        if (document.getElementById('oscillationsPeriod')) {
            document.getElementById('oscillationsPeriod').textContent = `${this.oscillation.period.toFixed(2)} s`;
            document.getElementById('oscillationsFrequency').textContent = `${this.oscillation.frequency.toFixed(2)} Hz`;
            document.getElementById('oscillationsPosition').textContent = '0 px';
            document.getElementById('oscillationsVelocity').textContent = '0 px/s';
            document.getElementById('oscillationsAcceleration').textContent = '0 px/s²';
        }
    }
    
    startOscillation() {
        this.oscillation.isRunning = true;
        this.oscillation.time = 0;
        this.oscillation.displacement = this.oscillation.amplitude;
    }
    
    stopOscillation() {
        this.oscillation.isRunning = false;
    }
    
    resetOscillation() {
        this.oscillation.isRunning = false;
        this.oscillation.time = 0;
        this.oscillation.displacement = 0;
        this.oscillation.velocity = 0;
        this.oscillation.acceleration = 0;
        this.updateOscillationCalculations();
    }
    
    updateEnergyCalculations() {
        const { mass, initialHeight, initialVelocity, gravity } = this.energy;
        
        // Calculate initial energies
        this.energy.kinetic = 0.5 * mass * initialVelocity * initialVelocity;
        this.energy.potential = mass * gravity * initialHeight;
        this.energy.total = this.energy.kinetic + this.energy.potential;
        
        // Update display
        if (document.getElementById('energyKineticEnergy')) {
            document.getElementById('energyKineticEnergy').textContent = `${this.energy.kinetic.toFixed(1)} J`;
            document.getElementById('energyPotentialEnergy').textContent = `${this.energy.potential.toFixed(1)} J`;
            document.getElementById('energyTotalEnergy').textContent = `${this.energy.total.toFixed(1)} J`;
            document.getElementById('energyCurrentSpeed').textContent = `${this.energy.currentVelocity.toFixed(1)} m/s`;
            document.getElementById('energyCurrentHeight').textContent = `${this.energy.currentHeight.toFixed(1)} m`;
        }
    }
    
    startEnergySimulation() {
        this.energy.isRunning = true;
        this.energy.time = 0;
        this.energy.currentHeight = this.energy.initialHeight;
        this.energy.currentVelocity = this.energy.initialVelocity;
        
        if (this.energy.scenario === 'pendulum') {
            // Set initial angle based on height
            this.energy.angle = Math.acos((this.energy.pendulumLength - this.energy.initialHeight * 20) / this.energy.pendulumLength);
            this.energy.maxAngle = this.energy.angle;
        }
    }
    
    stopEnergySimulation() {
        this.energy.isRunning = false;
    }
    
    resetEnergySimulation() {
        this.energy.isRunning = false;
        this.energy.time = 0;
        this.energy.currentHeight = this.energy.initialHeight;
        this.energy.currentVelocity = this.energy.initialVelocity;
        this.energy.angle = 0;
        this.updateEnergyCalculations();
    }
    
    updateMomentumCalculations() {
        const { object1, object2 } = this.momentum;
        
        // Calculate initial momentum and kinetic energy
        this.momentum.initialMomentum = object1.mass * object1.initialVelocity + object2.mass * object2.initialVelocity;
        this.momentum.initialKE = 0.5 * object1.mass * object1.initialVelocity * object1.initialVelocity + 
                                  0.5 * object2.mass * object2.initialVelocity * object2.initialVelocity;
        
        // Calculate final velocities based on collision type
        this.calculateCollisionOutcome();
        
        // Update display
        if (document.getElementById('momentumInitialMomentum')) {
            document.getElementById('momentumInitialMomentum').textContent = `${this.momentum.initialMomentum.toFixed(2)} kg⋅m/s`;
            document.getElementById('momentumFinalMomentum').textContent = `${this.momentum.finalMomentum.toFixed(2)} kg⋅m/s`;
            document.getElementById('momentumInitialKE').textContent = `${this.momentum.initialKE.toFixed(2)} J`;
            document.getElementById('momentumFinalKE').textContent = `${this.momentum.finalKE.toFixed(2)} J`;
            document.getElementById('momentumKeLost').textContent = `${(this.momentum.initialKE - this.momentum.finalKE).toFixed(2)} J`;
        }
    }
    
    calculateCollisionOutcome() {
        const { object1, object2, collisionType } = this.momentum;
        const m1 = object1.mass;
        const m2 = object2.mass;
        const u1 = object1.initialVelocity;
        const u2 = object2.initialVelocity;
        
        let v1, v2; // final velocities
        
        if (collisionType === 'elastic') {
            // Elastic collision formulas
            v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
            v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
        } else if (collisionType === 'perfectly-inelastic') {
            // Perfectly inelastic collision (objects stick together)
            v1 = v2 = (m1 * u1 + m2 * u2) / (m1 + m2);
        } else {
            // Inelastic collision (coefficient of restitution = 0.5)
            const e = 0.5;
            const totalMomentum = m1 * u1 + m2 * u2;
            v1 = (totalMomentum + m2 * e * (u2 - u1)) / (m1 + m2);
            v2 = (totalMomentum + m1 * e * (u1 - u2)) / (m1 + m2);
        }
        
        object1.finalVelocity = v1;
        object2.finalVelocity = v2;
        
        // Calculate final momentum and kinetic energy
        this.momentum.finalMomentum = m1 * v1 + m2 * v2;
        this.momentum.finalKE = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
    }
    
    startCollisionSimulation() {
        this.momentum.isRunning = true;
        this.momentum.hasCollided = false;
        this.momentum.time = 0;
        this.momentum.collisionTime = 0;
        
        // Reset positions
        this.momentum.object1.x = 100;
        this.momentum.object2.x = 500;
        
        // Reset velocities to initial values
        this.momentum.object1.velocity = this.momentum.object1.initialVelocity;
        this.momentum.object2.velocity = this.momentum.object2.initialVelocity;
    }
    
    stopCollisionSimulation() {
        this.momentum.isRunning = false;
    }
    
    resetCollisionSimulation() {
        this.momentum.isRunning = false;
        this.momentum.hasCollided = false;
        this.momentum.time = 0;
        this.momentum.collisionTime = 0;
        
        // Reset positions
        this.momentum.object1.x = 100;
        this.momentum.object2.x = 500;
        
        // Reset velocities
        this.momentum.object1.velocity = this.momentum.object1.initialVelocity;
        this.momentum.object2.velocity = this.momentum.object2.initialVelocity;
        
        this.updateMomentumCalculations();
    }
    
    updateForcesCalculations() {
        const { mass, appliedForce, frictionCoeff, surfaceAngle, gravity } = this.forces;
        const angleRad = (surfaceAngle * Math.PI) / 180;
        
        // Calculate component forces
        this.forces.weightForce = mass * gravity;
        this.forces.normalForce = this.forces.weightForce * Math.cos(angleRad);
        
        // Calculate friction force (opposes motion)
        const maxStaticFriction = frictionCoeff * this.forces.normalForce;
        const netAppliedForce = appliedForce - this.forces.weightForce * Math.sin(angleRad);
        
        if (Math.abs(netAppliedForce) <= maxStaticFriction && this.forces.velocity === 0) {
            // Static friction case
            this.forces.frictionForce = -netAppliedForce;
            this.forces.netForce = 0;
            this.forces.acceleration = 0;
        } else {
            // Kinetic friction case
            this.forces.frictionForce = -Math.sign(this.forces.velocity || netAppliedForce) * maxStaticFriction;
            this.forces.netForce = netAppliedForce + this.forces.frictionForce;
            this.forces.acceleration = this.forces.netForce / mass;
        }
        
        // Update display
        if (document.getElementById('forcesNetForce')) {
            document.getElementById('forcesNetForce').textContent = `${this.forces.netForce.toFixed(2)} N`;
            document.getElementById('forcesAcceleration').textContent = `${this.forces.acceleration.toFixed(2)} m/s²`;
            document.getElementById('forcesVelocity').textContent = `${this.forces.velocity.toFixed(2)} m/s`;
            document.getElementById('forcesFrictionForce').textContent = `${Math.abs(this.forces.frictionForce).toFixed(2)} N`;
            document.getElementById('forcesNormalForce').textContent = `${this.forces.normalForce.toFixed(2)} N`;
        }
    }
    
    startForcesSimulation() {
        this.forces.isRunning = true;
        this.forces.time = 0;
        this.forces.velocity = 0;
        this.forces.position.x = 100;
    }
    
    stopForcesSimulation() {
        this.forces.isRunning = false;
    }
    
    resetForcesSimulation() {
        this.forces.isRunning = false;
        this.forces.time = 0;
        this.forces.velocity = 0;
        this.forces.acceleration = 0;
        this.forces.position.x = 100;
        this.updateForcesCalculations();
    }
    
    updateCircularCalculations() {
        const { mass, radius, angularVelocity } = this.circular;
        
        // Calculate circular motion quantities
        this.circular.tangentialSpeed = angularVelocity * radius;
        this.circular.centripetalAcceleration = angularVelocity * angularVelocity * radius;
        this.circular.centripetalForce = mass * this.circular.centripetalAcceleration;
        this.circular.period = (2 * Math.PI) / angularVelocity;
        this.circular.frequency = angularVelocity / (2 * Math.PI);
        
        // Get exact angular velocity representation
        const exactAngular = this.getExactAngularRepresentation(angularVelocity);
        
        // Update display
        if (document.getElementById('circularCentripetalForce')) {
            document.getElementById('circularCentripetalForce').textContent = `${this.circular.centripetalForce.toFixed(2)} N`;
            document.getElementById('circularCentripetalAccel').textContent = `${this.circular.centripetalAcceleration.toFixed(2)} m/s²`;
            document.getElementById('circularTangentialSpeed').textContent = `${this.circular.tangentialSpeed.toFixed(2)} m/s`;
            document.getElementById('circularPeriod').textContent = `${this.circular.period.toFixed(2)} s`;
            document.getElementById('circularFrequency').textContent = `${this.circular.frequency.toFixed(3)} Hz`;
            document.getElementById('circularAngularExact').textContent = exactAngular;
        }
    }
    
    getExactAngularRepresentation(omega) {
        const commonValues = {
            1: '1 rad/s',
            2: '2 rad/s',
            3.14159: 'π rad/s',
            6.28318: '2π rad/s',
            1.5708: 'π/2 rad/s',
            4.71239: '3π/2 rad/s'
        };
        
        // Check for close matches to pi multiples
        const piMultiple = omega / Math.PI;
        if (Math.abs(piMultiple - Math.round(piMultiple)) < 0.01) {
            const rounded = Math.round(piMultiple);
            if (rounded === 1) return 'π rad/s';
            if (rounded === 2) return '2π rad/s';
            if (rounded === 0.5) return 'π/2 rad/s';
            return `${rounded}π rad/s`;
        }
        
        return `${omega.toFixed(2)} rad/s`;
    }
    
    startCircularMotion() {
        this.circular.isRunning = true;
        this.circular.time = 0;
        this.circular.angle = 0;
    }
    
    stopCircularMotion() {
        this.circular.isRunning = false;
    }
    
    resetCircularMotion() {
        this.circular.isRunning = false;
        this.circular.time = 0;
        this.circular.angle = 0;
        this.updateCircularCalculations();
    }
    
    launchProjectile() {
        if (this.isRunning) return;
        
        // Store current trajectory in comparison mode
        if (this.projectile.comparisonMode && this.projectile.trail.length > 0) {
            this.projectile.comparisonTrails.push({
                trail: [...this.projectile.trail],
                color: this.getRandomColor(),
                parameters: {
                    velocity: this.projectile.initialVelocity,
                    angle: this.projectile.angle,
                    gravity: this.projectile.gravity
                }
            });
        }
        
        this.isRunning = true;
        this.projectile.time = 0;
        this.projectile.trail = [];
        
        const angleRad = (this.projectile.angle * Math.PI) / 180;
        this.projectile.vx = this.projectile.initialVelocity * Math.cos(angleRad);
        this.projectile.vy = this.projectile.initialVelocity * Math.sin(angleRad);
        
        this.projectile.x = 50;
        this.projectile.y = this.canvas.height - 50;
    }
    
    getRandomColor() {
        const colors = ['#ff6b35', '#f7931e', '#ffcc02', '#00b04f', '#00bcd4', '#9c27b0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    resetSimulation() {
        this.isRunning = false;
        this.projectile.time = 0;
        this.projectile.trail = [];
        this.projectile.comparisonTrails = [];
        this.projectile.x = 50;
        this.projectile.y = this.canvas.height - 50;
        
        // Reset other simulations based on current type
        switch (this.currentSimulation) {
            case 'projectile':
                this.updateProjectileCalculations();
                break;
            case 'forces':
                this.resetForcesSimulation();
                break;
            case 'energy':
                this.resetEnergySimulation();
                break;
            case 'momentum':
                this.resetCollisionSimulation();
                break;
            case 'oscillations':
                this.resetOscillation();
                break;
            case 'circular':
                this.resetCircularMotion();
                break;
        }
    }
    
    updateProjectileMotion(deltaTime) {
        if (!this.isRunning) return;
        
        const dt = deltaTime / 1000; // Convert to seconds
        this.projectile.time += dt;
        
        // Kinematic equations with optional air resistance
        const t = this.projectile.time;
        
        if (this.projectile.airResistance) {
            // With air resistance (simplified model)
            const drag = this.projectile.dragCoefficient;
            const speed = Math.sqrt(this.projectile.vx * this.projectile.vx + this.projectile.vy * this.projectile.vy);
            
            // Update velocities with drag
            this.projectile.vx -= drag * speed * this.projectile.vx * dt;
            this.projectile.vy -= (this.projectile.gravity + drag * speed * Math.abs(this.projectile.vy)) * dt;
            
            // Update position
            this.projectile.x += this.projectile.vx * this.pixelsPerMeter * dt;
            this.projectile.y -= this.projectile.vy * this.pixelsPerMeter * dt;
        } else {
            // Without air resistance (exact kinematics)
            const angleRad = (this.projectile.angle * Math.PI) / 180;
            
            const x = this.projectile.vx * t;
            const y = this.projectile.vy * t - 0.5 * this.projectile.gravity * t * t;
            
            this.projectile.x = 50 + x * this.pixelsPerMeter;
            this.projectile.y = (this.canvas.height - 50) - y * this.pixelsPerMeter;
            
            // Current velocity components for exact calculation
            this.projectile.vx = this.projectile.initialVelocity * Math.cos(angleRad);
            this.projectile.vy = this.projectile.initialVelocity * Math.sin(angleRad) - this.projectile.gravity * t;
        }
        
        // Current speed calculation
        const currentSpeed = Math.sqrt(this.projectile.vx * this.projectile.vx + this.projectile.vy * this.projectile.vy);
        
        // Update speed display
        document.getElementById('projectileCurrentSpeed').textContent = `${currentSpeed.toFixed(1)} m/s`;
        
        // Add to trail
        this.projectile.trail.push({ x: this.projectile.x, y: this.projectile.y });
        if (this.projectile.trail.length > 100) {
            this.projectile.trail.shift();
        }
        
        // Check if projectile has landed
        if (this.projectile.y >= this.canvas.height - 50 && this.projectile.time > 0.1) {
            this.isRunning = false;
        }
    }
    
    updateOscillation(deltaTime) {
        if (!this.oscillation.isRunning) return;
        
        const dt = deltaTime / 1000; // Convert to seconds
        this.oscillation.time += dt;
        
        const { omega, amplitude, time } = this.oscillation;
        
        // Simple harmonic motion equations
        // x(t) = A cos(ωt)
        // v(t) = -Aω sin(ωt)
        // a(t) = -Aω² cos(ωt)
        
        this.oscillation.displacement = amplitude * Math.cos(omega * time);
        this.oscillation.velocity = -amplitude * omega * Math.sin(omega * time);
        this.oscillation.acceleration = -amplitude * omega * omega * Math.cos(omega * time);
        
        // Update display
        if (document.getElementById('oscillationsPosition')) {
            document.getElementById('oscillationsPosition').textContent = `${this.oscillation.displacement.toFixed(1)} px`;
            document.getElementById('oscillationsVelocity').textContent = `${this.oscillation.velocity.toFixed(1)} px/s`;
            document.getElementById('oscillationsAcceleration').textContent = `${this.oscillation.acceleration.toFixed(1)} px/s²`;
        }
    }
    
    updateEnergy(deltaTime) {
        if (!this.energy.isRunning) return;
        
        const dt = deltaTime / 1000; // Convert to seconds
        this.energy.time += dt;
        
        const { scenario, mass, gravity, total } = this.energy;
        
        if (scenario === 'ramp') {
            // Simple rolling ball simulation
            if (this.energy.currentHeight > 0) {
                // Use energy conservation: PE_initial = KE + PE_current
                const currentPE = mass * gravity * this.energy.currentHeight;
                const currentKE = total - currentPE;
                
                if (currentKE >= 0) {
                    this.energy.currentVelocity = Math.sqrt(2 * currentKE / mass);
                    // Decrease height over time (simplified)
                    this.energy.currentHeight -= this.energy.currentVelocity * dt * 0.1;
                } else {
                    this.energy.currentHeight = 0;
                    this.energy.currentVelocity = Math.sqrt(2 * total / mass);
                }
            }
        } else if (scenario === 'pendulum') {
            // Pendulum simulation using energy conservation
            const omega = Math.sqrt(gravity / this.energy.pendulumLength);
            this.energy.angle = this.energy.maxAngle * Math.cos(omega * this.energy.time);
            
            // Calculate height and velocity from angle
            const heightFromBottom = this.energy.pendulumLength * (1 - Math.cos(this.energy.angle));
            this.energy.currentHeight = heightFromBottom / 20; // Scale for display
            
            // Energy conservation
            const currentPE = mass * gravity * this.energy.currentHeight;
            const currentKE = total - currentPE;
            this.energy.currentVelocity = currentKE > 0 ? Math.sqrt(2 * currentKE / mass) : 0;
        } else if (scenario === 'spring') {
            // Spring-mass system (vertical)
            const omega = Math.sqrt(50 / mass); // Assuming spring constant k = 50
            const amplitude = Math.sqrt(2 * total / (mass * omega * omega));
            
            this.energy.currentHeight = this.energy.initialHeight + amplitude * Math.cos(omega * this.energy.time);
            this.energy.currentVelocity = amplitude * omega * Math.abs(Math.sin(omega * this.energy.time));
        }
        
        // Update energy values
        this.energy.kinetic = 0.5 * mass * this.energy.currentVelocity * this.energy.currentVelocity;
        this.energy.potential = mass * gravity * this.energy.currentHeight;
        
        // Update display
        if (document.getElementById('energyKineticEnergy')) {
            document.getElementById('energyKineticEnergy').textContent = `${this.energy.kinetic.toFixed(1)} J`;
            document.getElementById('energyPotentialEnergy').textContent = `${this.energy.potential.toFixed(1)} J`;
            document.getElementById('energyTotalEnergy').textContent = `${this.energy.total.toFixed(1)} J`;
            document.getElementById('energyCurrentSpeed').textContent = `${this.energy.currentVelocity.toFixed(1)} m/s`;
            document.getElementById('energyCurrentHeight').textContent = `${this.energy.currentHeight.toFixed(1)} m`;
        }
    }
    
    updateMomentum(deltaTime) {
        if (!this.momentum.isRunning) return;
        
        const dt = deltaTime / 1000; // Convert to seconds
        this.momentum.time += dt;
        
        const { object1, object2 } = this.momentum;
        const speed = 100; // pixels per second movement speed
        
        if (!this.momentum.hasCollided) {
            // Move objects towards each other
            object1.x += object1.velocity * speed * dt;
            object2.x += object2.velocity * speed * dt;
            
            // Check for collision
            const distance = Math.abs(object1.x - object2.x);
            const collisionDistance = object1.radius + object2.radius;
            
            if (distance <= collisionDistance) {
                this.momentum.hasCollided = true;
                this.momentum.collisionTime = this.momentum.time;
                
                // Set post-collision velocities
                object1.velocity = object1.finalVelocity;
                object2.velocity = object2.finalVelocity;
                
                // Adjust positions to prevent overlap
                const centerX = (object1.x + object2.x) / 2;
                object1.x = centerX - collisionDistance / 2;
                object2.x = centerX + collisionDistance / 2;
            }
        } else {
            // Continue moving with final velocities
            object1.x += object1.velocity * speed * dt;
            object2.x += object2.velocity * speed * dt;
            
            // Stop simulation if objects move off screen
            if (object1.x < -50 || object1.x > this.canvas.width + 50 || 
                object2.x < -50 || object2.x > this.canvas.width + 50) {
                this.momentum.isRunning = false;
            }
        }
    }
    
    updateForces(deltaTime) {
        if (!this.forces.isRunning) return;
        
        const dt = deltaTime / 1000; // Convert to seconds
        this.forces.time += dt;
        
        // Update velocity and position using kinematic equations
        this.forces.velocity += this.forces.acceleration * dt;
        this.forces.position.x += this.forces.velocity * dt * 20; // Scale for visualization
        
        // Update force calculations based on new velocity
        this.updateForcesCalculations();
        
        // Keep object within canvas bounds
        if (this.forces.position.x < 50) {
            this.forces.position.x = 50;
            this.forces.velocity = 0;
        } else if (this.forces.position.x > this.canvas.width - 50) {
            this.forces.position.x = this.canvas.width - 50;
            this.forces.velocity = 0;
        }
    }
    
    updateCircularMotion(deltaTime) {
        if (!this.circular.isRunning) return;
        
        const dt = deltaTime / 1000; // Convert to seconds
        this.circular.time += dt;
        
        // Update angle based on angular velocity
        this.circular.angle += this.circular.angularVelocity * dt;
        
        // Keep angle in range [0, 2π]
        if (this.circular.angle > 2 * Math.PI) {
            this.circular.angle -= 2 * Math.PI;
        }
    }
    
    drawProjectileMotion() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground
        this.ctx.strokeStyle = '#8b4513';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 50);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 50);
        this.ctx.stroke();
        
        // Draw coordinate system
        this.drawCoordinateSystem();
        
        // Draw trajectory trail
        if (this.projectile.trail.length > 1) {
            this.ctx.strokeStyle = this.projectile.airResistance ? '#ff6b35' : '#007bff';
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 0.7;
            this.ctx.beginPath();
            this.ctx.moveTo(this.projectile.trail[0].x, this.projectile.trail[0].y);
            for (let i = 1; i < this.projectile.trail.length; i++) {
                this.ctx.lineTo(this.projectile.trail[i].x, this.projectile.trail[i].y);
            }
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        }
        
        // Draw comparison trails
        if (this.projectile.comparisonMode) {
            this.projectile.comparisonTrails.forEach((trajectory, index) => {
                if (trajectory.trail.length > 1) {
                    this.ctx.strokeStyle = trajectory.color;
                    this.ctx.lineWidth = 1;
                    this.ctx.globalAlpha = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(trajectory.trail[0].x, trajectory.trail[0].y);
                    for (let i = 1; i < trajectory.trail.length; i++) {
                        this.ctx.lineTo(trajectory.trail[i].x, trajectory.trail[i].y);
                    }
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                    
                    // Label each trajectory
                    this.ctx.fillStyle = trajectory.color;
                    this.ctx.font = '10px Arial';
                    this.ctx.fillText(`v=${trajectory.parameters.velocity}m/s, θ=${trajectory.parameters.angle}°`, 
                                     10, 70 + index * 15);
                }
            });
        }
        
        // Draw theoretical trajectory
        this.drawTheoreticalTrajectory();
        
        // Draw projectile
        this.ctx.fillStyle = '#dc3545';
        this.ctx.beginPath();
        this.ctx.arc(this.projectile.x, this.projectile.y, 8, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw velocity vector
        if (this.isRunning) {
            this.drawVelocityVector();
        }
        
        // Draw launcher
        this.drawLauncher();
    }
    
    drawCoordinateSystem() {
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        
        // Grid lines
        for (let x = 50; x < this.canvas.width; x += this.pixelsPerMeter * 10) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height - 50);
            this.ctx.stroke();
        }
        
        for (let y = 50; y < this.canvas.height - 50; y += this.pixelsPerMeter * 10) {
            this.ctx.beginPath();
            this.ctx.moveTo(50, this.canvas.height - y);
            this.ctx.lineTo(this.canvas.width, this.canvas.height - y);
            this.ctx.stroke();
        }
        
        // Axes labels
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.fillText('Distance (m)', this.canvas.width / 2, this.canvas.height - 10);
        
        this.ctx.save();
        this.ctx.translate(15, this.canvas.height / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText('Height (m)', 0, 0);
        this.ctx.restore();
    }
    
    drawTheoreticalTrajectory() {
        if (!this.isRunning) {
            this.ctx.strokeStyle = '#28a745';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([5, 5]);
            this.ctx.globalAlpha = 0.5;
            
            this.ctx.beginPath();
            const angleRad = (this.projectile.angle * Math.PI) / 180;
            
            for (let t = 0; t <= this.projectile.flightTime; t += 0.1) {
                const x = this.projectile.vx * t;
                const y = this.projectile.vy * t - 0.5 * this.projectile.gravity * t * t;
                
                const canvasX = 50 + x * this.pixelsPerMeter;
                const canvasY = (this.canvas.height - 50) - y * this.pixelsPerMeter;
                
                if (t === 0) {
                    this.ctx.moveTo(canvasX, canvasY);
                } else {
                    this.ctx.lineTo(canvasX, canvasY);
                }
            }
            
            this.ctx.stroke();
            this.ctx.setLineDash([]);
            this.ctx.globalAlpha = 1;
        }
    }
    
    drawVelocityVector() {
        const t = this.projectile.time;
        const vx = this.projectile.vx;
        const vy = this.projectile.vy - this.projectile.gravity * t;
        
        const scale = 2;
        const endX = this.projectile.x + vx * scale;
        const endY = this.projectile.y - vy * scale;
        
        // Velocity vector
        this.ctx.strokeStyle = '#ff6b35';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(this.projectile.x, this.projectile.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Arrow head
        const angle = Math.atan2(endY - this.projectile.y, endX - this.projectile.x);
        const arrowLength = 10;
        
        this.ctx.beginPath();
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - arrowLength * Math.cos(angle - Math.PI / 6),
            endY - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - arrowLength * Math.cos(angle + Math.PI / 6),
            endY - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();
        
        // Velocity components
        this.ctx.strokeStyle = '#ffa500';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([3, 3]);
        
        // Horizontal component
        this.ctx.beginPath();
        this.ctx.moveTo(this.projectile.x, this.projectile.y);
        this.ctx.lineTo(this.projectile.x + vx * scale, this.projectile.y);
        this.ctx.stroke();
        
        // Vertical component
        this.ctx.beginPath();
        this.ctx.moveTo(this.projectile.x, this.projectile.y);
        this.ctx.lineTo(this.projectile.x, this.projectile.y - vy * scale);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
    }
    
    drawLauncher() {
        const launcherX = 50;
        const launcherY = this.canvas.height - 50;
        const angleRad = (this.projectile.angle * Math.PI) / 180;
        const length = 40;
        
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(launcherX, launcherY);
        this.ctx.lineTo(
            launcherX + length * Math.cos(angleRad),
            launcherY - length * Math.sin(angleRad)
        );
        this.ctx.stroke();
        
        // Base
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(launcherX, launcherY, 8, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    drawForces() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const { position, objectWidth, objectHeight, surfaceAngle } = this.forces;
        const angleRad = (surfaceAngle * Math.PI) / 180;
        
        // Draw surface/ramp
        this.drawSurface();
        
        // Calculate object position on angled surface
        const objectX = position.x;
        const groundY = this.canvas.height - 100;
        const objectY = groundY - Math.tan(angleRad) * (objectX - 100) - objectHeight;
        
        // Draw object
        this.ctx.save();
        this.ctx.translate(objectX, objectY);
        this.ctx.rotate(angleRad);
        
        this.ctx.fillStyle = '#dc3545';
        this.ctx.fillRect(-objectWidth/2, -objectHeight/2, objectWidth, objectHeight);
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(-objectWidth/2, -objectHeight/2, objectWidth, objectHeight);
        
        this.ctx.restore();
        
        // Draw force vectors
        this.drawForceVectors(objectX, objectY);
        
        // Draw force diagram
        this.drawForceDiagram();
        
        // Draw labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Forces and Motion', 10, 25);
        this.ctx.fillText(`Surface Angle: ${surfaceAngle}°`, 10, 45);
        
        // Draw Newton's laws reference
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.fillText('F = ma (Second Law)', 10, this.canvas.height - 40);
        this.ctx.fillText('Net Force determines acceleration', 10, this.canvas.height - 20);
    }
    
    drawSurface() {
        const { surfaceAngle } = this.forces;
        const angleRad = (surfaceAngle * Math.PI) / 180;
        const groundY = this.canvas.height - 100;
        const rampLength = 400;
        
        // Draw ground/ramp
        this.ctx.strokeStyle = '#8b4513';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(100, groundY);
        this.ctx.lineTo(100 + rampLength, groundY - Math.tan(angleRad) * rampLength);
        this.ctx.stroke();
        
        // Draw flat ground after ramp
        this.ctx.beginPath();
        this.ctx.moveTo(100 + rampLength, groundY - Math.tan(angleRad) * rampLength);
        this.ctx.lineTo(this.canvas.width, groundY - Math.tan(angleRad) * rampLength);
        this.ctx.stroke();
    }
    
    drawForceVectors(objectX, objectY) {
        const scale = 2;
        const { appliedForce, frictionForce, normalForce, weightForce, surfaceAngle } = this.forces;
        const angleRad = (surfaceAngle * Math.PI) / 180;
        
        // Applied force (horizontal)
        if (Math.abs(appliedForce) > 0.1) {
            this.drawVector(objectX, objectY, appliedForce * scale, 0, '#007bff', 'Applied Force');
        }
        
        // Friction force (along surface, opposing motion)
        if (Math.abs(frictionForce) > 0.1) {
            const frictionX = -Math.cos(angleRad) * frictionForce * scale;
            const frictionY = Math.sin(angleRad) * frictionForce * scale;
            this.drawVector(objectX, objectY, frictionX, frictionY, '#ff6b35', 'Friction');
        }
        
        // Normal force (perpendicular to surface)
        if (normalForce > 0.1) {
            const normalX = -Math.sin(angleRad) * normalForce * scale * 0.1;
            const normalY = -Math.cos(angleRad) * normalForce * scale * 0.1;
            this.drawVector(objectX, objectY, normalX, normalY, '#28a745', 'Normal');
        }
        
        // Weight force (downward)
        this.drawVector(objectX, objectY, 0, weightForce * scale * 0.1, '#6c757d', 'Weight');
    }
    
    drawVector(startX, startY, deltaX, deltaY, color, label) {
        const endX = startX + deltaX;
        const endY = startY + deltaY;
        
        // Draw vector line
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Draw arrow head
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (length > 10) {
            const angle = Math.atan2(deltaY, deltaX);
            const arrowLength = 8;
            
            this.ctx.beginPath();
            this.ctx.moveTo(endX, endY);
            this.ctx.lineTo(
                endX - arrowLength * Math.cos(angle - Math.PI / 6),
                endY - arrowLength * Math.sin(angle - Math.PI / 6)
            );
            this.ctx.moveTo(endX, endY);
            this.ctx.lineTo(
                endX - arrowLength * Math.cos(angle + Math.PI / 6),
                endY - arrowLength * Math.sin(angle + Math.PI / 6)
            );
            this.ctx.stroke();
        }
        
        // Draw label
        if (label) {
            this.ctx.fillStyle = color;
            this.ctx.font = '10px Arial';
            this.ctx.fillText(label, endX + 5, endY - 5);
        }
    }
    
    drawForceDiagram() {
        const diagramX = this.canvas.width - 150;
        const diagramY = 80;
        const scale = 1;
        
        // Draw coordinate system
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(diagramX - 50, diagramY);
        this.ctx.lineTo(diagramX + 50, diagramY);
        this.ctx.moveTo(diagramX, diagramY - 50);
        this.ctx.lineTo(diagramX, diagramY + 50);
        this.ctx.stroke();
        
        // Draw net force vector
        const netForceX = this.forces.netForce * scale * 2;
        if (Math.abs(netForceX) > 1) {
            this.drawVector(diagramX, diagramY, netForceX, 0, '#dc3545', 'Net Force');
        }
        
        // Label
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Force Diagram', diagramX, diagramY + 70);
        this.ctx.textAlign = 'left';
    }
    
    drawCircular() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const { centerX, centerY, radius, angle, mass, showVectors } = this.circular;
        const radiusPixels = radius * 50; // Scale for visualization
        
        // Draw circular path
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radiusPixels, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Calculate object position
        const objectX = centerX + radiusPixels * Math.cos(angle);
        const objectY = centerY + radiusPixels * Math.sin(angle);
        
        // Draw center point
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw object
        this.ctx.fillStyle = '#dc3545';
        this.ctx.beginPath();
        this.ctx.arc(objectX, objectY, 15, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw radius line
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(objectX, objectY);
        this.ctx.stroke();
        
        // Draw force vectors if enabled
        if (showVectors) {
            this.drawCircularVectors(objectX, objectY, centerX, centerY);
        }
        
        // Draw information
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Uniform Circular Motion', 10, 25);
        this.ctx.fillText(`Radius: ${radius.toFixed(1)} m`, 10, 45);
        
        // Draw angle measurement
        this.ctx.strokeStyle = '#007bff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 30, 0, angle);
        this.ctx.stroke();
        
        this.ctx.fillStyle = '#007bff';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`θ = ${(angle * 180 / Math.PI).toFixed(1)}°`, centerX + 35, centerY - 5);
    }
    
    drawCircularVectors(objectX, objectY, centerX, centerY) {
        const scale = 20;
        
        // Centripetal force vector (toward center)
        const fcMagnitude = this.circular.centripetalForce / this.circular.mass; // Normalize by mass for display
        const fcX = (centerX - objectX) / Math.sqrt((centerX - objectX) ** 2 + (centerY - objectY) ** 2) * fcMagnitude * scale;
        const fcY = (centerY - objectY) / Math.sqrt((centerX - objectX) ** 2 + (centerY - objectY) ** 2) * fcMagnitude * scale;
        
        this.drawVector(objectX, objectY, fcX, fcY, '#ff0000', 'F_c');
        
        // Velocity vector (tangent to circle)
        const vMagnitude = this.circular.tangentialSpeed;
        const vX = -Math.sin(this.circular.angle) * vMagnitude * scale * 0.1;
        const vY = Math.cos(this.circular.angle) * vMagnitude * scale * 0.1;
        
        this.drawVector(objectX, objectY, vX, vY, '#00ff00', 'v');
        
        // Vector legend
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.fillText('Vectors:', this.canvas.width - 120, this.canvas.height - 60);
        
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillText('F_c: Centripetal Force', this.canvas.width - 120, this.canvas.height - 40);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillText('v: Tangential Velocity', this.canvas.width - 120, this.canvas.height - 20);
    }
    
    drawEnergy() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const { scenario } = this.energy;
        
        if (scenario === 'ramp') {
            this.drawRampScenario();
        } else if (scenario === 'pendulum') {
            this.drawPendulumEnergyScenario();
        } else if (scenario === 'spring') {
            this.drawSpringEnergyScenario();
        }
        
        // Draw energy bar chart
        this.drawEnergyBars();
    }
    
    drawRampScenario() {
        const rampStartX = 100;
        const rampStartY = 100;
        const rampEndX = 500;
        const rampEndY = 300;
        const heightScale = 20; // pixels per meter
        
        // Draw ramp
        this.ctx.strokeStyle = '#8b4513';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(rampStartX, rampStartY);
        this.ctx.lineTo(rampEndX, rampEndY);
        this.ctx.stroke();
        
        // Draw ground
        this.ctx.beginPath();
        this.ctx.moveTo(0, rampEndY);
        this.ctx.lineTo(this.canvas.width, rampEndY);
        this.ctx.stroke();
        
        // Calculate ball position based on current height
        const progress = 1 - (this.energy.currentHeight / this.energy.initialHeight);
        const ballX = rampStartX + (rampEndX - rampStartX) * progress;
        const ballY = rampStartY + (rampEndY - rampStartY) * progress;
        
        // Draw ball
        this.ctx.fillStyle = '#dc3545';
        this.ctx.beginPath();
        this.ctx.arc(ballX, ballY, this.energy.ballRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw height indicators
        this.drawHeightIndicators(ballX, ballY, rampEndY);
        
        // Draw velocity vector
        if (this.energy.currentVelocity > 0) {
            this.drawEnergyVelocityVector(ballX, ballY);
        }
        
        // Labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Rolling Ball on Ramp', 10, 25);
    }
    
    drawPendulumEnergyScenario() {
        const pivotX = this.canvas.width / 2;
        const pivotY = 80;
        const length = this.energy.pendulumLength;
        
        // Calculate bob position
        const bobX = pivotX + length * Math.sin(this.energy.angle);
        const bobY = pivotY + length * Math.cos(this.energy.angle);
        
        // Draw pivot
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(pivotX, pivotY, 8, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw rope
        this.ctx.strokeStyle = '#8b4513';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(pivotX, pivotY);
        this.ctx.lineTo(bobX, bobY);
        this.ctx.stroke();
        
        // Draw bob
        this.ctx.fillStyle = '#dc3545';
        this.ctx.beginPath();
        this.ctx.arc(bobX, bobY, 20, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw reference level
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(pivotX - length, pivotY + length);
        this.ctx.lineTo(pivotX + length, pivotY + length);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Draw height indicator
        const groundY = pivotY + length;
        this.drawHeightIndicators(bobX, bobY, groundY);
        
        // Labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Energy in Pendulum', 10, 25);
    }
    
    drawSpringEnergyScenario() {
        const centerX = this.canvas.width / 2;
        const springTop = 50;
        const heightScale = 20;
        const equilibriumY = 200;
        const massY = equilibriumY + (this.energy.initialHeight - this.energy.currentHeight) * heightScale;
        
        // Draw spring (simplified)
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, springTop);
        
        const coils = 8;
        const springWidth = 30;
        for (let i = 0; i <= coils; i++) {
            const y = springTop + (massY - springTop) * (i / coils);
            const x = centerX + (i % 2 === 0 ? 0 : (i % 4 === 1 ? springWidth : -springWidth));
            this.ctx.lineTo(x, y);
        }
        this.ctx.lineTo(centerX, massY);
        this.ctx.stroke();
        
        // Draw mass
        this.ctx.fillStyle = '#dc3545';
        this.ctx.fillRect(centerX - 25, massY, 50, 30);
        
        // Draw reference level
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, equilibriumY + this.energy.initialHeight * heightScale);
        this.ctx.lineTo(this.canvas.width, equilibriumY + this.energy.initialHeight * heightScale);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Spring-Mass Energy', 10, 25);
    }
    
    drawEnergyBars() {
        const barWidth = 40;
        const barSpacing = 60;
        const maxBarHeight = 120;
        const startX = this.canvas.width - 200;
        const baseY = this.canvas.height - 50;
        
        const maxEnergy = Math.max(this.energy.total, 1); // Avoid division by zero
        
        // Kinetic Energy Bar
        const keHeight = (this.energy.kinetic / maxEnergy) * maxBarHeight;
        this.ctx.fillStyle = '#ff6b35';
        this.ctx.fillRect(startX, baseY - keHeight, barWidth, keHeight);
        
        // Potential Energy Bar
        const peHeight = (this.energy.potential / maxEnergy) * maxBarHeight;
        this.ctx.fillStyle = '#4dabf7';
        this.ctx.fillRect(startX + barSpacing, baseY - peHeight, barWidth, peHeight);
        
        // Total Energy Bar (reference)
        const totalHeight = maxBarHeight;
        this.ctx.fillStyle = '#51cf66';
        this.ctx.fillRect(startX + 2 * barSpacing, baseY - totalHeight, barWidth, totalHeight);
        
        // Labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('KE', startX + barWidth/2, baseY + 15);
        this.ctx.fillText('PE', startX + barSpacing + barWidth/2, baseY + 15);
        this.ctx.fillText('Total', startX + 2 * barSpacing + barWidth/2, baseY + 15);
        this.ctx.textAlign = 'left';
    }
    
    drawHeightIndicators(objectX, objectY, groundY) {
        // Height line
        this.ctx.strokeStyle = '#007bff';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(objectX + 30, objectY);
        this.ctx.lineTo(objectX + 30, groundY);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Height label
        this.ctx.fillStyle = '#007bff';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`h = ${this.energy.currentHeight.toFixed(1)}m`, objectX + 35, (objectY + groundY) / 2);
    }
    
    drawEnergyVelocityVector(x, y) {
        const scale = 5;
        const vx = this.energy.currentVelocity * scale * Math.cos(this.energy.rampAngle * Math.PI / 180);
        const vy = this.energy.currentVelocity * scale * Math.sin(this.energy.rampAngle * Math.PI / 180);
        
        this.ctx.strokeStyle = '#ff6b35';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + vx, y + vy);
        this.ctx.stroke();
        
        // Arrow head
        const angle = Math.atan2(vy, vx);
        const arrowLength = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(x + vx, y + vy);
        this.ctx.lineTo(
            x + vx - arrowLength * Math.cos(angle - Math.PI / 6),
            y + vy - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.moveTo(x + vx, y + vy);
        this.ctx.lineTo(
            x + vx - arrowLength * Math.cos(angle + Math.PI / 6),
            y + vy - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();
    }
    
    drawMomentum() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const { object1, object2, hasCollided, collisionType } = this.momentum;
        
        // Draw collision track
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, object1.y);
        this.ctx.lineTo(this.canvas.width, object1.y);
        this.ctx.stroke();
        
        // Draw objects
        this.drawCollisionObject(object1, '#dc3545', '1');
        this.drawCollisionObject(object2, '#007bff', '2');
        
        // Draw velocity vectors
        this.drawMomentumVelocityVector(object1, '#dc3545');
        this.drawMomentumVelocityVector(object2, '#007bff');
        
        // Draw collision indicator
        if (hasCollided) {
            this.drawCollisionEffect();
        }
        
        // Draw momentum vectors (center of mass)
        this.drawMomentumVectors();
        
        // Draw labels and information
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`${collisionType.charAt(0).toUpperCase() + collisionType.slice(1)} Collision`, 10, 25);
        
        if (hasCollided) {
            this.ctx.fillStyle = '#28a745';
            this.ctx.fillText('Collision Occurred!', 10, 45);
        }
        
        // Draw formulas
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.fillText('p = mv (momentum)', 10, this.canvas.height - 40);
        this.ctx.fillText('Conservation: p₁ + p₂ = constant', 10, this.canvas.height - 20);
    }
    
    drawCollisionObject(obj, color, label) {
        // Draw object
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw object border
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw object label
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(label, obj.x, obj.y + 5);
        this.ctx.textAlign = 'left';
        
        // Draw mass and velocity info
        this.ctx.fillStyle = '#333';
        this.ctx.font = '10px Arial';
        this.ctx.fillText(`m${label}: ${obj.mass}kg`, obj.x - obj.radius, obj.y - obj.radius - 20);
        this.ctx.fillText(`v${label}: ${obj.velocity.toFixed(1)}m/s`, obj.x - obj.radius, obj.y - obj.radius - 10);
    }
    
    drawMomentumVelocityVector(obj, color) {
        if (Math.abs(obj.velocity) < 0.1) return;
        
        const scale = 5;
        const vectorLength = obj.velocity * scale;
        const startX = obj.x;
        const startY = obj.y;
        const endX = startX + vectorLength;
        const endY = startY;
        
        // Draw velocity vector
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Draw arrow head
        if (Math.abs(vectorLength) > 10) {
            const direction = vectorLength > 0 ? 1 : -1;
            this.ctx.beginPath();
            this.ctx.moveTo(endX, endY);
            this.ctx.lineTo(endX - 8 * direction, endY - 4);
            this.ctx.moveTo(endX, endY);
            this.ctx.lineTo(endX - 8 * direction, endY + 4);
            this.ctx.stroke();
        }
    }
    
    drawCollisionEffect() {
        const { object1, object2 } = this.momentum;
        const centerX = (object1.x + object2.x) / 2;
        const centerY = (object1.y + object2.y) / 2;
        
        // Draw collision effect (star burst)
        this.ctx.strokeStyle = '#ffc107';
        this.ctx.lineWidth = 3;
        
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const length = 30;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(
                centerX + length * Math.cos(angle),
                centerY + length * Math.sin(angle)
            );
            this.ctx.stroke();
        }
    }
    
    drawMomentumVectors() {
        const canvasBottom = this.canvas.height - 80;
        const scale = 0.5;
        
        // Initial momentum vector
        const initialMomentumLength = this.momentum.initialMomentum * scale;
        this.ctx.strokeStyle = '#28a745';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(100, canvasBottom);
        this.ctx.lineTo(100 + initialMomentumLength, canvasBottom);
        this.ctx.stroke();
        
        // Final momentum vector
        const finalMomentumLength = this.momentum.finalMomentum * scale;
        this.ctx.strokeStyle = '#17a2b8';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(100, canvasBottom + 20);
        this.ctx.lineTo(100 + finalMomentumLength, canvasBottom + 20);
        this.ctx.stroke();
        
        // Labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.fillText('Initial Momentum', 10, canvasBottom - 5);
        this.ctx.fillText('Final Momentum', 10, canvasBottom + 15);
        
        // Show momentum conservation
        const diff = Math.abs(this.momentum.initialMomentum - this.momentum.finalMomentum);
        if (diff < 0.01) {
            this.ctx.fillStyle = '#28a745';
            this.ctx.fillText('✓ Momentum Conserved', 10, canvasBottom + 35);
        }
    }
    
    drawOscillations() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.oscillation.type === 'spring') {
            this.drawSpringMass();
        } else {
            this.drawPendulum();
        }
    }
    
    drawSpringMass() {
        const centerX = this.canvas.width / 2;
        const { equilibrium, displacement } = this.oscillation;
        
        // Draw reference line (equilibrium position)
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, 0);
        this.ctx.lineTo(centerX, this.canvas.height);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Draw spring (simplified as a zigzag)
        const springTop = 50;
        const springBottom = equilibrium + displacement;
        const springWidth = 40;
        const coils = 10;
        
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, springTop);
        
        for (let i = 0; i <= coils; i++) {
            const y = springTop + (springBottom - springTop) * (i / coils);
            const x = centerX + (i % 2 === 0 ? 0 : (i % 4 === 1 ? springWidth : -springWidth));
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.lineTo(centerX, springBottom);
        this.ctx.stroke();
        
        // Draw mass
        const massSize = 30;
        this.ctx.fillStyle = '#dc3545';
        this.ctx.fillRect(
            centerX - massSize/2, 
            springBottom, 
            massSize, 
            massSize
        );
        
        // Draw displacement arrow
        if (Math.abs(displacement) > 5) {
            this.drawDisplacementArrow(centerX, equilibrium, displacement);
        }
        
        // Draw velocity vector
        if (this.oscillation.isRunning && Math.abs(this.oscillation.velocity) > 10) {
            this.drawVelocityVector(centerX, springBottom + massSize/2, this.oscillation.velocity * 0.1);
        }
        
        // Draw labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Spring-Mass System', 10, 25);
        this.ctx.fillText('Equilibrium', centerX + 10, equilibrium);
    }
    
    drawPendulum() {
        const pivotX = this.canvas.width / 2;
        const pivotY = 50;
        const ropeLength = 200;
        
        // Convert displacement to angle (small angle approximation)
        const angle = this.oscillation.displacement / 100; // Convert pixels to radians approximately
        
        // Calculate bob position
        const bobX = pivotX + ropeLength * Math.sin(angle);
        const bobY = pivotY + ropeLength * Math.cos(angle);
        
        // Draw pivot
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(pivotX, pivotY, 8, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw rope
        this.ctx.strokeStyle = '#8b4513';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(pivotX, pivotY);
        this.ctx.lineTo(bobX, bobY);
        this.ctx.stroke();
        
        // Draw bob
        this.ctx.fillStyle = '#dc3545';
        this.ctx.beginPath();
        this.ctx.arc(bobX, bobY, 20, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw equilibrium line
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(pivotX, pivotY);
        this.ctx.lineTo(pivotX, pivotY + ropeLength);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Draw arc showing displacement
        if (Math.abs(angle) > 0.05) {
            this.ctx.strokeStyle = '#007bff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(pivotX, pivotY, ropeLength * 0.3, Math.PI/2, Math.PI/2 + angle, angle < 0);
            this.ctx.stroke();
        }
        
        // Draw velocity vector
        if (this.oscillation.isRunning && Math.abs(this.oscillation.velocity) > 10) {
            const velocityScale = 0.05;
            const vx = this.oscillation.velocity * velocityScale * Math.cos(angle);
            const vy = -this.oscillation.velocity * velocityScale * Math.sin(angle);
            
            this.ctx.strokeStyle = '#ff6b35';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(bobX, bobY);
            this.ctx.lineTo(bobX + vx, bobY + vy);
            this.ctx.stroke();
        }
        
        // Draw labels
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Simple Pendulum', 10, 25);
        this.ctx.fillText(`Length: ${this.oscillation.length.toFixed(1)} m`, 10, 45);
    }
    
    drawDisplacementArrow(centerX, equilibrium, displacement) {
        this.ctx.strokeStyle = '#007bff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 50, equilibrium);
        this.ctx.lineTo(centerX + 50, equilibrium + displacement);
        this.ctx.stroke();
        
        // Arrow head
        const arrowY = equilibrium + displacement;
        const direction = displacement > 0 ? 1 : -1;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 50, arrowY);
        this.ctx.lineTo(centerX + 45, arrowY - 10 * direction);
        this.ctx.moveTo(centerX + 50, arrowY);
        this.ctx.lineTo(centerX + 55, arrowY - 10 * direction);
        this.ctx.stroke();
        
        // Label
        this.ctx.fillStyle = '#007bff';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`x = ${displacement.toFixed(0)} px`, centerX + 60, equilibrium + displacement/2);
    }
    
    drawVelocityVector(x, y, velocity) {
        this.ctx.strokeStyle = '#ff6b35';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + velocity);
        this.ctx.stroke();
        
        // Arrow head
        const direction = velocity > 0 ? 1 : -1;
        const endY = y + velocity;
        this.ctx.beginPath();
        this.ctx.moveTo(x, endY);
        this.ctx.lineTo(x - 5, endY - 8 * direction);
        this.ctx.moveTo(x, endY);
        this.ctx.lineTo(x + 5, endY - 8 * direction);
        this.ctx.stroke();
    }
    
    startAnimation() {
        let lastTime = 0;
        
        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            
            // Update current simulation
            switch (this.currentSimulation) {
                case 'projectile':
                    this.updateProjectileMotion(deltaTime);
                    this.drawProjectileMotion();
                    break;
                case 'forces':
                    this.updateForces(deltaTime);
                    this.drawForces();
                    break;
                case 'energy':
                    this.updateEnergy(deltaTime);
                    this.drawEnergy();
                    break;
                case 'momentum':
                    this.updateMomentum(deltaTime);
                    this.drawMomentum();
                    break;
                case 'oscillations':
                    this.updateOscillation(deltaTime);
                    this.drawOscillations();
                    break;
                case 'circular':
                    this.updateCircularMotion(deltaTime);
                    this.drawCircular();
                    break;
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        this.animationId = requestAnimationFrame(animate);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize physics simulations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const physics = new PhysicsSimulations();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        physics.destroy();
    });
});