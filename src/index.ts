// See http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html for details on these computations.

import { Matrix, Matrix_3x3, NumericTriple } from "./Matrix";

// RefWhite Type
type RefWhiteType =
  | "A"
  | "B"
  | "C"
  | "D50"
  | "D55"
  | "D65"
  | "D75"
  | "E"
  | "F2"
  | "F7"
  | "F11";

// RGB Model
type RGBModelType =
  | "Adobe RGB (1998)"
  | "AppleRGB"
  | "Best RGB"
  | "Beta RGB"
  | "Bruce RGB"
  | "CIE RGB"
  | "ColorMatch RGB"
  | "Don RGB 4"
  | "ECI RGB v2"
  | "Ekta Space PS5"
  | "NTSC RGB"
  | "PAL/SECAM RGB"
  | "ProPhoto RGB"
  | "SMPTE-C RGB"
  | "sRGB"
  | "Wide Gamut RGB";

// Gamma Type
type GammaModelType = "1.0" | "1.8" | "2.2" | "sRGB" | "L*";

// Adaptation type
type AdaptationType = "Bradford" | "von Kries" | "XYZ Scaling" | "None";

export default class ColorConverter {
  // Properties to be set on instantiation
  RefWhite: RefWhiteType = "D50";
  RgbModel: RGBModelType = "sRGB";
  GammaModel: GammaModelType = "sRGB";
  Adaptation: AdaptationType = "Bradford";
  kE: number = 216 / 24389;
  kK = 24389 / 27;

  // Constructor
  constructor(
    RefWhite: RefWhiteType = "D50",
    RgbModel: RGBModelType = "sRGB",
    GammaModel: GammaModelType = "sRGB",
    Adaptation: AdaptationType = "Bradford",
  ) {
    this.RefWhite = RefWhite;
    this.RgbModel = RgbModel;
    this.GammaModel = GammaModel;
    this.Adaptation = Adaptation;
  }

  // Computed: RefWhite Matrix
  get Mtx_RefWhite(): NumericTriple {
    switch (this.RefWhite) {
      case "A":
        return [1.0985, 1, 0.35585];
      case "B":
        return [0.99072, 1, 0.85223];
      case "C":
        return [0.98074, 1, 1.18232];
      case "D50":
        return [0.96422, 1, 0.82521];
      case "D55":
        return [0.95682, 1, 0.92149];
      case "D65":
        return [0.95047, 1, 1.0888];
      case "D75":
        return [0.94972, 1, 1.22638];
      case "E":
        return [1, 1, 1];
      case "F2":
        return [0.99186, 1, 0.67393];
      case "F7":
        return [0.95041, 1, 1.08747];
      case "F11":
        return [1.00962, 1, 0.6435];
      default:
        return [1, 1, 1];
    }
  }

  // Computed: RefWhite RGB Matrix
  get Mtx_RefWhiteRGB(): NumericTriple {
    switch (this.RgbModel) {
      case "Adobe RGB (1998)":
        return [0.95047, 1, 1.08883];
      case "AppleRGB":
        return [0.95047, 1, 1.08883];
      case "Best RGB":
        return [0.96422, 1, 0.82521];
      case "Beta RGB":
        return [0.96422, 1, 0.82521];
      case "Bruce RGB":
        return [0.95047, 1, 1.08883];
      case "CIE RGB":
        return [1, 1, 1];
      case "ColorMatch RGB":
        return [0.96422, 1, 0.82521];
      case "Don RGB 4":
        return [0.96422, 1, 0.82521];
      case "ECI RGB v2":
        return [0.96422, 1, 0.82521];
      case "Ekta Space PS5":
        return [0.96422, 1, 0.82521];
      case "NTSC RGB":
        return [0.98074, 1, 1.18232];
      case "PAL/SECAM RGB":
        return [0.95047, 1, 1.08883];
      case "ProPhoto RGB":
        return [0.96422, 1, 0.82521];
      case "SMPTE-C RGB":
        return [0.95047, 1, 1.08883];
      case "sRGB":
        return [0.95047, 1, 1.08883];
      case "Wide Gamut RGB":
        return [0.96422, 1, 0.82521];
    }
  }

  // Computed: GammaRGB + Index
  get GammaRGB(): { value: number; index: number } {
    switch (this.RgbModel) {
      case "Adobe RGB (1998)":
        return { value: 2.2, index: 2 };
      case "AppleRGB":
        return { value: 1.8, index: 1 };
      case "Best RGB":
        return { value: 2.2, index: 2 };
      case "Beta RGB":
        return { value: 2.2, index: 2 };
      case "Bruce RGB":
        return { value: 2.2, index: 2 };
      case "CIE RGB":
        return { value: 2.2, index: 2 };
      case "ColorMatch RGB":
        return { value: 1.8, index: 2 };
      case "Don RGB 4":
        return { value: 2.2, index: 2 };
      case "ECI RGB v2":
        return { value: 0, index: 4 };
      case "Ekta Space PS5":
        return { value: 2.2, index: 2 };
      case "NTSC RGB":
        return { value: 2.2, index: 2 };
      case "PAL/SECAM RGB":
        return { value: 2.2, index: 2 };
      case "ProPhoto RGB":
        return { value: 1.8, index: 1 };
      case "SMPTE-C RGB":
        return { value: 2.2, index: 2 };
      case "sRGB":
        return { value: -2.2, index: 3 };
      case "Wide Gamut RGB":
        return { value: 2.2, index: 2 };
    }
  }

  // Computed: Gamma value
  get Gamma(): number {
    switch (this.GammaModel.toString()) {
      case "1.0":
        return 1;
      case "1.8":
        return 1.8;
      case "2.2":
        return 2.2;
      case "sRGB":
        return -2.2;
      case "L*":
        return 0;
      default:
        return 1;
    }
  }

  // Computed: RGB to XYZ matrix
  // Values come from table on http://www.brucelindbloom.com/
  get Mtx_RGB2XYZ(): Matrix_3x3 {
    let xr, yr, xg, yg, xb, yb;
    switch (this.RgbModel) {
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

    let X_r = xr / yr,
      Y_r = 1,
      Z_r = (1 - xr - yr) / yr,
      X_g = xg / yg,
      Y_g = 1,
      Z_g = (1 - xg - yg) / yg,
      X_b = xb / yb,
      Y_b = 1,
      Z_b = (1 - xb - yb) / yb,
      RW_RGB = this.Mtx_RefWhiteRGB,
      X_W = RW_RGB[0],
      Y_W = RW_RGB[1],
      Z_W = RW_RGB[2];

    let [S_r, S_g, S_b] = Matrix.multiply_3x3_times_triple(
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
  } // End Mtx_RGB2XYZ

  // Computed: Matrix Adaptaion
  get MtxAdp(): Matrix_3x3 {
    switch (this.Adaptation) {
      case "Bradford": {
        return [
          [0.8951, -0.7502, 0.0389],
          [0.2664, 1.7135, -0.0685],
          [-0.1614, 0.0367, 1.0296],
        ];
      }
      case "von Kries": {
        return [
          [0.40024, -0.2263, 0],
          [0.7076, 1.16532, 0],
          [-0.08081, 0.0457, 0.91822],
        ];
      }
      case "XYZ Scaling":
      case "None": {
        return [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ];
      }
    }
  } // End matrix Adaptation

  /**
   *
   * @param {number} linear Linear value
   * @param {number} Gamma Gamma value
   */
  compand(linear: number): number {
    let G = this.Gamma;
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
  }

  /**
   * Inverse compand function
   * @param {number} companded Companded value
   */
  inverse_compand(companded: number): number {
    let G = this.Gamma;
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
  }

  /**
   * Convert XYZ triple to RGB: ✅
   * @param {[number, number, number]} XYZ triple in range [0, 1]
   * Outputs RGB triple in range [0, 255]
   */
  XYZ_to_RGB(XYZ: NumericTriple): NumericTriple {
    let XYZd = XYZ;

    if (this.Adaptation != "None") {
      // Get source/domain scale factors
      let [As, Bs, Cs] = Matrix.multiply_triple_times_3x3(
        this.Mtx_RefWhite,
        this.MtxAdp,
      );
      let [Ad, Bd, Cd] = Matrix.multiply_triple_times_3x3(
        this.Mtx_RefWhiteRGB,
        this.MtxAdp,
      );

      XYZd = Matrix.multiply_triple_times_3x3(
        XYZ,
        Matrix.multiply_3x3_times_3x3(
          this.MtxAdp,
          Matrix.multiply_3x3_times_3x3(
            [
              [Ad / As, 0, 0],
              [0, Bd / Bs, 0],
              [0, 0, Cd / Cs],
            ],
            Matrix.inv(this.MtxAdp),
          ),
        ),
      );
    }

    let RGB = Matrix.multiply_triple_times_3x3(
      XYZd,
      Matrix.inv(this.Mtx_RGB2XYZ),
    );

    return RGB.map((v) => 255 * this.compand(v)) as NumericTriple;
  } // End XYZ_to_RGB

  /**
   * Convert RGB tripe to XYZ: ✅
   * @param {number[]} RGB RGB Triple
   * NOTE: This assumes RGB is scaled from [0, 255], XYZ in [0, 1]
   */
  RGB_to_XYZ(RGB: NumericTriple): NumericTriple {
    // Inverse compound the values
    RGB = RGB.map((v) => this.inverse_compand(v / 255)) as NumericTriple;
    // Linear RGB to XYZ
    let XYZ = Matrix.multiply_triple_times_3x3(RGB, this.Mtx_RGB2XYZ);

    // Adaptation if necessary
    if (this.Adaptation != "None") {
      // Get source/domain scale factors
      let [As, Bs, Cs] = Matrix.multiply_triple_times_3x3(
        this.Mtx_RefWhiteRGB,
        this.MtxAdp,
      );
      let [Ad, Bd, Cd] = Matrix.multiply_triple_times_3x3(
        this.Mtx_RefWhite,
        this.MtxAdp,
      );

      return Matrix.multiply_triple_times_3x3(
        XYZ,
        Matrix.multiply_3x3_times_3x3(
          this.MtxAdp,
          Matrix.multiply_3x3_times_3x3(
            [
              [Ad / As, 0, 0],
              [0, Bd / Bs, 0],
              [0, 0, Cd / Cs],
            ],
            Matrix.inv(this.MtxAdp),
          ),
        ),
      );
    } else {
      return XYZ;
    }
  } // End RGB to XYZ

  /**
   * Convert Lab to XYZ
   * @param Lab Lab triple
   * XYZ in range [0, 1]
   */
  Lab_to_XYZ(Lab: NumericTriple): NumericTriple {
    let L = Lab[0],
      a = Lab[1],
      b = Lab[2],
      f_y = (L + 16) / 116,
      f_x = a / 500 + f_y,
      f_z = f_y - b / 200,
      x_r =
        Math.pow(f_x, 3) > this.kE
          ? Math.pow(f_x, 3)
          : (116 * f_x - 16) / this.kK,
      y_r = L > this.kK * this.kE ? Math.pow((L + 16) / 116, 3) : L / this.kK,
      z_r =
        Math.pow(f_z, 3) > this.kE
          ? Math.pow(f_z, 3)
          : (116 * f_z - 16) / this.kK,
      RefWhite = this.Mtx_RefWhite;

    return [x_r * RefWhite[0], y_r * RefWhite[1], z_r * RefWhite[2]];
  } // End Lab to XYZ

  /**
   * Converts Lab triple to XYZ tripe in range [0, 1]
   * @param XYZ XYZ triple
   */
  XYZ_to_Lab(XYZ: NumericTriple): NumericTriple {
    let X = XYZ[0],
      Y = XYZ[1],
      Z = XYZ[2],
      RefWhite = this.Mtx_RefWhite,
      X_r = RefWhite[0],
      Y_r = RefWhite[1],
      Z_r = RefWhite[2],
      x_r = X / X_r,
      y_r = Y / Y_r,
      z_r = Z / Z_r,
      f_x = x_r > this.kE ? Math.pow(x_r, 1 / 3) : (this.kK * x_r + 16) / 116,
      f_y = y_r > this.kE ? Math.pow(y_r, 1 / 3) : (this.kK * y_r + 16) / 116,
      f_z = z_r > this.kE ? Math.pow(z_r, 1 / 3) : (this.kK * z_r + 16) / 116;

    return [116 * f_y - 16, 500 * (f_x - f_y), 200 * (f_y - f_z)];
  } // End XYZ_to_Lab

  /**
   * Convert Lab to RGB
   * @param Lab Lab triple
   * Note: RGB in [0, 255]
   */
  Lab_to_RGB(Lab) {
    return this.XYZ_to_RGB(this.Lab_to_XYZ(Lab));
  }

  /**
   * Convert RGB to Lab
   * @param RGB RGB triple in range [0, 255]
   */
  RGB_to_Lab(RGB) {
    return this.XYZ_to_Lab(this.RGB_to_XYZ(RGB));
  }

  /**
   * Convert xyY triple to XYZ triple
   * @param xyY xyY triple
   */
  xyY_to_XYZ(xyY: NumericTriple): NumericTriple {
    let [x, y, Y] = xyY;
    if (y < 0.000001) {
      return [0, 0, 0];
    } else {
      return [(x * Y) / y, Y, ((1 - x - y) * Y) / y];
    }
  } // End xyY_to_XYZ

  /**
   * Convert XYZ to xyY
   * @param XYZ XYZ triple in [0, 1]
   */
  XYZ_to_xyY(XYZ: NumericTriple): NumericTriple {
    let [X, Y, Z] = XYZ,
      Den = X + Y + Z;
    // Non-zero Den:
    if (Den > 0) {
      return [X / Den, Y / Den, Y];
    }
    // Zero den
    else {
      let [RW_X, RW_Y, RW_Z] = this.Mtx_RefWhite,
        RW_Den = RW_X + RW_Y + RW_Z;
      return [RW_X / RW_Den, RW_Y / RW_Den, Y];
    }
  }

  /**
   * Lab triple to LCH triple
   * @param Lab Lab triple
   */
  Lab_to_LCHab(Lab: NumericTriple): NumericTriple {
    let [L, a, b] = Lab;

    let H = (180 / Math.PI) * Math.atan2(b, a);
    return [
      L,
      Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
      H + (H >= 0 ? 0 : 360),
    ];
  }

  /**
   * LCH triple to Lab triple
   * @param LCH LCH Triple
   */
  LCHab_to_Lab(LCH: NumericTriple): NumericTriple {
    let [L, C, H] = LCH;
    return [
      L,
      C * Math.cos((H * Math.PI) / 180),
      C * Math.sin((H * Math.PI) / 180),
    ];
  }

  /**
   * @param XYZ XYZ Triple
   */
  XYZ_to_LCHab(XYZ: NumericTriple): NumericTriple {
    return this.Lab_to_LCHab(this.XYZ_to_Lab(XYZ));
  }

  /**
   * @param XYZ XYZ Triple
   */
  XYZ_to_Luv(XYZ: NumericTriple): NumericTriple {
    let [X, Y, Z] = XYZ,
      RefWhite = this.Mtx_RefWhite,
      X_r = RefWhite[0],
      Y_r = RefWhite[1],
      Z_r = RefWhite[2],
      Den = X + 15 * Y + 3 * Z,
      up = Den > 0 ? (4 * X) / Den : 0,
      vp = Den > 0 ? (9 * Y) / Den : 0,
      urp = (4 * X_r) / (X_r + 15 * Y_r + 3 * Z_r),
      vrp = (9 * Y_r) / (X_r + 15 * Y_r + 3 * Z_r),
      yr = Y / Y_r,
      L = yr > this.kE ? 116 * Math.pow(yr, 1 / 3) - 16 : this.kK * yr;

    return [L, 13 * L * (up - urp), 13 * L * (vp - vrp)];
  }

  /**
   * @param XYZ XYZ triple
   */
  XYZ_to_LCHuv(XYZ: NumericTriple): NumericTriple {
    return this.Luv_to_LCHuv(this.XYZ_to_Luv(XYZ));
  }

  /**
   * Luv to LCHuv
   * @param Luv Luv triple
   */
  Luv_to_LCHuv(Luv: NumericTriple): NumericTriple {
    let [L, u, v] = Luv;
    let H = (180 / Math.PI) * Math.atan2(v, u);

    return [
      L,
      Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2)),
      H + (H >= 0 ? 0 : 360),
    ];
  }

  /**
   * @param xyY xyY Triple
   */
  xyY_to_Lab(xyY: NumericTriple): NumericTriple {
    return this.XYZ_to_Lab(this.xyY_to_XYZ(xyY));
  }

  /**
   * @param xyY xyY Triple
   */
  xyY_to_LCHab(xyY: NumericTriple): NumericTriple {
    return this.Lab_to_LCHab(this.XYZ_to_Lab(this.xyY_to_XYZ(xyY)));
  }

  /**
   * @param xyY xyY Triple
   */
  xyY_to_Luv(xyY: NumericTriple): NumericTriple {
    return this.XYZ_to_Luv(this.xyY_to_XYZ(xyY));
  }

  /**
   * @param xyY xyY triple
   */
  xyY_to_LCHuv(xyY: NumericTriple): NumericTriple {
    return this.Luv_to_LCHuv(this.XYZ_to_Luv(this.xyY_to_XYZ(xyY)));
  }

  /**
   * @param xyY xyY Triple
   */
  xyY_to_RGB(xyY: NumericTriple): NumericTriple {
    return this.XYZ_to_RGB(this.xyY_to_XYZ(xyY));
  }

  /**
   * @param Lab Lab triple
   */
  Lab_to_xyY(Lab: NumericTriple): NumericTriple {
    return this.XYZ_to_xyY(this.Lab_to_XYZ(Lab));
  }

  /**
   * @param Lab Lab triple
   */
  Lab_to_Luv(Lab: NumericTriple): NumericTriple {
    return this.XYZ_to_Luv(this.Lab_to_XYZ(Lab));
  }

  /**
   * @param Lab Lab triple
   */
  Lab_to_LCHuv(Lab: NumericTriple): NumericTriple {
    return this.Luv_to_LCHuv(this.Lab_to_Luv(Lab));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHab_to_XYZ(LCH: NumericTriple): NumericTriple {
    return this.Lab_to_XYZ(this.LCHab_to_Lab(LCH));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHab_to_xyY(LCH: NumericTriple): NumericTriple {
    return this.XYZ_to_xyY(this.Lab_to_XYZ(this.LCHab_to_Lab(LCH)));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHab_to_Luv(LCH: NumericTriple): NumericTriple {
    return this.XYZ_to_Luv(this.Lab_to_XYZ(this.LCHab_to_Lab(LCH)));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHab_to_LCHuv(LCH: NumericTriple): NumericTriple {
    return this.Luv_to_LCHuv(this.LCHab_to_Luv(LCH));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHab_to_RGB(LCH: NumericTriple): NumericTriple {
    return this.XYZ_to_RGB(this.LCHab_to_XYZ(LCH));
  }

  /**
   * @param Luv NumericTriple
   */
  Luv_to_XYZ(Luv: NumericTriple): NumericTriple {
    let [L, u, v] = Luv;

    let Y = L > this.kK * this.kE ? Math.pow((L + 16) / 116, 3) : L / this.kK;

    let RefWhite = this.Mtx_RefWhite,
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
  }

  /**
   * @param Luv NumericTriple
   */
  Luv_to_xyY(Luv: NumericTriple): NumericTriple {
    return this.XYZ_to_xyY(this.Luv_to_XYZ(Luv));
  }

  /**
   * @param Luv NumericTriple
   */
  Luv_to_Lab(Luv: NumericTriple): NumericTriple {
    return this.XYZ_to_Lab(this.Luv_to_XYZ(Luv));
  }

  /**
   * @param Luv NumericTriple
   */
  Luv_to_LCHab(Luv: NumericTriple): NumericTriple {
    return this.Lab_to_LCHab(this.Luv_to_Lab(Luv));
  }

  /**
   * @param Luv NumericTriple
   */
  Luv_to_RGB(Luv: NumericTriple): NumericTriple {
    return this.XYZ_to_RGB(this.Luv_to_XYZ(Luv));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHuv_to_Luv(LCH: NumericTriple): NumericTriple {
    let [L, C, H] = LCH;

    return [
      L,
      C * Math.cos((H * Math.PI) / 180),
      C * Math.sin((H * Math.PI) / 180),
    ];
  }

  /**
   * @param LCH NumericTriple
   */
  LCHuv_to_XYZ(LCH: NumericTriple): NumericTriple {
    return this.Luv_to_XYZ(this.LCHuv_to_Luv(LCH));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHuv_to_xyY(LCH: NumericTriple): NumericTriple {
    return this.XYZ_to_xyY(this.LCHuv_to_XYZ(LCH));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHuv_to_Lab(LCH: NumericTriple): NumericTriple {
    return this.XYZ_to_Lab(this.LCHuv_to_XYZ(LCH));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHuv_to_LCHab(LCH: NumericTriple): NumericTriple {
    return this.Lab_to_LCHab(this.LCHuv_to_Lab(LCH));
  }

  /**
   * @param LCH NumericTriple
   */
  LCHuv_to_RGB(LCH: NumericTriple): NumericTriple {
    return this.XYZ_to_RGB(this.LCHuv_to_XYZ(LCH));
  }

  /**
   * @param RGB NumericTriple
   */
  RGB_to_xyY(RGB: NumericTriple): NumericTriple {
    return this.XYZ_to_xyY(this.RGB_to_XYZ(RGB));
  }

  /**
   * @param RGB NumericTriple
   */
  RGB_to_LCHab(RGB: NumericTriple): NumericTriple {
    return this.Lab_to_LCHab(this.RGB_to_Lab(RGB));
  }

  /**
   * @param RGB NumericTriple
   */
  RGB_to_Luv(RGB: NumericTriple): NumericTriple {
    return this.XYZ_to_Luv(this.RGB_to_XYZ(RGB));
  }

  /**
   * @param RGB NumericTriple
   */
  RGB_to_LCHuv(RGB: NumericTriple): NumericTriple {
    return this.Luv_to_LCHuv(this.RGB_to_Luv(RGB));
  }
} // End class definition
