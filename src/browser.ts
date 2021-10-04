import { ColorConverter } from "./index";

if (window) {
  (<any>window).CIEColorConverter = ColorConverter;
}
