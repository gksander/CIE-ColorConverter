import { NumericTriple } from "./Matrix";
import { LabToXYZ } from "./Lab";
import { DEFAULT_OPTIONS } from "./consts";
import { Options } from "./types";
import { XYZToLuv, XYZToRGB, XYZToxyY } from "./XYZ";
import { LuvToLCHuv } from "./Luv";

export const LCHabToLab = (LCH: NumericTriple): NumericTriple => {
  const [L, C, H] = LCH;
  return [
    L,
    C * Math.cos((H * Math.PI) / 180),
    C * Math.sin((H * Math.PI) / 180),
  ];
};

export const LCHabToXYZ = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return LabToXYZ(LCHabToLab(LCH), { refWhite });
};

export const LCHabToxyY = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return XYZToxyY(LabToXYZ(LCHabToLab(LCH), { refWhite }), { refWhite });
};

export const LCHabToLuv = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return XYZToLuv(LabToXYZ(LCHabToLab(LCH), { refWhite }), { refWhite });
};

export const LCHabToLCHuv = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return LuvToLCHuv(LCHabToLuv(LCH, { refWhite }));
};

export const LCHabToRGB = (
  LCH: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: Options = {},
): NumericTriple => {
  return XYZToRGB(LCHabToXYZ(LCH, { refWhite }), {
    adaptation,
    refWhite,
    rgbModel,
    gammaModel,
  });
};
