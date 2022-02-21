import { ColorConverter } from "../src/index";
type NT = [number, number, number];

describe("XYZ conversion", () => {
  let converter = new ColorConverter();

  // Start with default values for RefWhite/RGG/etc.
  let XYZ: NT = [0.5, 0.5, 0.5];

  // xyY
  test("XYZ to xyY (defaults)", () => {
    let [x, y, Y] = converter.XYZ_to_xyY(XYZ);
    expect(x).toBeCloseTo(0.333333);
    expect(y).toBeCloseTo(0.333333);
    expect(Y).toBeCloseTo(0.5);
  });

  // LCHab

  // LCHuv

  // RGB
  test("XYZ to RGB (defaults)", () => {
    let [R, G, B] = converter.XYZ_to_RGB(XYZ);
    expect(R).toBeCloseTo(189.7141);
    expect(G).toBeCloseTo(185.0451);
    expect(B).toBeCloseTo(207.0205);
  });
});
