const fs = require('fs');
const assert = require('assert');
const sum = require('../utils/sum');

function serializePos (x,y) {
  return `${x},${y}`;
}

function getDeliveryGrid(instructions, verbose) {
  const posGrid = {'0,0': 1};
  let curPos = [0, 0];
  for (const instr of instructions) {
    switch (instr) {
      case '<': curPos[0]--; break;
      case '>': curPos[0]++; break;
      case '^': curPos[1]++; break;
      case 'v': curPos[1]--; break;
    }

    const k = serializePos(...curPos);
    posGrid[k] = (posGrid[k] || 0) + 1;
    if (verbose) {
      console.log(instr, k, posGrid[k]);
    }
  }

  return posGrid;
}

module.exports = function runner(inputFile, verbose) {
  const instructions = fs.readFileSync(inputFile, 'utf8').split('').filter(x => !!x);

  const deliveryGrid = getDeliveryGrid(instructions, verbose);

  const solution = Object.keys(deliveryGrid).length;
  assert.equal(solution, 2592);
  console.log('Final Answer:', solution);
}
