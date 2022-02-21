import { NumericTriple } from "./Matrix";

/**
 * Convert xyY triple to XYZ triple
 */
export const xyYToXYZ = (xyY: NumericTriple): NumericTriple => {
  const [x, y, Y] = xyY;
  if (y < 0.000001) {
    return [0, 0, 0];
  } else {
    return [(x * Y) / y, Y, ((1 - x - y) * Y) / y];
  }
};
