import { GammaModelType } from "./types";

export const getGammaValue = (Gamma: GammaModelType): number => Map[Gamma] || 1;

const Map: Record<GammaModelType, number> = {
  "1.0": 1,
  "1.8": 1.8,
  "2.2": 2.2,
  sRGB: -2.2,
  "L*": 0,
};
