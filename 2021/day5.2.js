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

function drawDiagram (diagram) {
  const n = Math.max(...Object.keys(diagram).map(x => parseInt(x, 10))) + 1;
  for (let y = 0; y < n; y++) {
    let line = '';
    for (let x = 0; x < n; x++) {
      line += (((diagram[y] || {})[x] || 0) > 0 ? diagram[y][x] : '.');
    }
    console.log(line);
  }
}

module.exports = function runner(inputFile, verbose) {
  const input = parseSplitLines(fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x));

  const overlapDiagram = {};

  for (const linePairs of input) {
    const [x0,y0] = linePairs[0];
    const [x1,y1] = linePairs[1];

    const xd = (x0 === x1 ? 0 : (x0 < x1 ? 1 : -1));
    const yd = (y0 === y1 ? 0 : (y0 < y1 ? 1 : -1));

    for (let x = x0, y = y0; y != y1 || x != x1; x += xd, y += yd) {
        overlapDiagram[y] = overlapDiagram[y] || {};
        overlapDiagram[y][x] = overlapDiagram[y][x] || 0;
        overlapDiagram[y][x] += 1;
    }

    // we always skip the final position in the loop
    overlapDiagram[y1] = overlapDiagram[y1] || {};
    overlapDiagram[y1][x1] = overlapDiagram[y1][x1] || 0;
    overlapDiagram[y1][x1] += 1;
  }

  const solution = (function () {
    let res = 0;
    drawDiagram(overlapDiagram);
    for (const col of Object.keys(overlapDiagram)) {
      for (const row of Object.keys(overlapDiagram[col])) {
        if (overlapDiagram[col][row] > 1) res++;
      }
    }
    return res;
  }());

  console.log('Final Answer:', solution);
};
