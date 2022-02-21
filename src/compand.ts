import { GammaModelType } from "./types";
import { getGammaValue } from "./getGammaValue";

export const compand = (linear: number, gammaModel: GammaModelType): number => {
  let G = getGammaValue(gammaModel);

  // Depends on sign of Gamma
  if (G > 0) {
    return linear >= 0 ? Math.pow(linear, 1 / G) : -Math.pow(-linear, 1 / G);
  } else if (G < 0) {
    /** sRGB */
    let sign = 1;
    if (linear < 0) {
      sign = -1;
      linear = -linear;
    }
    return (
      sign *
      (linear <= 0.0031308
        ? linear * 12.92
        : 1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055)
    );
  } else {
    /** L* */
    let sign = 1;
    if (linear < 0) {
      sign = -1;
      linear = -linear;
    }
    return (
      sign *
      (linear <= 216.0 / 24389.0
        ? (linear * 24389.0) / 2700.0
        : 1.16 * Math.pow(linear, 1.0 / 3.0) - 0.16)
    );
  }
};
