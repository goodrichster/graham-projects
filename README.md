# Graham's Mathematical Applications Suite

https://goodrichster.github.io/graham-projects/index.html

A collection of interactive mathematical applications built with modern web technologies. This educational suite provides comprehensive tools for exploring arithmetic, geometry, trigonometry, and 3D mathematics.

## 🚀 Live Applications

- **Calculator** - Enhanced arithmetic calculator with modern UI
- **Polygon Explorer** - Interactive 2D polygon visualization and analysis
- **Unit Circle Explorer** - Comprehensive trigonometry with exact mathematical values
- **Polyhedron Explorer** - 3D geometric solids with Euler's formula verification
- **Physics Simulations** - Interactive AP Physics 1 concepts and visualizations
- **Calculus Simulations** - Comprehensive AP Calculus AB derivatives, integration, and rational function analysis

## 📱 Features

### 🧮 Calculator
- **Modern Interface**: Clean, responsive design with visual feedback
- **Enhanced Functionality**: Supports decimal numbers and all basic operations
- **Error Handling**: Division by zero protection and input validation
- **Keyboard Shortcuts**: Ctrl/Cmd + mathematical operators
- **Real-time Results**: Instant calculations with animated feedback

### 🔷 Polygon Explorer
- **Interactive Visualization**: Real-time polygon rendering on HTML5 canvas
- **Dual Controls**: Dropdown selection and slider for sides (3-20)
- **Mathematical Analysis**: Displays interior angles and polygon properties
- **Coordinate Display**: Shows exact vertex coordinates in a formatted table
- **Keyboard Navigation**: Arrow keys for quick adjustments

### ⚪ Unit Circle Explorer
- **Exact Mathematical Values**: Fractions and radicals instead of decimals (√2/2, π/3, etc.)
- **Dual Angle Notation**: Shows both decimal and π representations (1.57 (π/2))
- **Interactive Visualization**: Real-time unit circle with coordinate display
- **Comprehensive Table**: All trigonometric values for common angles
- **Animation Controls**: Smooth rotation with start/stop functionality
- **Preset Angles**: Quick access to standard trigonometric angles

### 📐 Polyhedron Explorer
- **3D Visualization**: Interactive rendering with rotation controls
- **Euler's Formula**: Complete verification table showing V - E + F = 2
- **Multiple Polyhedra**: 9 different solids including Platonic solids
- **Real-time Rotation**: X/Y axis controls with auto-rotation feature
- **Educational Display**: Vertex, edge, and face counts with verification

### ⚛️ Physics Simulations
- **Projectile Motion**: Interactive trajectory visualization with customizable velocity, angle, and gravity
- **Air Resistance Effects**: Compare trajectories with and without air drag
- **Trajectory Comparison**: Overlay multiple projectile paths for analysis
- **Real-time Calculations**: Displays theoretical values for range, max height, and flight time
- **Vector Analysis**: Shows velocity components and magnitude during flight
- **Forces & Motion**: Newton's laws with interactive force diagrams and net force visualization
- **Energy Conservation**: KE/PE transformations in ramps, pendulums, and springs with energy bar charts
- **Momentum & Collisions**: Elastic, inelastic, and perfectly inelastic collision analysis
- **Simple Harmonic Motion**: Spring-mass systems and pendulums with exact period calculations
- **Circular Motion**: Uniform circular motion with centripetal force and angular velocity analysis
- **Educational Formulas**: Mathematical equations displayed alongside simulations
- **Exact Mathematical Notation**: Uses π notation and exact radical representations
- **AP Physics 1 Aligned**: Covers core concepts from kinematics to energy conservation
- **Multiple Simulation Types**: Six different physics concepts with interactive controls

### 📊 Calculus Simulations
- **Numerical Integration**: Interactive visualization of integration approximation methods
- **Riemann Sums**: Left and Right Riemann sum calculations with color-coded rectangles
- **Midpoint Rule**: Enhanced midpoint approximation with visual representation
- **Trapezoidal Rule**: Accurate trapezoidal integration with geometric visualization
- **Method Comparison**: Side-by-side comparison of all four numerical integration techniques
- **Real-time Calculations**: Displays exact numerical values for each approximation method
- **Data Table Integration**: Uses realistic AP Calculus data points for authentic problem solving
- **Responsive Scaling**: Automatically adjusts canvas scale to accommodate large data ranges (y-values up to 150)
- **Color-coded Visualization**: Orange for left Riemann, purple for right Riemann, blue for midpoint, green for trapezoidal
- **Rectangle Rendering**: Accurate geometric representation with proper baseline calculations
- **Rational Function Analysis**: Complete analysis of rational functions with asymptote detection
- **Vertical Asymptotes**: Automatic detection and visualization of vertical asymptotes
- **Horizontal Asymptotes**: Analysis based on polynomial degree comparison
- **Slant Asymptotes**: Polynomial long division for oblique asymptote computation
- **Hole Detection**: Identifies removable discontinuities in rational functions
- **Critical Points**: Finds and analyzes local extrema and inflection points
- **End Behavior Analysis**: Mathematical explanation of function behavior at infinity
- **Interactive Function Input**: Custom rational function entry with real-time analysis
- **Step-by-step Solutions**: Detailed mathematical explanations for all computations
- **AP Calculus AB Aligned**: Covers numerical integration and rational function analysis from AP curriculum

## 🛠 Technical Specifications

### Modern Architecture
- **Vanilla JavaScript**: No external dependencies for optimal performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Offline Functionality**: No CDN dependencies, fully self-contained
- **HTML5 Canvas**: Hardware-accelerated graphics for smooth animations

### Educational Standards
- **Exact Mathematical Notation**: Uses fractions (1/2) and radicals (√2/2) 
- **Symbolic Representations**: Shows π notation alongside decimal values
- **Mathematical Accuracy**: Precise calculations without floating-point errors
- **Progressive Enhancement**: Graceful degradation for all device types

### Code Quality
- **Modern ES6+**: Uses latest JavaScript features and best practices
- **Error Handling**: Comprehensive validation and user feedback
- **Performance Optimized**: Efficient rendering and calculation algorithms
- **Clean Architecture**: Modular design with clear separation of concerns

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/goodrichster/graham-projects.git
   cd graham-projects
   ```

2. Start a local web server:
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Using Node.js
   npx http-server -p 8080
   
   # Using PHP
   php -S localhost:8080
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

### Usage
- **Navigation**: Use the main index page to access all applications
- **Keyboard Controls**: Each app supports keyboard shortcuts for enhanced usability
- **Mobile Support**: Touch-friendly interface adapts to all screen sizes
- **Offline Use**: Applications work without internet connection

## 📚 Mathematical Concepts

### Covered Topics
- **Arithmetic**: Basic operations with enhanced error handling
- **Plane Geometry**: Regular polygons and their properties
- **Trigonometry**: Unit circle, exact values, and function relationships
- **Solid Geometry**: 3D polyhedra and Euler's formula (V - E + F = 2)
- **Physics**: Classical mechanics concepts from AP Physics 1 curriculum including circular motion
- **Calculus**: Numerical integration methods, Riemann sums, rational function analysis, and asymptote computation

### Educational Value
- **Exact Representations**: Teaches symbolic vs. decimal mathematics
- **Visual Learning**: Interactive graphics reinforce mathematical concepts
- **Real-time Feedback**: Immediate results help build understanding
- **Progressive Complexity**: From basic arithmetic to advanced 3D geometry

## 🎯 Browser Compatibility

- **Chrome**: 80+ ✅
- **Firefox**: 75+ ✅  
- **Safari**: 13+ ✅
- **Edge**: 80+ ✅
- **Mobile Browsers**: iOS Safari 13+, Chrome Mobile 80+ ✅

## 🔧 Development

### Project Structure
```
graham-projects/
├── index.html              # Main navigation page
├── calculator/             # Arithmetic calculator
│   ├── index.html
│   └── calc.js
├── polygon/               # 2D polygon explorer
│   ├── index.html
│   └── poly.js
├── unit-circle/          # Trigonometry application
│   ├── index.html
│   └── unit-circle.js
├── polyhedron/           # 3D geometry explorer
│   ├── index.html
│   └── polyhedron.js
├── physics/              # Physics simulations
│   ├── index.html
│   └── physics.js
├── calculus/             # Calculus simulations
│   ├── index.html
│   └── calculus.js
└── README.md
```

### Key Design Principles
- **No Build Process**: Direct HTML/CSS/JS for simplicity
- **Self-Contained**: All resources included, no external dependencies
- **Responsive First**: Mobile-friendly design from the ground up
- **Educational Focus**: Mathematical accuracy over visual effects

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Graham Goodrich**
- Educational Mathematics Applications
- Modern Web Development
- Interactive Learning Tools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Areas for Enhancement
- Additional polyhedra (prisms, pyramids, irregular solids)
- 3D graphing capabilities
- Statistical analysis tools
- Advanced trigonometric functions
- Additional calculus topics (limits, derivatives, series convergence)
- Additional physics simulations (waves, electricity, magnetism)
- Symbolic algebra and equation solving
- Probability and statistics modules

## 📈 Version History

- **v3.0.0** - Added comprehensive Calculus Simulations with numerical integration and rational function analysis
- **v2.0.0** - Complete suite with all four applications
- **v1.1.0** - Added Unit Circle Explorer with exact values
- **v1.0.0** - Initial release with Calculator and Polygon Explorer

---

*Built with modern web technologies for educational excellence* 🎓✨
