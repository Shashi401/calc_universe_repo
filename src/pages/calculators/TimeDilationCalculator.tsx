import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Rocket, ArrowRight } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface Calculation {
  velocity: number;
  properTime: number;
  dilatedTime: number;
  timestamp: Date;
}

const TimeDilationCalculator: React.FC = () => {
  const [velocity, setVelocity] = useState<number>(0);
  const [properTime, setProperTime] = useState<number>(1);
  const [history, setHistory] = useState<Calculation[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const SPEED_OF_LIGHT = 299792458; // meters per second

  const calculateTimeDilation = () => {
    const velocityInMS = velocity * 1000; // Convert km/s to m/s
    const gamma = 1 / Math.sqrt(1 - (velocityInMS * velocityInMS) / (SPEED_OF_LIGHT * SPEED_OF_LIGHT));
    const dilatedTime = properTime * gamma;
    
    setResult(dilatedTime);
    setHistory([
      {
        velocity,
        properTime,
        dilatedTime,
        timestamp: new Date()
      },
      ...history
    ]);
  };

  const formatNumber = (num: number): string => {
    if (Math.abs(num) < 0.01 || Math.abs(num) > 999999) {
      return num.toExponential(4);
    }
    return num.toLocaleString(undefined, {
      maximumFractionDigits: 4,
      minimumFractionDigits: 0
    });
  };

  return (
    <CalculatorLayout
      title="Time Dilation Calculator"
      description="Calculate relativistic time dilation effects based on Einstein's special relativity theory."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Calculator */}
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Calculate Time Dilation</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Relative Velocity (km/s)
                  </label>
                  <div className="relative">
                    <Rocket className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={velocity}
                      onChange={(e) => setVelocity(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter velocity"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Speed of light ≈ 299,792 km/s
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Proper Time (seconds)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={properTime}
                      onChange={(e) => setProperTime(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter time"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateTimeDilation}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Calculate
                </button>

                {result !== null && (
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Dilated Time:</p>
                    <p className="text-2xl font-bold text-primary-400">
                      {formatNumber(result)} seconds
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Time dilation factor (γ): {formatNumber(result / properTime)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Theory */}
            <div className="card bg-dark-500/50">
              <h2 className="text-xl font-heading text-white mb-4">About Time Dilation</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Time dilation is a difference in elapsed time measured by two observers, either due to a velocity difference (special relativity) or a difference in gravitational field (general relativity).
                </p>
                <p>
                  The formula used is: t' = t / √(1 - v²/c²)
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>t' = dilated time (time measured by stationary observer)</li>
                  <li>t = proper time (time measured in moving frame)</li>
                  <li>v = relative velocity</li>
                  <li>c = speed of light</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Calculation History */}
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
                      Velocity: {formatNumber(calc.velocity)} km/s
                    </span>
                    <span className="text-primary-400">
                      {calc.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-gray-400">Proper Time</p>
                      <p className="text-white">
                        {formatNumber(calc.properTime)} s
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400">Dilated Time</p>
                      <p className="text-primary-400">
                        {formatNumber(calc.dilatedTime)} s
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Time Dilation Factor: {formatNumber(calc.dilatedTime / calc.properTime)}
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

export default TimeDilationCalculator;