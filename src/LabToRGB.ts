import { NumericTriple } from "./Matrix";
import { XYZToRGB } from "./XYZToRGB";
import { LabToXYZ } from "./LabToXYZ";
import { DEFAULT_OPTIONS } from "./consts";
import { Options } from "./types";

export const LabToRGB = (
  Lab: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: Options = {},
): NumericTriple => {
  return XYZToRGB(LabToXYZ(Lab, { refWhite }), {
    adaptation,
    refWhite,
    rgbModel,
    gammaModel,
  });
};
