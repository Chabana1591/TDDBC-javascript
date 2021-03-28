const Ichigo = class {
  constructor(variety, size) {
    this.valid(variety, size);
    this.variety = variety;
    this.size = size;
  }

  isEqualToVarietyOf(ichigo) {
    return this.variety === ichigo.variety;
  }

  toString() {
    return `${this.variety}: ${this.size.value}`;
  }

  valid(variety, size) {
        const VARIETY_STRING = ["あまおう", "とちおとめ", "もういっこ"];
    if (!VARIETY_STRING.includes(variety)) {
      throw new Error(
        `varietyが${variety}です。${VARIETY_STRING}以外のいちごインスタンスを生成できません。`
      );
    }
    if (!(size instanceof IchigoSize)) {
      throw new Error(
        `size：${size}はIchigoSizeクラスのインスタンスである必要があります。`
      );
    }
  }
};

const IchigoSize = class {
  constructor(sizeStringOrWeight) {
    if (typeof sizeStringOrWeight === "string") {
      const SIZE_STRING = ["S", "M", "L", "LL"];
      if (SIZE_STRING.includes(sizeStringOrWeight)) {
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
