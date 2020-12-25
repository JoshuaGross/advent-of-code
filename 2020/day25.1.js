const fs = require('fs');
const assert = require('assert');

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(x => parseInt(x, 10));
}

function transform (subject, loopSize = 1, value = 1) {
  for (let i = 0; i < loopSize; i++) {
    value = (value * subject) % 20201227;
  }
  return value;
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const [doorPublicKey, cardPublicKey] = input;
  const cardLoopSize = 7177897;
  const doorLoopSize = 7779516;
  console.log(doorPublicKey, cardPublicKey);

  assert.equal(transform(7, cardLoopSize), cardPublicKey);
  assert.equal(transform(7, doorLoopSize), doorPublicKey);

  assert.equal(transform(cardPublicKey, doorLoopSize), transform(doorPublicKey, cardLoopSize));
  console.log(transform(cardPublicKey, doorLoopSize));

  // Find card loop size
/*  let num = 1;
  for (let i = 0; i < 10000000000; i++) {
    num = transform(7, 1, num);
    if (i % 1000 === 0) console.log(i, num);
    if (num === cardPublicKey) {
      throw new Error(`7, ${i}`);
    }
  }*/

    // Find door loop size
/*  let num = 1;
  for (let i = 0; i < 10000000000; i++) {
    num = transform(7, 1, num);
    if (i % 1000 === 0) console.log(i, num);
    if (num === doorPublicKey) {
      throw new Error(`7, ${i}`);
    }
  }*/


/*  const doorPublicKey = 17807724;
  const doorSubjectNumber = 7;
  const cardSubjectNumber = 7;
  //assert.equal();
  const cardLoopSize = 8;
  const doorEncryptionKey = 14897079;
  const cardPublicKey = 5764801;
  const doorLoopSize = 11;*/

  const solution = 0;

  assert.equal(solution, 0);
  console.log('Final Answer:', solution);
}
