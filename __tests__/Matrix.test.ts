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
});
