const fs = require('fs');
const assert = require('assert');
const { product } = require('../utils');

class Node {
  constructor (v) {
    this.value = v;
    this.next = null;
  }
}

module.exports = function runner(inputFile, verbose) {
  let nodes = '459672813'.split('').map(x => parseInt(x, 10)).map(n => new Node(n));
  const lookup = {};
  const max = 1000000;
  for (let n = 10; n <= max; n++) {
    nodes.push(new Node(n));
  }
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].next = nodes[i+1] || nodes[0];
    lookup[nodes[i].value] = nodes[i];
  }
  let curr = nodes[0];

  // move
  for (let i = 0; i < 10000000; i++) {
    if (i % 1000 === 0 || i < 10) console.log(i+1, curr.value);

    const pickup = curr.next;
    curr.next = curr.next.next.next.next; // skip 3

    let value = curr.value - 1;
    while (value === curr.value || value === pickup.value || value == pickup.next.value || value === pickup.next.next.value || value <= 0) {
      value--;
      if (value <= 0) {
        value = max;
      }
    }

    const destination = lookup[value];
    if (!destination) {
      console.log(value);
    }
    pickup.next.next.next = destination.next;
    destination.next = pickup;
    curr = curr.next;
  }

  const solution = [lookup[1].next.value, lookup[1].next.next.value];
  const solutionProd = solution[0] * solution[1];
  console.log(solutionProd);

  assert.equal(solution[0], 901620);
  assert.equal(solution[1], 243600);
  assert.equal(solutionProd, 219634632000);
  console.log('Final Answer:', solutionProd);
}
