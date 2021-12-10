const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

function parseSplitLines (lines) {
  return lines.map(line => {
    return line.split(' -> ').map(pair => {
      return pair.split(',').map(x => parseInt(x, 10));
    });
  });
}

module.exports = function runner(inputFile, verbose) {
  const input = parseSplitLines(fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x));

  console.log(input);

  const overlapDiagram = {};

  for (const linePairs of input) {
    const [x0,y0] = linePairs[0];
    const [x1,y1] = linePairs[1];
    // console.log(x0, x1, y0, y1);
    if (x0 === x1 || y0 === y1) {
      for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
        for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
          console.log(x, y);
          overlapDiagram[x] = overlapDiagram[x] || {};
          overlapDiagram[x][y] = overlapDiagram[x][y] || 0;
          overlapDiagram[x][y] += 1
        }
      }
    }
  }

  const solution = (function () {
    let res = 0;
    console.log(overlapDiagram);
    for (const col of Object.keys(overlapDiagram)) {
      for (const row of Object.keys(overlapDiagram[col])) {
        if (overlapDiagram[col][row] > 1) res++;
      }
    }
    return res;
  }());

  console.log('Final Answer:', solution);
};
