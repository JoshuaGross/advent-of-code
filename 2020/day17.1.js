const fs = require('fs');
const assert = require('assert');
const { parseConwayGridState } = require('../utils');

module.exports = function runner(inputFile, verbose) {
  let grid = parseConwayGridState(fs.readFileSync(inputFile, 'utf8'), 3);
  for (let i = 0; i < 6; i++) {
    grid.step();
  }

  const solution = grid.sum();

  assert.equal(solution, 304);
  console.log('Final Answer:', solution);
}
