declare namespace CIEColorConverter {
  // RefWhite Type
  export type RefWhiteType = 
  "A" |
  "B" |
  "C" |
  "D50" |
  "D55" |
  "D65" |
  "D75" |
  "E" |
  "F2" |
  "F7" |
  "F11";

  // RGB Model
  export type RGBModelType = 
  "Adobe RGB (1998)" |
  "AppleRGB" |
  "Best RGB" |
  "Beta RGB" |
  "Bruce RGB" |
  "CIE RGB" |
  "ColorMatch RGB" |
  "Don RGB 4" |
  "ECI RGB v2" |
  "Ekta Space PS5" |
  "NTSC RGB" |
  "PAL/SECAM RGB" |
  "ProPhoto RGB" |
  "SMPTE-C RGB" |
  "sRGB" |
  "Wide Gamut RGB";

  // Gamma Type
  export type GammaModelType = 
  "1.0" |
  "1.8" |
  "2.2" |
  "sRGB" |
  "L*";

  // Adaptation type
  export type AdaptationType = 
  "Bradford" |
  "von Kries" |
  "XYZ Scaling" |
  "None";

  export type NumericTriple = [number, number, number];

  export type Matrix_3x3 = [
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ]



  export interface ColorConverter {
    RefWhite: RefWhiteType;
    RgbModel: RGBModelType;
    GammaModel: GammaModelType;
    Adaptation: AdaptationType;
    kE: number;
    kK: number;

    // constructor(RefWhite: RefWhiteType, RGBModel: RGBModelType, GammaModel: GammaModelType, Adaptation: AdaptationType);
    // Utilities
    Mtx_RefWhite: NumericTriple;
    Mtx_RefWhiteRGB: NumericTriple;
    GammaRGB: {value: number, index: number};
    Gamma: number;
    Mtx_RGB2XYZ: Matrix_3x3;
    MtxAdp: Matrix_3x3;
    compand(linear: number): number;
    inverse_compand(companded: number): number;

    // Conversion functions
    XYZ_to_RGB(XYZ: NumericTriple): NumericTriple;
    RGB_to_XYZ(RGB: NumericTriple): NumericTriple;
    Lab_to_XYZ(RGB: NumericTriple): NumericTriple;
    XYZ_to_Lab(RGB: NumericTriple): NumericTriple;
    Lab_to_RGB(RGB: NumericTriple): NumericTriple;
    RGB_to_Lab(RGB: NumericTriple): NumericTriple;
    xyY_to_XYZ(RGB: NumericTriple): NumericTriple;
    XYZ_to_xyY(RGB: NumericTriple): NumericTriple;
    Lab_to_LCHab(RGB: NumericTriple): NumericTriple;
    LCHab_to_Lab(RGB: NumericTriple): NumericTriple;
    XYZ_to_LCHab(RGB: NumericTriple): NumericTriple;
    XYZ_to_Luv(RGB: NumericTriple): NumericTriple;
    XYZ_to_LCHuv(RGB: NumericTriple): NumericTriple;
    Luv_to_LCHuv(RGB: NumericTriple): NumericTriple;
    xyY_to_LCHab(RGB: NumericTriple): NumericTriple;
    xyY_to_Luv(RGB: NumericTriple): NumericTriple;
    xyY_to_LCHuv(RGB: NumericTriple): NumericTriple;
    xyY_to_RGB(RGB: NumericTriple): NumericTriple;
    Lab_to_xyY(RGB: NumericTriple): NumericTriple;
    Lab_to_Luv(RGB: NumericTriple): NumericTriple;
    Lab_to_LCHuv(RGB: NumericTriple): NumericTriple;

  }
}

export default CIEColorConverter