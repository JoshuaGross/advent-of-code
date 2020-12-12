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

function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

function manhattanDistance (input) {
  let waypointE = 10, waypointN = 1, currFacing = 'E';
  let w = 0, n = 0;

  for (let [dir, mag] of input) {
    if (dir === 'F') {
      w -= waypointE * mag;
      n += waypointN * mag;
    } else if (dir === 'N') {
      waypointN += mag;
    } else if (dir === 'S') {
      waypointN -= mag;
    } else if (dir === 'W') {
      waypointE -= mag;
    } else if (dir === 'E') {
      waypointE += mag;
    } else if (dir === 'R') {
      let tmpE = waypointE;
      let tmpN = waypointN;
      if (mag === 90) {
        waypointN = -tmpE;
        waypointE = tmpN;
      } else if (mag === 180) {
        waypointN = -tmpN;
        waypointE = -tmpE;
      } else if (mag === 270) {
        waypointN = tmpE;
        waypointE = -tmpN;
      }
    } else if (dir === 'L') {
      let tmpE = waypointE;
      let tmpN = waypointN;
      if (mag === 90) {
        waypointN = tmpE;
        waypointE = -tmpN;
      } else if (mag === 180) {
        waypointN = -tmpN;
        waypointE = -tmpE;
      } else if (mag === 270) {
        waypointN = -tmpE;
        waypointE = tmpN;
      }
    }
  }

  return Math.abs(w) + Math.abs(n);
}

module.exports = function runner(inputFile) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => [x[0], parseInt(x.slice(1), 10)]);
  console.log(manhattanDistance(inputLines));
}
