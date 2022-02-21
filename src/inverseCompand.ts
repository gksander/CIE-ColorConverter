import { GammaModelType } from "./types";
import { getGammaValue } from "./getGammaValue";

/**
 * Inverse compand function
 */
export const inverseCompand = (
  companded: number,
  gammaModel: GammaModelType,
): number => {
  const G = getGammaValue(gammaModel);

  if (G > 0) {
    return companded >= 0 ? Math.pow(companded, G) : -Math.pow(-companded, G);
  } else if (G < 0) {
    /** sRGB */
    let sign = 1;
    if (companded < 0) {
      sign = -1;
      companded = -companded;
    }
    return (
      sign *
      (companded <= 0.04045
        ? companded / 12.92
        : Math.pow((companded + 0.055) / 1.055, 2.4))
    );
  } else {
    /** L* */
    let sign = 1;
    if (companded < 0) {
      sign = -1;
      companded = -companded;
    }
    return (
      sign *
      (companded <= 0.08
        ? (2700.0 * companded) / 24389.0
        : (((1000000.0 * companded + 480000.0) * companded + 76800.0) *
            companded +
            4096.0) /
          1560896.0)
    );
  }
};
