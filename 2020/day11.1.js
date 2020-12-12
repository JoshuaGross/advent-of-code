const fs = require('fs');
const chalk = require('chalk');

const FLOOR = 0;
const SEAT = 1;

const isOccupied = (occupied, x, y) => {
  if (x < 0 || x > occupied.length || !occupied[x]) {
    return false;
  }
  if (y < 0 || y > occupied[0].length) {
    return false;
  }
  return occupied[x][y];
}

const numAdjacentOccupied = (occupied, x, y) => {
  return [
    isOccupied(occupied, x - 1, y - 1) && 1 || 0,
    isOccupied(occupied, x - 0, y - 1) && 1 || 0,
    isOccupied(occupied, x + 1, y - 1) && 1 || 0,
    isOccupied(occupied, x - 1, y + 1) && 1 || 0,
    isOccupied(occupied, x - 0, y + 1) && 1 || 0,
    isOccupied(occupied, x + 1, y + 1) && 1 || 0,
    isOccupied(occupied, x - 1, y + 0) && 1 || 0,
    isOccupied(occupied, x + 1, y + 0) && 1 || 0,
  ].reduce((acc, x) => acc+x, 0);
};

const applyRules = (inputLines, prev) => {
  let changed = false;

  //console.log(prev);
  const newOccupiedMatrix = prev.map(col => col.map(_ => false));

  for (let x = 0; x < inputLines.length; x++) {
    for (let y = 0; y < inputLines[0].length; y++) {
      if (!prev[x][y] && inputLines[x][y] === SEAT) {
        newOccupiedMatrix[x][y] = numAdjacentOccupied(prev, x, y) === 0;
      } else if (prev[x][y]) {
        newOccupiedMatrix[x][y] = !(numAdjacentOccupied(prev, x, y) >= 4);
      }
      changed = changed || newOccupiedMatrix[x][y] != prev[x][y];
    }
  }

  return [changed, newOccupiedMatrix];
}

const printOccupiedMatrix = (inputLines, matrix) => {
  let str = '';
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[0].length; y++) {
      str += (inputLines[x][y] === FLOOR ? chalk.blue('.') : (matrix[x][y] ? chalk.red('#') : chalk.green('L')));
    }
    str += '\n';
  }
  console.log(str);
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => x.split('').map(char => char === 'L' ? SEAT : FLOOR));
  const initialOccupiedNone = inputLines.map(x => x.map(y => false));

  let numOccupied = 0;
  for (let occupied = initialOccupiedNone, changed = true, round = 0; changed; [changed, occupied] = applyRules(inputLines, occupied), round++) {
    numOccupied = occupied.reduce((acc, row) => acc+row.reduce((acc2, col) => acc2+col), 0);
    if (verbose) {
      console.log(round, numOccupied);
      printOccupiedMatrix(inputLines, occupied);
    }
  }

  console.log('Final Answer:', numOccupied);
}
