const fs = require('fs');
const assert = require('assert');
const sum = require('../utils/sum');

function computeRibbonNeededForBox (l, w, h) {
  const sides = [l, w, h].sort((x,y) => x-y);
  return sides[0]*2 + sides[1]*2 + l*w*h;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(line => line.split('x').map(num => parseInt(num, 10)));

  assert.equal(computeRibbonNeededForBox(4,3,2), 34);
  assert.equal(computeRibbonNeededForBox(1, 1, 10), 14);

  const solution = sum(...inputLines.map(args => computeRibbonNeededForBox(...args)));
  assert.equal(solution, 3737498);
  console.log('Final Answer:', solution);
}
