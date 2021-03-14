const createIchigo = require("./ichigo").createIchigo;
const ichigoToString = require("./ichigo").ichigoToString;
const weightToSize = require("./ichigo").weightToSize;
const createIchigoWithWeight = require("./ichigo").createIchigoWithWeight;
const Ichigo = require("./ichigo").Ichigo;

describe("品種とサイズを与えて、いちごオブジェクトを作成できること", () => {
  test.each`
    variety         | size          | expected
    ${"あまおう"}   | ${"S"}        | ${{ variety: "あまおう", size: "S" }}
    ${"とちおとめ"} | ${"M"}        | ${{ variety: "とちおとめ", size: "M" }}
    ${"もういっこ"} | ${"L"}        | ${{ variety: "もういっこ", size: "L" }}
    ${"もういっこ"} | ${"LL"}       | ${{ variety: "もういっこ", size: "LL" }}
    ${"とちおとめ"} | ${"判定不能"} | ${{ variety: "とちおとめ", size: "判定不能" }}
  `(
    "品種として $variety とサイズとして $size を与えたときに $expected が返ること",
    ({ variety, size, expected }) => {
      expect(createIchigo(variety, size)).toStrictEqual(expected);
    }
  );
});

describe("いちごオブジェクトの文字列表現を取得", () => {
  test.each`
    variety         | size    | expected
    ${"あまおう"}   | ${"S"}  | ${"あまおう: S"}
    ${"とちおとめ"} | ${"M"}  | ${"とちおとめ: M"}
    ${"もういっこ"} | ${"L"}  | ${"もういっこ: L"}
    ${"もういっこ"} | ${"LL"} | ${"もういっこ: LL"}
  `(
    "`{variety: '$variety', size: '$size'}`のいちごオブジェクトを与えたときに`$expected`が返ること",
    ({ variety, size, expected }) => {
      const ichigo = createIchigo(variety, size);
      expect(ichigoToString(ichigo)).toBe(expected);
    }
  );
});

describe("整数値で重さを与えたときに対応するサイズが返ること", () => {
  describe("重さが1g以上9g以下であったときにサイズとして`S`が返ること", () => {
    test.each`
      weight | size
      ${1}   | ${"S"}
      ${9}   | ${"S"}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(weightToSize(weight)).toBe(size);
      }
    );
  });

  describe("重さが10g以上19g以下であったときにサイズとして`M`が返ること", () => {
    test.each`
      weight | size
      ${10}  | ${"M"}
      ${19}  | ${"M"}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(weightToSize(weight)).toBe(size);
      }
    );
  });

  describe("重さが20g以上24g以下であったときにサイズとして`L`が返ること", () => {
    test.each`
      weight | size
      ${20}  | ${"L"}
      ${24}  | ${"L"}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(weightToSize(weight)).toBe(size);
      }
    );
  });

  describe("重さが25g以上であったときにサイズとして`LL`が返ること", () => {
    test.each`
      weight | size
      ${25}  | ${"LL"}
      ${26}  | ${"LL"}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(weightToSize(weight)).toBe(size);
      }
    );
  });

  describe("【仕様未確定】異常な数値を与えたときにサイズとして`判定不能`が返ること", () => {
    test.each`
      weight    | size
      ${0}      | ${"判定不能"}
      ${1.5}    | ${"判定不能"}
      ${"重さ"} | ${"判定不能"}
    `(
      "【仕様未確定】異常な数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(weightToSize(weight)).toBe(size);
      }
    );
  });
});

describe("品種と重さを与えたときにいちごオブジェクトを返すこと", () => {
  test.each`
    variety         | weight | expected
    ${"あまおう"}   | ${1}   | ${{ variety: "あまおう", size: "S" }}
    ${"とちおとめ"} | ${10}  | ${{ variety: "とちおとめ", size: "M" }}
    ${"もういっこ"} | ${20}  | ${{ variety: "もういっこ", size: "L" }}
    ${"もういっこ"} | ${25}  | ${{ variety: "もういっこ", size: "LL" }}
    ${"とちおとめ"} | ${0}   | ${{ variety: "とちおとめ", size: "判定不能" }}
  `(
    "品種として $variety 重さとして $weight を与えたときに $expected が返ること",
    ({ variety, weight, expected }) => {
      expect(createIchigoWithWeight(variety, weight)).toStrictEqual(expected);
    }
  );
});

describe("品種とサイズを渡していちごクラスのインスタンスが作成できること", () => {
  test("品種として`あまおう`とサイズとして`S`を与えたときにいちごクラスのインスタンスが作成できること", () => {
    const ichigo = new Ichigo("あまおう", "S");
    expect(ichigo.variety).toBe("あまおう");
    expect(ichigo.size).toBe("S");
  });

  test("品種として`あまおう`とサイズとして`S`を与えたときにいちごクラスのインスタンスが作成できること", () => {
    expect(() => {
      new Ichigo();
    }).toThrow();
  });
});
