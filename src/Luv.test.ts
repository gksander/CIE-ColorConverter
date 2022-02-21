import { LuvToLCHuv, LuvToXYZ } from "./Luv";

describe("Luv", () => {
  test("Luv to LCHuv (defaults)", () => {
    const [L, C, H] = LuvToLCHuv([55, -17, -85]);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(86.6833);
    expect(H).toBeCloseTo(258.6901);
  });

  test("Luv to XYZ (defaults)", () => {
    const [X, Y, Z] = LuvToXYZ([55, -17, -85]);
    expect(X).toBeCloseTo(0.259061, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
    expect(Z).toBeCloseTo(0.630398, 4);
  });
});
