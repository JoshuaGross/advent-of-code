const conwayGetNextGridValue = require('./conwayGetNextGridValue');
const getConwayGridKeyRange = require('./getConwayGridKeyRange');

module.exports = function stepConwayGrid (grid, generation) {
  const dim = grid.keys().next().value.split(',').length;
  const nextGrid = new Map();
  for (const ka of getConwayGridKeyRange(dim, grid, 1)) {
    nextGrid.set(ka.join(','), conwayGetNextGridValue(grid, ...ka));
  }
  return nextGrid;
};
