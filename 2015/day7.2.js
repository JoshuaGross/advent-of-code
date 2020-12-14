const fs = require('fs');
const assert = require('assert');

function buildCircuit (instructions, verbose) {
  const registers = {};

  for (const [operation, destination] of instructions) {
    registers[destination] = operation;
  }

  return registers;
}

function runCircuit (circuit, register, verbose) {
  if (typeof register === 'number') {
    return register;
  }
  if (!isNaN(parseInt(register, 10))) {
    return parseInt(register, 10);
  }

  const operation = circuit[register];

  const value = (function () {
    console.log('Running operation: ', operation);

    if (typeof operation === 'number') {
      return operation;
    }
    if (operation.length === 1) {
      if (verbose) {
        console.log('lhs value', operation[0], parseValue(operation[0]));
      }

      return runCircuit(circuit, operation[0], verbose);
    } else if (operation.length === 2) {
      const val = runCircuit(circuit, operation[1], verbose);
      assert.equal(operation[0], 'NOT');
      return ~val;
    } else if (operation.length === 3) {
      const val1 = runCircuit(circuit, operation[0], verbose);
      const val2 = runCircuit(circuit, operation[2], verbose);
      const op = operation[1];
      return (op === 'AND' ? val1 & val2 : (
        op === 'OR' ? val1 | val2 :
        (op === 'LSHIFT' ? val1 << val2 :
          (op === 'RSHIFT' ? val1 >> val2 : (function () { throw new Error('unknown operation: ' + op); }())))
      ));
    }
    throw new Error('Unknown operation: ' + operation);
  }());

  circuit[register] = value;

  return value;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(line => {
    let parts = line.split(' -> ');
    return [parts[0].split(' '), parts[1]];
  });

  const circuit = buildCircuit(inputLines, verbose);
  circuit['b'] = 956;
  const solution = runCircuit(circuit, 'a', verbose);

  assert.equal(solution, 40149);
  console.log('Final Answer:', solution);
}

