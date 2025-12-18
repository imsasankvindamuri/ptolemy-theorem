// Convert angle to position on circle
function positionOnCircle(theta, center, radius) {
  return {
    x: center.x + radius * Math.cos(theta),
    y: center.y - radius * Math.sin(theta)  // minus because canvas Y goes down
  };
}

// Calculate angle from mouse position to circle center
function angleFromMouse(x, y, center) {
  return Math.atan2(center.y - y, x - center.x);
}

// Distance between two points (Cartesian)
function distance(p1, p2) {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Get endpoints of a line given point indices
function getLineEndpoints(lineIndex, points, circle) {
  const line = lines[lineIndex];
  return {
    p: positionOnCircle(points[line.i].theta, circle.center, circle.radius),
    q: positionOnCircle(points[line.j].theta, circle.center, circle.radius)
  };
}

// Calculate length of a line
function lineLength(lineIndex, points, circle) {
  const { p, q } = getLineEndpoints(lineIndex, points, circle);
  return distance(p, q);
}
