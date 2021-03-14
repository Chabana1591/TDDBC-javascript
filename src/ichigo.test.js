const createIchigo = require("./ichigo").createIchigo;
const ichigoToString = require("./ichigo").ichigoToString;
const weightToSize = require("./ichigo").weightToSize;

describe("品種とサイズを与えて、いちごオブジェクトを作成できること", () => {
  test.each`
    variety         | size    | expected
    ${"あまおう"}   | ${"S"}  | ${{ variety: "あまおう", size: "S" }}
    ${"とちおとめ"} | ${"M"}  | ${{ variety: "とちおとめ", size: "M" }}
    ${"もういっこ"} | ${"L"}  | ${{ variety: "もういっこ", size: "L" }}
    ${"もういっこ"} | ${"LL"} | ${{ variety: "もういっこ", size: "LL" }}
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

describe("重さを与えたときに対応するサイズが返ること", () => {
  test.each`
    weight | size
    ${1}   | ${"S"}
  `("", () => {});
  test("数値の1を与えたときに文字列`S`が返ること。", () => {
    expect(weightToSize(1)).toBe("S");
  });

  test("数値10を与えたときに文字列`M`が返ること", () => {
    expect(weightToSize(10)).toBe("M");
  });

  test("重さとして数値の20を与えたときにサイズとして文字列`L`が返ること", () => {
    expect(weightToSize(20)).toBe("L");
  });

  test("重さとして数値の25を与えたときにサイズとして文字列`LL`が返ること", () => {
    expect(weightToSize(25)).toBe("LL");
  });
});
