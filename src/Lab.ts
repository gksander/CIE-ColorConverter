import { NumericTriple } from "./Matrix";
import { DEFAULT_OPTIONS, kE, kK } from "./consts";
import { Options } from "./types";
import { XYZToRGB } from "./XYZ";
import { getRefWhiteMtx } from "./getRefWhiteMtx";

export const LabToLCHab = (Lab: NumericTriple): NumericTriple => {
  const [L, a, b] = Lab;

  let H = (180 / Math.PI) * Math.atan2(b, a);
  return [
    L,
    Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
    H + (H >= 0 ? 0 : 360),
  ];
};

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

/**
 * Convert Lab to XYZ
 * XYZ in range [0, 1]
 */
export const LabToXYZ = (
  Lab: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  let L = Lab[0],
    a = Lab[1],
    b = Lab[2],
    f_y = (L + 16) / 116,
    f_x = a / 500 + f_y,
    f_z = f_y - b / 200,
    x_r = Math.pow(f_x, 3) > kE ? Math.pow(f_x, 3) : (116 * f_x - 16) / kK,
    y_r = L > kK * kE ? Math.pow((L + 16) / 116, 3) : L / kK,
    z_r = Math.pow(f_z, 3) > kE ? Math.pow(f_z, 3) : (116 * f_z - 16) / kK,
    RefWhite = getRefWhiteMtx(refWhite);

  return [x_r * RefWhite[0], y_r * RefWhite[1], z_r * RefWhite[2]];
};
