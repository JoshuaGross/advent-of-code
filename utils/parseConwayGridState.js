const range = require('./range');

const ACTIVE = '#';
const INACTIVE = '.';

module.exports = function parseConwayGridState (str, dim=2) {
  const grid = new Map();
  const additionalDimensions = new Array(Math.max(0, dim-2)).fill(0);
  const lines = str.split('\n').filter(x => !!x);
  lines.forEach((line, y) => {
    line.split('').forEach((ch, x) => {
      const key = `${x},${y}` + (dim > 2 ? ',' : '') + additionalDimensions.join(',');
      grid.set(key, (ch === ACTIVE));
    })
  });
  return grid;
};
