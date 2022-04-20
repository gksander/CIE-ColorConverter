// RefWhite Type
export type RefWhiteType =
  | "A"
  | "B"
  | "C"
  | "D50"
  | "D55"
  | "D65"
  | "D75"
  | "E"
  | "F2"
  | "F7"
  | "F11";

// RGB Model
export type RGBModelType =
  | "Adobe RGB (1998)"
  | "AppleRGB"
  | "Best RGB"
  | "Beta RGB"
  | "Bruce RGB"
  | "CIE RGB"
  | "ColorMatch RGB"
  | "Don RGB 4"
  | "ECI RGB v2"
  | "Ekta Space PS5"
  | "NTSC RGB"
  | "PAL/SECAM RGB"
  | "ProPhoto RGB"
  | "SMPTE-C RGB"
  | "sRGB"
  | "Wide Gamut RGB";

// Gamma Type
export type GammaModelType = "1.0" | "1.8" | "2.2" | "sRGB" | "L*";

// Adaptation type
export type AdaptationType = "Bradford" | "von Kries" | "XYZ Scaling" | "None";

export type ConverterOptions = {
  refWhite?: RefWhiteType;
  rgbModel?: RGBModelType;
  gammaModel?: GammaModelType;
  adaptation?: AdaptationType;
};
