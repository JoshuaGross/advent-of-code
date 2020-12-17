const fs = require('fs');
const assert = require('assert');
const { parseConwayGridState } = require('../utils');

module.exports = function runner(inputFile, verbose) {
  let grid = parseConwayGridState(fs.readFileSync(inputFile, 'utf8'), 4);
  for (let i = 0; i < 6; i++) {
    console.log(i);
    grid.step();
  }

  const solution = grid.sum();

  assert.equal(solution, 1868);
  console.log('Final Answer:', solution);
}
