const Ichigo = class {
  constructor(variety, size) {
    if (!variety) {
      throw new Error(
        `varietyが${variety}です。いちごインスタンスを生成できません。`
      );
    }
    if (!(size instanceof IchigoSize)) {
      throw new Error(
        `size：${size}はIchigoSizeクラスのインスタンスである必要があります。`
      );
    }
    this.variety = variety;
    this.size = size;
  }

  toString() {
    return `${this.variety}: ${this.size.value}`;
  }
};

const IchigoSize = class {
  constructor(sizeStringOrWeight) {
    if (typeof sizeStringOrWeight === "string") {
      const SIZE_STRING = ["S", "M", "L", "LL"];
      if (SIZE_STRING.indexOf(sizeStringOrWeight) >= 0) {
        this.value = sizeStringOrWeight;
      } else {
        this.value = "判定不能";
      }
    } else {
      this.value = IchigoSize.weightToSize(sizeStringOrWeight);
    }
  }

  static weightToSize(weight) {
    if (!Number.isInteger(weight)) return "判定不能";

    if (25 <= weight) return "LL";
    if (20 <= weight) return "L";
    if (10 <= weight) return "M";
    if (1 <= weight) return "S";

    return "判定不能";
  }
};

module.exports = {
  Ichigo,
  IchigoSize,
};
