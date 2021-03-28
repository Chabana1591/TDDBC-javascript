const Ichigo = require("./ichigo").Ichigo;
const IchigoSize = require("./ichigo").IchigoSize;

describe("品種とサイズを与えて、いちごクラスのインスタンスを作成できること", () => {
  test.each`
    variety         | size                          | expected
    ${"あまおう"}   | ${new IchigoSize("S")}        | ${{ variety: "あまおう", size: "S" }}
    ${"とちおとめ"} | ${new IchigoSize("M")}        | ${{ variety: "とちおとめ", size: "M" }}
    ${"もういっこ"} | ${new IchigoSize("L")}        | ${{ variety: "もういっこ", size: "L" }}
    ${"もういっこ"} | ${new IchigoSize("LL")}       | ${{ variety: "もういっこ", size: "LL" }}
    ${"とちおとめ"} | ${new IchigoSize("判定不能")} | ${{ variety: "とちおとめ", size: "判定不能" }}
  `(
    "品種として $variety とサイズとして $size を与えたときに $expected が返ること",
    ({ variety, size, expected }) => {
      // expect(createIchigo(variety, size)).toStrictEqual(expected);
      const ichigo = new Ichigo(variety, size);
      expect(ichigo.variety).toBe(variety);
      expect(ichigo.size).toStrictEqual(size);
    }
  );

  test("引数を渡さなかった場合に、例外をスローすること", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Ichigo();
    }).toThrow();
  });
});

describe("いちごインスタンスの文字列表現を取得", () => {
  test.each`
    variety         | size                    | expected
    ${"あまおう"}   | ${new IchigoSize("S")}  | ${"あまおう: S"}
    ${"とちおとめ"} | ${new IchigoSize("M")}  | ${"とちおとめ: M"}
    ${"もういっこ"} | ${new IchigoSize("L")}  | ${"もういっこ: L"}
    ${"もういっこ"} | ${new IchigoSize("LL")} | ${"もういっこ: LL"}
  `(
    "`{variety: '$variety', size: '$size'}`のいちごオブジェクトを与えたときに`$expected`が返ること",
    ({ variety, size, expected }) => {
      const ichigo = new Ichigo(variety, size);
      expect(ichigo.toString()).toBe(expected);
    }
  );
});

describe("いちごサイズクラスのインスタンスを生成できること", () => {
  test.each`
    size      | expected
    ${"S"}    | ${"S"}
    ${"M"}    | ${"M"}
    ${"L"}    | ${"L"}
    ${"LL"}   | ${"LL"}
  `(
    "引数としてサイズの文字列 $size を与えて、サイズが $expected のインスタンスを生成できる。",
    ({ size, expected }) => {
      const ichigoSize = new IchigoSize(size);
      expect(ichigoSize.value).toBe(expected);
    }
  );

  test.each`
  size      | expected
  ${"重さ"} | ${"判定不能"}
`(
  "引数として異常な文字列 $size を与えて、サイズが $expected のインスタンスを生成できる。",
  ({ size, expected }) => {
    const ichigoSize = new IchigoSize(size);
    expect(ichigoSize.value).toBe(expected);
  }
);
});

describe("整数値で重さを与えたときに対応するいちごサイズクラスのインスタンスが返ること", () => {
  describe("重さが1g以上9g以下であったときにサイズとして`S`が返ること", () => {
    test.each`
      weight | size
      ${1}   | ${new IchigoSize("S")}
      ${9}   | ${new IchigoSize("S")}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(new IchigoSize(weight)).toStrictEqual(size);
      }
    );
  });

  describe("重さが10g以上19g以下であったときにサイズとして`M`が返ること", () => {
    test.each`
      weight | size
      ${10}  | ${new IchigoSize("M")}
      ${19}  | ${new IchigoSize("M")}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(new IchigoSize(weight)).toStrictEqual(size);
      }
    );
  });

  describe("重さが20g以上24g以下であったときにサイズとして`L`が返ること", () => {
    test.each`
      weight | size
      ${20}  | ${new IchigoSize("L")}
      ${24}  | ${new IchigoSize("L")}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(new IchigoSize(weight)).toStrictEqual(size);
      }
    );
  });

  describe("重さが25g以上であったときにサイズとして`LL`が返ること", () => {
    test.each`
      weight | size
      ${25}  | ${new IchigoSize("LL")}
      ${26}  | ${new IchigoSize("LL")}
    `(
      "数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(new IchigoSize(weight)).toStrictEqual(size);
      }
    );
  });

  describe("【仕様未確定】異常な数値を与えたときにサイズとして`判定不能`が返ること", () => {
    test.each`
      weight    | size
      ${0}      | ${new IchigoSize("判定不能")}
      ${1.5}    | ${new IchigoSize("判定不能")}
      ${"重さ"} | ${new IchigoSize("判定不能")}
    `(
      "【仕様未確定】異常な数値の$weightを与えたときに文字列`$size`が返ること。",
      ({ weight, size }) => {
        expect(new IchigoSize(weight)).toStrictEqual(size);
      }
    );
  });
});
