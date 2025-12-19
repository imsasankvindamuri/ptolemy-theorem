'use strict';

// Get canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };

// Colors
const colors = {
  circle: '#d6c28f',
  sides: '#aaaaaa',
  diagonals: '#777777',
  points: ['#f28b82', '#81c995', '#aecbfa', '#fdd663']
};

// Create our circle
const circle = {
  center: canvasCenter,
  radius: 250
};

// Initialize points (angles in radians)
const points = [
  { name: 'A', theta: 0 },
  { name: 'B', theta: Math.PI / 6 },
  { name: 'C', theta: 8 * Math.PI / 11 },
  { name: 'D', theta: 5 * Math.PI / 4 }
];

// State for dragging
let activePointIndex = null;

// Lines defined by point indices
const lines = {
  AB: { i: 0, j: 1 },
  BC: { i: 1, j: 2 },
  CD: { i: 2, j: 3 },
  DA: { i: 3, j: 0 },
  AC: { i: 0, j: 2 },
  BD: { i: 1, j: 3 }
};

// Main drawing function
function draw() {
  // Clear canvas
  clearCanvas(ctx, canvas.width, canvas.height);

  // Draw circle
  drawCircle(ctx, circle.center, circle.radius, colors.circle);

  // Get all point positions
  const positions = points.map(p =>
    positionOnCircle(p.theta, circle.center, circle.radius)
  );

  // Draw sides
  drawLine(ctx, positions[0], positions[1], colors.sides);
  drawLine(ctx, positions[1], positions[2], colors.sides);
  drawLine(ctx, positions[2], positions[3], colors.sides);
  drawLine(ctx, positions[3], positions[0], colors.sides);

  // Draw diagonals
  drawLine(ctx, positions[0], positions[2], colors.diagonals, 1);
  drawLine(ctx, positions[1], positions[3], colors.diagonals, 1);

  // Draw points with labels
  const labels = ['A', 'B', 'C', 'D'];
  positions.forEach((pos, i) => {
    drawLabeledPoint(ctx, pos, labels[i], colors.points[i]);
  });

  // Calculate and display theorem
  const calculations = calculatePtolemy(points, circle);
  updateTheoremDisplay(calculations);
}

// Initialize everything
function init() {
  setupInteractions();
  draw();
}

// Start everything
init();
