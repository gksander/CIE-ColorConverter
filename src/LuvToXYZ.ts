import { NumericTriple } from "./Matrix";
import { DEFAULT_OPTIONS, kE, kK } from "./consts";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { Options } from "./types";

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
