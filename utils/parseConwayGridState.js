const range = require('./range');
const ConwayGrid = require('./ConwayGrid');

const ACTIVE = '#';
const INACTIVE = '.';

module.exports = function parseConwayGridState (str, dim=2) {
  const grid = new ConwayGrid(dim);
  const additionalDimensions = new Array(Math.max(0, dim-2)).fill(0);
  const lines = str.split('\n').filter(x => !!x);
  grid.depthMin.set(0, 0); // x
  grid.depthMin.set(1, 0); // y
  additionalDimensions.forEach((_, di) => {
    grid.depthMin.set(2 + di, 0);
    grid.depthMax.set(2 + di, 0);
  });
  lines.forEach((line, y) => {
    line.split('').forEach((ch, x) => {
      const key = [x, y].concat(additionalDimensions);
      grid.depthMax.set(0, x);
      grid.depthMax.set(1, y);
      grid.set(key, ch === ACTIVE);
    })
  });
  return grid;
};
