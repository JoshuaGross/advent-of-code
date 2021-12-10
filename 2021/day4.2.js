const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

function parseSplitLines (lines) {
  const randomNumbers = lines[0].split(',').filter(x => !!x).map(x => parseInt(x, 10));

  const boards = lines.slice(1).join('\n').split('\n\n').map(board => {
    return board.split(/\s+/).filter(x => !!x).map(x => parseInt(x, 10));
  });

  return { randomNumbers, boards };
}

function boardHasWon (board, numbers) {
  const isNum = (x) => { return numbers.includes(x); };
  const winningIndices = (...positions) => {
    if (positions.length === 0) return false;
    for (const pos of positions) {
      if (!isNum(board[pos])) return false;
    }
    return true;
  };

  return winningIndices(0,1,2,3,4)    || winningIndices(5,6,7,8,9)    || winningIndices(10,11,12,13,14) || winningIndices(15,16,17,18,19) || winningIndices(20,21,22,23,24) ||
         winningIndices(0,5,10,15,20) || winningIndices(1,6,11,16,21) || winningIndices(2,7,12,17,22)   || winningIndices(3,8,13,18,23)   || winningIndices(4,9,14,19,24);
}

function displayBoard (board) {
  for (let i = 0; i < 5; i++) {
    let line = '';
    for (let j = 0; j < 5; j++) {
      line += `${board[i*5 + j]} `;
    }
    console.log(line);
  }
}

module.exports = function runner(inputFile, verbose) {
  const input = parseSplitLines(fs.readFileSync(inputFile, 'utf8').split('\n'));

  console.log(input);

  const lastWinningBoardAndNumber = (function () {
    const hasWon = {};
    let haveWon = 0;
    for (let i = 5; i < input.randomNumbers.length; i++) {
      const numbers = input.randomNumbers.slice(0, i);
      for (let j = 0; j < input.boards.length; j++) {
        if (!hasWon[j] && boardHasWon(input.boards[j], numbers)) {
          hasWon[j] = true;
          haveWon++;
          if (haveWon === input.boards.length) {
            console.log('Params of final winning board:', i, j);
            const winningNumber = input.randomNumbers[i - 1];
            return [input.boards[j], winningNumber, input.boards[j].filter(x => !numbers.includes(x))];
          }
        }
      }
    }

    throw new Error('no winning board');
  }());
  console.log('Winning Board and number:', lastWinningBoardAndNumber[1]);
  displayBoard(lastWinningBoardAndNumber[0]);
  const solution = lastWinningBoardAndNumber[2].reduce((acc, x) => acc + x, 0) * lastWinningBoardAndNumber[1];
  console.log('Final Answer:', solution);
};
