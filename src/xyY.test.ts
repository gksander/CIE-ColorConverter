import { xyYToXYZ } from "./xyY";

describe("xyY", () => {
  // xyY
  test("xyY to XYZ (defaults)", () => {
    let [X, Y, Z] = xyYToXYZ([0.5, 0.5, 0.5]);
    expect(X).toBeCloseTo(0.5);
    expect(Y).toBeCloseTo(0.5);
    expect(Z).toBeCloseTo(0);
  });
});
