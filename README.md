# CIE Color Converter

This project is motivated by [Bruce Lindbloom](http://www.brucelindbloom.com), and consists of a CIE color model converter. E.g., it will allow you to convert between XYZ, xyY, RGB, Luv, etc. color models.

## Usage

Install the package via

```sh
# NPM
npm i cie-colorconverter

# Or Yarn
yarn add cie-colorconverter
```

Then import any one of the color converter functions and start converting!

```js
import { RGBToXYZ } from 'cie-colorconverter'

const [X, Y, Z] = RGBToXYZ([50, 100, 150], { refWhite: 'D50' });
```


This will convert the RGB triple `[50, 100, 150]` to an XYZ triple.

See [Converter Functions section](#converter-functions) for a list of all available functions.

## Converter Options

There are a few independent variables/parameters when it comes to color model conversions, including:

* Reference White model
* RGB Model
* Gamma value
* Adaptation model

See, for example, [http://www.brucelindbloom.com](http://www.brucelindbloom.com/) for more information on these values.

The various converter methods will accept the appropriate options as a second argument. For example, when converting from RGB to XYZ, you can set the RGB model:

```ts
const [X, Y, Z] = RGBToXYZ([50, 100, 150], { rgbModel: 'sRGB' });
```

The various options are listed here:

* `refWhite`. Possible values:
  ```ts
    "A" | "B" | "C" | "D50" | "D55" | "D65" | "D75" | "E" | "F2" | "F7" | "F11"
  ```
  `D50` is the default value.
* `rgbModel`. Possible values:
  ```ts
  "Adobe RGB (1998)" |
  "AppleRGB" |
  "Best RGB" |
  "Beta RGB" |
  "Bruce RGB" |
  "CIE RGB" |
  "ColorMatch RGB" |
  "Don RGB 4" |
  "ECI RGB v2" |
  "Ekta Space PS5" |
  "NTSC RGB" |
  "PAL/SECAM RGB" |
  "ProPhoto RGB" |
  "SMPTE-C RGB" |
  "sRGB" |
  "Wide Gamut RGB"
  ```
  `sRGB` is the default.
* `gammaModel`. Possible values:
  ```ts
  "1.0" | "1.8" | "2.2" | "sRGB" | "L*"
  ```
  `sRGB` is the default.
* `adaptation`. Possible values:
  ```ts
  "Bradford" | "von Kries" | "XYZ Scaling" | "None"
  ```
  `Bradford` is the default.

A full example, passing all of these converter options, looks like the following:

```ts
import { RGBToXYZ } from 'cie-colorconveter';

const [X, Y, Z] = RGBToXYZ([50, 100, 150],{
  rgbModel: 'sRGB',
  refWhite: 'D75',
  gammaModel: '2.2',
  adaptation: 'von Kries'
});
```

## Converter Functions

There are 42 total converter functions available in this library. Each of these functions takes a `NumericTriple` (which is just `[number, number, number]`) as its first argument, and returns a `NumericTriple`. Some of the functions take an optional second argument with converter options.

The available functions, and their types, are shown here:

```ts
declare type NumericTriple = readonly [number, number, number];

declare type RefWhiteType = "A" | "B" | "C" | "D50" | "D55" | "D65" | "D75" | "E" | "F2" | "F7" | "F11";
declare type RGBModelType = "Adobe RGB (1998)" | "AppleRGB" | "Best RGB" | "Beta RGB" | "Bruce RGB" | "CIE RGB" | "ColorMatch RGB" | "Don RGB 4" | "ECI RGB v2" | "Ekta Space PS5" | "NTSC RGB" | "PAL/SECAM RGB" | "ProPhoto RGB" | "SMPTE-C RGB" | "sRGB" | "Wide Gamut RGB";
declare type GammaModelType = "1.0" | "1.8" | "2.2" | "sRGB" | "L*";
declare type AdaptationType = "Bradford" | "von Kries" | "XYZ Scaling" | "None";
declare type Options = {
  refWhite?: RefWhiteType;
  rgbModel?: RGBModelType;
  gammaModel?: GammaModelType;
  adaptation?: AdaptationType;
};

declare const LabToLCHab: (Lab: NumericTriple) => NumericTriple;
declare const LabToRGB: (Lab: NumericTriple, { adaptation, refWhite, rgbModel, gammaModel, }?: Options) => NumericTriple;
declare const LabToXYZ: (Lab: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LabToxyY: (Lab: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LabToLuv: (Lab: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LabToLCHuv: (Lab: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;

declare const LCHabToLab: (LCH: NumericTriple) => NumericTriple;
declare const LCHabToXYZ: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHabToxyY: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHabToLuv: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHabToLCHuv: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHabToRGB: (LCH: NumericTriple, { adaptation, refWhite, rgbModel, gammaModel, }?: Options) => NumericTriple;

declare const LCHuvToLuv: (LCH: NumericTriple) => NumericTriple;
declare const LCHuvToXYZ: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHuvToxyY: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHuvToLab: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHuvToLCHab: (LCH: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LCHuvToRGB: (LCH: NumericTriple, { adaptation, refWhite, rgbModel, gammaModel, }?: Options) => NumericTriple;

declare const LuvToLCHuv: (Luv: NumericTriple) => NumericTriple;
declare const LuvToXYZ: (Luv: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LuvToxyY: (Luv: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LuvToLab: (Luv: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LuvToLCHab: (Luv: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const LuvToRGB: (Luv: NumericTriple, { adaptation, refWhite, rgbModel, gammaModel, }?: Options) => NumericTriple;

declare const RGBToXYZ: (RGB: NumericTriple, { adaptation, rgbModel, gammaModel, refWhite, }?: Options) => NumericTriple;
declare const RGBToLab: (RGB: NumericTriple, { adaptation, rgbModel, gammaModel, refWhite, }?: Options) => NumericTriple;
declare const RGBToxyY: (RGB: NumericTriple, { adaptation, rgbModel, gammaModel, refWhite, }?: Options) => NumericTriple;
declare const RGBToLCHab: (RGB: NumericTriple, { adaptation, rgbModel, gammaModel, refWhite, }?: Options) => NumericTriple;
declare const RGBToLuv: (RGB: NumericTriple, { adaptation, rgbModel, gammaModel, refWhite, }?: Options) => NumericTriple;
declare const RGBToLCHuv: (RGB: NumericTriple, { adaptation, rgbModel, gammaModel, refWhite, }?: Options) => NumericTriple;

declare const xyYToXYZ: (xyY: NumericTriple) => NumericTriple;
declare const xyYToLab: (xyY: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const xyYToLCHab: (xyY: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const xyYToLuv: (xyY: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const xyYToLCHuv: (xyY: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const xyYToRGB: (xyY: NumericTriple, { adaptation, refWhite, rgbModel, gammaModel, }?: Options) => NumericTriple;

declare const XYZToLab: (XYZ: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const XYZToLuv: (XYZ: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const XYZToRGB: (XYZ: NumericTriple, { adaptation, refWhite, rgbModel, gammaModel, }?: Options) => NumericTriple;
declare const XYZToxyY: (XYZ: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const XYZToLCHab: (XYZ: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
declare const XYZToLCHuv: (XYZ: NumericTriple, { refWhite }?: Pick<Options, "refWhite">) => NumericTriple;
```
