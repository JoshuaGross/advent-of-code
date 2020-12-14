module.exports = function powerset(input) {
  return (function ps(list) {
    if (list.length === 0) {
      return [[]];
    }
    var head = list.pop();
    var tailPS = ps(list);
    return tailPS.concat(tailPS.map(function(e) {
        return [head].concat(e);
    }));
  })(input.slice());
};
