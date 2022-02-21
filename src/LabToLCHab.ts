import { NumericTriple } from "./Matrix";

export const LabToLCHab = (Lab: NumericTriple): NumericTriple => {
  const [L, a, b] = Lab;

  let H = (180 / Math.PI) * Math.atan2(b, a);
  return [
    L,
    Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
    H + (H >= 0 ? 0 : 360),
  ];
};
