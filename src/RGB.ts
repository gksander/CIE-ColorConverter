import { Matrix, NumericTriple } from "./Matrix";
import { ConverterOptions } from "./types";
import { inverseCompand } from "./inverseCompand";
import { DEFAULT_OPTIONS } from "./consts";
import { getMtxAdaptation } from "./getMtxAdaptation";
import { getRefWhiteRgbMtx } from "./getRefWhiteRgbMtx";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { getRgbToXyzMtx } from "./getRgbToXyzMtx";
import { XYZToLab, XYZToLuv, XYZToxyY } from "./XYZ";
import { LabToLCHab } from "./Lab";
import { LuvToLCHuv } from "./Luv";

export const RGBToXYZ = (
  RGB: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
  }: ConverterOptions = {},
): NumericTriple => {
  // utils
  const MtxAdp = getMtxAdaptation(adaptation);
  const Mtx_RefWhiteRGB = getRefWhiteRgbMtx(rgbModel);
  const Mtx_RefWhite = getRefWhiteMtx(refWhite);
  const Mtx_RGB2XYZ = getRgbToXyzMtx(rgbModel);

  // Inverse compound the values
  RGB = RGB.map((v) =>
    inverseCompand(v / 255, gammaModel),
  ) as unknown as NumericTriple;
  // Linear RGB to XYZ
  let XYZ = Matrix.multiply_triple_times_3x3(RGB, Mtx_RGB2XYZ);

  // Adaptation if necessary
  if (adaptation != "None") {
    // Get source/domain scale factors
    const [As, Bs, Cs] = Matrix.multiply_triple_times_3x3(
      Mtx_RefWhiteRGB,
      MtxAdp,
    );
    const [Ad, Bd, Cd] = Matrix.multiply_triple_times_3x3(Mtx_RefWhite, MtxAdp);

    return Matrix.multiply_triple_times_3x3(
      XYZ,
      Matrix.multiply_3x3_times_3x3(
        MtxAdp,
        Matrix.multiply_3x3_times_3x3(
          [
            [Ad / As, 0, 0],
            [0, Bd / Bs, 0],
            [0, 0, Cd / Cs],
          ],
          Matrix.inv(MtxAdp),
        ),
      ),
    );
  } else {
    return XYZ;
  }
};

export const RGBToLab = (
  RGB: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
  }: ConverterOptions = {},
): NumericTriple => {
  return XYZToLab(
    RGBToXYZ(RGB, { adaptation, rgbModel, gammaModel, refWhite }),
    { refWhite },
  );
};

export const RGBToxyY = (
  RGB: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
  }: ConverterOptions = {},
): NumericTriple => {
  return XYZToxyY(
    RGBToXYZ(RGB, { adaptation, rgbModel, refWhite, gammaModel }),
    { refWhite },
  );
};

export const RGBToLCHab = (
  RGB: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
  }: ConverterOptions = {},
): NumericTriple => {
  return LabToLCHab(
    RGBToLab(RGB, { adaptation, rgbModel, refWhite, gammaModel }),
  );
};

export const RGBToLuv = (
  RGB: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
  }: ConverterOptions = {},
): NumericTriple => {
  return XYZToLuv(
    RGBToXYZ(RGB, { adaptation, rgbModel, refWhite, gammaModel }),
    { refWhite },
  );
};

export const RGBToLCHuv = (
  RGB: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
  }: ConverterOptions = {},
): NumericTriple => {
  return LuvToLCHuv(
    RGBToLuv(RGB, { adaptation, rgbModel, refWhite, gammaModel }),
  );
};
