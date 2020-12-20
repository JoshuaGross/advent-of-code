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
  return rotateTimes(matrix, 3)[0];
}

function right (matrix) {
  return rotateTimes(matrix, 1)[0];
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

module.exports = function runner(inputFile, verbose) {
  let input = parseInput(fs.readFileSync(inputFile, 'utf8'));

  // For each index, find if something is a neighbor
  const neighborMap = {};
  for (const [label, matrix] of input) {
    for (const [otherLabel, otherMatrix] of input) {
      if (otherLabel === label) {
        continue;
      }

      // Are any sides equal?
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const rotM = top(rotateTimes(matrix, i));
          const rotFlipM = top(rotateTimes(flip(matrix), i));
          const rotOM = top(rotateTimes(otherMatrix, j));
          const rotFlipOM = top(rotateTimes(flip(otherMatrix), j));
          if (sidesEqual(rotM, rotOM)) {
            neighborMap[label] = neighborMap[label] || [];
            neighborMap[label].push([otherLabel, i, j, 'none', 'none']);
          } else if (sidesEqual(rotM, rotFlipOM)) {
            neighborMap[label] = neighborMap[label] || [];
            neighborMap[label].push([otherLabel, i, j, 'none', 'flip']);
          } else if (sidesEqual(rotFlipM, rotOM)) {
            neighborMap[label] = neighborMap[label] || [];
            neighborMap[label].push([otherLabel, i, j, 'flip', 'none']);
          } else if (sidesEqual(rotFlipM, rotFlipOM)) {
            neighborMap[label] = neighborMap[label] || [];
            neighborMap[label].push([otherLabel, i, j, 'flip', 'flip']);
          }
        }
      }
    }
  }

  // Assemble into image by finding corners first
  const tileKeys = Object.keys(neighborMap);
  const numNeighbors = tuplesToMap(tileKeys.map(k => [k, uniq(neighborMap[k].map(x => x[0])).length]));
  const corners = [...mapIter(numNeighbors)].filter(x => x[1] === 2).map(x => x[0]);

  // Fix a corner and then fill the rest of the grid
  const n = Math.sqrt(tileKeys.length);
  const grid = [newArray(n, 0).map(row => newArray(n, null))];
  grid[0][0] = corners[0];
  const placedElements = [corners[0]]; // todo: flip, rotate, fixed to an adjacent cell
  const work = [corners[0]];

  while (work.length > 0) {
    const item = work.shift();
    const neighbors
  }

  console.log(corners, grid, n, neighborMap[grid[0][0]]);

  const solution = 0;

  assert.equal(solution, 0);
  console.log('Final Answer:', solution);
}
