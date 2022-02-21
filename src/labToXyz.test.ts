import { labToXyz } from "./labToXyz";

describe("labToXyz", () => {
  test("Lab to XYZ (defaults)", () => {
    let [X, Y, Z] = labToXyz([61, -0.5, -44]);
    expect(X).toBeCloseTo(0.280744);
    expect(Y).toBeCloseTo(0.292481);
    expect(Z).toBeCloseTo(0.569661);
  });
});
