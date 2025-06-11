import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Percent, Plus, Minus, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

const PercentageCalculator: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [history, setHistory] = useState<Array<{
    type: string;
    value: number;
    percentage: number;
    result: number;
    timestamp: Date;
  }>>([]);

  const calculatePercentage = (type: string) => {
    let calculatedResult = 0;
    switch (type) {
      case 'of':
        calculatedResult = (value * percentage) / 100;
        break;
      case 'increase':
        calculatedResult = value * (1 + percentage / 100);
        break;
      case 'decrease':
        calculatedResult = value * (1 - percentage / 100);
        break;
      case 'difference':
        calculatedResult = ((value - percentage) / percentage) * 100;
        break;
    }
    setResult(calculatedResult);
    setHistory([
      {
        type,
        value,
        percentage,
        result: calculatedResult,
        timestamp: new Date()
      },
      ...history
    ]);
  };

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, increases, decreases, and differences between values."
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
              <h2 className="text-2xl font-heading text-white mb-6">Calculate</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Value</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Percentage</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={percentage}
                      onChange={(e) => setPercentage(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => calculatePercentage('of')}
                    className="bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                  >
                    Percentage Of
                  </button>
                  <button
                    onClick={() => calculatePercentage('increase')}
                    className="bg-success-500 text-white rounded-lg py-3 hover:bg-success-600 transition-colors"
                  >
                    Increase By
                  </button>
                  <button
                    onClick={() => calculatePercentage('decrease')}
                    className="bg-warning-500 text-white rounded-lg py-3 hover:bg-warning-600 transition-colors"
                  >
                    Decrease By
                  </button>
                  <button
                    onClick={() => calculatePercentage('difference')}
                    className="bg-accent-500 text-white rounded-lg py-3 hover:bg-accent-600 transition-colors"
                  >
                    Percentage Difference
                  </button>
                </div>

                {result !== 0 && (
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Result:</p>
                    <p className="text-2xl font-bold text-primary-400">
                      {result.toFixed(2)}
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
            <h2 className="text-2xl font-heading text-white mb-6">History</h2>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">
                      {item.type === 'of' ? 'Percentage Of' :
                       item.type === 'increase' ? 'Increase By' :
                       item.type === 'decrease' ? 'Decrease By' :
                       'Percentage Difference'}
                    </span>
                    <span className="text-primary-400">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Value</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Percentage</p>
                      <p className="text-white">{item.percentage}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400">Result</p>
                    <p className="text-primary-400 font-bold">{item.result.toFixed(2)}</p>
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

export default PercentageCalculator;