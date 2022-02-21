import { LuvToLCHuv } from "./LuvToLCHuv";

describe("LuvToLCHuv", () => {
  test("Luv to LCHuv (defaults)", () => {
    const [L, C, H] = LuvToLCHuv([55, -17, -85]);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(86.6833);
    expect(H).toBeCloseTo(258.6901);
  });
});
