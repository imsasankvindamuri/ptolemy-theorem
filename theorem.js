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
  drawText(ctx, `Valid = ${isCyclic()}`, 20, 105);
}

function updateTheoremDisplay(calculations) {
  const { leftSide, rightSide, difference } = calculations;

  const equalityEl = document.getElementById("ptolemy-equality");
  const diffEl = document.getElementById("ptolemy-difference");
  const validEl = document.getElementById("ptolemy-validity");

  equalityEl.innerHTML = `
    $$ AB \\cdot CD + BC \\cdot DA = ${leftSide.toFixed(3)} $$
    $$ AC \\cdot BD = ${rightSide.toFixed(3)} $$
  `;

  diffEl.innerHTML = `
    $$ |AB \\cdot CD + BC \\cdot DA - AC \\cdot BD|
       = ${difference.toExponential(2)} $$
  `;

  validEl.innerHTML = `
    $$ \\text{Cyclic order valid: } \\text{${isCyclic()}} $$
  `;

  // Ask MathJax to typeset again
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}
