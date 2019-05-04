import CIECC from '../src/index';
type NT = [number, number, number];

describe('XYZ conversion', () => {
  let converter = new CIECC();

  // Start with default values for RefWhite/RGG/etc.
  let XYZ: NT = [0.5, 0.5, 0.5];

  // xyY
  test('XYZ to xyY (defaults)', () => {
    let [x, y, Y] = converter.XYZ_to_xyY(XYZ);
    expect(x).toBeCloseTo(0.333333);
    expect(y).toBeCloseTo(0.333333);
    expect(Y).toBeCloseTo(0.5);
  });

  // Lab
  test('XYZ to Lab (defaults)', () => {
    let [L, a, b] = converter.XYZ_to_Lab(XYZ);
    expect(L).toBeCloseTo(76.0693);
    expect(a).toBeCloseTo(4.8492);
    expect(b).toBeCloseTo(-10.4981);
  });

  // LCHab
  test('XYZ to LCHab (defaults)', () => {
    let [L, C, H] = converter.XYZ_to_LCHab(XYZ);
    expect(L).toBeCloseTo(76.0693);
    expect(C).toBeCloseTo(11.564);
    expect(H).toBeCloseTo(294.7929);
  });

  // Luv
  test('XYZ to Luv (defaults)', () => {
    let [L, u, v] = converter.XYZ_to_Luv(XYZ);
    expect(L).toBeCloseTo(76.0693);
    expect(u).toBeCloseTo(1.3511);
    expect(v).toBeCloseTo(-14.2295);
  });

  // LCHuv
  test('XYZ to LCHuv (defaults)', () => {
    let [L, C, H] = converter.XYZ_to_LCHuv(XYZ);
    expect(L).toBeCloseTo(76.0693);
    expect(C).toBeCloseTo(14.2935);
    expect(H).toBeCloseTo(275.424);
  });

  // RGB
  test('XYZ to RGB (defaults)', () => {
    let [R, G, B] = converter.XYZ_to_RGB(XYZ);
    expect(R).toBeCloseTo(189.7141);
    expect(G).toBeCloseTo(185.0451);
    expect(B).toBeCloseTo(207.0205);
  });

});