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

function everyN(ary, n, select) {
  let res = [];
  for (let i = 0; i < ary.length; i+= n) {
    res.push(ary[i+select]);
  }
  return res;
}

function optimizedDeliveryGrid (instructions, verbose) {
  const instructions1 = everyN(instructions, 2, 0);
  const instructions2 = everyN(instructions, 2, 1);

  const grid1 = getDeliveryGrid(instructions1);
  const grid2 = getDeliveryGrid(instructions2);

  const mergedGrid = {};
  for (const k of Object.keys(grid1)) {
    mergedGrid[k] = grid1[k] + (grid2[k] || 0);
  }
  for (const k of Object.keys(grid2)) {
    mergedGrid[k] = grid2[k] + (grid1[k] || 0);
  }

  return mergedGrid;
}

module.exports = function runner(inputFile, verbose) {
  const instructions = fs.readFileSync(inputFile, 'utf8').split('').filter(x => !!x);

  assert.equal(Object.keys(optimizedDeliveryGrid('^v')).length, 3);
  assert.equal(Object.keys(optimizedDeliveryGrid('^>v<')).length, 3);
  assert.equal(Object.keys(optimizedDeliveryGrid('^v^v^v^v^v')).length, 11);

  const optimizedGrid = optimizedDeliveryGrid(instructions, verbose);

  const solution = Object.keys(optimizedGrid).length;
  assert.equal(solution, 2360);
  console.log('Final Answer:', solution);
}
