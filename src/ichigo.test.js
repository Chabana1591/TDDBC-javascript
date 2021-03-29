const Ichigo = require("./ichigo").Ichigo;
const IchigoSize = require("./ichigo").IchigoSize;

describe("品種とサイズを与えて、いちごクラスのインスタンスを作成できること", () => {
  test.each`
    variety         | size                    | expected
    ${"あまおう"}   | ${new IchigoSize("S")}  | ${{ variety: "あまおう", size: "S" }}
    ${"とちおとめ"} | ${new IchigoSize("M")}  | ${{ variety: "とちおとめ", size: "M" }}
    ${"もういっこ"} | ${new IchigoSize("L")}  | ${{ variety: "もういっこ", size: "L" }}
    ${"もういっこ"} | ${new IchigoSize("LL")} | ${{ variety: "もういっこ", size: "LL" }}
  `(
    "品種として $variety とサイズとして $size を与えたときに $expected が返ること",
    ({ variety, size, expected }) => {
      // expect(createIchigo(variety, size)).toStrictEqual(expected);
      const ichigo = new Ichigo(variety, size);
      expect(ichigo.variety).toBe(variety);
      expect(ichigo.size).toStrictEqual(size);
    }
  );

  test("品種が異常な値の時に、例外をスローすること", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Ichigo("いちご", new IchigoSize("S"));
    }).toThrow();
  });

  test("サイズが異常な値の時に、例外をスローすること", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Ichigo("とちおとめ", new IchigoSize("判定不能"));
    }).toThrow();
  });

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
    size    | expected
    ${"S"}  | ${"S"}
    ${"M"}  | ${"M"}
    ${"L"}  | ${"L"}
    ${"LL"} | ${"LL"}
  `(
    "引数としてサイズの文字列 $size を与えて、サイズが $expected のインスタンスを生成できる。",
    ({ size, expected }) => {
      const ichigoSize = new IchigoSize(size);
      expect(ichigoSize.value).toBe(expected);
    }
  );
  test("異常なサイズの時に、例外をスローすること", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new IchigoSize("重さ");
    }).toThrow();
  });

  test("引数を渡さなかった場合に、例外をスローすること", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new IchigoSize();
    }).toThrow();
  });
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

  describe("【異常な数値を与えたときに例外がスローされること", () => {
    test.each`
      weight
      ${0}
      ${1.5}
      ${"重さ"}
    `(
      "異常な数値の$weightを与えたときに例外がスローされること。",
      ({ weight }) => {
        expect(() => {
          // eslint-disable-next-line no-new
          new IchigoSize(weight);
        }).toThrow();
      }
    );
  });
});

describe("いちご同士の品種が同一かどうか判別できること", () => {
  test.each`
    ichigoA                                         | ichigoB                                           | expected
    ${new Ichigo("あまおう", new IchigoSize("S"))}  | ${new Ichigo("あまおう", new IchigoSize("L"))}    | ${true}
    ${new Ichigo("あまおう", new IchigoSize("LL"))} | ${new Ichigo("とちおとめ", new IchigoSize("LL"))} | ${false}
  `(
    "いちごA: $ichigoA 、いちごB: $ichigoB を与えたときに $expected を返す",
    ({ ichigoA, ichigoB, expected }) => {
      expect(ichigoA.isEqualToVarietyOf(ichigoB)).toBe(expected);
    }
  );
});
