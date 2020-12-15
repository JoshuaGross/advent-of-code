// Result and param are both BigInt
module.exports = function lookAndSay (num) {
  const str = num.toString(10);
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    let count = 1;
    while (str[i + count] === ch) count++;
    i += count - 1;
    result += ('' + count) + ch;
  }

  return BigInt(result);
};
