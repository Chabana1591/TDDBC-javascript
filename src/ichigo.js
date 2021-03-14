const createIchigo = (variety, size) => {
  return { variety, size };
};

const ichigoToString = ichigo => {
  return `${ichigo.variety}: ${ichigo.size}`;
};

const weightToSize = weight => {
  if (!Number.isInteger(weight)) return "判定不能";
  if (weight >= 25) return "LL";
  if (weight >= 20) return "L";
  if (weight >= 10) return "M";
  if (weight >= 1) return "S";
  return "判定不能";
};

const createIchigoWithWeight = (variety, weight) => {
  return { variety, size: weightToSize(weight) };
};

const Ichigo = class {
  constructor(variety, size) {
    if (!variety) {
    }
    this.variety = variety;
    this.size = size;
  }
};

module.exports = {
  createIchigo: createIchigo,
  ichigoToString: ichigoToString,
  weightToSize: weightToSize,
  createIchigoWithWeight: createIchigoWithWeight,
  Ichigo: Ichigo,
};
