const fs = require('fs');
const assert = require('assert');
const manhattanDistance = require('../utils/manhattanDistance');
const cardinalTurn = require('../utils/cardinalTurn');

function walkInputs (input) {
  let w = 0, n = 0, currFacing = 'E';

  for (let [dir, mag] of input) {
    if (dir === 'F') {
      dir = currFacing;
    }
    if (dir === 'N') {
      n += mag;
    } else if (dir === 'S') {
      n -= mag;
    } else if (dir === 'W') {
      w += mag;
    } else if (dir === 'E') {
      w -= mag;
    } else if (dir === 'R' || dir === 'L') {
      for (let i = 0; i < mag / 90; i++) {
        currFacing = cardinalTurn(currFacing, dir);
      }
    }
  }

  return [w, n];
}

module.exports = function runner(inputFile) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => [x[0], parseInt(x.slice(1), 10)]);
  const [w, n] = walkInputs(inputLines);
  const solution = manhattanDistance(w, n);
  assert.equal(solution, 445);
  console.log('Final Answer:', solution);
}
