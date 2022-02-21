import { NumericTriple } from "./Matrix";

export const LuvToLCHuv = (Luv: NumericTriple): NumericTriple => {
  const [L, u, v] = Luv;
  const H = (180 / Math.PI) * Math.atan2(v, u);

  return [
    L,
    Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2)),
    H + (H >= 0 ? 0 : 360),
  ];
};
