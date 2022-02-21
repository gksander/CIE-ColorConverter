import { xyYToXYZ, XYZToLab } from "./xyY";

describe("xyY", () => {
  // xyY
  test("xyY to XYZ (defaults)", () => {
    let [X, Y, Z] = xyYToXYZ([0.5, 0.5, 0.5]);
    expect(X).toBeCloseTo(0.5);
    expect(Y).toBeCloseTo(0.5);
    expect(Z).toBeCloseTo(0);
  });

  test("XYZ to Lab (defaults)", () => {
    const [L, a, b] = XYZToLab([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(a).toBeCloseTo(4.8492);
    expect(b).toBeCloseTo(-10.4981);
  });
});
