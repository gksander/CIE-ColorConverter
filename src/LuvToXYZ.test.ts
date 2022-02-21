import { LuvToXYZ } from "./LuvToXYZ";

describe("LuvToXYZ", () => {
  test("Luv to XYZ (defaults)", () => {
    const [X, Y, Z] = LuvToXYZ([55, -17, -85]);
    expect(X).toBeCloseTo(0.259061, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
    expect(Z).toBeCloseTo(0.630398, 4);
  });
});
