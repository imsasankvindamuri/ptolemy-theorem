function setupInteractions() {
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mousemove', handleMouseMove);
}

function findNearestPointIndex(mousePos, points, circle, epsilon = 10) {
  let minDistance = Infinity;
  let nearestIndex = -1;

  for (let i = 0; i < points.length; i++) {
    const pointPos = positionOnCircle(points[i].theta, circle.center, circle.radius);
    const dist = distance(mousePos, pointPos);

    if (dist < minDistance) {
      minDistance = dist;
      nearestIndex = i;
    }
  }

  return minDistance < epsilon ? nearestIndex : null;
}

function handleMouseDown(e) {
  const rect = canvas.getBoundingClientRect();
  const mousePos = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };

  activePointIndex = findNearestPointIndex(mousePos, points, circle);

  if (activePointIndex !== null) {
    e.preventDefault(); // Prevent text selection
  }
}

function handleMouseUp() {
  activePointIndex = null;
}

function handleMouseMove(e) {
  if (activePointIndex === null) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Update the angle for dragged point
  points[activePointIndex].theta = angleFromMouse(mouseX, mouseY, circle.center);
  draw();
}
