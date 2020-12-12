const fs = require('fs');
const assert = require('assert');
const manhattanDistance = require('../utils/manhattanDistance');
const rotateWestNorthDegrees = require('../utils/rotateWestNorthDegrees');

function walkInputs (input) {
  let waypointW = -10, waypointN = 1, currFacing = 'E';
  let w = 0, n = 0;

  for (let [dir, mag] of input) {
    if (dir === 'F') {
      w += waypointW * mag;
      n += waypointN * mag;
    } else if (dir === 'N' || dir === 'S') {
      waypointN += mag * (dir === 'S' ? -1 : 1);
    } else if (dir === 'W' || dir === 'E') {
      waypointW += mag * (dir === 'E' ? -1 : 1);
    } else if (dir === 'R' || dir === 'L') {
      [waypointW, waypointN] = rotateWestNorthDegrees(waypointW, waypointN, dir, mag);
    }
  }

  return [w, n];
}

module.exports = function runner(inputFile) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => [x[0], parseInt(x.slice(1), 10)]);
  const [w, n] = walkInputs(inputLines);
  const solution = manhattanDistance(w, n);
  assert.equal(solution, 42495);
  console.log('Final Answer:', solution);
}
