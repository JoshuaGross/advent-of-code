module.exports = function cardinalTurn(currFacing, turn) {
  switch (turn) {
    case 'R': {
      switch (currFacing) {
        case 'E': return 'S';
        case 'W': return 'N';
        case 'N': return 'E';
        case 'S': return 'W';
        default: throw new Error(`Invalid currFacing: ${currFacing}`);
      }
    }
    case 'L': {
      switch (currFacing) {
        case 'E': return 'N';
        case 'W': return 'S';
        case 'N': return 'W';
        case 'S': return 'E';
        default: throw new Error(`Invalid currFacing: ${currFacing}`);
      }
    }
    default:
      throw new Error(`Invalid turn: ${turn}`);
  }
};
