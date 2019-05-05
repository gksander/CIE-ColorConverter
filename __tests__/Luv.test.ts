import CIECC from '../src/index';
type NT = [number, number, number];

describe('Luv conversion', () => {
  let converter = new CIECC();

  // Start with default values for RefWhite/RGG/etc.
  let Luv: NT = [55, -17, -85];

  // XYZ
  test('Luv to XYZ (defaults)', () => {
    let [X, Y, Z] = converter.Luv_to_XYZ(Luv);
    expect(X).toBeCloseTo(0.259061, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
    expect(Z).toBeCloseTo(0.630398, 4);
  });

  // xyY
  test('Luv to xyY (defaults)', () => {
    let [x, y, Y] = converter.Luv_to_xyY(Luv);
    expect(x).toBeCloseTo(0.231562, 4);
    expect(y).toBeCloseTo(0.204958, 4);
    expect(Y).toBeCloseTo(0.229298, 4);
  });

  // Lab
  test('Luv to Lab (defaults)', () => {
    let [L, a, b] = converter.Luv_to_Lab(Luv);
    expect(L).toBeCloseTo(55);
    expect(a).toBeCloseTo(16.6011);
    expect(b).toBeCloseTo(-60.4159);
  });

  // LCHab
  test('Luv to LCHab (defaults)', () => {
    let [L, C, H] = converter.Luv_to_LCHab(Luv);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(62.6552);
    expect(H).toBeCloseTo(285.3645);
  });

  // LCHuv
  test('Luv to LCHuv (defaults)', () => {
    let [L, C, H] = converter.Luv_to_LCHuv(Luv);
    expect(L).toBeCloseTo(55);
    expect(C).toBeCloseTo(86.6833);
    expect(H).toBeCloseTo(258.6901);
  });

  // RGB
  test('Luv to RGB (defaults)', () => {
    let [R, G, B] = converter.Luv_to_RGB(Luv);
    expect(R).toBeCloseTo(101.6228);
    expect(G).toBeCloseTo(125.5121);
    expect(B).toBeCloseTo(237.6312);
  });

});