import { LabToLCHab } from "./LabToLCHab";

describe("LabToLCHab", () => {
  test("Lab to LCHab (defaults)", () => {
    let [L, C, H] = LabToLCHab([61, -0.5, -44]);
    expect(L).toBeCloseTo(61);
    expect(C).toBeCloseTo(44.0028);
    expect(H).toBeCloseTo(269.3489);
  });
});
