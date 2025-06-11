import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Equal, RefreshCw } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface Solution {
  equation: string;
  steps: string[];
  result: string;
  timestamp: Date;
}

const EquationSolver: React.FC = () => {
  const [equation, setEquation] = useState<string>('');
  const [solution, setSolution] = useState<Solution | null>(null);
  const [history, setHistory] = useState<Solution[]>([]);

  const solveEquation = () => {
    // This is a simplified example. In a real implementation,
    // you would use a math library like math.js or algebrite
    // to properly solve equations and show steps.
    
    const steps = [
      'Simplify both sides of the equation',
      'Combine like terms',
      'Isolate variable terms',
      'Solve for x'
    ];

    const newSolution = {
      equation,
      steps,
      result: 'x = 5', // Example result
      timestamp: new Date()
    };

    setSolution(newSolution);
    setHistory([newSolution, ...history]);
  };

  return (
    <CalculatorLayout
      title="Equation Solver"
      description="Solve mathematical equations step by step with detailed explanations."
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
              <h2 className="text-2xl font-heading text-white mb-6">Enter Equation</h2>
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Enter equation (e.g., 2x + 3 = 13)"
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  onClick={solveEquation}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Equal className="h-5 w-5" />
                  Solve Equation
                </button>
              </div>
            </div>

            {solution && (
              <div className="card bg-primary-500/10">
                <h2 className="text-2xl font-heading text-white mb-6">Solution</h2>
                <div className="space-y-4">
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Original Equation:</p>
                    <p className="text-xl text-white font-mono">{solution.equation}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {solution.steps.map((step, index) => (
                      <div key={index} className="bg-dark-500 rounded-lg p-4">
                        <p className="text-gray-400 mb-1">Step {index + 1}:</p>
                        <p className="text-white">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary-500/20 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Result:</p>
                    <p className="text-2xl text-primary-400 font-mono">{solution.result}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Solution History</h2>
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="bg-dark-500 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{item.equation}</span>
                      <span className="text-primary-400">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white font-mono">{item.result}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-dark-500/50">
              <h3 className="text-xl font-heading text-white mb-4">Supported Equations</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Linear equations (e.g., ax + b = c)</li>
                <li>• Quadratic equations (e.g., ax² + bx + c = 0)</li>
                <li>• Systems of linear equations</li>
                <li>• Polynomial equations</li>
                <li>• Exponential equations</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default EquationSolver;