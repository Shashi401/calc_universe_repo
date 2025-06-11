import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Binary, Hash, RotateCcw, Plus, Minus } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

type NumberBase = 'binary' | 'decimal' | 'hexadecimal' | 'octal';

interface Calculation {
  input: string;
  base: NumberBase;
  results: Record<NumberBase, string>;
  isNegative: boolean;
  timestamp: Date;
}

const ProgrammerCalculator: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [currentBase, setCurrentBase] = useState<NumberBase>('decimal');
  const [isNegative, setIsNegative] = useState<boolean>(false);
  const [history, setHistory] = useState<Calculation[]>([]);

  const convertNumber = (value: string, fromBase: NumberBase, negative: boolean): Record<NumberBase, string> => {
    let decimal: number;

    // Convert to decimal first
    try {
      switch (fromBase) {
        case 'binary':
          decimal = parseInt(value, 2);
          break;
        case 'octal':
          decimal = parseInt(value, 8);
          break;
        case 'decimal':
          decimal = parseInt(value, 10);
          break;
        case 'hexadecimal':
          decimal = parseInt(value, 16);
          break;
        default:
          decimal = 0;
      }
    } catch {
      decimal = 0;
    }

    // Apply sign
    if (negative) {
      decimal = -decimal;
    }

    // Convert decimal to all bases
    const absValue = Math.abs(decimal);
    const sign = decimal < 0 ? '-' : '';

    return {
      binary: getBinaryRepresentation(decimal),
      octal: sign + absValue.toString(8),
      decimal: decimal.toString(10),
      hexadecimal: sign + absValue.toString(16).toUpperCase()
    };
  };

  // Get two's complement binary representation for negative numbers
  const getBinaryRepresentation = (num: number): string => {
    if (num >= 0) {
      return num.toString(2);
    }

    // For negative numbers, use 32-bit two's complement
    const binary = (num >>> 0).toString(2);
    return binary.padStart(32, '1');
  };

  const handleNumberClick = (value: string) => {
    if (input === '0') {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleBaseChange = (newBase: NumberBase) => {
    const results = convertNumber(input, currentBase, isNegative);
    setInput(results[newBase].replace('-', ''));
    setIsNegative(results.decimal.startsWith('-'));
    setCurrentBase(newBase);
  };

  const handleConvert = () => {
    const results = convertNumber(input, currentBase, isNegative);
    setHistory([
      {
        input,
        base: currentBase,
        results,
        isNegative,
        timestamp: new Date()
      },
      ...history
    ]);
  };

  const handleClear = () => {
    setInput('0');
    setIsNegative(false);
  };

  const handleBackspace = () => {
    if (input.length > 1) {
      setInput(input.slice(0, -1));
    } else {
      setInput('0');
    }
  };

  const toggleSign = () => {
    setIsNegative(!isNegative);
  };

  const isValidInput = (value: string, base: NumberBase): boolean => {
    switch (base) {
      case 'binary':
        return /^[01]*$/.test(value);
      case 'octal':
        return /^[0-7]*$/.test(value);
      case 'decimal':
        return /^[0-9]*$/.test(value);
      case 'hexadecimal':
        return /^[0-9A-Fa-f]*$/.test(value);
      default:
        return false;
    }
  };

  const getAvailableDigits = (base: NumberBase): string[] => {
    switch (base) {
      case 'binary':
        return ['0', '1'];
      case 'octal':
        return ['0', '1', '2', '3', '4', '5', '6', '7'];
      case 'decimal':
        return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      case 'hexadecimal':
        return [
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'A', 'B', 'C', 'D', 'E', 'F'
        ];
      default:
        return [];
    }
  };

  return (
    <CalculatorLayout
      title="Programmer Calculator"
      description="Convert between number bases and perform bitwise operations, including negative numbers."
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
              <div className="bg-dark-500 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {(['binary', 'decimal', 'hexadecimal', 'octal'] as NumberBase[]).map((base) => (
                    <button
                      key={base}
                      onClick={() => handleBaseChange(base)}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        currentBase === base
                          ? 'bg-primary-500 text-white'
                          : 'bg-dark-600 text-gray-300 hover:bg-dark-400'
                      }`}
                    >
                      {base.charAt(0).toUpperCase() + base.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={toggleSign}
                    className={`p-2 rounded-lg transition-colors ${
                      isNegative
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-600 text-gray-300 hover:bg-dark-400'
                    }`}
                  >
                    {isNegative ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      if (isValidInput(e.target.value, currentBase)) {
                        setInput(e.target.value);
                      }
                    }}
                    className="w-full bg-dark-600 text-white text-right text-2xl font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="text-sm text-gray-400 text-right">
                  {currentBase === 'binary' && isNegative ? "Using Two's Complement" : ""}
                </div>
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-4 gap-2">
                {getAvailableDigits(currentBase).map((digit) => (
                  <button
                    key={digit}
                    onClick={() => handleNumberClick(digit)}
                    className="h-12 bg-dark-500 text-white rounded-lg hover:bg-dark-400 transition-colors"
                  >
                    {digit}
                  </button>
                ))}

                {/* Control Buttons */}
                <button
                  onClick={handleClear}
                  className="h-12 bg-error-500 text-white rounded-lg hover:bg-error-600 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleBackspace}
                  className="h-12 bg-warning-500 text-white rounded-lg hover:bg-warning-600 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={handleConvert}
                  className="h-12 col-span-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Convert
                </button>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="card bg-dark-500/50">
              <h3 className="text-xl font-heading text-white mb-4">Quick Reference</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Binary (Base-2)</p>
                    <p className="text-white">0, 1</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Octal (Base-8)</p>
                    <p className="text-white">0-7</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Decimal (Base-10)</p>
                    <p className="text-white">0-9</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Hexadecimal (Base-16)</p>
                    <p className="text-white">0-9, A-F</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400 mb-1">Negative Numbers:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Binary uses Two's Complement representation</li>
                    <li>Other bases use a negative sign prefix</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conversion History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-heading text-white mb-6">Conversion History</h2>
            <div className="space-y-4">
              {history.map((calc, index) => (
                <div
                  key={index}
                  className="bg-dark-500 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">
                      From {calc.base} {calc.isNegative ? '(Negative)' : ''}
                    </span>
                    <span className="text-primary-400">
                      {calc.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-400">Binary {calc.isNegative ? "(Two's Complement)" : ""}</p>
                      <p className="text-white font-mono break-all">{calc.results.binary}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Octal</p>
                      <p className="text-white font-mono">{calc.results.octal}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Decimal</p>
                      <p className="text-white font-mono">{calc.results.decimal}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Hexadecimal</p>
                      <p className="text-white font-mono">{calc.results.hexadecimal}</p>
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

export default ProgrammerCalculator;