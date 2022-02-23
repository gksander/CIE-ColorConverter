// See http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html for details on these computations.

import { Matrix, Matrix_3x3, NumericTriple } from "./Matrix";

export class ColorConverter {
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
