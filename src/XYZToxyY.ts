import { NumericTriple } from "./Matrix";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { Options } from "./types";
import { DEFAULT_OPTIONS } from "./consts";

export const XYZToxyY = (
  XYZ: NumericTriple,
  { refWhite = DEFAULT_OPTIONS.REF_WHITE }: Pick<Options, "refWhite"> = {},
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
