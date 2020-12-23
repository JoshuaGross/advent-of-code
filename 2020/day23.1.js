const fs = require('fs');
const assert = require('assert');
const { product } = require('../utils');

function move (curr, input) {
  const orig = [...input];
  //console.log(curr, input);
  const index = input.indexOf(curr);
  let spliced = input.splice(index+1, 3);
  while (spliced.length < 3) {
    spliced.push(input.shift());
  }
  let pivot = curr - 1;
  while (input.indexOf(pivot) === -1) {
    pivot--;
    if (pivot < 0 || isNaN(pivot)) {
      pivot = Math.max(...input);
    }
    //console.log(pivot, input);
  }
  const destination = input.indexOf(pivot) + 1; 
  console.log(orig, spliced, 'curr', curr, 'dest', pivot, destination);
  input = [...(input.slice(0, destination)), ...spliced, ...input.slice(destination)];
  let next = input.indexOf(curr)+1;
  next = next >= input.length ? 0 : next;
  return [input[next], input]
}


module.exports = function runner(inputFile, verbose) {
  let input = '459672813'.split('').map(x => parseInt(x, 10));
  //let input = '389125467'.split('').map(x => parseInt(x, 10));
  let curr = input[0];

  for (let i = 0; i < 100; i++) {
    console.log(i+1);
    [curr, input] = move(curr, input);
  }

  const solution = input.splice(input.indexOf(1) + 1).join('') + input.slice(0, -1).join('');

  assert.equal(solution, '92658374');
  console.log('Final Answer:', solution);
}
