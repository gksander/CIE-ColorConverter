import {
  AdaptationType,
  GammaModelType,
  RefWhiteType,
  RGBModelType,
} from "./types";

export const DEFAULT_OPTIONS = {
  REF_WHITE: "D50" as RefWhiteType,
  RGB_MODEL: "sRGB" as RGBModelType,
  GAMMA_MODEL: "sRGB" as GammaModelType,
  ADAPTION: "Bradford" as AdaptationType,
} as const;
