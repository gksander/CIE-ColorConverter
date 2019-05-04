import CIECC from '../src/index';
type NT = [number, number, number];

describe('Lab conversion', () => {
  let converter = new CIECC();

  // Start with default values for RefWhite/RGG/etc.
  let Lab: NT = [61, -0.5, -44];

  // Lab
  test('Lab to XYZ (defaults)', () => {
    let [X, Y, Z] = converter.Lab_to_XYZ(Lab);
    expect(X).toBeCloseTo(0.280744);
    expect(Y).toBeCloseTo(0.292481);
    expect(Z).toBeCloseTo(0.569661);
  });

  // xyY
  test('Lab to xyY (defaults)', () => {
    let [x, y, Y] = converter.Lab_to_xyY(Lab);
    expect(x).toBeCloseTo(0.245645, 4);
    expect(y).toBeCloseTo(0.255915, 4);
    expect(Y).toBeCloseTo(0.292481, 4);
  });

  // LCHab
  test('Lab to LCHab (defaults)', () => {
    let [L, C, H] = converter.Lab_to_LCHab(Lab);
    expect(L).toBeCloseTo(61);
    expect(C).toBeCloseTo(44.0028);
    expect(H).toBeCloseTo(269.3489);
  });

  // Luv
  test('Lab to Luv (defaults)', () => {
    let [L, u, v] = converter.Lab_to_Luv(Lab);
    expect(L).toBeCloseTo(61);
    expect(u).toBeCloseTo(-26.2173);
    expect(v).toBeCloseTo(-59.7007);
  });

  // LCHuv
  test('Lab to LCHuv (defaults)', () => {
    let [L, C, H] = converter.Lab_to_LCHuv(Lab);
    expect(L).toBeCloseTo(61);
    expect(C).toBeCloseTo(65.2036);
    expect(H).toBeCloseTo(246.2915);
  });

  // RGB
  test('Lab to RGB (defaults)', () => {
    let [R, G, B] = converter.Lab_to_RGB(Lab);
    expect(R).toBeCloseTo(99.9946);
    expect(G).toBeCloseTo(149.9378);
    expect(B).toBeCloseTo(225.1047);
  });

});