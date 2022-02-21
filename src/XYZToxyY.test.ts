import { XYZToxyY } from "./XYZToxyY";

describe("XYZToxyY", () => {
  // xyY
  test("XYZ to xyY (defaults)", () => {
    let [x, y, Y] = XYZToxyY([0.5, 0.5, 0.5]);
    expect(x).toBeCloseTo(0.333333);
    expect(y).toBeCloseTo(0.333333);
    expect(Y).toBeCloseTo(0.5);
  });
});
