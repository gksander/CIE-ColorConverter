import { RGBToLab } from "./RGBToLab";

describe("RGBToLab", () => {
  test("RGB to Lab (defaults)", () => {
    const [L, a, b] = RGBToLab([50, 225, 103]);
    expect(L).toBeCloseTo(79.3334);
    expect(a).toBeCloseTo(-63.5786);
    expect(b).toBeCloseTo(46.1494);
  });
});
