const fs = require('fs');
const assert = require('assert');
const { product } = require('../utils');

const rotate = function(matrix) {
  // reverse the rows
  matrix = JSON.parse(JSON.stringify(matrix));
  matrix = matrix.reverse();

  // swap the symmetric elements
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < i; j++) {
      var temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  return matrix;
};

function flip (matrix) {
  matrix = JSON.parse(JSON.stringify(matrix));
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      const tmp = matrix[i][j];
      matrix[i][j] = matrix[i][n - 1 - j];
      matrix[i][n - 1 - j] = tmp;
    }
  }
  return matrix;
}

function rotateTimes(matrix, n) {
  matrix = JSON.parse(JSON.stringify(matrix));
  for (let i = 0; i < n; i++) {
    matrix = rotate(matrix);
  }
  return matrix;
}

function parseSection (str) {
  const [tileLabel, ...lines] = str.split('\n').filter(x => !!x);
  return [parseInt(tileLabel.replace('Tile ', '').replace(':', ''), 10), lines.map(line => line.split('').filter(x => !!x))];
}

function parseInput (str) {
  return str.split('\n\n').filter(x => !!x).map(parseSection);
}

function top (matrix) {
  return rotateTimes(matrix, 0)[0];
}

function bottom (matrix) {
  return rotateTimes(matrix, 2)[0];
}

function left (matrix) {
  return rotateTimes(matrix, 1)[0];
}

function right (matrix) {
  return rotateTimes(matrix, 3)[0];
}

function sidesEqual (side1, side2) {
  for (let i = 0; i < side1.length; i++) {
    if (side1[i] !== side2[i]) {
      return false;
    }
  }
  return true;
}

function uniq (a) {
  return [...new Set(a)];
}

function tuplesToMap (t) {
  return t.reduce((obj, [k, v]) => {
    obj[k] = v;
    return obj;
  }, {});
}

function* mapIter (m) {
  const ks = Object.keys(m);
  for (const k of ks) {
    yield [k, m[k]];
  }
}

function newArray (len, x) {
  return [...new Array(len)].fill(x);
}

function nonIntersecting (a, exclude) {
  return a.filter(x => exclude.indexOf(x) === -1);
}

function flipIf (x, b) {
  return b ? flip(x) : x;
}

function zip (a, b) {
  let res = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] && b[i]) {
      res.push(a[i].concat(b[i]));
    } else if (a[i]) {
      res.push(a[i]);
    } else if (b[i]) {
      res.push(b[i]);
    }
  }
  return res;
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const inputMap = tuplesToMap(input);

  // For each index, find if something is a neighbor
  // This is assembled in part 1
  const neighborMap = JSON.parse(fs.readFileSync('./2020/day20.neighborMap.txt'));

  // Assemble into image by finding corners first
  const tileKeys = Object.keys(neighborMap);
  const numNeighbors = tuplesToMap(tileKeys.map(k => [k, uniq(neighborMap[k].map(x => x[0])).length]));
  const corners = [...mapIter(numNeighbors)].filter(x => x[1] === 2).map(x => x[0]);

  // Fix a corner and then fill the rest of the grid
  const n = Math.sqrt(tileKeys.length);
  const grid = [...newArray(n, 0).map(row => newArray(n, null))];
  console.log(corners[0], neighborMap[corners[0]]);
  grid[0][0] = [corners[0], 2, 'none']; // assume 2 rotation, no flip
  const placedElements = [corners[0]];
  const work = [[corners[0], 2, 'none', 0, 0]];
  tileKeys.splice(tileKeys.indexOf(corners[0]), 1);

  // Fill each spot in the grid
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) {
        continue;
      }
      const leftNeighbor = grid[i][j - 1] || null;
      const topNeighbor  = (grid[i - 1] || {})[j] || null;
      let match;
      for (const tileKey of tileKeys) {
        const neighborLeft = leftNeighbor && right(rotateTimes(flipIf(inputMap[leftNeighbor[0]], leftNeighbor[2]), leftNeighbor[1]));
        const neighborUp = topNeighbor && right(rotateTimes(flipIf(inputMap[topNeighbor[0]], topNeighbor[2]), topNeighbor[1]));
        for (const flip of [true, false]) {
          for (const rotate of [0, 1, 2, 3]) {
            const tile = rotateTimes(flipIf(inputMap[tileKey], flip), rotate);
            const leftSideEqual = (neighborLeft && sidesEqual(right(neighborLeft), left(tile))) || !neighborLeft;
            const topSideEqual = (neighborUp && sidesEqual(bottom(neighborUp), top(tile))) || !neighborUp;
            if (leftSideEqual && topSideEqual) {
              grid[i][j] = [tileKey, rotate, flip];
              tileKeys.splice(tileKeys.indexOf(tileKey), 1);
              match = tileKey;
            }
            if (match) break;
          }
          if (match) break;
        }
        if (match) break;
      }
      //console.log(i, j, match, grid[i][j]);
    }
  }

  let txtGrid = '';

  // Build grid, stripping off borders
  for (let i = 0; i < n; i++) {
    let gridLine = []
    for (let j = 0; j < n; j++) {
      const [tileKey, rotate, flip] = grid[i][j];
      const segment = rotateTimes(flipIf(inputMap[tileKey], flip), rotate);
      const borderless = segment.slice(1, -1).map(line => line.slice(1, -1));
      gridLine = zip(gridLine, borderless);
      //console.log(i,j,gridLine);
    }
    txtGrid += gridLine.map(line => line.join('')).join('\n') + '\n';
  }
  txtGrid = txtGrid.split('\n').filter(x => !!x);

  // Count sea monsters
  let numPoundSymbols = txtGrid.join('').split('').filter(ch => ch === '#').length;
  const pattern = ('                  # \n' +
                   '#    ##    ##    ###\n' +
                   ' #  #  #  #  #  #   ').split('\n').map(line => line.split(''));

  // this seems close, but isn't actually working yet
  let maxMonsters = 0;
  for (const flip of [true, false]) {
    for (const rotate of [0, 1, 2, 3]) {
      const mutatedGrid = rotateTimes(flipIf(txtGrid.map(line => line.split('')), flip), rotate);
      let gridMonsters = 0;
      for (let row = 0; row < mutatedGrid.length - pattern.length; row++) {
        for (let col = 0; col < mutatedGrid[0].length - pattern[0].length; col++) {
          let foundMonster = true;
          for (let i = 0; i < pattern.length && foundMonster; i++) {
            for (let j = 0; j < pattern[i].length && foundMonster; j++) {
              foundMonster = foundMonster && (pattern[i][j] !== '#' || pattern[i][j] === mutatedGrid[row+i][col+j]);
              if (!foundMonster) {
                console.log(flip, rotate, row, col, i, j, pattern[i][j], mutatedGrid[row+i][col+j]);
              }
            }
          }
          if (foundMonster) gridMonsters++;
        }
      }
      maxMonsters = Math.max(maxMonsters, gridMonsters);
    }
  }

  console.log(txtGrid, numPoundSymbols, maxMonsters);

  const solution = 0;

  assert.equal(solution, 2118);
  console.log('Final Answer:', solution);
}
