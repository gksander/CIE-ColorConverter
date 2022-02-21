import { RGBModelType } from "./types";
import { Matrix, Matrix_3x3 } from "./Matrix";
import { getRefWhiteRgbMtx } from "./getRefWhiteRgbMtx";

// RGB to XYZ matrix
// Values come from table on http://www.brucelindbloom.com/
export const getRgbToXyzMtx = (rgbModel: RGBModelType): Matrix_3x3 => {
  let xr, yr, xg, yg, xb, yb;
  switch (rgbModel) {
    case "Adobe RGB (1998)": {
      [xr, yr, xg, yg, xb, yb] = [0.64, 0.33, 0.21, 0.71, 0.15, 0.06];
      break;
    }
    case "AppleRGB": {
      [xr, yr, xg, yg, xb, yb] = [0.625, 0.34, 0.28, 0.595, 0.155, 0.07];
      break;
    }
    case "Best RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.7347, 0.2653, 0.215, 0.775, 0.13, 0.035];
      break;
    }
    case "Beta RGB": {
      [xr, yr, xg, yg, xb, yb] = [
        0.6888, 0.3112, 0.1986, 0.7551, 0.1265, 0.0352,
      ];
      break;
    }
    case "Bruce RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.64, 0.33, 0.28, 0.65, 0.15, 0.06];
      break;
    }
    case "CIE RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.735, 0.265, 0.274, 0.717, 0.167, 0.009];
      break;
    }
    case "ColorMatch RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.63, 0.34, 0.295, 0.605, 0.15, 0.075];
      break;
    }
    case "Don RGB 4": {
      [xr, yr, xg, yg, xb, yb] = [0.696, 0.3, 0.215, 0.765, 0.13, 0.035];
      break;
    }
    case "ECI RGB v2": {
      [xr, yr, xg, yg, xb, yb] = [0.67, 0.33, 0.21, 0.71, 0.14, 0.08];
      break;
    }
    case "Ekta Space PS5": {
      [xr, yr, xg, yg, xb, yb] = [0.695, 0.305, 0.26, 0.7, 0.11, 0.005];
      break;
    }
    case "NTSC RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.67, 0.33, 0.21, 0.71, 0.14, 0.08];
      break;
    }
    case "PAL/SECAM RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.64, 0.33, 0.29, 0.6, 0.15, 0.06];
      break;
    }
    case "ProPhoto RGB": {
      [xr, yr, xg, yg, xb, yb] = [
        0.7347, 0.2653, 0.1596, 0.8404, 0.0366, 0.0001,
      ];
      break;
    }
    case "SMPTE-C RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.63, 0.34, 0.31, 0.595, 0.155, 0.07];
      break;
    }
    case "sRGB": {
      [xr, yr, xg, yg, xb, yb] = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];
      break;
    }
    case "Wide Gamut RGB": {
      [xr, yr, xg, yg, xb, yb] = [0.735, 0.265, 0.115, 0.826, 0.157, 0.018];
      break;
    }
  } // End switch

  const X_r = xr / yr,
    Y_r = 1,
    Z_r = (1 - xr - yr) / yr,
    X_g = xg / yg,
    Y_g = 1,
    Z_g = (1 - xg - yg) / yg,
    X_b = xb / yb,
    Y_b = 1,
    Z_b = (1 - xb - yb) / yb,
    RW_RGB = getRefWhiteRgbMtx(rgbModel),
    X_W = RW_RGB[0],
    Y_W = RW_RGB[1],
    Z_W = RW_RGB[2];

  const [S_r, S_g, S_b] = Matrix.multiply_3x3_times_triple(
    Matrix.inv([
      [X_r, X_g, X_b],
      [Y_r, Y_g, Y_b],
      [Z_r, Z_g, Z_b],
    ]),
    [X_W, Y_W, Z_W],
  );

  return Matrix.transpose([
    [S_r * X_r, S_g * X_g, S_b * X_b],
    [S_r * Y_r, S_g * Y_g, S_b * Y_b],
    [S_r * Z_r, S_g * Z_g, S_b * Z_b],
  ]);
};
