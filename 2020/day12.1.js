const fs = require('fs');

function turn (curr, dir) {
  if (dir === 'R') {
    switch (curr) {
      case 'E': return 'S';
      case 'W': return 'N';
      case 'N': return 'E';
      case 'S': return 'W';
    }
  }

  switch (curr) {
    case 'E': return 'N';
    case 'W': return 'S';
    case 'N': return 'W';
    case 'S': return 'E';
  }
}

function manhattanDistance (input) {
  let w = 0, n = 0, currFacing = 'E';

  for (let [dir, mag] of input) {
    if (dir === 'F') {
      dir = currFacing;
    }
    if (dir === 'N') {
      n += mag;
    } else if (dir === 'S') {
      n -= mag;
    } else if (dir === 'W') {
      w += mag;
    } else if (dir === 'E') {
      w -= mag;
    } else if (dir === 'R' || dir === 'L') {
      for (let i = 0; i < mag / 90; i++) {
        currFacing = turn(currFacing, dir);
      }
    }
  }

  return Math.abs(w) + Math.abs(n);
}

module.exports = function runner(inputFile) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => [x[0], parseInt(x.slice(1), 10)]);
  console.log(manhattanDistance(inputLines));
}
