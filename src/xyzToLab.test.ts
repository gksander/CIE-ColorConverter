import { xyzToLab } from "./xyzToLab";

describe("xyzToLab", () => {
  test("XYZ to Lab (defaults)", () => {
    const [L, a, b] = xyzToLab([0.5, 0.5, 0.5]);
    expect(L).toBeCloseTo(76.0693);
    expect(a).toBeCloseTo(4.8492);
    expect(b).toBeCloseTo(-10.4981);
  });
});
