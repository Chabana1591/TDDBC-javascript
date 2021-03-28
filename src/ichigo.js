const createIchigo = (variety, size) => {
  return { variety, size };
};

const ichigoToString = ichigo => {
  return `${ichigo.variety}: ${ichigo.size}`;
};

const weightToSize = weight => {
  if (!Number.isInteger(weight)) return "判定不能";

  if (25 <= weight) return "LL";
  if (20 <= weight) return "L";
  if (10 <= weight) return "M";
  if (1 <= weight) return "S";

  return "判定不能";
};

const createIchigoWithWeight = (variety, weight) => {
  return { variety, size: weightToSize(weight) };
};

const Ichigo = class {
  constructor(variety, size) {
    if (!variety) {
      throw new Error(
        `varietyが${variety}です。いちごインスタンスを生成できません。`
      );
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
