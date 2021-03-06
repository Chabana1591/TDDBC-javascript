const createIchigo = (variety, size) => {
  return { variety, size };
};

const ichigoToString = ichigo => {
  return `${ichigo.variety}: ${ichigo.size}`;
};

const weightToSize = weight => {
  return "S";
};

module.exports = {
  createIchigo: createIchigo,
  ichigoToString: ichigoToString,
  weightToSize: weightToSize,
};
