const createIchigo = (variety, size) => {
  return { variety, size };
};

const ichigoToString = ichigo => {
  return `${ichigo.variety}: ${ichigo.size}`;
};

const weightToSize = weight => {
  if (weight >= 25) return "LL";
  if (weight >= 20) return "L";
  if (weight >= 10) return "M";
  if (weight >= 1) return "S";
  return "判定不能";
};

module.exports = {
  createIchigo: createIchigo,
  ichigoToString: ichigoToString,
  weightToSize: weightToSize,
};
