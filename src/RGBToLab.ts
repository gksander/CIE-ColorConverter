import { NumericTriple } from "./Matrix";
import { XYZToLab } from "./XYZToLab";
import { RGBToXYZ } from "./RGBToXYZ";
import { DEFAULT_OPTIONS } from "./consts";
import { Options } from "./types";

export const RGBToLab = (
  RGB: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
  }: Options = {},
): NumericTriple => {
  return XYZToLab(
    RGBToXYZ(RGB, { adaptation, rgbModel, gammaModel, refWhite }),
    { refWhite },
  );
};
