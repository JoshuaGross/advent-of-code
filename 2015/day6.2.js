const fs = require('fs');
const assert = require('assert');
const sum = require('../utils/sum');

function computeLightGrid (instructions) {
  let grid = [];
  for (let i = 0; i < 1000; i++) {
    grid[i] = new Array(1000).fill(0);
  }

  for (const instruction of instructions) {
    const [mode, firstCoord, secondCoord] = instruction;

    for (let x = firstCoord[0]; x <= secondCoord[0]; x++) {
      for (let y = firstCoord[1]; y <= secondCoord[1]; y++) {
        if (mode === 'on') {
          grid[x][y] += 1;
        } else if (mode === 'off') {
          grid[x][y] = Math.max(grid[x][y] - 1, 0);
        } else if (mode === 'toggle') {
          grid[x][y] += 2;
        }
      }
    }
  }

  return grid;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(function (line) {
    const tokens = line.split(' ');
    const mode = (function () {
      const first = tokens.shift();
      return first === 'turn' ? tokens.shift() : first;
    }());
    const firstCoord = tokens.shift().split(',').map(x => parseInt(x, 10));
    assert.equal(tokens.shift(), 'through');
    const secondCoord = tokens.shift().split(',').map(x => parseInt(x, 10));
    return [mode, firstCoord, secondCoord];
  });

  const grid = computeLightGrid(inputLines);
  console.log(grid);
  const lights = grid.map(row => sum(row));
  console.log(lights);
  const brightness = sum(lights);

  const solution = brightness;
  assert.equal(solution, 17836115);
  console.log('Final Answer:', solution);
}
