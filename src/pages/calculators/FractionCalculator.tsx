import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Minus, X, Divide } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface Fraction {
  numerator: number;
  denominator: number;
}

const FractionCalculator: React.FC = () => {
  const [fraction1, setFraction1] = useState<Fraction>({ numerator: 0, denominator: 1 });
  const [fraction2, setFraction2] = useState<Fraction>({ numerator: 0, denominator: 1 });
  const [operation, setOperation] = useState<string>('+');
  const [result, setResult] = useState<Fraction | null>(null);
  const [history, setHistory] = useState<Array<{
    fraction1: Fraction;
    fraction2: Fraction;
    operation: string;
    result: Fraction;
    timestamp: Date;
  }>>([]);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (fraction: Fraction): Fraction => {
    const divisor = gcd(Math.abs(fraction.numerator), Math.abs(fraction.denominator));
    return {
      numerator: fraction.numerator / divisor,
      denominator: fraction.denominator / divisor
    };
  };

  const calculateFraction = () => {
    if (fraction2.denominator === 0 || fraction1.denominator === 0) {
      return;
    }

    let resultFraction: Fraction;
    const lcd = (fraction1.denominator * fraction2.denominator) / 
                gcd(fraction1.denominator, fraction2.denominator);

    switch (operation) {
      case '+':
        resultFraction = {
          numerator: (fraction1.numerator * (lcd / fraction1.denominator)) + 
                    (fraction2.numerator * (lcd / fraction2.denominator)),
          denominator: lcd
        };
        break;
      case '-':
        resultFraction = {
          numerator: (fraction1.numerator * (lcd / fraction1.denominator)) - 
                    (fraction2.numerator * (lcd / fraction2.denominator)),
          denominator: lcd
        };
        break;
      case '*':
        resultFraction = {
          numerator: fraction1.numerator * fraction2.numerator,
          denominator: fraction1.denominator * fraction2.denominator
        };
        break;
      case '/':
        resultFraction = {
          numerator: fraction1.numerator * fraction2.denominator,
          denominator: fraction1.denominator * fraction2.numerator
        };
        break;
      default:
        return;
    }

    const simplified = simplifyFraction(resultFraction);
    setResult(simplified);
    setHistory([
      {
        fraction1,
        fraction2,
        operation,
        result: simplified,
        timestamp: new Date()
      },
      ...history
    ]);
  };

  const OperationButton: React.FC<{
    op: string;
    icon: React.ReactNode;
  }> = ({ op, icon }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setOperation(op)}
      className={`p-4 rounded-xl ${
        operation === op
          ? 'bg-primary-500 text-white'
          : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
      }`}
    >
      {icon}
    </motion.button>
  );

  return (
    <CalculatorLayout
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions with ease."
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
              <h2 className="text-2xl font-heading text-white mb-6">Calculate Fractions</h2>
              
              <div className="space-y-6">
                {/* First Fraction */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Numerator 1</label>
                    <input
                      type="number"
                      value={fraction1.numerator}
                      onChange={(e) => setFraction1({ ...fraction1, numerator: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Denominator 1</label>
                    <input
                      type="number"
                      value={fraction1.denominator}
                      onChange={(e) => setFraction1({ ...fraction1, denominator: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Operations */}
                <div className="grid grid-cols-4 gap-4">
                  <OperationButton op="+" icon={<Plus className="h-6 w-6" />} />
                  <OperationButton op="-" icon={<Minus className="h-6 w-6" />} />
                  <OperationButton op="*" icon={<X className="h-6 w-6" />} />
                  <OperationButton op="/" icon={<Divide className="h-6 w-6" />} />
                </div>

                {/* Second Fraction */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Numerator 2</label>
                    <input
                      type="number"
                      value={fraction2.numerator}
                      onChange={(e) => setFraction2({ ...fraction2, numerator: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Denominator 2</label>
                    <input
                      type="number"
                      value={fraction2.denominator}
                      onChange={(e) => setFraction2({ ...fraction2, denominator: Number(e.target.value) })}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateFraction}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Calculate
                </button>

                {result && (
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Result:</p>
                    <p className="text-2xl font-bold text-primary-400">
                      {result.numerator} / {result.denominator}
                    </p>
                  </div>
                )}
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
              {history.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">
                      {item.fraction1.numerator}/{item.fraction1.denominator} {item.operation} {item.fraction2.numerator}/{item.fraction2.denominator}
                    </span>
                    <span className="text-primary-400">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white font-medium">
                    = {item.result.numerator}/{item.result.denominator}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default FractionCalculator;