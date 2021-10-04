import { ColorConverter } from "../src/index";
type NT = [number, number, number];

describe("RGB conversion", () => {
  let converter = new ColorConverter();

  // Start with default values for RefWhite/RGG/etc.
  let RGB: NT = [50, 225, 103];

  // XYZ
  test("RGB to XYZ (defaults)", () => {
    let [X, Y, Z] = converter.RGB_to_XYZ(RGB);
    expect(X).toBeCloseTo(0.323247, 4);
    expect(Y).toBeCloseTo(0.555087, 4);
    expect(Z).toBeCloseTo(0.170424, 4);
  });

  // xyY
  test("RGB to xyY (defaults)", () => {
    let [x, y, Y] = converter.RGB_to_xyY(RGB);
    expect(x).toBeCloseTo(0.308219, 4);
    expect(y).toBeCloseTo(0.52928, 4);
    expect(Y).toBeCloseTo(0.555087, 4);
  });

  // Lab
  test("RGB to Lab (defaults)", () => {
    let [L, a, b] = converter.RGB_to_Lab(RGB);
    expect(L).toBeCloseTo(79.3334);
    expect(a).toBeCloseTo(-63.5786);
    expect(b).toBeCloseTo(46.1494);
  });

  // LCHab
  test("RGB to LCHab (defaults)", () => {
    let [L, C, H] = converter.RGB_to_LCHab(RGB);
    expect(L).toBeCloseTo(79.3334);
    expect(C).toBeCloseTo(78.5621);
    expect(H).toBeCloseTo(144.0255);
  });

  // Luv
  test("RGB to Luv (defaults)", () => {
    let [L, u, v] = converter.RGB_to_Luv(RGB);
    expect(L).toBeCloseTo(79.3334);
    expect(u).toBeCloseTo(-70.148);
    expect(v).toBeCloseTo(59.0631);
  });

  // LCHuv
  test("RGB to LCHuv (defaults)", () => {
    let [R, G, B] = converter.RGB_to_LCHuv(RGB);
    expect(R).toBeCloseTo(79.3334);
    expect(G).toBeCloseTo(91.7016);
    expect(B).toBeCloseTo(139.9033);
  });
});
