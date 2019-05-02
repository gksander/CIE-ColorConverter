declare type RefWhiteType = "A" | "B" | "C" | "D50" | "D55" | "D65" | "D75" | "E" | "F2" | "F7" | "F11";
declare type RGBModelType = "Adobe RGB (1998)" | "AppleRGB" | "Best RGB" | "Beta RGB" | "Bruce RGB" | "CIE RGB" | "ColorMatch RGB" | "Don RGB 4" | "ECI RGB v2" | "Ekta Space PS5" | "NTSC RGB" | "PAL/SECAM RGB" | "ProPhoto RGB" | "SMPTE-C RGB" | "sRGB" | "Wide Gamut RGB";
declare type GammaModelType = "1.0" | "1.8" | "2.2" | "sRGB" | "L*";
declare type AdaptationType = "Bradford" | "von Kries" | "XYZ Scaling" | "None";
declare type NumericTriple = [number, number, number];
declare type Matrix_3x3 = [[number, number, number], [number, number, number], [number, number, number]];
export default class ColorConverter {
    RefWhite: RefWhiteType;
    RgbModel: RGBModelType;
    GammaModel: GammaModelType;
    Adaptation: AdaptationType;
    kE: number;
    kK: number;
    constructor(RefWhite?: RefWhiteType, RgbModel?: RGBModelType, GammaModel?: GammaModelType, Adaptation?: AdaptationType);
    readonly Mtx_RefWhite: NumericTriple;
    readonly Mtx_RefWhiteRGB: NumericTriple;
    readonly GammaRGB: {
        value: number;
        index: number;
    };
    readonly Gamma: number;
    readonly Mtx_RGB2XYZ: Matrix_3x3;
    readonly MtxAdp: Matrix_3x3;
    /**
     *
     * @param {number} linear Linear value
     * @param {number} Gamma Gamma value
     */
    compand(linear: number): number;
    /**
     * Inverse compand function
     * @param {number} companded Companded value
     */
    inverse_compand(companded: number): number;
    /**
     * Convert XYZ triple to RGB: ✅
     * @param {[number, number, number]} XYZ triple in range [0, 1]
     * Outputs RGB triple in range [0, 255]
     */
    XYZ_to_RGB(XYZ: NumericTriple): NumericTriple;
    /**
     * Convert RGB tripe to XYZ: ✅
     * @param {number[]} RGB RGB Triple
     * NOTE: This assumes RGB is scaled from [0, 255], XYZ in [0, 1]
     */
    RGB_to_XYZ(RGB: NumericTriple): NumericTriple;
    /**
     * Convert Lab to XYZ
     * @param Lab Lab triple
     * XYZ in range [0, 1]
     */
    Lab_to_XYZ(Lab: NumericTriple): NumericTriple;
    /**
     * Converts Lab triple to XYZ tripe in range [0, 1]
     * @param XYZ XYZ triple
     */
    XYZ_to_Lab(XYZ: NumericTriple): NumericTriple;
    /**
     * Convert Lab to RGB
     * @param Lab Lab triple
     * Note: RGB in [0, 255]
     */
    Lab_to_RGB(Lab: any): [number, number, number];
    /**
     * Convert RGB to Lab
     * @param RGB RGB triple in range [0, 255]
     */
    RGB_to_Lab(RGB: any): [number, number, number];
    /**
     * Convert xyY triple to XYZ triple
     * @param xyY xyY triple
     */
    xyY_to_XYZ(xyY: NumericTriple): NumericTriple;
    /**
     * Convert XYZ to xyY
     * @param XYZ XYZ triple in [0, 1]
     */
    XYZ_to_xyY(XYZ: NumericTriple): NumericTriple;
    /**
     * Lab triple to LCH triple
     * @param Lab Lab triple
     */
    Lab_to_LCHab(Lab: NumericTriple): NumericTriple;
    /**
     * LCH triple to Lab triple
     * @param LCH LCH Triple
     */
    LCHab_to_Lab(LCH: NumericTriple): NumericTriple;
    /**
     * @param XYZ XYZ Triple
     */
    XYZ_to_LCHab(XYZ: NumericTriple): NumericTriple;
    /**
     * @param XYZ XYZ Triple
     */
    XYZ_to_Luv(XYZ: NumericTriple): NumericTriple;
    /**
     * @param XYZ XYZ triple
     */
    XYZ_to_LCHuv(XYZ: NumericTriple): NumericTriple;
    /**
     * @param Luv Luv triple
     */
    Luv_to_LCHuv(Luv: NumericTriple): NumericTriple;
    /**
     * @param xyY xyY Triple
     */
    xyY_to_Lab(xyY: NumericTriple): NumericTriple;
    /**
     * @param xyY xyY Triple
     */
    xyY_to_LCHab(xyY: NumericTriple): NumericTriple;
    /**
     * @param xyY xyY Triple
     */
    xyY_to_Luv(xyY: NumericTriple): NumericTriple;
    /**
     * @param xyY xyY triple
     */
    xyY_to_LCHuv(xyY: NumericTriple): NumericTriple;
    /**
     * @param xyY xyY Triple
     */
    xyY_to_RGB(xyY: NumericTriple): NumericTriple;
    /**
     * @param Lab Lab triple
     */
    Lab_to_xyY(Lab: NumericTriple): NumericTriple;
    /**
     * @param Lab Lab triple
     */
    Lab_to_Luv(Lab: NumericTriple): NumericTriple;
    /**
     * @param Lab Lab triple
     */
    Lab_to_LCHuv(Lab: NumericTriple): NumericTriple;
}
export {};
