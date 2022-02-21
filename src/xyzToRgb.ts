import { Matrix, NumericTriple } from "./Matrix";
import { Options } from "./types";
import { getRefWhiteMtx } from "./getRefWhiteMtx";
import { DEFAULT_OPTIONS } from "./consts";
import { getMtxAdaptation } from "./getMtxAdaptation";
import { getRefWhiteRgbMtx } from "./getRefWhiteRgbMtx";
import { compand } from "./compand";
import { getRgbToXyzMtx } from "./getRgbToXyzMtx";

/**
 * XYZ to RGB
 * @param xyz
 * @param adaptation
 * @param refWhite
 * @param rgbModel
 * @param gammaModel
 */
export const xyzToRgb = (
  xyz: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: Options = {},
): NumericTriple => {
  let xyzD = xyz;
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

    xyzD = Matrix.multiply_triple_times_3x3(
      xyz,
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

  let RGB = Matrix.multiply_triple_times_3x3(xyzD, getRgbToXyzMtx(rgbModel));

  return RGB.map((v) => 255 * compand(v, gammaModel)) as NumericTriple;
};
