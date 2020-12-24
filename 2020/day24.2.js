const fs = require('fs');
const assert = require('assert');

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(line => {
    let instructions = [];
    while (line) {
      const instr = line.match(/^(e|se|sw|w|nw|ne)/);
      instructions.push(instr[1]);
      line = line.replace(/^(e|se|sw|w|nw|ne)/, '');
    }
    return instructions;
  });
}

const coordToKey = (x,y,z) => {
  return `${x},${y},${z}`;
}

const coordFromCenter = (instrs, x = 0, y = 0, z = 0) => {
  for (const instr of instrs) {
    switch (instr) {
      case 'e':  x+=1; y-=1; z+=0; break;
      case 'w':  x-=1; y+=1; z+=0; break;
      case 'se': x+=0; y-=1; z+=1; break;
      case 'sw': x-=1; y+=0; z+=1; break;
      case 'ne': x+=1; y+=0; z-=1; break;
      case 'nw': x+=0; y+=1; z-=1; break;
    }
  }
  return [x,y,z];
}

function getNeighborKeys (x,y,z) {
  return ['e', 'w', 'ne', 'nw', 'se', 'sw'].map(dir => coordToKey(...coordFromCenter([dir], x, y, z)));
}

function gridValue (grid, key) {
  return grid.has(key) ? grid.get(key) : false;
}

function moveGrid (grid) {
  const newGrid = new Map();

  for (const key of grid.keys()) {
    const [x,y,z] = key.split(',').map(x => parseInt(x, 10));
    const neighborKeys = getNeighborKeys(x,y,z);
    const neighborsAlive = neighborKeys.map(key => gridValue(grid, key));
    const numAliveNeighbors = neighborsAlive.filter(x => !!x).length;

    const currVal = gridValue(grid, key);
    const newVal = (currVal && (numAliveNeighbors === 1 || numAliveNeighbors === 2)) || (!currVal && numAliveNeighbors === 2);
    //console.log(key, currVal, neighborKeys, numAliveNeighbors, newVal);
    newGrid.set(key, newVal);

    for (const neighborKey of neighborKeys) {
      const neighborKeys2 = getNeighborKeys(...(neighborKey.split(',').map(x => parseInt(x, 10))));
      //console.log('neighborKeys2', neighborKey, (neighborKey.split(',').map(x => parseInt(x, 10))));
      const neighborsAlive2 = neighborKeys2.map(key => gridValue(grid, key));
      const numAliveNeighbors2 = neighborsAlive2.filter(x => !!x).length;

      const neighborVal = gridValue(grid, neighborKey);
      const newNeighborVal = (neighborVal && (numAliveNeighbors2 === 1 || numAliveNeighbors2 === 2)) || (!neighborVal && numAliveNeighbors2 === 2);
      //console.log(neighborKey, neighborVal, neighborKeys2, numAliveNeighbors2, newNeighborVal);
      newGrid.set(neighborKey, newNeighborVal);
    }
  }

  return newGrid;
}

function countValues (grid) {
  let solution = 0;
  for (const val of grid.values()) {
    solution += (val ? 1 : 0);
  }
  return solution;
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  let grid = new Map();

  for (const line of input) {
    const coord = coordFromCenter(line);
    const key = coordToKey(...coord);
    if (grid.has(key)) {
      grid.set(key, !grid.get(key));
    } else {
      grid.set(key, true); // black = true, white = false
    }
  }

  // Grid is now what floor looks like on day 1
  // Now play game of life with grid
  for (let i = 0; i < 100; i++) {
    console.log(i, countValues(grid));
    const newGrid = moveGrid(grid);
    grid = newGrid;
  }
  const solution = countValues(grid);

  assert.equal(solution, 3787);
  console.log('Final Answer:', solution);
}


