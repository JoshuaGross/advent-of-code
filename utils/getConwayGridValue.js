module.exports = function getConwayGridValue (grid, ...params) {
  return grid.get(params.join(',')) === true;
};
