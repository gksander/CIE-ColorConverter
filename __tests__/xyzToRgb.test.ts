import { xyzToRgb } from "../src/xyzToRgb";

describe("xyzToRgb", () => {
  // RGB
  test.skip("XYZ to RGB (defaults)", () => {
    let [R, G, B] = xyzToRgb([0.5, 0.5, 0.5]);
    expect(R).toBeCloseTo(189.7141);
    expect(G).toBeCloseTo(185.0451);
    expect(B).toBeCloseTo(207.0205);
  });
});
