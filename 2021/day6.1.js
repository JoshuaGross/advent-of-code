const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

function lanternfishTick (input) {
  const newSpawn = [];

  const oldSpawn = input.map(fish => {
    if (fish === 0) {
      newSpawn.push(8);
      return 6;
    } else {
      return fish - 1;
    }
  });

  return oldSpawn.concat(newSpawn);
}

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split(',').filter(x => !!x).map(x => parseInt(x, 10));

  console.log('Initial State: ', input.join(','));

  let state = input;

  for (let i = 0; i < 80; i++) {
    state = lanternfishTick(state);
    console.log('After '+(i+1)+' day: ', state.join(','));
  }

  const solution = (function () {
    let res = state.length;
    return res;
  }());

  console.log('Final Answer:', solution);
};
