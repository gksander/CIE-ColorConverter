import { NumericTriple } from "./Matrix";

export const LCHuvToLuv = (LCH: NumericTriple): NumericTriple => {
  const [L, C, H] = LCH;

  return [
    L,
    C * Math.cos((H * Math.PI) / 180),
    C * Math.sin((H * Math.PI) / 180),
  ];
};
