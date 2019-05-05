# CIE Color Convertor

This project is motivated by [http://www.brucelindbloom.com/](Bruce Lindbloom), and consists of a CIE color model converter. E.g., it will allow you to convert between XYZ, xyY, RGB, Luv, etc. color models.

## Usage

Install the package via

```sh
npm i cie-colorconvertor
```

If you're using ES6 modules, you can import the convertor class via

```js
import CIECC from 'cie-colorconvertor'
```

To use the color convertor, you'll need to instantiate an instance of the CIECC class:

```js
import CIECC from 'cie-colorconvertor'

let convertor = new CIECC();
```

Then, you can use the `convertor` instance to convert between profiles. Here's an example:

```js
import CIECC from 'cie-colorconvertor'

let convertor = new CIECC();

let XYZ = convertor.RGB_to_XYZ([150, 100, 232]);
```

This will convert the RGB triple `[150, 100, 232]` to an XYZ triple.

*NOTE*: CIECC is a generic name. Due to default exports, you can import the color converter under any name. E.g., you could just as well use:

```js
import ColorConverter from 'cie-colorconverter'
```

## Browser Usage

The npm packages ships with a browser-ready version at `node_modules/cie-colorconvertor/dist.browser/browser.js`. This will expose a global variable at `window.CIEColorConvertor` and is used the same as the ES6 version.

## Convertor Options

There are a few independent variables/parameters when it comes to color model conversions, including:

* Reference White model
* RGB Model
* Gamma value
* Adaptation model

See, for example, [http://www.brucelindbloom.com/](http://www.brucelindbloom.com/) for more information on these values.

The `CIECC` class allows you to adjust these values. They are public properties on the `CIECC` class that you can adjust via public properties. For example:

* `CIECC.RefWhite = "D50"`. Possible values:
  ```ts
    "A" | "B" | "C" | "D50" | "D55" | "D65" | "D75" | "E" | "F2" | "F7" | "F11"
  ```
  "D50" is the default value.
* `CIECC.RgbModel = "sRGB"`. Possible values:
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
  "sRGB" is the default.
* `CIECC.GammaModel = "sRGB"`. Possible values:
  ```ts
  "1.0" | "1.8" | "2.2" | "sRGB" | "L*"
  ```
  "sRGB" is the default.
* `CIECC.Adaptation = "Bradford"`. Possible values:
  ```ts
  "Bradford" | "von Kries" | "XYZ Scaling" | "None"
  ```
  "Bradford" is the default.

These values can also be set via the converter's class constructor method. The constructor has the following form:

```js
constructor(RefWhite, RgbModel, GammaModel, Adaptation)
```

As an example, you could set some parameter values initially via:

```js
import CIECC from 'cie-colorconverter'

let converter = new CIECC("D65", "Adobe RGB (1998)", "sRGB", "XYZ Scaling");

...
```

## Methods

Currently, the converter can convert between all of the following color models:

* XYZ
* xyY
* Lab
* LCH_ab
* Luv
* LCH_uv
* RGB

This provides the following methods:

* `.XYZ_to_xyY`, `.XYZ_to_Lab`, `.XYZ_to_LCHab`, `.XYZ_to_Luv`, `.XYZ_to_LCHuv`, `.XYZ_to_RGB`
* `.xyY_to_XYZ`, `.xyY_to_Lab`, `.xyY_to_LCHab`, `.xyY_to_Luv`, `.xyY_to_LCHuv`, `.xyY_to_RGB`
* `.Lab_to_XYZ`, `.Lab_to_xyY`, `.Lab_to_LCHab`, `.Lab_to_Luv`, `.Lab_to_LCHuv`, `.Lab_to_RGB`
* `.LCHab_to_XYZ`, `.LCHab_to_xyY`, `.LCHab_to_Lab`, `.LCHab_to_Luv`, `.LCHab_to_LCHuv`, `.LCHab_to_RGB`
* `.Luv_to_XYZ`, `.Luv_to_xyY`, `.Luv_to_Lab`, `.Luv_to_LCHab`, `.Luv_to_LCHuv`, `.Luv_to_RGB`
* `.LCHuv_to_XYZ`, `.LCHuv_to_xyY`, `.LCHuv_to_Lab`, `.LCHuv_to_LCHab`, `.LCHuv_to_Luv`, `.LCHuv_to_RGB`
* `.RGB_to_XYZ`, `.RGB_to_xyY`, `.RGB_to_Lab`, `.RGB_to_LCHab`, `.RGB_to_Luv`, `.RGB_to_LCHuv`