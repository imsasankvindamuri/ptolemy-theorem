'use strict';

const canvas = document.getElementById('canvas');
const canvasCenter = {x: canvas.width/2, y: canvas.height/2}
const ctx = canvas.getContext('2d');

const points = [
    canvasCenter,
    {x: canvasCenter.x + 100, y: canvasCenter.y + 100}
]

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

function distance(point1, point2) {
    return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
}

function draw() {

    // clear frame
    clear();

    // draw line
    drawLine(points[0], points[1]);

    // draw circle
    drawCircle(points[0], distance(points[0], points[1]));
    
    // draw points
    for (const point of points) {
        drawPoint(point);
    }
    
}

// invoke draw
draw();
