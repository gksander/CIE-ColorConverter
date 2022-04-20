import { Matrix, NumericTriple } from "./Matrix";
import { DEFAULT_OPTIONS, kE, kK } from "./consts";
import { ConverterOptions } from "./types";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { getMtxAdaptation } from "./getMtxAdaptation";
import { getRefWhiteRgbMtx } from "./getRefWhiteRgbMtx";
import { getRgbToXyzMtx } from "./getRgbToXyzMtx";
import { compand } from "./compand";
import { LabToLCHab } from "./Lab";
import { LuvToLCHuv } from "./Luv";

export const XYZToLab = (
  XYZ: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  const X = XYZ[0],
    Y = XYZ[1],
    Z = XYZ[2],
    RefWhite = getRefWhiteMtx(refWhite),
    X_r = RefWhite[0],
    Y_r = RefWhite[1],
    Z_r = RefWhite[2],
    x_r = X / X_r,
    y_r = Y / Y_r,
    z_r = Z / Z_r,
    f_x = x_r > kE ? Math.pow(x_r, 1 / 3) : (kK * x_r + 16) / 116,
    f_y = y_r > kE ? Math.pow(y_r, 1 / 3) : (kK * y_r + 16) / 116,
    f_z = z_r > kE ? Math.pow(z_r, 1 / 3) : (kK * z_r + 16) / 116;

  return [116 * f_y - 16, 500 * (f_x - f_y), 200 * (f_y - f_z)];
};

export const XYZToLuv = (
  XYZ: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  const [X, Y, Z] = XYZ,
    RefWhite = getRefWhiteMtx(refWhite),
    X_r = RefWhite[0],
    Y_r = RefWhite[1],
    Z_r = RefWhite[2],
    Den = X + 15 * Y + 3 * Z,
    up = Den > 0 ? (4 * X) / Den : 0,
    vp = Den > 0 ? (9 * Y) / Den : 0,
    urp = (4 * X_r) / (X_r + 15 * Y_r + 3 * Z_r),
    vrp = (9 * Y_r) / (X_r + 15 * Y_r + 3 * Z_r),
    yr = Y / Y_r,
    L = yr > kE ? 116 * Math.pow(yr, 1 / 3) - 16 : kK * yr;

  return [L, 13 * L * (up - urp), 13 * L * (vp - vrp)];
};

export const XYZToRGB = (
  XYZ: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: ConverterOptions = {},
): NumericTriple => {
  let XYZd = XYZ;
  const mtxAdp = getMtxAdaptation(adaptation);

  if (adaptation != "None") {
    // Get source/domain scale factors
    const [As, Bs, Cs] = Matrix.multiply_triple_times_3x3(
      getRefWhiteMtx(refWhite),
      mtxAdp,
    );
    let [Ad, Bd, Cd] = Matrix.multiply_triple_times_3x3(
      getRefWhiteRgbMtx(rgbModel),
      mtxAdp,
    );

    XYZd = Matrix.multiply_triple_times_3x3(
      XYZ,
      Matrix.multiply_3x3_times_3x3(
        mtxAdp,
        Matrix.multiply_3x3_times_3x3(
          [
            [Ad / As, 0, 0],
            [0, Bd / Bs, 0],
            [0, 0, Cd / Cs],
          ],
          Matrix.inv(mtxAdp),
        ),
      ),
    );
  }

  const RGB = Matrix.multiply_triple_times_3x3(
    XYZd,
    Matrix.inv(getRgbToXyzMtx(rgbModel)),
  );

  return RGB.map(
    (v) => 255 * compand(v, gammaModel),
  ) as unknown as NumericTriple;
};

export const XYZToxyY = (
  XYZ: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  const [X, Y, Z] = XYZ,
    Den = X + Y + Z;
  // Non-zero Den:
  if (Den > 0) {
    return [X / Den, Y / Den, Y];
  }
  // Zero den
  else {
    let [RW_X, RW_Y, RW_Z] = getRefWhiteMtx(refWhite),
      RW_Den = RW_X + RW_Y + RW_Z;
    return [RW_X / RW_Den, RW_Y / RW_Den, Y];
  }
};

export const XYZToLCHab = (
  XYZ: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  return LabToLCHab(XYZToLab(XYZ, { refWhite }));
};

export const XYZToLCHuv = (
  XYZ: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<ConverterOptions, "refWhite"> = {},
): NumericTriple => {
  return LuvToLCHuv(XYZToLuv(XYZ, { refWhite }));
};
