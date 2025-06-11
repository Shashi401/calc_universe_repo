import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Square, Circle, Triangle, RectangleVertical as Rectangle } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

type Shape = 'circle' | 'square' | 'rectangle' | 'triangle';

interface Calculation {
  shape: Shape;
  values: Record<string, number>;
  area: number;
  perimeter: number;
}

const GeometryCalculator: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<Shape>('circle');
  const [values, setValues] = useState<Record<string, number>>({
    radius: 0,
    side: 0,
    width: 0,
    height: 0,
    base: 0,
    height_triangle: 0,
  });
  const [history, setHistory] = useState<Calculation[]>([]);

  const calculateCircle = () => {
    const radius = values.radius;
    const area = Math.PI * radius * radius;
    const perimeter = 2 * Math.PI * radius;
    return { area, perimeter };
  };

  const calculateSquare = () => {
    const side = values.side;
    const area = side * side;
    const perimeter = 4 * side;
    return { area, perimeter };
  };

  const calculateRectangle = () => {
    const width = values.width;
    const height = values.height;
    const area = width * height;
    const perimeter = 2 * (width + height);
    return { area, perimeter };
  };

  const calculateTriangle = () => {
    const base = values.base;
    const height = values.height_triangle;
    const area = (base * height) / 2;
    const perimeter = base * 3; // Assuming equilateral triangle for simplicity
    return { area, perimeter };
  };

  const handleCalculate = () => {
    let result;
    switch (selectedShape) {
      case 'circle':
        result = calculateCircle();
        break;
      case 'square':
        result = calculateSquare();
        break;
      case 'rectangle':
        result = calculateRectangle();
        break;
      case 'triangle':
        result = calculateTriangle();
        break;
      default:
        return;
    }

    setHistory([
      {
        shape: selectedShape,
        values: { ...values },
        area: result.area,
        perimeter: result.perimeter,
      },
      ...history,
    ]);
  };

  const renderInputs = () => {
    switch (selectedShape) {
      case 'circle':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Radius</label>
              <input
                type="number"
                value={values.radius || ''}
                onChange={(e) =>
                  setValues({ ...values, radius: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      case 'square':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Side Length</label>
              <input
                type="number"
                value={values.side || ''}
                onChange={(e) =>
                  setValues({ ...values, side: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      case 'rectangle':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Width</label>
              <input
                type="number"
                value={values.width || ''}
                onChange={(e) =>
                  setValues({ ...values, width: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Height</label>
              <input
                type="number"
                value={values.height || ''}
                onChange={(e) =>
                  setValues({ ...values, height: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      case 'triangle':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Base</label>
              <input
                type="number"
                value={values.base || ''}
                onChange={(e) =>
                  setValues({ ...values, base: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Height</label>
              <input
                type="number"
                value={values.height_triangle || ''}
                onChange={(e) =>
                  setValues({
                    ...values,
                    height_triangle: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <CalculatorLayout
      title="Geometry Calculator"
      description="Calculate area, perimeter, and other geometric properties."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6">
              Shape Calculator
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <button
                onClick={() => setSelectedShape('circle')}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                  selectedShape === 'circle'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                }`}
              >
                <Circle className="h-6 w-6" />
                <span>Circle</span>
              </button>
              <button
                onClick={() => setSelectedShape('square')}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                  selectedShape === 'square'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                }`}
              >
                <Square className="h-6 w-6" />
                <span>Square</span>
              </button>
              <button
                onClick={() => setSelectedShape('rectangle')}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                  selectedShape === 'rectangle'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                }`}
              >
                <Rectangle className="h-6 w-6" />
                <span>Rectangle</span>
              </button>
              <button
                onClick={() => setSelectedShape('triangle')}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                  selectedShape === 'triangle'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                }`}
              >
                <Triangle className="h-6 w-6" />
                <span>Triangle</span>
              </button>
            </div>

            {renderInputs()}

            <button
              onClick={handleCalculate}
              className="w-full mt-6 bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
            >
              Calculate
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6">History</h2>
            <div className="space-y-4">
              {history.map((calc, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">
                      {calc.shape}
                    </span>
                    <span className="text-primary-400">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Area</p>
                      <p className="text-white font-medium">
                        {calc.area.toFixed(2)} units²
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Perimeter</p>
                      <p className="text-white font-medium">
                        {calc.perimeter.toFixed(2)} units
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default GeometryCalculator;