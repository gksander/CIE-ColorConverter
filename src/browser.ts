import { ColorConverter } from "./index";

if (window) {
  (<any>window).CIEColorConvertor = ColorConverter;
}
