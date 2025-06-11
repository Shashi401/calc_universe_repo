import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X, Divide, RotateCcw, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

type Matrix = number[][];
type Operation = 'add' | 'subtract' | 'multiply' | 'determinant' | 'inverse' | 'transpose';

interface MatrixHistory {
  operation: Operation;
  matrices: Matrix[];
  result: Matrix;
  timestamp: Date;
}

const MatrixCalculator: React.FC = () => {
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [result, setResult] = useState<Matrix | null>(null);
  const [history, setHistory] = useState<MatrixHistory[]>([]);
  const [dimensions, setDimensions] = useState({ rows: 2, cols: 2 });

  const createEmptyMatrix = (rows: number, cols: number): Matrix => {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
  };

  const updateMatrixValue = (matrix: Matrix, setMatrix: React.Dispatch<React.SetStateAction<Matrix>>, row: number, col: number, value: string) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = Number(value) || 0;
    setMatrix(newMatrix);
  };

  const resizeMatrices = (rows: number, cols: number) => {
    setDimensions({ rows, cols });
    setMatrixA(createEmptyMatrix(rows, cols));
    setMatrixB(createEmptyMatrix(rows, cols));
    setResult(null);
  };

  const addMatrices = (a: Matrix, b: Matrix): Matrix => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
    const result = createEmptyMatrix(a.length, b[0].length);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        result[i][j] = a[i].reduce((sum, val, k) => sum + val * b[k][j], 0);
      }
    }
    return result;
  };

  const determinant = (matrix: Matrix): number => {
    if (matrix.length === 1) return matrix[0][0];
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let i = 0; i < matrix[0].length; i++) {
      det += Math.pow(-1, i) * matrix[0][i] * determinant(
        matrix.slice(1).map(row => [...row.slice(0, i), ...row.slice(i + 1)])
      );
    }
    return det;
  };

  const transposeMatrix = (matrix: Matrix): Matrix => {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  };

  const inverseMatrix = (matrix: Matrix): Matrix => {
    const det = determinant(matrix);
    if (det === 0) throw new Error("Matrix is not invertible");
    
    if (matrix.length === 2) {
      const invDet = 1 / det;
      return [
        [matrix[1][1] * invDet, -matrix[0][1] * invDet],
        [-matrix[1][0] * invDet, matrix[0][0] * invDet]
      ];
    }
    throw new Error("Inverse for larger matrices not implemented");
  };

  const performOperation = (operation: Operation) => {
    try {
      let resultMatrix: Matrix;
      switch (operation) {
        case 'add':
          resultMatrix = addMatrices(matrixA, matrixB);
          break;
        case 'subtract':
          resultMatrix = subtractMatrices(matrixA, matrixB);
          break;
        case 'multiply':
          resultMatrix = multiplyMatrices(matrixA, matrixB);
          break;
        case 'transpose':
          resultMatrix = transposeMatrix(matrixA);
          break;
        case 'inverse':
          resultMatrix = inverseMatrix(matrixA);
          break;
        case 'determinant':
          resultMatrix = [[determinant(matrixA)]];
          break;
        default:
          return;
      }

      setResult(resultMatrix);
      setHistory([
        {
          operation,
          matrices: [matrixA, matrixB],
          result: resultMatrix,
          timestamp: new Date()
        },
        ...history
      ]);
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  const MatrixInput: React.FC<{
    matrix: Matrix;
    setMatrix: React.Dispatch<React.SetStateAction<Matrix>>;
    label: string;
  }> = ({ matrix, setMatrix, label }) => (
    <div>
      <h3 className="text-lg font-heading text-white mb-4">{label}</h3>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${dimensions.cols}, 1fr)` }}>
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => updateMatrixValue(matrix, setMatrix, i, j, e.target.value)}
              className="w-full bg-dark-500 text-white rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Matrix Calculator"
      description="Perform matrix operations including addition, multiplication, determinant, and more."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Matrix Dimensions</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Rows</label>
                  <select
                    value={dimensions.rows}
                    onChange={(e) => resizeMatrices(Number(e.target.value), dimensions.cols)}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {[2, 3, 4].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Columns</label>
                  <select
                    value={dimensions.cols}
                    onChange={(e) => resizeMatrices(dimensions.rows, Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {[2, 3, 4].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="card">
              <MatrixInput matrix={matrixA} setMatrix={setMatrixA} label="Matrix A" />
            </div>

            <div className="card">
              <MatrixInput matrix={matrixB} setMatrix={setMatrixB} label="Matrix B" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <button
                onClick={() => performOperation('add')}
                className="bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => performOperation('subtract')}
                className="bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
              >
                Subtract
              </button>
              <button
                onClick={() => performOperation('multiply')}
                className="bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
              >
                Multiply
              </button>
              <button
                onClick={() => performOperation('determinant')}
                className="bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
              >
                Determinant
              </button>
              <button
                onClick={() => performOperation('inverse')}
                className="bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
              >
                Inverse
              </button>
              <button
                onClick={() => performOperation('transpose')}
                className="bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
              >
                Transpose
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {result && (
              <div className="card bg-primary-500/10">
                <h2 className="text-2xl font-heading text-white mb-6">Result</h2>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result[0].length}, 1fr)` }}>
                  {result.map((row, i) =>
                    row.map((val, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="bg-dark-500 text-white rounded-lg px-3 py-2 text-center"
                      >
                        {val.toFixed(2)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">History</h2>
              <div className="space-y-4">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-dark-500 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">
                        {entry.operation}
                      </span>
                      <span className="text-primary-400">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${entry.result[0].length}, 1fr)` }}>
                      {entry.result.map((row, i) =>
                        row.map((val, j) => (
                          <div
                            key={`${i}-${j}`}
                            className="bg-dark-600 text-white rounded-lg px-2 py-1 text-center text-sm"
                          >
                            {val.toFixed(2)}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default MatrixCalculator;