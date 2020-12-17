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

function conwayGridCountActiveNeighbors (grid, ...params) {
  const dimensions = params.length;
  const paramK = params.join(',');
  let count = 0;
  for (const k of getNeighboringKeys(...params)) {
    const jk = k.join(',');
    if (paramK !== jk) {
      count += (grid.get(jk) === true ? 1 : 0);
    }
  }
  return count;
}

module.exports = conwayGridCountActiveNeighbors;
