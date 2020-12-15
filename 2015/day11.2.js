const fs = require('fs');
const assert = require('assert');

function incrementPassword (p, idx=7) {
  assert.equal(p.length, 8);

  let a = 'a'.charCodeAt(0);
  let z = 'z'.charCodeAt(0);
  let charCode = p.charCodeAt(idx);
  let newP = p.split('');
  newP.splice(idx, 1, String.fromCharCode(charCode === z ? a : charCode + 1))
  newP = newP.join('');
  if (charCode === z) {
    return incrementPassword(newP, idx - 1);
  }
  return newP;
}

function hasStraightSequence (p) {
  for (let i = 0; i < p.length - 2; i++) {
    let ch = p.charCodeAt(i);
    if (p.charCodeAt(i + 1) === ch + 1 && p.charCodeAt(i + 2) === ch + 2) {
      return true;
    }
  }

  return false;
}

function passwordOkay (p) {
  return hasStraightSequence(p) && p.indexOf('i') === -1 && p.indexOf('l') === -1 && p.indexOf('o') === -1 && !!p.match(/([a-z])\1.*((?!\1)[a-z])\2/);
}

function nextPassword (pass) {
  do {
//    console.log(pass);
    pass = incrementPassword(pass);
  } while (!passwordOkay(pass));
  return pass;
}

module.exports = function runner(inputFile, verbose) {
  const solution = nextPassword('hxbxxyzz');
  assert.equal(solution, 'hxcaabcc');
  console.log('Final Answer:', solution);
}
