import { RGBModelType } from "./types";
import { NumericTriple } from "./Matrix";

/**
 * RefWhite RGB Matrix
 */
export const getRefWhiteRgbMtx = (rgbModel: RGBModelType): NumericTriple =>
  Map[rgbModel];

const Map: Record<RGBModelType, NumericTriple> = {
  "Adobe RGB (1998)": [0.95047, 1, 1.08883],
  AppleRGB: [0.95047, 1, 1.08883],
  "Best RGB": [0.96422, 1, 0.82521],
  "Beta RGB": [0.96422, 1, 0.82521],
  "Bruce RGB": [0.95047, 1, 1.08883],
  "CIE RGB": [1, 1, 1],
  "ColorMatch RGB": [0.96422, 1, 0.82521],
  "Don RGB 4": [0.96422, 1, 0.82521],
  "ECI RGB v2": [0.96422, 1, 0.82521],
  "Ekta Space PS5": [0.96422, 1, 0.82521],
  "NTSC RGB": [0.98074, 1, 1.18232],
  "PAL/SECAM RGB": [0.95047, 1, 1.08883],
  "ProPhoto RGB": [0.96422, 1, 0.82521],
  "SMPTE-C RGB": [0.95047, 1, 1.08883],
  sRGB: [0.95047, 1, 1.08883],
  "Wide Gamut RGB": [0.96422, 1, 0.82521],
};
