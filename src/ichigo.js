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
    const SIZE_STRING = ["S", "M", "L", "LL"];
    if (typeof sizeStringOrWeight === "string") {
      if (SIZE_STRING.includes(sizeStringOrWeight)) {
        this.value = sizeStringOrWeight;
      } else {
        throw new Error(
          `${sizeStringOrWeight}は不正なサイズです。指定できるサイズは${SIZE_STRING}です。`
        );
      }
    } else if (typeof sizeStringOrWeight === "number") {
      this.value = IchigoSize.weightToSize(sizeStringOrWeight);
    } else {
      throw new Error(
        `${sizeStringOrWeight}はサイズ文字列${SIZE_STRING}か正の整数である必要があります。`
      );
    }
  }

  static weightToSize(weight) {
    if (!Number.isInteger(weight) || weight < 1) {
      throw new Error(`${weight}は正の整数である必要があります。`);
    }

    if (25 <= weight) return "LL";
    if (20 <= weight) return "L";
    if (10 <= weight) return "M";
    if (1 <= weight) return "S";
  }
};

module.exports = {
  Ichigo,
  IchigoSize,
};
