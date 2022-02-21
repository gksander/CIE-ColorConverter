import { RGBToXYZ } from "./RGBToXYZ";

describe("RGBToXYZ", () => {
  test("RGB to XYZ (defaults)", () => {
    const [X, Y, Z] = RGBToXYZ([50, 225, 103]);
    expect(X).toBeCloseTo(0.323247, 4);
    expect(Y).toBeCloseTo(0.555087, 4);
    expect(Z).toBeCloseTo(0.170424, 4);
  });
});
