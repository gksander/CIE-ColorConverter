import {
  LCHabToLab,
  LCHabToLCHuv,
  LCHabToLuv,
  LCHabToRGB,
  LCHabToxyY,
  LCHabToXYZ,
} from "./LCHab";

describe("LCHabToLab", () => {
  test("LCHab to Lab (defaults)", () => {
    const [L, a, b] = LCHabToLab([61, 48, 250]);
    expect(L).toBeCloseTo(61);
    expect(a).toBeCloseTo(-16.417);
    expect(b).toBeCloseTo(-45.1052);
  });

  test("LCHab to XYZ (defaults)", () => {
    const [X, Y, Z] = LCHabToXYZ([61, 48, 250]);
    expect(X).toBeCloseTo(0.2422, 3);
    expect(Y).toBeCloseTo(0.292481, 3);
    expect(Z).toBeCloseTo(0.5804, 3);
  });

  test("LCHab to xyY (defaults)", () => {
    const [x, y, Y] = LCHabToxyY([61, 48, 250]);
    expect(x).toBeCloseTo(0.2172, 3);
    expect(y).toBeCloseTo(0.262292, 3);
    expect(Y).toBeCloseTo(0.292481, 3);
  });

  test("LCHab to Luv (defaults)", () => {
    const [L, u, v] = LCHabToLuv([61, 48, 250]);
    expect(L).toBeCloseTo(61);
    expect(u).toBeCloseTo(-45.2692);
    expect(v).toBeCloseTo(-59.3779);
  });

  test("LCHab to LCHuv (defaults)", () => {
    const [L, C, H] = LCHabToLCHuv([61, 48, 250]);
    expect(L).toBeCloseTo(61);
    expect(C).toBeCloseTo(74.6661);
    expect(H).toBeCloseTo(232.6784);
  });

  test("LCHab to RGB (defaults)", () => {
    const [R, G, B] = LCHabToRGB([61, 48, 250]);
    expect(R).toBeCloseTo(4.5043);
    expect(G).toBeCloseTo(158.1838);
    expect(B).toBeCloseTo(226.7279);
  });
});
