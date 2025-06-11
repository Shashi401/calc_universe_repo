import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Minus, X, Divide } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface ComplexNumber {
  real: number;
  imaginary: number;
}

interface ComplexCalculation {
  number1: ComplexNumber;
  number2: ComplexNumber;
  operation: string;
  result: ComplexNumber;
  timestamp: Date;
}

const ComplexNumberCalculator: React.FC = () => {
  const [number1, setNumber1] = useState<ComplexNumber>({ real: 0, imaginary: 0 });
  const [number2, setNumber2] = useState<ComplexNumber>({ real: 0, imaginary: 0 });
  const [operation, setOperation] = useState<string>('+');
  const [result, setResult] = useState<ComplexNumber | null>(null);
  const [history, setHistory] = useState<ComplexCalculation[]>([]);

  const calculateComplex = () => {
    let resultNumber: ComplexNumber;

    switch (operation) {
      case '+':
        resultNumber = {
          real: number1.real + number2.real,
          imaginary: number1.imaginary + number2.imaginary
        };
        break;
      case '-':
        resultNumber = {
          real: number1.real - number2.real,
          imaginary: number1.imaginary - number2.imaginary
        };
        break;
      case '*':
        resultNumber = {
          real: number1.real * number2.real - number1.imaginary * number2.imaginary,
          imaginary: number1.real * number2.imaginary + number1.imaginary * number2.real
        };
        break;
      case '/':
        const denominator = number2.real * number2.real + number2.imaginary * number2.imaginary;
        resultNumber = {
          real: (number1.real * number2.real + number1.imaginary * number2.imaginary) / denominator,
          imaginary: (number1.imaginary * number2.real - number1.real * number2.imaginary) / denominator
        };
        break;
      default:
        return;
    }

    setResult(resultNumber);
    setHistory([
      {
        number1,
        number2,
        operation,
        result: resultNumber,
        timestamp: new Date()
      },
      ...history
    ]);
  };

  const formatComplex = (num: ComplexNumber): string => {
    const realPart = num.real.toFixed(2);
    const imagPart = num.imaginary.toFixed(2);
    const sign = num.imaginary >= 0 ? '+' : '';
    return `${realPart} ${sign} ${imagPart}i`;
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
      title="Complex Number Calculator"
      description="Perform calculations with complex numbers including addition, subtraction, multiplication, and division."
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
              <h2 className="text-2xl font-heading text-white mb-6">Complex Number Operations</h2>
              
              <div className="space-y-6">
                {/* First Complex Number */}
                <div>
                  <label className="block text-gray-300 mb-2">First Complex Number</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        value={number1.real}
                        onChange={(e) => setNumber1({ ...number1, real: Number(e.target.value) })}
                        placeholder="Real part"
                        className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <p className="text-sm text-gray-400 mt-1">Real part</p>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={number1.imaginary}
                        onChange={(e) => setNumber1({ ...number1, imaginary: Number(e.target.value) })}
                        placeholder="Imaginary part"
                        className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <p className="text-sm text-gray-400 mt-1">Imaginary part</p>
                    </div>
                  </div>
                </div>

                {/* Operations */}
                <div className="grid grid-cols-4 gap-4">
                  <OperationButton op="+" icon={<Plus className="h-6 w-6" />} />
                  <OperationButton op="-" icon={<Minus className="h-6 w-6" />} />
                  <OperationButton op="*" icon={<X className="h-6 w-6" />} />
                  <OperationButton op="/" icon={<Divide className="h-6 w-6" />} />
                </div>

                {/* Second Complex Number */}
                <div>
                  <label className="block text-gray-300 mb-2">Second Complex Number</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        value={number2.real}
                        onChange={(e) => setNumber2({ ...number2, real: Number(e.target.value) })}
                        placeholder="Real part"
                        className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <p className="text-sm text-gray-400 mt-1">Real part</p>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={number2.imaginary}
                        onChange={(e) => setNumber2({ ...number2, imaginary: Number(e.target.value) })}
                        placeholder="Imaginary part"
                        className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <p className="text-sm text-gray-400 mt-1">Imaginary part</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={calculateComplex}
                  className="w-full bg-primary-500 text-white rounded-lg py-3 hover:bg-primary-600 transition-colors"
                >
                  Calculate
                </button>

                {result && (
                  <div className="bg-dark-500 rounded-lg p-4">
                    <p className="text-gray-400 mb-2">Result:</p>
                    <p className="text-2xl font-bold text-primary-400">
                      {formatComplex(result)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-dark-500/50">
              <h3 className="text-xl font-heading text-white mb-4">Complex Number Operations</h3>
              <div className="space-y-2 text-gray-300">
                <p>Addition: (a + bi) + (c + di) = (a + c) + (b + d)i</p>
                <p>Subtraction: (a + bi) - (c + di) = (a - c) + (b - d)i</p>
                <p>Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i</p>
                <p>Division: (a + bi)/(c + di) = ((ac + bd)/(c² + d²)) + ((bc - ad)/(c² + d²))i</p>
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
                      ({formatComplex(calc.number1)}) {calc.operation} ({formatComplex(calc.number2)})
                    </span>
                    <span className="text-primary-400">
                      {calc.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white font-medium">
                    = {formatComplex(calc.result)}
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

export default ComplexNumberCalculator;