import { ColorConverter } from "../src/index";
type NT = [number, number, number];

describe("LCHuv conversion", () => {
  let converter = new ColorConverter();

  // Start with default values for RefWhite/RGG/etc.
  let LCHuv: NT = [55, 82, 250];

  // XYZ
  test("LCHuv to XYZ (defaults)", () => {
    let [X, Y, Z] = converter.LCHuv_to_XYZ(LCHuv);
    expect(X).toBeCloseTo(0.230535, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
    expect(Z).toBeCloseTo(0.585465, 4);
  });

  // xyY
  test("LCHuv to xyY (defaults)", () => {
    let [x, y, Y] = converter.LCHuv_to_xyY(LCHuv);
    expect(x).toBeCloseTo(0.220544, 4);
    expect(y).toBeCloseTo(0.219362, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
  });

  // Lab
  test("LCHuv to Lab (defaults)", () => {
    let [L, a, b] = converter.LCHuv_to_Lab(LCHuv);
    expect(L).toBeCloseTo(55);
    expect(a).toBeCloseTo(4.2952);
    expect(b).toBeCloseTo(-55.9645);
  });

  // LCHab
  test("LCHuv to LCHab (defaults)", () => {
    let [L, C, H] = converter.LCHuv_to_LCHab(LCHuv);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(56.1291);
    expect(H).toBeCloseTo(274.3887);
  });

  // Luv
  test("LCHuv to Luv (defaults)", () => {
    let [L, u, v] = converter.LCHuv_to_Luv(LCHuv);
    expect(L).toBeCloseTo(55);
    expect(u).toBeCloseTo(-28.0457);
    expect(v).toBeCloseTo(-77.0548);
  });

  // RGB
  test("LCHuv to RGB (defaults)", () => {
    let [R, G, B] = converter.LCHuv_to_RGB(LCHuv);
    expect(R).toBeCloseTo(71.8207);
    expect(G).toBeCloseTo(132.6766);
    expect(B).toBeCloseTo(229.4209);
  });
});
