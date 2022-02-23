import {
  xyYToLab,
  xyYToLCHab,
  xyYToLCHuv,
  xyYToLuv,
  xyYToRGB,
  xyYToXYZ,
} from "./xyY";

describe("xyY", () => {
  // xyY
  test("xyY to XYZ (defaults)", () => {
    let [X, Y, Z] = xyYToXYZ([0.5, 0.5, 0.5]);
    expect(X).toBeCloseTo(0.5);
    expect(Y).toBeCloseTo(0.5);
    expect(Z).toBeCloseTo(0);
  });

  test("xyY to Lab (defaults)", () => {
    const [L, a, b] = xyYToLab([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(a).toBeCloseTo(4.8492);
    expect(b).toBeCloseTo(131.1539);
  });

  test("xyY to LCHab (defaults)", () => {
    const [L, C, H] = xyYToLCHab([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(C).toBeCloseTo(131.2435);
    expect(H).toBeCloseTo(87.8825);
  });

  test("xyY to Luv (defaults)", () => {
    const [L, u, v] = xyYToLuv([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(u).toBeCloseTo(40.3866);
    expect(v).toBeCloseTo(73.6005);
  });

  test("xyY to LCHuv (defaults)", () => {
    const [L, C, H] = xyYToLCHuv([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(C).toBeCloseTo(83.9531);
    expect(H).toBeCloseTo(61.2452);
  });

  test("xyY to RGB (defaults)", () => {
    const [R, G, B] = xyYToRGB([0.5, 0.5, 0.5]);
    expect(R).toBeCloseTo(225.7329, 1);
    expect(G).toBeCloseTo(182.1575, 1);
    expect(B).toBeCloseTo(-79.1162, 1);
  });
});
