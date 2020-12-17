const fs = require('fs');
const assert = require('assert');
const { range, parseConwayGridState, getConwayGridValue, conwayGridCountActiveNeighbors, conwayGetNextGridValue, stepConwayGrid, printConwayGrid } = require('../utils');

module.exports = function runner(inputFile, verbose) {
  let grid = parseConwayGridState(fs.readFileSync(inputFile, 'utf8'), 3);
  for (let i = 0; i < 6; i++) {
    grid = stepConwayGrid(grid);
  }

  const solution = [...grid.values()].reduce((acc, alive) => acc + (alive ? 1 : 0), 0);

  assert.equal(solution, 304);
}
