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
   * Convert RGB to Lab
   * @param RGB RGB triple in range [0, 255]
   */
  RGB_to_Lab(RGB: NumericTriple) {
    return this.XYZ_to_Lab(this.RGB_to_XYZ(RGB));
  }
}

  /**
   * @param XYZ XYZ Triple
   */
  XYZ_to_LCHab(XYZ: NumericTriple): NumericTriple {
    return this.Lab_to_LCHab(this.XYZ_to_Lab(XYZ));
  }

  /**
   * @param XYZ XYZ triple
   */
  XYZ_to_LCHuv(XYZ: NumericTriple): NumericTriple {
    return this.Luv_to_LCHuv(this.XYZ_to_Luv(XYZ));
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
