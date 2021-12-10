const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

// take in an array of ages, and transform it into our canonical data structure
function makeLanternFish (input) {
  const output = [...new Array(9)].map(x => 0);
  input.forEach(x => {
    output[x]++;
  });
  return output;
}

function lanternfishTick (input) {
  const output = [...new Array(9)].map(x => 0);

  input.forEach((count, index) => {
    if (index === 0) {
      output[6] += count;
      output[8] += count;
    } else {
      output[index - 1] += count;
    }
  });

  return output;
}

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split(',').filter(x => !!x).map(x => parseInt(x, 10));

  let state = makeLanternFish(input);

  console.log('Initial State: ', state.join(','));

  for (let i = 0; i < 256; i++) {
    state = lanternfishTick(state);
    console.log('After '+(i+1)+' day: ', state.join(','));
  }

  const solution = (function () {
    let res = state.reduce((acc, x) => acc + x, 0);
    return res;
  }());

  console.log('Final Answer:', solution);
};
