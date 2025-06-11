import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ListPlus, ArrowDown, BarChart } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface StatisticsResult {
  mean: number;
  median: number;
  mode: number[];
  standardDeviation: number;
  timestamp: Date;
}

const StatisticsCalculator: React.FC = () => {
  const [numbers, setNumbers] = useState<string>('');
  const [result, setResult] = useState<StatisticsResult | null>(null);
  const [history, setHistory] = useState<StatisticsResult[]>([]);

  const calculateStatistics = () => {
    const numberArray = numbers.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    
    if (numberArray.length === 0) return;

    // Calculate mean
    const mean = numberArray.reduce((acc, val) => acc + val, 0) / numberArray.length;

    // Calculate median
    const sorted = [...numberArray].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    // Calculate mode
    const frequency: { [key: number]: number } = {};
    numberArray.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFrequency = Math.max(...Object.values(frequency));
    const mode = Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFrequency)
      .map(([num, _]) => parseFloat(num));

    // Calculate standard deviation
    const variance = numberArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numberArray.length;
    const standardDeviation = Math.sqrt(variance);

    const newResult = {
      mean,
      median,
      mode,
      standardDeviation,
      timestamp: new Date()
    };

    setResult(newResult);
    setHistory([newResult, ...history]);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, {
      maximumFractionDigits: 4,
      minimumFractionDigits: 2
    });
  };

  return (
    <CalculatorLayout
      title="Statistics Calculator"
      description="Calculate basic statistical measures including mean, median, mode, and standard deviation."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Statistical Analysis
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Enter numbers (comma-separated)
                  </label>
                  <textarea
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="e.g., 1, 2, 3, 4, 5"
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 h-24"
                  />
                </div>

                <button
                  onClick={calculateStatistics}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ListPlus className="w-5 h-5" />
                  Calculate Statistics
                </button>

                {result && (
                  <div className="bg-dark-500 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-gray-400">Mean:</p>
                      <p className="text-xl font-bold text-primary-400">
                        {formatNumber(result.mean)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Median:</p>
                      <p className="text-xl font-bold text-primary-400">
                        {formatNumber(result.median)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Mode:</p>
                      <p className="text-xl font-bold text-primary-400">
                        {result.mode.map(formatNumber).join(', ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Standard Deviation:</p>
                      <p className="text-xl font-bold text-primary-400">
                        {formatNumber(result.standardDeviation)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-dark-500/50">
              <h3 className="text-xl font-heading text-white mb-4 flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Quick Reference
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>Statistical Measures:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Mean: Average of all numbers</li>
                  <li>Median: Middle value when sorted</li>
                  <li>Mode: Most frequent value(s)</li>
                  <li>Standard Deviation: Measure of spread</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6 flex items-center gap-2">
              <ArrowDown className="w-6 h-6" />
              Calculation History
            </h2>
            <div className="space-y-4">
              {history.map((calc, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-primary-400">
                      {calc.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Mean</p>
                      <p className="text-white">{formatNumber(calc.mean)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Median</p>
                      <p className="text-white">{formatNumber(calc.median)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Mode</p>
                      <p className="text-white">{calc.mode.map(formatNumber).join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Std Dev</p>
                      <p className="text-white">{formatNumber(calc.standardDeviation)}</p>
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

export default StatisticsCalculator;