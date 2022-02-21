import { RGBToXYZ, RGBToLab } from "./RGB";

describe("RGB", () => {
  test("RGB to XYZ (defaults)", () => {
    const [X, Y, Z] = RGBToXYZ([50, 225, 103]);
    expect(X).toBeCloseTo(0.323247, 4);
    expect(Y).toBeCloseTo(0.555087, 4);
    expect(Z).toBeCloseTo(0.170424, 4);
  });

  test("RGB to Lab (defaults)", () => {
    const [L, a, b] = RGBToLab([50, 225, 103]);
    expect(L).toBeCloseTo(79.3334);
    expect(a).toBeCloseTo(-63.5786);
    expect(b).toBeCloseTo(46.1494);
  });
});
