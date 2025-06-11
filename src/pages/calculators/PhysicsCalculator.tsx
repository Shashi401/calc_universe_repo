import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Zap, Gauge, Atom, Weight, Rocket, ArrowRight } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

type FormulaCategory = 'mechanics' | 'energy' | 'waves' | 'electricity' | 'thermodynamics' | 'nuclear';

interface Formula {
  name: string;
  inputs: { label: string; unit: string }[];
  calculate: (values: number[]) => { result: number; unit: string };
}

const PhysicsCalculator: React.FC = () => {
  const [category, setCategory] = useState<FormulaCategory>('mechanics');
  const [selectedFormula, setSelectedFormula] = useState<string>('velocity');
  const [inputValues, setInputValues] = useState<number[]>([]);
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [history, setHistory] = useState<Array<{
    category: FormulaCategory;
    formula: string;
    inputs: number[];
    result: { value: number; unit: string };
    timestamp: Date;
  }>>([]);

  const formulas: Record<FormulaCategory, Record<string, Formula>> = {
    mechanics: {
      velocity: {
        name: 'Velocity (v = d/t)',
        inputs: [
          { label: 'Distance', unit: 'm' },
          { label: 'Time', unit: 's' }
        ],
        calculate: (values) => ({ result: values[0] / values[1], unit: 'm/s' })
      },
      acceleration: {
        name: 'Acceleration (a = Δv/t)',
        inputs: [
          { label: 'Change in Velocity', unit: 'm/s' },
          { label: 'Time', unit: 's' }
        ],
        calculate: (values) => ({ result: values[0] / values[1], unit: 'm/s²' })
      },
      force: {
        name: 'Force (F = ma)',
        inputs: [
          { label: 'Mass', unit: 'kg' },
          { label: 'Acceleration', unit: 'm/s²' }
        ],
        calculate: (values) => ({ result: values[0] * values[1], unit: 'N' })
      }
    },
    energy: {
      kineticEnergy: {
        name: 'Kinetic Energy (KE = ½mv²)',
        inputs: [
          { label: 'Mass', unit: 'kg' },
          { label: 'Velocity', unit: 'm/s' }
        ],
        calculate: (values) => ({ result: 0.5 * values[0] * values[1] * values[1], unit: 'J' })
      },
      potentialEnergy: {
        name: 'Gravitational Potential Energy (PE = mgh)',
        inputs: [
          { label: 'Mass', unit: 'kg' },
          { label: 'Height', unit: 'm' }
        ],
        calculate: (values) => ({ result: values[0] * 9.81 * values[1], unit: 'J' })
      },
      work: {
        name: 'Work (W = Fd)',
        inputs: [
          { label: 'Force', unit: 'N' },
          { label: 'Distance', unit: 'm' }
        ],
        calculate: (values) => ({ result: values[0] * values[1], unit: 'J' })
      }
    },
    waves: {
      wavelength: {
        name: 'Wave Speed (v = fλ)',
        inputs: [
          { label: 'Frequency', unit: 'Hz' },
          { label: 'Wavelength', unit: 'm' }
        ],
        calculate: (values) => ({ result: values[0] * values[1], unit: 'm/s' })
      },
      period: {
        name: 'Period (T = 1/f)',
        inputs: [
          { label: 'Frequency', unit: 'Hz' }
        ],
        calculate: (values) => ({ result: 1 / values[0], unit: 's' })
      }
    },
    electricity: {
      ohmsLaw: {
        name: 'Ohm\'s Law (V = IR)',
        inputs: [
          { label: 'Current', unit: 'A' },
          { label: 'Resistance', unit: 'Ω' }
        ],
        calculate: (values) => ({ result: values[0] * values[1], unit: 'V' })
      },
      power: {
        name: 'Electrical Power (P = VI)',
        inputs: [
          { label: 'Voltage', unit: 'V' },
          { label: 'Current', unit: 'A' }
        ],
        calculate: (values) => ({ result: values[0] * values[1], unit: 'W' })
      }
    },
    thermodynamics: {
      heatEnergy: {
        name: 'Heat Energy (Q = mcΔT)',
        inputs: [
          { label: 'Mass', unit: 'kg' },
          { label: 'Specific Heat', unit: 'J/kg·K' },
          { label: 'Temperature Change', unit: 'K' }
        ],
        calculate: (values) => ({ result: values[0] * values[1] * values[2], unit: 'J' })
      },
      pressure: {
        name: 'Pressure (P = F/A)',
        inputs: [
          { label: 'Force', unit: 'N' },
          { label: 'Area', unit: 'm²' }
        ],
        calculate: (values) => ({ result: values[0] / values[1], unit: 'Pa' })
      }
    },
    nuclear: {
      massEnergy: {
        name: 'Mass-Energy Equivalence (E = mc²)',
        inputs: [
          { label: 'Mass', unit: 'kg' }
        ],
        calculate: (values) => ({ result: values[0] * 299792458 * 299792458, unit: 'J' })
      },
      halfLife: {
        name: 'Half-Life Decay (N = N₀(1/2)^(t/t₁/₂))',
        inputs: [
          { label: 'Initial Amount', unit: 'atoms' },
          { label: 'Time', unit: 's' },
          { label: 'Half-Life', unit: 's' }
        ],
        calculate: (values) => ({
          result: values[0] * Math.pow(0.5, values[1] / values[2]),
          unit: 'atoms'
        })
      }
    }
  };

  const handleCategoryChange = (newCategory: FormulaCategory) => {
    setCategory(newCategory);
    const firstFormula = Object.keys(formulas[newCategory])[0];
    setSelectedFormula(firstFormula);
    setInputValues([]);
    setResult(null);
  };

  const handleFormulaChange = (formulaKey: string) => {
    setSelectedFormula(formulaKey);
    setInputValues([]);
    setResult(null);
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = parseFloat(value) || 0;
    setInputValues(newValues);
  };

  const handleCalculate = () => {
    const formula = formulas[category][selectedFormula];
    const calculationResult = formula.calculate(inputValues);
    setResult({ value: calculationResult.result, unit: calculationResult.unit });
    
    setHistory([
      {
        category,
        formula: formula.name,
        inputs: inputValues,
        result: { value: calculationResult.result, unit: calculationResult.unit },
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

  const getCategoryIcon = (cat: FormulaCategory) => {
    switch (cat) {
      case 'mechanics':
        return <Rocket className="h-6 w-6" />;
      case 'energy':
        return <Zap className="h-6 w-6" />;
      case 'waves':
        return <Weight className="h-6 w-6" />;
      case 'electricity':
        return <Gauge className="h-6 w-6" />;
      case 'thermodynamics':
        return <Thermometer className="h-6 w-6" />;
      case 'nuclear':
        return <Atom className="h-6 w-6" />;
    }
  };

  return (
    <CalculatorLayout
      title="Physics Calculator"
      description="Calculate various physical quantities using fundamental physics equations."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Categories */}
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Select Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(formulas).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key as FormulaCategory)}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                      category === key
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                    }`}
                  >
                    {getCategoryIcon(key as FormulaCategory)}
                    <span className="capitalize">{key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Selection */}
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Select Formula</h2>
              <div className="space-y-4">
                {Object.entries(formulas[category]).map(([key, formula]) => (
                  <button
                    key={key}
                    onClick={() => handleFormulaChange(key)}
                    className={`w-full p-4 rounded-xl text-left transition-colors ${
                      selectedFormula === key
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-500 text-gray-300 hover:bg-dark-400'
                    }`}
                  >
                    {formula.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculator */}
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Calculate</h2>
              <div className="space-y-6">
                {formulas[category][selectedFormula].inputs.map((input, index) => (
                  <div key={index}>
                    <label className="block text-gray-300 mb-2">
                      {input.label} ({input.unit})
                    </label>
                    <input
                      type="number"
                      value={inputValues[index] || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                ))}

                <button
                  onClick={handleCalculate}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Calculate
                </button>

                {result && (
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Result:</p>
                    <p className="text-2xl font-bold text-primary-400">
                      {formatNumber(result.value)} {result.unit}
                    </p>
                  </div>
                )}
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
              {history.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">
                      {item.category}
                    </span>
                    <span className="text-primary-400">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white">{item.formula}</p>
                  <div className="text-gray-400">
                    {item.inputs.map((input, i) => (
                      <span key={i} className="mr-4">
                        {formatNumber(input)}
                      </span>
                    ))}
                    <ArrowRight className="inline-block h-4 w-4 mx-2" />
                    <span className="text-primary-400">
                      {formatNumber(item.result.value)} {item.result.unit}
                    </span>
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

export default PhysicsCalculator;