import { AdaptationType } from "./types";
import { Matrix_3x3 } from "./Matrix";

/**
 * Matrix adaptation
 */
export const getMtxAdaptation = (adaptation: AdaptationType): Matrix_3x3 =>
  Map[adaptation] || [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

const Map: Partial<Record<AdaptationType, Matrix_3x3>> = {
  Bradford: [
    [0.8951, -0.7502, 0.0389],
    [0.2664, 1.7135, -0.0685],
    [-0.1614, 0.0367, 1.0296],
  ],
  "von Kries": [
    [0.40024, -0.2263, 0],
    [0.7076, 1.16532, 0],
    [-0.08081, 0.0457, 0.91822],
  ],
};
