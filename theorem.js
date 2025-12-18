// Calculate all Ptolemy values
function calculatePtolemy(points, circle) {
  // Calculate lengths
  const AB = lineLength('AB', points, circle);
  const BC = lineLength('BC', points, circle);
  const CD = lineLength('CD', points, circle);
  const DA = lineLength('DA', points, circle);
  const AC = lineLength('AC', points, circle);
  const BD = lineLength('BD', points, circle);

  // Ptolemy's theorem
  const leftSide = AB * CD + BC * DA;
  const rightSide = AC * BD;
  const difference = leftSide - rightSide;

  return {
    AB, BC, CD, DA, AC, BD,
    leftSide,
    rightSide,
    difference
  };
}

// Display theorem results
function displayTheorem(ctx, calculations) {
  const { leftSide, rightSide, difference } = calculations;

  drawText(ctx, `AB·CD + BC·DA = ${leftSide.toFixed(3)}`, 20, 30);
  drawText(ctx, `AC·BD = ${rightSide.toFixed(3)}`, 20, 55);
  drawText(ctx, `Difference = ${difference.toExponential(2)}`, 20, 80);
}
