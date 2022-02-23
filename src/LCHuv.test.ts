import {
  LCHuvToLab,
  LCHuvToLCHab,
  LCHuvToLuv,
  LCHuvToRGB,
  LCHuvToxyY,
  LCHuvToXYZ,
} from "./LCHuv";

describe("LCHuv", () => {
  test("LCHuv to Luv (defaults)", () => {
    const [L, u, v] = LCHuvToLuv([55, 82, 250]);
    expect(L).toBeCloseTo(55);
    expect(u).toBeCloseTo(-28.0457);
    expect(v).toBeCloseTo(-77.0548);
  });

  test("LCHuv to XYZ (defaults)", () => {
    const [X, Y, Z] = LCHuvToXYZ([55, 82, 250]);
    expect(X).toBeCloseTo(0.230535, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
    expect(Z).toBeCloseTo(0.585465, 4);
  });

  test("LCHuv to xyY (defaults)", () => {
    const [x, y, Y] = LCHuvToxyY([55, 82, 250]);
    expect(x).toBeCloseTo(0.220544, 4);
    expect(y).toBeCloseTo(0.219362, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
  });

  test("LCHuv to Lab (defaults)", () => {
    const [L, a, b] = LCHuvToLab([55, 82, 250]);
    expect(L).toBeCloseTo(55);
    expect(a).toBeCloseTo(4.2952);
    expect(b).toBeCloseTo(-55.9645);
  });

  test("LCHuv to LCHab (defaults)", () => {
    const [L, C, H] = LCHuvToLCHab([55, 82, 250]);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(56.1291);
    expect(H).toBeCloseTo(274.3887);
  });

  test("LCHuv to RGB (defaults)", () => {
    const [R, G, B] = LCHuvToRGB([55, 82, 250]);
    expect(R).toBeCloseTo(71.8207);
    expect(G).toBeCloseTo(132.6766);
    expect(B).toBeCloseTo(229.4209);
  });
});
