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

## Converter Options

There are a few independent variables/parameters when it comes to color model conversions, including:

* Reference White model
* RGB Model
* Gamma value
* Adaptation model

See, for example, [http://www.brucelindbloom.com/](http://www.brucelindbloom.com/) for more information on these values.

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

TODO: example of passing all of these options.

## From RGB to Other Models

### `RGBToXYZ`

```ts
import { RGBToXYZ } from 'cie-colorconverter';

const [X, Y, Z] = RGBToXYZ([50, 100, 150]);

/**
 * CONVERTER OPTIONS:
 *  - adaptation
 *  - refWhite
 *  - rgbModel
 *  - gammaModel
 */
```

### `RGBToLab`

```ts
import { RGBToLab } from 'cie-colorconverter';

const [L, a, b] = RGBToLab([50, 100, 150]);

/**
 * CONVERTER OPTIONS:
 *  - adaptation
 *  - refWhite
 *  - rgbModel
 *  - gammaModel
 */
```

## From XYZ to Other Models

TODO:

## From xyY to Other Models

TODO:

## From Luv to Other Models

TODO:

## From LCHuv to Other Models

TODO:

## From LCHab to Other Models

TODO;

## From Lab to Other Models

TODO:
