import CIECC from '../src/index';
type NT = [number, number, number];

describe('xyY conversion', () => {
  let converter = new CIECC();

  // Start with default values for RefWhite/RGG/etc.
  let xyY: NT = [0.5, 0.5, 0.5];

  // xyY
  test('xyY to XYZ (defaults)', () => {
    let [X, Y, Z] = converter.xyY_to_XYZ(xyY);
    expect(X).toBeCloseTo(0.5);
    expect(Y).toBeCloseTo(0.5);
    expect(Z).toBeCloseTo(0);
  });

  // Lab
  test('xyY to Lab (defaults)', () => {
    let [L, a, b] = converter.xyY_to_Lab(xyY);
    expect(L).toBeCloseTo(76.0693);
    expect(a).toBeCloseTo(4.8492);
    expect(b).toBeCloseTo(131.1539);
  });

  // LCHab
  test('xyY to LCHab (defaults)', () => {
    let [L, C, H] = converter.xyY_to_LCHab(xyY);
    expect(L).toBeCloseTo(76.0693);
    expect(C).toBeCloseTo(131.2435);
    expect(H).toBeCloseTo(87.8825);
  });

  // Luv
  test('xyY to Luv (defaults)', () => {
    let [L, u, v] = converter.xyY_to_Luv(xyY);
    expect(L).toBeCloseTo(76.0693);
    expect(u).toBeCloseTo(40.3866);
    expect(v).toBeCloseTo(73.6005);
  });

  // LCHuv
  test('xyY to LCHuv (defaults)', () => {
    let [L, C, H] = converter.xyY_to_LCHuv(xyY);
    expect(L).toBeCloseTo(76.0693);
    expect(C).toBeCloseTo(83.9531);
    expect(H).toBeCloseTo(61.2452);
  });

  // RGB
  test('xyY to RGB (defaults)', () => {
    let [R, G, B] = converter.xyY_to_RGB(xyY);
    expect(R).toBeCloseTo(225.7329, 1);
    expect(G).toBeCloseTo(182.1575, 1);
    expect(B).toBeCloseTo(-79.1162, 1);
  });

});