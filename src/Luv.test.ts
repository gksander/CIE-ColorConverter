import {
  LuvToLab,
  LuvToLCHab,
  LuvToLCHuv,
  LuvToRGB,
  LuvToxyY,
  LuvToXYZ,
} from "./Luv";

describe("Luv", () => {
  test("Luv to LCHuv (defaults)", () => {
    const [L, C, H] = LuvToLCHuv([55, -17, -85]);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(86.6833);
    expect(H).toBeCloseTo(258.6901);
  });

  test("Luv to XYZ (defaults)", () => {
    const [X, Y, Z] = LuvToXYZ([55, -17, -85]);
    expect(X).toBeCloseTo(0.259061, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
    expect(Z).toBeCloseTo(0.630398, 4);
  });

  test("Luv to xyY (defaults)", () => {
    const [x, y, Y] = LuvToxyY([55, -17, -85]);
    expect(x).toBeCloseTo(0.231562, 4);
    expect(y).toBeCloseTo(0.204958, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
  });

  test("Luv to Lab (defaults)", () => {
    const [L, a, b] = LuvToLab([55, -17, -85]);
    expect(L).toBeCloseTo(55);
    expect(a).toBeCloseTo(16.6011);
    expect(b).toBeCloseTo(-60.4159);
  });

  test("Luv to LCHab (defaults)", () => {
    const [L, C, H] = LuvToLCHab([55, -17, -85]);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(62.6552);
    expect(H).toBeCloseTo(285.3645);
  });

  test("Luv to RGB (defaults)", () => {
    const [R, G, B] = LuvToRGB([55, -17, -85]);
    expect(R).toBeCloseTo(101.6228);
    expect(G).toBeCloseTo(125.5121);
    expect(B).toBeCloseTo(237.6312);
  });
});
