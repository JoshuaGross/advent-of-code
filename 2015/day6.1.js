const fs = require('fs');
const assert = require('assert');

function serializeCoordinates (x, y) {
  return `${x},${y}`;
}

function computeLightGrid (instructions) {
  let grid = {};
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      grid[serializeCoordinates(i,j)] = false;
    }
  }

  for (const instruction of instructions) {
    const [mode, firstCoord, secondCoord] = instruction;

    for (let x = firstCoord[0]; x <= secondCoord[0]; x++) {
      for (let y = firstCoord[1]; y <= secondCoord[1]; y++) {
        const k = serializeCoordinates(x, y);
        grid[k] = (mode === 'on' ? true : (mode === 'off' ? false : !grid[k]));
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
  const numLightsOn = Object.keys(grid).filter(k => grid[k]);

  const solution = numLightsOn.length;
  assert.equal(solution, 569999);
  console.log('Final Answer:', solution);
}
