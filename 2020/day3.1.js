const fs = require('fs');

function getCharAtIndex(inputLines, lineNo, index) {
  const line = inputLines[lineNo];
  while (index >= line.length) {
    index -= line.length;
  }
  return line[index];
}

function countTrees (inputLines, xDelta, yDelta) {
  let trees = 0;

  for (let x = 0, y = 0; y < inputLines.length; x += xDelta, y += yDelta) {
    const char = getCharAtIndex(inputLines, y, x);
    trees += (char === '#' ? 1 : 0);
  }

  return trees;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  const countTreesI = countTrees.bind(null, inputLines);

  const trees1 = countTreesI(1, 1);
  const trees2 = countTreesI(3, 1);
  const trees3 = countTreesI(5, 1);
  const trees4 = countTreesI(7, 1);
  const trees5 = countTreesI(1, 2);
  console.log('Final Answer:', trees1 * trees2 * trees3 * trees4 * trees5);
};

