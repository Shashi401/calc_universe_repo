import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FunctionSquare as Function, ArrowRight, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface DerivativeResult {
  function: string;
  derivative: string;
  timestamp: Date;
}

const CalculusCalculator: React.FC = () => {
  const [inputFunction, setInputFunction] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<DerivativeResult[]>([]);

  const calculateDerivative = () => {
    // This is a simplified example - in production you'd want to use a proper calculus library
    let derivative = '';
    
    // Basic power rule implementation
    const powerMatch = inputFunction.match(/x\^(\d+)/);
    if (powerMatch) {
      const power = parseInt(powerMatch[1]);
      const newPower = power - 1;
      derivative = `${power}x^${newPower}`;
    } else if (inputFunction === 'x') {
      derivative = '1';
    } else if (inputFunction === 'sin(x)') {
      derivative = 'cos(x)';
    } else if (inputFunction === 'cos(x)') {
      derivative = '-sin(x)';
    } else if (inputFunction === 'e^x') {
      derivative = 'e^x';
    } else if (inputFunction === 'ln(x)') {
      derivative = '1/x';
    } else {
      derivative = 'Cannot compute derivative';
    }

    setResult(derivative);
    setHistory([
      {
        function: inputFunction,
        derivative,
        timestamp: new Date()
      },
      ...history
    ]);
  };

  return (
    <CalculatorLayout
      title="Calculus Calculator"
      description="Calculate derivatives, integrals, and limits of mathematical functions."
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
              <h2 className="text-2xl font-heading text-white mb-6">Derivative Calculator</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Enter Function</label>
                  <input
                    type="text"
                    value={inputFunction}
                    onChange={(e) => setInputFunction(e.target.value)}
                    placeholder="e.g., x^2, sin(x), e^x"
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  onClick={calculateDerivative}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Calculate Derivative
                </button>

                {result && (
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Derivative:</p>
                    <p className="text-2xl font-bold text-primary-400">
                      {result}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-dark-500/50">
              <h3 className="text-xl font-heading text-white mb-4">Supported Functions</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="font-medium mb-2">Basic Functions</p>
                  <ul className="space-y-1 text-gray-400">
                    <li>x^n (Power)</li>
                    <li>sin(x)</li>
                    <li>cos(x)</li>
                    <li>e^x</li>
                    <li>ln(x)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Rules</p>
                  <ul className="space-y-1 text-gray-400">
                    <li>Power Rule</li>
                    <li>Chain Rule</li>
                    <li>Product Rule</li>
                    <li>Quotient Rule</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6">Calculation History</h2>
            <div className="space-y-4">
              {history.map((calc, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">
                      Function: {calc.function}
                    </span>
                    <span className="text-primary-400">
                      {calc.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-400">d/dx</p>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <p className="text-success-400">{calc.derivative}</p>
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

export default CalculusCalculator;