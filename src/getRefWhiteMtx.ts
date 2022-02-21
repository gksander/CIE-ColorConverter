import { RefWhiteType } from "./types";
import { NumericTriple } from "./Matrix";

// RefWhite Matrix
export const getRefWhiteMtx = (refWhite: RefWhiteType): NumericTriple =>
  Map[refWhite] || [1, 1, 1];

const Map: Record<RefWhiteType, NumericTriple> = {
  A: [1.0985, 1, 0.35585],
  B: [0.99072, 1, 0.85223],
  C: [0.98074, 1, 1.18232],
  D50: [0.96422, 1, 0.82521],
  D55: [0.95682, 1, 0.92149],
  D65: [0.95047, 1, 1.0888],
  D75: [0.94972, 1, 1.22638],
  E: [1, 1, 1],
  F2: [0.99186, 1, 0.67393],
  F7: [0.95041, 1, 1.08747],
  F11: [1.00962, 1, 0.6435],
};
