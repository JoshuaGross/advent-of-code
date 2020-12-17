const conwayGridCountActiveNeighbors = require('./conwayGridCountActiveNeighbors');
const getConwayGridValue = require('./getConwayGridValue');

module.exports = function conwayGetNextGridValue (grid, ...params) {
  const activeNeighbors = conwayGridCountActiveNeighbors(grid, ...params);
  const positionValue = getConwayGridValue(grid, ...params);
  return (positionValue && (activeNeighbors === 3 || activeNeighbors === 2)) || (!positionValue && activeNeighbors === 3);
};
