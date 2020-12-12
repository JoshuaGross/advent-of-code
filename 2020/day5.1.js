const fs = require('fs');

function lineToRowCol (line, verbose) {
  const chars = line.split('');

  let rowMax = 127, rowMin = 0;
  let colMax = 7, colMin = 0;

  for (const char of chars) {
    const rowDelta = rowMax - rowMin;
    const colDelta = colMax - colMin;
    if (verbose) {
      console.log('1:', char, rowMin, rowMax, colMin, colMax);
    }
    if (char === 'F') {
      rowMax = Math.floor(rowMin + rowDelta / 2);
    } else if (char === 'B') {
      rowMin = Math.ceil(rowMin + rowDelta / 2);
    } else if (char === 'L') {
      colMax = Math.floor(colMin + colDelta / 2);
    } else if (char === 'R') {
      colMin = Math.ceil(colMin + colDelta / 2);
    }
    if (verbose) {
      console.log('2:', char, rowMin, rowMax, colMin, colMax);
    }
  }

  if (rowMin !== rowMax) {
    throw new Error(`Invalid rows: ${rowMin} ${rowMax} ${line}`);
  }
  if (colMin !== colMax) {
    throw new Error(`Invalid cols: ${colMin} ${colMax} ${line}`);
  }

  return [rowMin, colMin, rowMin*8 + colMin];
}

function linesToRowCol (lines, verbose) {
  return lines.map(line => lineToRowCol(line, verbose));
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  const mappedRowColSeatId = linesToRowCol(inputLines, verbose);

  let maxSeatId = -1;
  for (const [row, col, seatId] of mappedRowColSeatId) {
    maxSeatId = Math.max(maxSeatId, seatId);
  }

  console.log('Final Answer:', maxSeatId);
};
