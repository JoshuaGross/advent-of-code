const fs = require('fs');
const assert = require('assert');

const ACTIVE = '#';
const INACTIVE = '.';

function parseConwayCubeState (str) {
  return str.split('\n').filter(x => !!x).map(line => line.split('').map(ch => ch === ACTIVE));
}

function getCubeValue (cube, z, y, x) {
  if (!cube[z]) {
    return false;
  }
  if (y < 0 || x < 0) {
    return false;
  }
  if (!cube[z][y]) {
    return false;
  }
  if (x >= cube[z][y].length) {
    return false;
  }
  return cube[z][y][x] === true;
}

function countActiveNeighbors (cube, z, y, x) {
  let count = 0;
  for (const dz of range(-1, 1)) {
    for (const dy of range(-1, 1)) {
      for (const dx of range(-1, 1)) {
        if (dz === 0 && dy === 0 && dx === 0) {
          continue;
        }
        count += (getCubeValue(cube, z+dz, y+dy, x+dx)) ? 1 : 0;
      }
    }
  }
  return count;
}

function getNextCubeValue (cube, z, y, x) {
  const activeNeighbors = countActiveNeighbors(cube, z, y, x);
  const cubeValue = getCubeValue(cube, z, y, x);
  return (cubeValue && (activeNeighbors === 3 || activeNeighbors === 2)) || (!cubeValue && activeNeighbors === 3);
}

// { [z]: [row-y, ...[col-x]}
function parseInput (str) {
  return { 0: parseConwayCubeState(str) };
}

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function cycle (cube) {
  const zs = Object.keys(cube).map(k => parseInt(k, 10));
  const minZ = Math.min(...zs) - 1;
  const maxZ = Math.max(...zs) + 1;

  const maxY = cube[Object.keys(cube)[0]].length;
  const maxX = cube[Object.keys(cube)[0]][0].length;

  const cubeRes = {};

  for (const z of range(minZ, maxZ)) {
    const rows = [];
    for (const y of range(-1, maxY)) {
      const col = [];
      for (const x of range(-1, maxX)) {
        col.push(getNextCubeValue(cube, z, y, x));
      }
      rows.push(col);
    }
    cubeRes[z] = rows;
  }

  return cubeRes;
}

function printCube (cube) {
  const zs = Object.keys(cube).map(k => parseInt(k, 10));
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);

  let str = '';
  for (const z of range(minZ, maxZ)) {
    str += `z=${z}:\n`;
    for (const row of cube[z]) {
      str += row.map(val => val ? ACTIVE : INACTIVE).join('') + '\n';
    }
    str += '\n';
  }

  return str;
}

function cycleTimes(cube, times) {
  for (let i = 0; i < times; i++) {
    cube = cycle(cube);
    console.log(printCube(cube));
  }
  return cube;
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const solution = cycleTimes(input, 6);
  // console.log(printCube(solution));
  console.log(Object.keys(solution).reduce((sum, k) => {
    return solution[k].reduce((sum2, row) => row.reduce((sum3, num) => sum3+num, sum2), sum);
  }, 0));

  // assert.equal(solution, 0);
  // console.log('Final Answer:', solution);
}
