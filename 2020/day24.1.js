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

const coordFromCenter = (instrs) => {
  let x = 0, y = 0, z = 0;
  for (const instr of instrs) {
    switch (instr) {
      case 'e':  x+=1, y-=1, z+=0; break;
      case 'w':  x-=1, y+=1, z+=0; break;
      case 'se': x+=0, y-=1, z+=1; break;
      case 'sw': x-=1, y+=0, z+=1; break;
      case 'ne': x+=1, y+=0, z-=1; break;
      case 'nw': x+=0, y+=1, z-=1; break;
    }
  }
  return [x,y,z];
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const grid = new Map();

  for (const line of input) {
    const coord = coordFromCenter(line);
    const key = coordToKey(...coord);
    if (grid.has(key)) {
      grid.set(key, !grid.get(key));
    } else {
      grid.set(key, true); // black = true, white = false
    }
  }

  let solution = 0;
  for (const val of grid.values()) {
    solution += (val ? 1 : 0);
  }

  assert.equal(solution, 307);
  console.log('Final Answer:', solution);
}

