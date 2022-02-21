import { NumericTriple } from "./Matrix";
import { DEFAULT_OPTIONS, kE, kK } from "./consts";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { Options } from "./types";

/**
 * Converts Lab triple to XYZ tripe in range [0, 1]
 */
export const xyzToLab = (
  xyz: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  const X = xyz[0],
    Y = xyz[1],
    Z = xyz[2],
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
