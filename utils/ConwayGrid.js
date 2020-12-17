const range = require('./range');

const ACTIVE = '#';
const INACTIVE = '.';

function* getNeighboringKeys(k, ...rest) {
  if (k == null) {
    return [];
  }

  if (rest.length > 0) {
    for (const ks of getNeighboringKeys(...rest)) {
      yield [k - 1].concat(ks);
      yield [k + 0].concat(ks);
      yield [k + 1].concat(ks);
    }
  } else {
    yield [k - 1];
    yield [k + 0];
    yield [k + 1];
  }
}

class ConwayGrid {
  constructor (dim) {
    this.grid = new Map();
    this.depthMin = new Map();
    this.depthMax = new Map();
    this.generation = 0;
    this.dimension = dim;
  }

  getMapAt(...coord) {
    let map = this.grid;
    for (let i = 0; i < coord.length; i++) {
      const pos = coord[i];
      if (!map.has(pos)) {
        map.set(pos, new Map());
      }
      map = map.get(pos);
    }
    return map;
  }

  set (coord, value) {
    this.getMapAt(...coord.slice(0, -1)).set(coord[coord.length - 1], value);
  }

  get (...coord) {
    return this.getMapAt(...coord.slice(0, -1)).get(coord[coord.length - 1]) === true;
  }

  step () {
    const nextGrid = new ConwayGrid(this.dimension);
    for (const ka of this.keyRange(1)) {
      nextGrid.set(ka, this.nextPosValue(...ka));
    }

    this.generation++;
    this.grid = nextGrid.grid;

    for (const k of this.depthMin.keys()) {
      this.depthMin.set(k, this.depthMin.get(k) - 1);
    }
    for (const k of this.depthMax.keys()) {
      this.depthMax.set(k, this.depthMax.get(k) + 1);
    }
  }

  nextPosValue(...coord) {
    const activeNeighbors = this.countActiveNeighbors(...coord);
    const positionValue = this.get(...coord);
    return (positionValue && (activeNeighbors === 3 || activeNeighbors === 2)) || (!positionValue && activeNeighbors === 3);
  }

  countActiveNeighbors(...coord) {
    let count = 0;
    for (const k of getNeighboringKeys(...coord)) {
      if (!k.reduce((acc, kv, ki) => acc && coord[ki] === kv, true)) {
        count += this.get(...k) === true ? 1 : 0;
      }
    }
    return count;
  }

  * keyRange (extend = 0, i = 0) {
    let minK = this.depthMin.get(i);
    let maxK = this.depthMax.get(i);

    for (const ki of range(minK-extend, maxK+extend)) {
      if (i + 1 < this.dimension) {
        for (const ks of this.keyRange(extend, i+1)) {
          yield [ki].concat(ks);
        }
      } else {
        yield [ki];
      }
    }
  }

  sum (grid) {
    if (typeof grid === 'boolean') {
      return grid === true ? 1 : 0;
    }
    grid = grid || this.grid;
    return [...grid.values()].reduce((acc, val) => acc + this.sum(val), 0);
  }
}

module.exports = ConwayGrid;
