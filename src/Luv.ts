import { NumericTriple } from "./Matrix";
import { DEFAULT_OPTIONS, kE, kK } from "./consts";
import { Options } from "./types";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { XYZToLab, XYZToRGB, XYZToxyY } from "./XYZ";
import { LabToLCHab } from "./Lab";

export const LuvToLCHuv = (Luv: NumericTriple): NumericTriple => {
  const [L, u, v] = Luv;
  const H = (180 / Math.PI) * Math.atan2(v, u);

  return [
    L,
    Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2)),
    H + (H >= 0 ? 0 : 360),
  ];
};

export const LuvToXYZ = (
  Luv: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  const [L, u, v] = Luv;

  const Y = L > kK * kE ? Math.pow((L + 16) / 116, 3) : L / kK;

  const RefWhite = getRefWhiteMtx(refWhite),
    X_r = RefWhite[0],
    Y_r = RefWhite[1],
    Z_r = RefWhite[2],
    Den = X_r + 15 * Y_r + 3 * Z_r,
    v_0 = (9 * Y_r) / Den,
    u_0 = (4 * X_r) / Den,
    d = Y * ((39 * L) / (v + 13 * L * v_0) - 5),
    c = -1 / 3,
    b = -5 * Y,
    a = (1 / 3) * ((52 * L) / (u + 13 * L * u_0) - 1),
    X = (d - b) / (a - c),
    Z = X * a + b;

  return [X, Y, Z];
};

export const LuvToxyY = (
  Luv: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return XYZToxyY(LuvToXYZ(Luv, { refWhite }), { refWhite });
};

export const LuvToLab = (
  Luv: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return XYZToLab(LuvToXYZ(Luv, { refWhite }), { refWhite });
};

export const LuvToLCHab = (
  Luv: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
): NumericTriple => {
  return LabToLCHab(LuvToLab(Luv, { refWhite }));
};

export const LuvToRGB = (
  Luv: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: Options = {},
): NumericTriple => {
  return XYZToRGB(LuvToXYZ(Luv, { refWhite }), {
    adaptation,
    refWhite,
    rgbModel,
    gammaModel,
  });
};
