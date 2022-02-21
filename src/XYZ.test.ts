import { XYZToLab, XYZToLuv, XYZToRGB, XYZToxyY } from "./XYZ";

describe("xyY", () => {
  test("XYZ to Lab (defaults)", () => {
    const [L, a, b] = XYZToLab([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(a).toBeCloseTo(4.8492);
    expect(b).toBeCloseTo(-10.4981);
  });

  test("XYZ to Luv (defaults)", () => {
    let [L, u, v] = XYZToLuv([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(u).toBeCloseTo(1.3511);
    expect(v).toBeCloseTo(-14.2295);
  });

  test("XYZ to RGB (defaults)", () => {
    const [R, G, B] = XYZToRGB([0.5, 0.5, 0.5]);
    expect(R).toBeCloseTo(189.7141);
    expect(G).toBeCloseTo(185.0451);
    expect(B).toBeCloseTo(207.0205);
  });

  test("XYZ to xyY (defaults)", () => {
    let [x, y, Y] = XYZToxyY([0.5, 0.5, 0.5]);
    expect(x).toBeCloseTo(0.333333);
    expect(y).toBeCloseTo(0.333333);
    expect(Y).toBeCloseTo(0.5);
  });
});
