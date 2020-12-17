const range = require('./range');

module.exports = function* getConwayGridKeyRange(dim, grid, extend = 0, i = 0) {
  let minK = Number.MAX_SAFE_INTEGER;
  let maxK = Number.MIN_SAFE_INTEGER;
  for (const k of grid.keys()) {
    const ki = parseInt(k.split(',')[i], 10);
    minK = Math.min(minK, ki);
    maxK = Math.max(maxK, ki);
  }

  for (const ki of range(minK-extend, maxK+extend)) {
    if (i + 1 < dim) {
      for (const ks of getConwayGridKeyRange(dim, grid, extend, i+1)) {
        yield [ki].concat(ks);
      }
    } else {
      yield [ki];
    }
  }
};
