import { LabToRGB } from "./LabToRGB";

describe("LabToRGB", () => {
  test("Lab to RGB (defaults)", () => {
    let [R, G, B] = LabToRGB([61, -0.5, -44]);
    expect(R).toBeCloseTo(99.9946);
    expect(G).toBeCloseTo(149.9378);
    expect(B).toBeCloseTo(225.1047);
  });
});
