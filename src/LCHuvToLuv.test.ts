import { LCHuvToLuv } from "./LCHuvToLuv";

describe("LCHuvToLuv", () => {
  test("LCHuv to Luv (defaults)", () => {
    let [L, u, v] = LCHuvToLuv([55, 82, 250]);
    expect(L).toBeCloseTo(55);
    expect(u).toBeCloseTo(-28.0457);
    expect(v).toBeCloseTo(-77.0548);
  });
});
