import { LabToLCHab, LabToRGB, LabToXYZ } from "./Lab";

describe("Lab", () => {
  test("Lab to LCHab (defaults)", () => {
    let [L, C, H] = LabToLCHab([61, -0.5, -44]);
    expect(L).toBeCloseTo(61);
    expect(C).toBeCloseTo(44.0028);
    expect(H).toBeCloseTo(269.3489);
  });

  test("Lab to RGB (defaults)", () => {
    let [R, G, B] = LabToRGB([61, -0.5, -44]);
    expect(R).toBeCloseTo(99.9946);
    expect(G).toBeCloseTo(149.9378);
    expect(B).toBeCloseTo(225.1047);
  });

  test("Lab to XYZ (defaults)", () => {
    let [X, Y, Z] = LabToXYZ([61, -0.5, -44]);
    expect(X).toBeCloseTo(0.280744);
    expect(Y).toBeCloseTo(0.292481);
    expect(Z).toBeCloseTo(0.569661);
  });
});
