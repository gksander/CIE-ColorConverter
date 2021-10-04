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
