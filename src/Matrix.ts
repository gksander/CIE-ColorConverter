export class Matrix {
  /**
   * n x m matrix transposes to an m x n
   */
  static transpose = (A: Matrix_3x3): Matrix_3x3 => {
    const n = A.length || 0;
    const m = A[0]?.length;
    const A_t = Identity_3x3();

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        A_t[j][i] = A[i][j];
      }
    }

    return A_t;
  };

  /**
   * Return inverse of a matrix (if invertible)
   * Throws if matrix not invertible.
   */
  static inv = (A: Matrix_3x3): Matrix_3x3 => {
    const res = Identity_3x3();
    const [[a, b, c], [d, e, f], [h, i, j]] = A;

    const det =
      a * e * j - a * f * i - b * d * j + b * f * h + c * d * i - c * e * h;

    if (det === 0) {
      throw new Error("Matrix not invertible");
    }

    const detInv = 1 / det;

    res[0][0] = detInv * (e * j - f * i);
    res[0][1] = detInv * (c * i - b * j);
    res[0][2] = detInv * (b * f - c * e);

    res[1][0] = detInv * (f * h - d * j);
    res[1][1] = detInv * (a * j - c * h);
    res[1][2] = detInv * (c * d - a * f);

    res[2][0] = detInv * (d * i - e * h);
    res[2][1] = detInv * (b * h - a * i);
    res[2][2] = detInv * (a * e - b * d);

    return res;
  };

  static multiply_3x3_times_triple = (
    A: Matrix_3x3,
    x: NumericTriple,
  ): NumericTriple => {
    const [[a, b, c], [d, e, f], [g, h, i]] = A;
    const [t, u, v] = x;

    return [
      a * t + b * u + c * v,
      d * t + e * u + f * v,
      g * t + h * u + i * v,
    ];
  };

  static multiply_triple_times_3x3 = (
    x: NumericTriple,
    A: Matrix_3x3,
  ): NumericTriple => {
    const [t, u, v] = x;
    const [[a, b, c], [d, e, f], [g, h, i]] = A;

    return [
      a * t + d * u + g * v,
      b * t + e * u + h * v,
      c * t + f * u + i * v,
    ];
  };

  static multiply_3x3_times_3x3 = (
    A: Matrix_3x3,
    B: Matrix_3x3,
  ): Matrix_3x3 => {
    const [[a, b, c], [d, e, f], [g, h, i]] = A;
    const [[j, k, l], [m, n, o], [p, q, r]] = B;

    return [
      [a * j + b * m + c * p, a * k + b * n + c * q, a * l + b * o + c * r],
      [d * j + e * m + f * p, d * k + e * n + f * q, d * l + e * o + f * r],
      [g * j + h * m + i * p, g * k + h * n + i * q, g * l + h * o + i * r],
    ];
  };
}

const Identity_3x3 = (): Matrix_3x3 => [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

export type Matrix_3x3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

export type NumericTriple = [number, number, number];
export type FatNumericTriple = [[number], [number], [number]];
