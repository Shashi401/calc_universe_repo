import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Weight, ArrowDown, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface ForceCalculation {
  mass: number;
  acceleration: number;
  force: number;
  timestamp: Date;
}

const StaticCalculator: React.FC = () => {
  const [mass, setMass] = useState<number>(1);
  const [acceleration, setAcceleration] = useState<number>(9.81);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<ForceCalculation[]>([]);

  const calculateForce = () => {
    const force = mass * acceleration;
    setResult(force);
    setHistory([
      {
        mass,
        acceleration,
        force,
        timestamp: new Date()
      },
      ...history
    ]);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  return (
    <CalculatorLayout
      title="Static Calculator"
      description="Calculate forces, moments, and other static quantities in physics."
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
              <h2 className="text-2xl font-heading text-white mb-6">Force Calculator</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Mass (kg)</label>
                  <input
                    type="number"
                    value={mass}
                    onChange={(e) => setMass(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Acceleration (m/s²)</label>
                  <input
                    type="number"
                    value={acceleration}
                    onChange={(e) => setAcceleration(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  onClick={calculateForce}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Calculate Force
                </button>

                {result !== null && (
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Force:</p>
                    <p className="text-2xl font-bold text-primary-400">
                      {formatNumber(result)} N
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-dark-500/50">
              <h3 className="text-xl font-heading text-white mb-4">Quick Reference</h3>
              <div className="space-y-4 text-gray-300">
                <p>F = ma (Newton's Second Law)</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>F = Force (N)</li>
                  <li>m = Mass (kg)</li>
                  <li>a = Acceleration (m/s²)</li>
                </ul>
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
                      Mass: {formatNumber(calc.mass)} kg
                    </span>
                    <span className="text-primary-400">
                      {calc.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Acceleration</p>
                      <p className="text-white">{formatNumber(calc.acceleration)} m/s²</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Force</p>
                      <p className="text-success-400">{formatNumber(calc.force)} N</p>
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

export default StaticCalculator;