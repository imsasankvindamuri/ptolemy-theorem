function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

function drawCircle(ctx, center, radius, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawLine(ctx, p1, p2, color, width = 1.5) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function drawPoint(ctx, point, color, radius = 5) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawLabel(ctx, point, text, color) {
  ctx.font = '14px serif';
  ctx.fillStyle = color;
  ctx.fillText(text, point.x + 8, point.y - 8);
}

function drawLabeledPoint(ctx, point, label, color) {
  drawPoint(ctx, point, color);
  drawLabel(ctx, point, label, color);
}

function drawText(ctx, text, x, y, color = '#ddd') {
  ctx.font = '16px serif';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
