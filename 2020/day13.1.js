const fs = require('fs');
const assert = require('assert');

function firstAvailableBus (arrivalTime, inServiceBuses) {
  let times = inServiceBuses.sort((a, b) => a-b).map(x => 0);

  for (let i = 0; i < inServiceBuses.length; i++) {
    const busId = inServiceBuses[i];
    let firstTimeAfterArrival = Math.floor(arrivalTime / busId) * busId;
    if (firstTimeAfterArrival < arrivalTime) {
      firstTimeAfterArrival += busId;
    }
    times[i] = firstTimeAfterArrival;
  }

  let min = Number.MAX_SAFE_INTEGER;
  let minBusId = -1;
  let waitTime = 0;
  console.log(inServiceBuses, times);
  for (let i = 0; i < inServiceBuses.length; i++) {
    const busId = inServiceBuses[i];
    console.log(arrivalTime, times[i], busId, min, arrivalTime % busId);
    if (times[i] < min) {
      min = times[i];
      minBusId = busId;
      waitTime = times[i] - arrivalTime;
    }
  }

  return minBusId * waitTime;
}

module.exports = function runner(inputFile) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  let arrivalTime = parseInt(inputLines[0], 10);
  let inServiceBuses = inputLines[1].split(',').filter(x => x !== 'x').map(x => parseInt(x, 10));

  const solution = firstAvailableBus(arrivalTime, inServiceBuses);
  assert.equal(solution, 0);
  console.log('Final Answer:', solution);
}

