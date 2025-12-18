'use strict';

const canvas = document.getElementById('canvas');
const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };
const ctx = canvas.getContext('2d');

const circle = {
    center : canvasCenter,
    radius : 250
};

const points = [
    { theta : 0 }, // A
    { theta : Math.PI / 6 }, // B
    { theta : 8 * Math.PI / 11 }, // C
    { theta : 5 * Math.PI / 4 } // D
];

let activePointIndex = null;

// Added: function to find nearest point
function findNearestPointIndex(mousePos, ds = 10) {
    let minDistance = Infinity;
    let nearestIndex = -1;
    
    for (let i = 0; i < points.length; i++) {
        const pos = positionOf(points[i].theta);
        const dist = distance(mousePos, pos);
        if (dist < minDistance) {
            minDistance = dist;
            nearestIndex = i;
        }
    }
    
    return minDistance < ds ? nearestIndex : null;
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    activePointIndex = findNearestPointIndex(mousePos);
    
    if (activePointIndex !== null) {
        e.preventDefault(); // Prevent text selection
    }
});

canvas.addEventListener('mouseup', () => {
    activePointIndex = null;
});

canvas.addEventListener('mousemove', (e) => {
    if (activePointIndex === null || activePointIndex === -1) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Update the angle for the dragged point
    points[activePointIndex].theta = angleFromMouse(mouseX, mouseY, circle.center);

    draw();
});

// Fixed: This function expects an angle (number), not a point object
function positionOf(theta) {
    return {
        x : circle.center.x + circle.radius * Math.cos(theta),
        y : circle.center.y - circle.radius * Math.sin(theta)
    };
}

// Lines are defined by the indices of the points that defined them.
// So, AB is stored as the ordered pair (0,1),
const lines = {
    AB : { i : 0, j : 1 },
    BC : { i : 1, j : 2 },
    CD : { i : 2, j : 3 },
    DA : { i : 3, j : 0 },
    // Below are diagonals
    AC : { i : 0, j : 2 },
    BD : { i : 1, j : 3 }
};

function lineEndPoints(line, points) {
    return {
        p : positionOf(points[line.i].theta),
        q : positionOf(points[line.j].theta)
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoint(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function drawLine(point1, point2) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}

function drawCircle(center, radius) {
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function angleFromMouse(x, y, center) {
    // This calculates the angle from center to mouse position
    // Note: y is subtracted because canvas Y axis goes down
    return Math.atan2(center.y - y, x - center.x);
}

function distance(point1, point2) {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

function lineLength(line) {
    const { p , q } = lineEndPoints(line, points);
    return distance(p, q);
}

function drawLineByIndex(line) {
    const { p , q } = lineEndPoints(line, points);
    drawLine(p, q);
}

function draw() {
    clear();

    drawCircle(circle.center, circle.radius);

    // Get positions for all points
    const positions = points.map(p => positionOf(p.theta));

    // Draw line between the two points
    if (positions.length >= 2) {
        drawLineByIndex(lines.AB);
        drawLineByIndex(lines.BC);
        drawLineByIndex(lines.CD);
        drawLineByIndex(lines.DA);

        drawLineByIndex(lines.AC);
        drawLineByIndex(lines.BD);
    }

    // Draw all points
    for (const p of positions) {
        drawPoint(p);
    }
}

// invoke draw
draw();
