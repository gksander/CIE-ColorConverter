import { LCHabToLab } from "./LCHabToLab";

describe("LCHabToLab", () => {
  test("LCHab to Lab (defaults)", () => {
    const [L, a, b] = LCHabToLab([61, 48, 250]);
    expect(L).toBeCloseTo(61);
    expect(a).toBeCloseTo(-16.417);
    expect(b).toBeCloseTo(-45.1052);
  });
});
