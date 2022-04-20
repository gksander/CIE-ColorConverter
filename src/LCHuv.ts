import { NumericTriple } from "./Matrix";
import { LuvToXYZ } from "./Luv";
import { DEFAULT_OPTIONS } from "./consts";
import { ConverterOptions } from "./types";
import { XYZToLab, XYZToRGB, XYZToxyY } from "./XYZ";
import { LabToLCHab } from "./Lab";

export const LCHuvToLuv = (LCH: NumericTriple): NumericTriple => {
  const [L, C, H] = LCH;

  return [
    L,
    C * Math.cos((H * Math.PI) / 180),
    C * Math.sin((H * Math.PI) / 180),
  ];
};

export const LCHuvToXYZ = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  return LuvToXYZ(LCHuvToLuv(LCH), { refWhite });
};

export const LCHuvToxyY = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  return XYZToxyY(LCHuvToXYZ(LCH, { refWhite }), { refWhite });
};

export const LCHuvToLab = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  return XYZToLab(LCHuvToXYZ(LCH, { refWhite }), { refWhite });
};

export const LCHuvToLCHab = (
  LCH: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  return LabToLCHab(LCHuvToLab(LCH, { refWhite }));
};

export const LCHuvToRGB = (
  LCH: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: ConverterOptions = {},
): NumericTriple => {
  return XYZToRGB(LCHuvToXYZ(LCH, { refWhite }), {
    adaptation,
    refWhite,
    rgbModel,
    gammaModel,
  });
};
