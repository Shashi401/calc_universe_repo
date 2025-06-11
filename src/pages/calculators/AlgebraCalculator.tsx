import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, FunctionSquare as Function, X, Equal, RotateCcw } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

const AlgebraCalculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const handleCalculate = () => {
    try {
      // Basic algebraic expression evaluation
      // This is a simplified version - in production you'd want to use a proper algebra library
      const sanitizedInput = input.replace(/[^-()\d/*+.]/g, '');
      const evaluated = eval(sanitizedInput);
      const newResult = evaluated.toString();
      setResult(newResult);
      setHistory([...history, `${input} = ${newResult}`]);
    } catch (error) {
      setResult('Error: Invalid expression');
    }
  };

  const clearCalculator = () => {
    setInput('');
    setResult('');
  };

  const handleKeyPress = (value: string) => {
    setInput(input + value);
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const CalculatorButton: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }> = ({ onClick, className = '', children }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`h-12 rounded-xl font-medium ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <CalculatorLayout
      title="Algebra Calculator"
      description="Solve algebraic expressions and equations with ease."
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card bg-dark-600 p-6"
        >
          {/* Display */}
          <div className="bg-dark-500 rounded-xl p-4 mb-4">
            <div className="text-gray-400 text-right text-lg h-8 mb-2">
              {input}
            </div>
            <div className="text-white text-right text-3xl font-medium truncate">
              {result || '0'}
            </div>
          </div>

          {/* Function Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <CalculatorButton
              onClick={() => handleKeyPress('(')}
              className="bg-primary-500/20 text-primary-400"
            >
              (
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress(')')}
              className="bg-primary-500/20 text-primary-400"
            >
              )
            </CalculatorButton>
            <CalculatorButton
              onClick={handleBackspace}
              className="bg-warning-500/20 text-warning-400"
            >
              ←
            </CalculatorButton>
            <CalculatorButton
              onClick={clearCalculator}
              className="bg-error-500 text-white"
            >
              C
            </CalculatorButton>
          </div>

          {/* Main Keypad */}
          <div className="grid grid-cols-4 gap-2">
            <CalculatorButton
              onClick={() => handleKeyPress('7')}
              className="bg-dark-500 text-white"
            >
              7
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('8')}
              className="bg-dark-500 text-white"
            >
              8
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('9')}
              className="bg-dark-500 text-white"
            >
              9
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('/')}
              className="bg-primary-500/20 text-primary-400"
            >
              ÷
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleKeyPress('4')}
              className="bg-dark-500 text-white"
            >
              4
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('5')}
              className="bg-dark-500 text-white"
            >
              5
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('6')}
              className="bg-dark-500 text-white"
            >
              6
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('*')}
              className="bg-primary-500/20 text-primary-400"
            >
              ×
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleKeyPress('1')}
              className="bg-dark-500 text-white"
            >
              1
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('2')}
              className="bg-dark-500 text-white"
            >
              2
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('3')}
              className="bg-dark-500 text-white"
            >
              3
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('-')}
              className="bg-primary-500/20 text-primary-400"
            >
              -
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleKeyPress('0')}
              className="bg-dark-500 text-white col-span-2"
            >
              0
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('.')}
              className="bg-dark-500 text-white"
            >
              .
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleKeyPress('+')}
              className="bg-primary-500/20 text-primary-400"
            >
              +
            </CalculatorButton>

            <CalculatorButton
              onClick={handleCalculate}
              className="bg-primary-500 text-white col-span-4"
            >
              =
            </CalculatorButton>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-heading text-white mb-3">History</h3>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="bg-dark-500 rounded-lg p-3 text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </CalculatorLayout>
  );
};

export default AlgebraCalculator;