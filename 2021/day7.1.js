const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

const distanceFunction = function (input, newPosition) {
  return input.reduce((sum, x) => sum + Math.abs(x - newPosition), 0);
};

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split(',').filter(x => !!x).map(x => parseInt(x, 10));

  const solution = (function () {
    let horizontalCrabPositions = input;

    console.log('Initial State: ', horizontalCrabPositions.join(','));

    let minCost = Infinity;
    let position = -1;

    for (let i = Math.min(...horizontalCrabPositions); i < Math.max(...horizontalCrabPositions)+1; i++) {
      const cost = distanceFunction(horizontalCrabPositions, i);
      console.log(i, cost);
      if (cost < minCost) {
        minCost = cost;
        position = i;
      }
    }

    return minCost;
  }());

  console.log('Final Answer:', solution);
};
