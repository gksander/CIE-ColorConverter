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
 * @param XYZ
 * @param adaptation
 * @param refWhite
 * @param rgbModel
 * @param gammaModel
 */
export const XYZToRGB = (
  XYZ: NumericTriple,
  {
    adaptation = DEFAULT_OPTIONS.ADAPTION,
    refWhite = DEFAULT_OPTIONS.REF_WHITE,
    rgbModel = DEFAULT_OPTIONS.RGB_MODEL,
    gammaModel = DEFAULT_OPTIONS.GAMMA_MODEL,
  }: Options = {},
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

  return RGB.map((v) => 255 * compand(v, gammaModel)) as NumericTriple;
};
