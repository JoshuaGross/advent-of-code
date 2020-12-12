const fs = require('fs');

function lineToRowCol (line) {
  const chars = line.split('');

  let rowMax = 127, rowMin = 0;
  let colMax = 7, colMin = 0;

  for (const char of chars) {
    const rowDelta = rowMax - rowMin;
    const colDelta = colMax - colMin;
    if (char === 'F') {
      rowMax = Math.floor(rowMin + rowDelta / 2);
    } else if (char === 'B') {
      rowMin = Math.ceil(rowMin + rowDelta / 2);
    } else if (char === 'L') {
      colMax = Math.floor(colMin + colDelta / 2);
    } else if (char === 'R') {
      colMin = Math.ceil(colMin + colDelta / 2);
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

function linesToRowCol (lines) {
  return lines.map(lineToRowCol);
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  const mappedRowColSeatId = linesToRowCol(inputLines);

  // Make a map of seat ids that exist
  const seatIdMap = {};
  for (const [row, col, seatId] of mappedRowColSeatId) {
    seatIdMap[seatId] = true;
  }

  // Loop through all possible row/cols and see which ones are missing
  for (let row = 0; row < 128; row++) {
    for (let col = 0; col < 8; col++) {
      let seatId = row*8 + col;
      if (!seatIdMap[seatId] && row > 10 && row < 110) {
        console.log('Missing Seat:', row, col, seatId);
      }
    }
  }
};
