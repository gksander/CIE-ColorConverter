import { NumericTriple } from "./Matrix";
import { DEFAULT_OPTIONS, kE, kK } from "./consts";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { Options } from "./types";

export const XYZToLuv = (
  XYZ: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
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
