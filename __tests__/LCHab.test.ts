import { ColorConverter } from "../src/index";
type NT = [number, number, number];

describe("LCHab conversion", () => {
  let converter = new ColorConverter();

  // Start with default values for RefWhite/RGG/etc.
  let LCHab: NT = [61, 48, 250];

  // XYZ
  test("LCHab to XYZ (defaults)", () => {
    let [X, Y, Z] = converter.LCHab_to_XYZ(LCHab);
    expect(X).toBeCloseTo(0.2422, 3);
    expect(Y).toBeCloseTo(0.292481, 3);
    expect(Z).toBeCloseTo(0.5804, 3);
  });

  // xyY
  test("LCHab to xyY (defaults)", () => {
    let [x, y, Y] = converter.LCHab_to_xyY(LCHab);
    expect(x).toBeCloseTo(0.2172, 3);
    expect(y).toBeCloseTo(0.262292, 3);
    expect(Y).toBeCloseTo(0.292481, 3);
  });

  // Lab
  test("LCHab to Lab (defaults)", () => {
    let [L, a, b] = converter.LCHab_to_Lab(LCHab);
    expect(L).toBeCloseTo(61);
    expect(a).toBeCloseTo(-16.417);
    expect(b).toBeCloseTo(-45.1052);
  });

  // Luv
  test("LCHab to Luv (defaults)", () => {
    let [L, u, v] = converter.LCHab_to_Luv(LCHab);
    expect(L).toBeCloseTo(61);
    expect(u).toBeCloseTo(-45.2692);
    expect(v).toBeCloseTo(-59.3779);
  });

  // LCHuv
  test("LCHab to LCHuv (defaults)", () => {
    let [L, C, H] = converter.LCHab_to_LCHuv(LCHab);
    expect(L).toBeCloseTo(61);
    expect(C).toBeCloseTo(74.6661);
    expect(H).toBeCloseTo(232.6784);
  });

  // RGB
  test("LCHab to RGB (defaults)", () => {
    let [R, G, B] = converter.LCHab_to_RGB(LCHab);
    expect(R).toBeCloseTo(4.5043);
    expect(G).toBeCloseTo(158.1838);
    expect(B).toBeCloseTo(226.7279);
  });
});
