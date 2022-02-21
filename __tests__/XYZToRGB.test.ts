import { XYZToRGB } from "../src/XYZToRGB";

describe("XYZToRGB", () => {
  // RGB
  test("XYZ to RGB (defaults)", () => {
    const [R, G, B] = XYZToRGB([0.5, 0.5, 0.5]);
    expect(R).toBeCloseTo(189.7141);
    expect(G).toBeCloseTo(185.0451);
    expect(B).toBeCloseTo(207.0205);
  });
});
