# CIE Color Convertor

This project is motivated by [http://www.brucelindbloom.com/](Bruce Lindbloom), and consists of a CIE color space converter. E.g., it will allow you to convert between XYZ, xyY, RGB, Luv, etc. color profiles.

## Usage

Install the package via

```sh
npm i cie-colorconvertor
```

If you're using ES6 modules, you can import the convertor class via

```js
import ColorConvertor from 'cie-colorconvertor'
```

To use the color convertor, you'll need to instantiate an instance of the ColorConvertor class:

```js
import ColorConvertor from 'cie-colorconvertor'

let convertor = new ColorConvertor();
```

Then, you can use the `convertor` instance to convert between profiles. Here's an example:

```js
import ColorConvertor from 'cie-colorconvertor'

let convertor = new ColorConvertor();

let XYZ = convertor.RGB_to_XYZ([150, 100, 232]);
```

## Browser Usage

The npm packages ships with a browser-ready version at `node_modules/cie-colorconvertor/dist.browser/browser.js`. This will expose a global variable at `window.CIEColorConvertor` and is used the same as the ES6 version.

## Convertor Options

TODO: Whitespace, adaptation, RGB, etc.

## Methods

TODO: Document methods.