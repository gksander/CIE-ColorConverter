import { Matrix, Matrix_3x3 } from "../src/Matrix";

describe("Matrix", () => {
  it("transposes 3x3 matrices", () => {
    expect(
      Matrix.transpose([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]),
    ).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);

    const A: Matrix_3x3 = [
      [Math.random(), Math.random(), Math.random()],
      [Math.random(), Math.random(), Math.random()],
      [Math.random(), Math.random(), Math.random()],
    ];

    expect(Matrix.transpose(Matrix.transpose(A))).toEqual(A);
  });

  it("inverts 3x3 matrices", () => {
    expectArraysToBeClose(
      Matrix.inv([
        [1, 2, 3],
        [3, 2, 1],
        [2, 1, 3],
      ]),
      [
        [-5 / 12, 1 / 4, 1 / 3],
        [7 / 12, 1 / 4, -2 / 3],
        [1 / 12, -1 / 4, 1 / 3],
      ],
    );
  });

  // TODO: Check that inverting [[1,2,3],[4,5,6],[7,8,9]] throws
});

const expectArraysToBeClose = (A: Matrix_3x3, B: Matrix_3x3) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      expect(A[i][j]).toBeCloseTo(B[i][j]);
    }
  }
};
