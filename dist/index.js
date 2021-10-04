"use strict";
// See http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html for details on these computations.
Object.defineProperty(exports, "__esModule", { value: true });
var mathjs_1 = require("mathjs");
var ColorConverter = /** @class */ (function () {
    // Constructor
    function ColorConverter(RefWhite, RgbModel, GammaModel, Adaptation) {
        if (RefWhite === void 0) { RefWhite = "D50"; }
        if (RgbModel === void 0) { RgbModel = "sRGB"; }
        if (GammaModel === void 0) { GammaModel = "sRGB"; }
        if (Adaptation === void 0) { Adaptation = "Bradford"; }
        // Properties to be set on instantiation
        this.RefWhite = "D50";
        this.RgbModel = "sRGB";
        this.GammaModel = "sRGB";
        this.Adaptation = "Bradford";
        this.kE = 216 / 24389;
        this.kK = 24389 / 27;
        this.RefWhite = RefWhite;
        this.RgbModel = RgbModel;
        this.GammaModel = GammaModel;
        this.Adaptation = Adaptation;
    }
    Object.defineProperty(ColorConverter.prototype, "Mtx_RefWhite", {
        // Computed: RefWhite Matrix
        get: function () {
            switch (this.RefWhite) {
                case "A": return [1.09850, 1, 0.35585];
                case "B": return [0.99072, 1, 0.85223];
                case "C": return [0.98074, 1, 1.18232];
                case "D50": return [0.96422, 1, 0.82521];
                case "D55": return [0.95682, 1, 0.92149];
                case "D65": return [0.95047, 1, 1.0888];
                case "D75": return [0.94972, 1, 1.22638];
                case "E": return [1, 1, 1];
                case "F2": return [0.99186, 1, 0.67393];
                case "F7": return [0.95041, 1, 1.08747];
                case "F11": return [1.00962, 1, 0.64350];
                default: return [1, 1, 1];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorConverter.prototype, "Mtx_RefWhiteRGB", {
        // Computed: RefWhite RGB Matrix
        get: function () {
            switch (this.RgbModel) {
                case "Adobe RGB (1998)": return [0.95047, 1, 1.08883];
                case "AppleRGB": return [0.95047, 1, 1.08883];
                case "Best RGB": return [0.96422, 1, 0.82521];
                case "Beta RGB": return [0.96422, 1, 0.82521];
                case "Bruce RGB": return [0.95047, 1, 1.08883];
                case "CIE RGB": return [1, 1, 1];
                case "ColorMatch RGB": return [0.96422, 1, 0.82521];
                case "Don RGB 4": return [0.96422, 1, 0.82521];
                case "ECI RGB v2": return [0.96422, 1, 0.82521];
                case "Ekta Space PS5": return [0.96422, 1, 0.82521];
                case "NTSC RGB": return [0.98074, 1, 1.18232];
                case "PAL/SECAM RGB": return [0.95047, 1, 1.08883];
                case "ProPhoto RGB": return [0.96422, 1, 0.82521];
                case "SMPTE-C RGB": return [0.95047, 1, 1.08883];
                case "sRGB": return [0.95047, 1, 1.08883];
                case "Wide Gamut RGB": return [0.96422, 1, 0.82521];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorConverter.prototype, "GammaRGB", {
        // Computed: GammaRGB + Index
        get: function () {
            switch (this.RgbModel) {
                case "Adobe RGB (1998)": return { value: 2.2, index: 2 };
                case "AppleRGB": return { value: 1.8, index: 1 };
                case "Best RGB": return { value: 2.2, index: 2 };
                case "Beta RGB": return { value: 2.2, index: 2 };
                case "Bruce RGB": return { value: 2.2, index: 2 };
                case "CIE RGB": return { value: 2.2, index: 2 };
                case "ColorMatch RGB": return { value: 1.8, index: 2 };
                case "Don RGB 4": return { value: 2.2, index: 2 };
                case "ECI RGB v2": return { value: 0, index: 4 };
                case "Ekta Space PS5": return { value: 2.2, index: 2 };
                case "NTSC RGB": return { value: 2.2, index: 2 };
                case "PAL/SECAM RGB": return { value: 2.2, index: 2 };
                case "ProPhoto RGB": return { value: 1.8, index: 1 };
                case "SMPTE-C RGB": return { value: 2.2, index: 2 };
                case "sRGB": return { value: -2.2, index: 3 };
                case "Wide Gamut RGB": return { value: 2.2, index: 2 };
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorConverter.prototype, "Gamma", {
        // Computed: Gamma value
        get: function () {
            switch (this.GammaModel.toString()) {
                case "1.0": return 1;
                case "1.8": return 1.8;
                case "2.2": return 2.2;
                case "sRGB": return -2.2;
                case "L*": return 0;
                default: return 1;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorConverter.prototype, "Mtx_RGB2XYZ", {
        // Computed: RGB to XYZ matrix
        // Values come from table on http://www.brucelindbloom.com/
        get: function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            var xr, yr, xg, yg, xb, yb;
            switch (this.RgbModel) {
                case "Adobe RGB (1998)": {
                    _a = [0.64, 0.33, 0.21, 0.71, 0.15, 0.06], xr = _a[0], yr = _a[1], xg = _a[2], yg = _a[3], xb = _a[4], yb = _a[5];
                    break;
                }
                case "AppleRGB": {
                    _b = [0.625, 0.34, 0.28, 0.595, 0.155, 0.07], xr = _b[0], yr = _b[1], xg = _b[2], yg = _b[3], xb = _b[4], yb = _b[5];
                    break;
                }
                case "Best RGB": {
                    _c = [0.7347, 0.2653, 0.215, 0.775, 0.13, 0.035], xr = _c[0], yr = _c[1], xg = _c[2], yg = _c[3], xb = _c[4], yb = _c[5];
                    break;
                }
                case "Beta RGB": {
                    _d = [0.6888, 0.3112, 0.1986, 0.7551, 0.1265, 0.0352], xr = _d[0], yr = _d[1], xg = _d[2], yg = _d[3], xb = _d[4], yb = _d[5];
                    break;
                }
                case "Bruce RGB": {
                    _e = [0.64, 0.33, 0.28, 0.65, 0.15, 0.06], xr = _e[0], yr = _e[1], xg = _e[2], yg = _e[3], xb = _e[4], yb = _e[5];
                    break;
                }
                case "CIE RGB": {
                    _f = [0.735, 0.265, 0.274, 0.717, 0.167, 0.009], xr = _f[0], yr = _f[1], xg = _f[2], yg = _f[3], xb = _f[4], yb = _f[5];
                    break;
                }
                case "ColorMatch RGB": {
                    _g = [0.63, 0.34, 0.295, 0.605, 0.15, 0.075], xr = _g[0], yr = _g[1], xg = _g[2], yg = _g[3], xb = _g[4], yb = _g[5];
                    break;
                }
                case "Don RGB 4": {
                    _h = [0.696, 0.3, 0.215, 0.765, 0.13, 0.035], xr = _h[0], yr = _h[1], xg = _h[2], yg = _h[3], xb = _h[4], yb = _h[5];
                    break;
                }
                case "ECI RGB v2": {
                    _j = [0.67, 0.33, 0.21, 0.71, 0.14, 0.08], xr = _j[0], yr = _j[1], xg = _j[2], yg = _j[3], xb = _j[4], yb = _j[5];
                    break;
                }
                case "Ekta Space PS5": {
                    _k = [0.695, 0.305, 0.26, 0.7, 0.11, 0.005], xr = _k[0], yr = _k[1], xg = _k[2], yg = _k[3], xb = _k[4], yb = _k[5];
                    break;
                }
                case "NTSC RGB": {
                    _l = [0.67, 0.33, 0.21, 0.71, 0.14, 0.08], xr = _l[0], yr = _l[1], xg = _l[2], yg = _l[3], xb = _l[4], yb = _l[5];
                    break;
                }
                case "PAL/SECAM RGB": {
                    _m = [0.64, 0.33, 0.29, 0.6, 0.15, 0.06], xr = _m[0], yr = _m[1], xg = _m[2], yg = _m[3], xb = _m[4], yb = _m[5];
                    break;
                }
                case "ProPhoto RGB": {
                    _o = [0.7347, 0.2653, 0.1596, 0.8404, 0.0366, 0.0001], xr = _o[0], yr = _o[1], xg = _o[2], yg = _o[3], xb = _o[4], yb = _o[5];
                    break;
                }
                case "SMPTE-C RGB": {
                    _p = [0.63, 0.34, 0.31, 0.595, 0.155, 0.07], xr = _p[0], yr = _p[1], xg = _p[2], yg = _p[3], xb = _p[4], yb = _p[5];
                    break;
                }
                case "sRGB": {
                    _q = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], xr = _q[0], yr = _q[1], xg = _q[2], yg = _q[3], xb = _q[4], yb = _q[5];
                    break;
                }
                case "Wide Gamut RGB": {
                    _r = [0.735, 0.265, 0.115, 0.826, 0.157, 0.018], xr = _r[0], yr = _r[1], xg = _r[2], yg = _r[3], xb = _r[4], yb = _r[5];
                    break;
                }
            } // End switch
            var X_r = xr / yr, Y_r = 1, Z_r = (1 - xr - yr) / yr, X_g = xg / yg, Y_g = 1, Z_g = (1 - xg - yg) / yg, X_b = xb / yb, Y_b = 1, Z_b = (1 - xb - yb) / yb, RW_RGB = this.Mtx_RefWhiteRGB, X_W = RW_RGB[0], Y_W = RW_RGB[1], Z_W = RW_RGB[2];
            var _s = mathjs_1.multiply(mathjs_1.inv([
                [X_r, X_g, X_b],
                [Y_r, Y_g, Y_b],
                [Z_r, Z_g, Z_b]
            ]), [
                X_W,
                Y_W,
                Z_W
            ]), S_r = _s[0], S_g = _s[1], S_b = _s[2];
            return mathjs_1.transpose([
                [S_r * X_r, S_g * X_g, S_b * X_b],
                [S_r * Y_r, S_g * Y_g, S_b * Y_b],
                [S_r * Z_r, S_g * Z_g, S_b * Z_b],
            ]);
        } // End Mtx_RGB2XYZ
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorConverter.prototype, "MtxAdp", {
        // Computed: Matrix Adaptaion
        get: function () {
            switch (this.Adaptation) {
                case "Bradford": {
                    return [
                        [0.8951, -0.7502, 0.0389],
                        [0.2664, 1.7135, -0.0685],
                        [-0.1614, 0.0367, 1.0296]
                    ];
                }
                case "von Kries": {
                    return [
                        [0.40024, -0.22630, 0],
                        [0.70760, 1.16532, 0],
                        [-0.08081, 0.04570, 0.91822]
                    ];
                }
                case "XYZ Scaling":
                case "None": {
                    return [
                        [1, 0, 0],
                        [0, 1, 0],
                        [0, 0, 1]
                    ];
                }
            }
        } // End matrix Adaptation
        ,
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param {number} linear Linear value
     * @param {number} Gamma Gamma value
     */
    ColorConverter.prototype.compand = function (linear) {
        var G = this.Gamma;
        // Depends on sign of Gamma
        if (G > 0) {
            return linear >= 0 ?
                Math.pow(linear, 1 / G) :
                -Math.pow(-linear, 1 / G);
        }
        else if (G < 0) {
            /** sRGB */
            var sign = 1;
            if (linear < 0) {
                sign = -1;
                linear = -linear;
            }
            return sign * (linear <= 0.0031308 ?
                linear * 12.92 :
                (1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055));
        }
        else {
            /** L* */
            var sign = 1;
            if (linear < 0) {
                sign = -1;
                linear = -linear;
            }
            return sign * (linear <= (216.0 / 24389.0) ?
                (linear * 24389.0 / 2700.0) :
                (1.16 * Math.pow(linear, 1.0 / 3.0) - 0.16));
        }
    };
    /**
     * Inverse compand function
     * @param {number} companded Companded value
     */
    ColorConverter.prototype.inverse_compand = function (companded) {
        var G = this.Gamma;
        if (G > 0) {
            return companded >= 0 ?
                Math.pow(companded, G) :
                -Math.pow(-companded, G);
        }
        else if (G < 0) {
            /** sRGB */
            var sign = 1;
            if (companded < 0) {
                sign = -1;
                companded = -companded;
            }
            return sign * (companded <= 0.04045 ?
                (companded / 12.92) :
                Math.pow((companded + 0.055) / 1.055, 2.4));
        }
        else {
            /** L* */
            var sign = 1;
            if (companded < 0) {
                sign = -1;
                companded = -companded;
            }
            return sign * (companded <= 0.08 ?
                (2700.0 * companded / 24389.0) :
                ((((1000000.0 * companded + 480000.0) * companded + 76800.0) * companded + 4096.0) / 1560896.0));
        }
    };
    /**
     * Convert XYZ triple to RGB: ✅
     * @param {[number, number, number]} XYZ triple in range [0, 1]
     * Outputs RGB triple in range [0, 255]
     */
    ColorConverter.prototype.XYZ_to_RGB = function (XYZ) {
        var _this = this;
        var XYZd = XYZ;
        if (this.Adaptation != "None") {
            // Get source/domain scale factors
            var _a = mathjs_1.multiply(this.Mtx_RefWhite, this.MtxAdp), As = _a[0], Bs = _a[1], Cs = _a[2];
            var _b = mathjs_1.multiply(this.Mtx_RefWhiteRGB, this.MtxAdp), Ad = _b[0], Bd = _b[1], Cd = _b[2];
            // Not sure why, but first input to multiply is right-most matrix
            XYZd = mathjs_1.multiply(XYZ, this.MtxAdp, [
                [Ad / As, 0, 0],
                [0, Bd / Bs, 0],
                [0, 0, Cd / Cs]
            ], mathjs_1.inv(this.MtxAdp));
        }
        var RGB = mathjs_1.multiply(XYZd, mathjs_1.inv(this.Mtx_RGB2XYZ));
        return RGB.map(function (v) { return 255 * _this.compand(v); });
    }; // End XYZ_to_RGB
    /**
     * Convert RGB tripe to XYZ: ✅
     * @param {number[]} RGB RGB Triple
     * NOTE: This assumes RGB is scaled from [0, 255], XYZ in [0, 1]
     */
    ColorConverter.prototype.RGB_to_XYZ = function (RGB) {
        var _this = this;
        // Invers compound the values
        RGB = RGB.map(function (v) { return _this.inverse_compand(v / 255); });
        // Linear RGB to XYZ
        var XYZ = mathjs_1.multiply(RGB, this.Mtx_RGB2XYZ);
        // Adaptation if necessary
        if (this.Adaptation != "None") {
            // Get source/domain scale factors
            var _a = mathjs_1.multiply(this.Mtx_RefWhiteRGB, this.MtxAdp), As = _a[0], Bs = _a[1], Cs = _a[2];
            var _b = mathjs_1.multiply(this.Mtx_RefWhite, this.MtxAdp), Ad = _b[0], Bd = _b[1], Cd = _b[2];
            return mathjs_1.multiply(XYZ, this.MtxAdp, [
                [Ad / As, 0, 0],
                [0, Bd / Bs, 0],
                [0, 0, Cd / Cs]
            ], mathjs_1.inv(this.MtxAdp));
        }
        else {
            return XYZ;
        }
    }; // End RGB to XYZ
    /**
     * Convert Lab to XYZ
     * @param Lab Lab triple
     * XYZ in range [0, 1]
     */
    ColorConverter.prototype.Lab_to_XYZ = function (Lab) {
        var L = Lab[0], a = Lab[1], b = Lab[2], f_y = (L + 16) / 116, f_x = a / 500 + f_y, f_z = f_y - b / 200, x_r = (Math.pow(f_x, 3) > this.kE) ? Math.pow(f_x, 3) : ((116 * f_x - 16) / this.kK), y_r = (L > this.kK * this.kE) ? Math.pow((L + 16) / 116, 3) : (L / this.kK), z_r = (Math.pow(f_z, 3) > this.kE) ? Math.pow(f_z, 3) : ((116 * f_z - 16) / this.kK), RefWhite = this.Mtx_RefWhite;
        return [
            x_r * RefWhite[0],
            y_r * RefWhite[1],
            z_r * RefWhite[2]
        ];
    }; // End Lab to XYZ
    /**
     * Converts Lab triple to XYZ tripe in range [0, 1]
     * @param XYZ XYZ triple
     */
    ColorConverter.prototype.XYZ_to_Lab = function (XYZ) {
        var X = XYZ[0], Y = XYZ[1], Z = XYZ[2], RefWhite = this.Mtx_RefWhite, X_r = RefWhite[0], Y_r = RefWhite[1], Z_r = RefWhite[2], x_r = X / X_r, y_r = Y / Y_r, z_r = Z / Z_r, f_x = (x_r > this.kE) ? Math.pow(x_r, 1 / 3) : ((this.kK * x_r + 16) / 116), f_y = (y_r > this.kE) ? Math.pow(y_r, 1 / 3) : ((this.kK * y_r + 16) / 116), f_z = (z_r > this.kE) ? Math.pow(z_r, 1 / 3) : ((this.kK * z_r + 16) / 116);
        return [
            116 * f_y - 16,
            500 * (f_x - f_y),
            200 * (f_y - f_z)
        ];
    }; // End XYZ_to_Lab
    /**
     * Convert Lab to RGB
     * @param Lab Lab triple
     * Note: RGB in [0, 255]
     */
    ColorConverter.prototype.Lab_to_RGB = function (Lab) {
        return this.XYZ_to_RGB(this.Lab_to_XYZ(Lab));
    };
    /**
     * Convert RGB to Lab
     * @param RGB RGB triple in range [0, 255]
     */
    ColorConverter.prototype.RGB_to_Lab = function (RGB) {
        return this.XYZ_to_Lab(this.RGB_to_XYZ(RGB));
    };
    /**
     * Convert xyY triple to XYZ triple
     * @param xyY xyY triple
     */
    ColorConverter.prototype.xyY_to_XYZ = function (xyY) {
        var x = xyY[0], y = xyY[1], Y = xyY[2];
        if (y < 0.000001) {
            return [0, 0, 0];
        }
        else {
            return [
                (x * Y) / y,
                Y,
                ((1 - x - y) * Y) / y
            ];
        }
    }; // End xyY_to_XYZ
    /**
     * Convert XYZ to xyY
     * @param XYZ XYZ triple in [0, 1]
     */
    ColorConverter.prototype.XYZ_to_xyY = function (XYZ) {
        var X = XYZ[0], Y = XYZ[1], Z = XYZ[2], Den = X + Y + Z;
        // Non-zero Den:
        if (Den > 0) {
            return [X / Den, Y / Den, Y];
        }
        // Zero den
        else {
            var _a = this.Mtx_RefWhite, RW_X = _a[0], RW_Y = _a[1], RW_Z = _a[2], RW_Den = RW_X + RW_Y + RW_Z;
            return [
                RW_X / RW_Den,
                RW_Y / RW_Den,
                Y
            ];
        }
    };
    /**
     * Lab triple to LCH triple
     * @param Lab Lab triple
     */
    ColorConverter.prototype.Lab_to_LCHab = function (Lab) {
        var L = Lab[0], a = Lab[1], b = Lab[2];
        var H = 180 / Math.PI * Math.atan2(b, a);
        return [
            L,
            Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
            H + (H >= 0 ? 0 : 360)
        ];
    };
    /**
     * LCH triple to Lab triple
     * @param LCH LCH Triple
     */
    ColorConverter.prototype.LCHab_to_Lab = function (LCH) {
        var L = LCH[0], C = LCH[1], H = LCH[2];
        return [
            L,
            C * Math.cos(H * Math.PI / 180),
            C * Math.sin(H * Math.PI / 180)
        ];
    };
    /**
     * @param XYZ XYZ Triple
     */
    ColorConverter.prototype.XYZ_to_LCHab = function (XYZ) {
        return this.Lab_to_LCHab(this.XYZ_to_Lab(XYZ));
    };
    /**
     * @param XYZ XYZ Triple
     */
    ColorConverter.prototype.XYZ_to_Luv = function (XYZ) {
        var X = XYZ[0], Y = XYZ[1], Z = XYZ[2], RefWhite = this.Mtx_RefWhite, X_r = RefWhite[0], Y_r = RefWhite[1], Z_r = RefWhite[2], Den = X + 15 * Y + 3 * Z, up = (Den > 0) ? ((4 * X) / Den) : 0, vp = (Den > 0) ? ((9 * Y) / Den) : 0, urp = (4 * X_r) / (X_r + 15 * Y_r + 3 * Z_r), vrp = (9 * Y_r) / (X_r + 15 * Y_r + 3 * Z_r), yr = Y / Y_r, L = (yr > this.kE) ? (116 * Math.pow(yr, 1 / 3) - 16) : (this.kK * yr);
        return [
            L,
            13 * L * (up - urp),
            13 * L * (vp - vrp)
        ];
    };
    /**
     * @param XYZ XYZ triple
     */
    ColorConverter.prototype.XYZ_to_LCHuv = function (XYZ) {
        return this.Luv_to_LCHuv(this.XYZ_to_Luv(XYZ));
    };
    /**
     * Luv to LCHuv
     * @param Luv Luv triple
     */
    ColorConverter.prototype.Luv_to_LCHuv = function (Luv) {
        var L = Luv[0], u = Luv[1], v = Luv[2];
        var H = 180 / Math.PI * Math.atan2(v, u);
        return [
            L,
            Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2)),
            H + (H >= 0 ? 0 : 360)
        ];
    };
    /**
     * @param xyY xyY Triple
     */
    ColorConverter.prototype.xyY_to_Lab = function (xyY) {
        return this.XYZ_to_Lab(this.xyY_to_XYZ(xyY));
    };
    /**
     * @param xyY xyY Triple
     */
    ColorConverter.prototype.xyY_to_LCHab = function (xyY) {
        return this.Lab_to_LCHab(this.XYZ_to_Lab(this.xyY_to_XYZ(xyY)));
    };
    /**
     * @param xyY xyY Triple
     */
    ColorConverter.prototype.xyY_to_Luv = function (xyY) {
        return this.XYZ_to_Luv(this.xyY_to_XYZ(xyY));
    };
    /**
     * @param xyY xyY triple
     */
    ColorConverter.prototype.xyY_to_LCHuv = function (xyY) {
        return this.Luv_to_LCHuv(this.XYZ_to_Luv(this.xyY_to_XYZ(xyY)));
    };
    /**
     * @param xyY xyY Triple
     */
    ColorConverter.prototype.xyY_to_RGB = function (xyY) {
        return this.XYZ_to_RGB(this.xyY_to_XYZ(xyY));
    };
    /**
     * @param Lab Lab triple
     */
    ColorConverter.prototype.Lab_to_xyY = function (Lab) {
        return this.XYZ_to_xyY(this.Lab_to_XYZ(Lab));
    };
    /**
     * @param Lab Lab triple
     */
    ColorConverter.prototype.Lab_to_Luv = function (Lab) {
        return this.XYZ_to_Luv(this.Lab_to_XYZ(Lab));
    };
    /**
     * @param Lab Lab triple
     */
    ColorConverter.prototype.Lab_to_LCHuv = function (Lab) {
        return this.Luv_to_LCHuv(this.Lab_to_Luv(Lab));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHab_to_XYZ = function (LCH) {
        return this.Lab_to_XYZ(this.LCHab_to_Lab(LCH));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHab_to_xyY = function (LCH) {
        return this.XYZ_to_xyY(this.Lab_to_XYZ(this.LCHab_to_Lab(LCH)));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHab_to_Luv = function (LCH) {
        return this.XYZ_to_Luv(this.Lab_to_XYZ(this.LCHab_to_Lab(LCH)));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHab_to_LCHuv = function (LCH) {
        return this.Luv_to_LCHuv(this.LCHab_to_Luv(LCH));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHab_to_RGB = function (LCH) {
        return this.XYZ_to_RGB(this.LCHab_to_XYZ(LCH));
    };
    /**
     * @param Luv NumericTriple
     */
    ColorConverter.prototype.Luv_to_XYZ = function (Luv) {
        var L = Luv[0], u = Luv[1], v = Luv[2];
        var Y = (L > this.kK * this.kE) ?
            Math.pow((L + 16) / 116, 3) :
            L / this.kK;
        var RefWhite = this.Mtx_RefWhite, X_r = RefWhite[0], Y_r = RefWhite[1], Z_r = RefWhite[2], Den = X_r + 15 * Y_r + 3 * Z_r, v_0 = (9 * Y_r) / Den, u_0 = (4 * X_r) / Den, d = Y * ((39 * L) / (v + 13 * L * v_0) - 5), c = -1 / 3, b = -5 * Y, a = (1 / 3) * ((52 * L) / (u + 13 * L * u_0) - 1), X = (d - b) / (a - c), Z = X * a + b;
        return [X, Y, Z];
    };
    /**
     * @param Luv NumericTriple
     */
    ColorConverter.prototype.Luv_to_xyY = function (Luv) {
        return this.XYZ_to_xyY(this.Luv_to_XYZ(Luv));
    };
    /**
     * @param Luv NumericTriple
     */
    ColorConverter.prototype.Luv_to_Lab = function (Luv) {
        return this.XYZ_to_Lab(this.Luv_to_XYZ(Luv));
    };
    /**
     * @param Luv NumericTriple
     */
    ColorConverter.prototype.Luv_to_LCHab = function (Luv) {
        return this.Lab_to_LCHab(this.Luv_to_Lab(Luv));
    };
    /**
     * @param Luv NumericTriple
     */
    ColorConverter.prototype.Luv_to_RGB = function (Luv) {
        return this.XYZ_to_RGB(this.Luv_to_XYZ(Luv));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHuv_to_Luv = function (LCH) {
        var L = LCH[0], C = LCH[1], H = LCH[2];
        return [
            L,
            C * Math.cos(H * Math.PI / 180),
            C * Math.sin(H * Math.PI / 180)
        ];
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHuv_to_XYZ = function (LCH) {
        return this.Luv_to_XYZ(this.LCHuv_to_Luv(LCH));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHuv_to_xyY = function (LCH) {
        return this.XYZ_to_xyY(this.LCHuv_to_XYZ(LCH));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHuv_to_Lab = function (LCH) {
        return this.XYZ_to_Lab(this.LCHuv_to_XYZ(LCH));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHuv_to_LCHab = function (LCH) {
        return this.Lab_to_LCHab(this.LCHuv_to_Lab(LCH));
    };
    /**
     * @param LCH NumericTriple
     */
    ColorConverter.prototype.LCHuv_to_RGB = function (LCH) {
        return this.XYZ_to_RGB(this.LCHuv_to_XYZ(LCH));
    };
    /**
     * @param RGB NumericTriple
     */
    ColorConverter.prototype.RGB_to_xyY = function (RGB) {
        return this.XYZ_to_xyY(this.RGB_to_XYZ(RGB));
    };
    /**
     * @param RGB NumericTriple
     */
    ColorConverter.prototype.RGB_to_LCHab = function (RGB) {
        return this.Lab_to_LCHab(this.RGB_to_Lab(RGB));
    };
    /**
     * @param RGB NumericTriple
     */
    ColorConverter.prototype.RGB_to_Luv = function (RGB) {
        return this.XYZ_to_Luv(this.RGB_to_XYZ(RGB));
    };
    /**
     * @param RGB NumericTriple
     */
    ColorConverter.prototype.RGB_to_LCHuv = function (RGB) {
        return this.Luv_to_LCHuv(this.RGB_to_Luv(RGB));
    };
    return ColorConverter;
}()); // Env class definition
exports.default = ColorConverter;
