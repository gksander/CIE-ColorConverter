import { NumericTriple } from "./Matrix";
import { DEFAULT_OPTIONS, kE, kK } from "./consts";
import { Options } from "./types";
import { XYZToLab, XYZToLuv, XYZToRGB } from "./XYZ";
import { LabToLCHab } from "./Lab";
import { LuvToLCHuv } from "./Luv";

export const xyYToXYZ = (xyY: NumericTriple): NumericTriple => {
  const [x, y, Y] = xyY;
  if (y < 0.000001) {
    return [0, 0, 0];
  } else {
    return [(x * Y) / y, Y, ((1 - x - y) * Y) / y];
  }
};

export const xyYToLab = (
  xyY: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return XYZToLab(xyYToXYZ(xyY), { refWhite });
};

export const xyYToLCHab = (
  xyY: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return LabToLCHab(XYZToLab(xyYToXYZ(xyY), { refWhite }));
};

export const xyYToLuv = (
  xyY: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return XYZToLuv(xyYToXYZ(xyY), { refWhite });
};

export const xyYToLCHuv = (
  xyY: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return LuvToLCHuv(XYZToLuv(xyYToXYZ(xyY), { refWhite }));
};

export const xyYToRGB = (
  xyY: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: Options = {},
): NumericTriple => {
  return XYZToRGB(xyYToXYZ(xyY), {
    adaptation,
    rgbModel,
    refWhite,
    gammaModel,
  });
};
