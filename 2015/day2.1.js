const fs = require('fs');
const assert = require('assert');
const sum = require('../utils/sum');

function computePaperNeededForBox (l, w, h) {
  return 2*l*w + 2*w*h + 2*h*l + Math.min(l*w, w*h, l*h);
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(line => line.split('x').map(num => parseInt(num, 10)));

  assert.equal(computePaperNeededForBox(2, 3, 4), 58);
  assert.equal(computePaperNeededForBox(1, 1, 10), 43);

  const solution = sum(...inputLines.map(args => computePaperNeededForBox(...args)));
  assert.equal(solution, 1586300);
  console.log('Final Answer:', solution);
}
