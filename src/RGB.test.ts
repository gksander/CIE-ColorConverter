import {
  RGBToXYZ,
  RGBToLab,
  RGBToxyY,
  RGBToLCHab,
  RGBToLuv,
  RGBToLCHuv,
} from "./RGB";

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

  test("RGB to xyY (defaults)", () => {
    const [x, y, Y] = RGBToxyY([50, 225, 103]);
    expect(x).toBeCloseTo(0.308219, 4);
    expect(y).toBeCloseTo(0.52928, 4);
    expect(Y).toBeCloseTo(0.555087, 4);
  });

  test("RGB to LCHab (defaults)", () => {
    const [L, C, H] = RGBToLCHab([50, 225, 103]);
    expect(L).toBeCloseTo(79.3334);
    expect(C).toBeCloseTo(78.5621);
    expect(H).toBeCloseTo(144.0255);
  });

  test("RGB to Luv (defaults)", () => {
    const [L, u, v] = RGBToLuv([50, 225, 103]);
    expect(L).toBeCloseTo(79.3334);
    expect(u).toBeCloseTo(-70.148);
    expect(v).toBeCloseTo(59.0631);
  });

  test("RGB to LCHuv (defaults)", () => {
    const [L, C, H] = RGBToLCHuv([50, 225, 103]);
    expect(L).toBeCloseTo(79.3334);
    expect(C).toBeCloseTo(91.7016);
    expect(H).toBeCloseTo(139.9033);
  });
});
