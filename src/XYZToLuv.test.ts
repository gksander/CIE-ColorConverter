import { XYZToLuv } from "./XYZToLuv";

describe("XYZToLuv", () => {
  // Luv
  test("XYZ to Luv (defaults)", () => {
    let [L, u, v] = XYZToLuv([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(u).toBeCloseTo(1.3511);
    expect(v).toBeCloseTo(-14.2295);
  });
});
