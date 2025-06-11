import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Minus, X, Divide, Equal, RotateCcw, FunctionSquare as Function, Square, Sigma } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [isRadians, setIsRadians] = useState<boolean>(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleFunction = (fn: string) => {
    try {
      let result: number;
      const num = parseFloat(display);

      switch (fn) {
        case 'sin':
          result = isRadians ? Math.sin(num) : Math.sin((num * Math.PI) / 180);
          break;
        case 'cos':
          result = isRadians ? Math.cos(num) : Math.cos((num * Math.PI) / 180);
          break;
        case 'tan':
          result = isRadians ? Math.tan(num) : Math.tan((num * Math.PI) / 180);
          break;
        case 'sqrt':
          result = Math.sqrt(num);
          break;
        case 'square':
          result = num * num;
          break;
        case 'log':
          result = Math.log10(num);
          break;
        case 'ln':
          result = Math.log(num);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        default:
          result = num;
      }

      setDisplay(result.toString());
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setIsNewNumber(false);
    }
  };

  const handleMemory = (operation: string) => {
    const currentValue = parseFloat(display);
    switch (operation) {
      case 'M+':
        setMemory(memory + currentValue);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        break;
      case 'MR':
        setDisplay(memory.toString());
        setIsNewNumber(true);
        break;
      case 'MC':
        setMemory(0);
        break;
    }
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
      className={`h-12 rounded-xl font-medium text-sm ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <CalculatorLayout
      title="Scientific Calculator"
      description="Advanced calculations with trigonometric and logarithmic functions."
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
            <div className="text-gray-400 text-right text-sm h-6">
              {equation}
            </div>
            <div className="text-white text-right text-4xl font-medium truncate">
              {display}
            </div>
          </div>

          {/* Memory and Mode */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <CalculatorButton
              onClick={() => handleMemory('MC')}
              className="bg-dark-500/50 text-gray-300"
            >
              MC
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleMemory('MR')}
              className="bg-dark-500/50 text-gray-300"
            >
              MR
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleMemory('M+')}
              className="bg-dark-500/50 text-gray-300"
            >
              M+
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleMemory('M-')}
              className="bg-dark-500/50 text-gray-300"
            >
              M-
            </CalculatorButton>
            <CalculatorButton
              onClick={() => setIsRadians(!isRadians)}
              className={`${
                isRadians ? 'bg-primary-500 text-white' : 'bg-dark-500/50 text-gray-300'
              }`}
            >
              {isRadians ? 'RAD' : 'DEG'}
            </CalculatorButton>
          </div>

          {/* Scientific Functions */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <CalculatorButton
              onClick={() => handleFunction('sin')}
              className="bg-primary-500/20 text-primary-400"
            >
              sin
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleFunction('cos')}
              className="bg-primary-500/20 text-primary-400"
            >
              cos
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleFunction('tan')}
              className="bg-primary-500/20 text-primary-400"
            >
              tan
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleFunction('log')}
              className="bg-primary-500/20 text-primary-400"
            >
              log
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleFunction('ln')}
              className="bg-primary-500/20 text-primary-400"
            >
              ln
            </CalculatorButton>
          </div>

          {/* Constants and Powers */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <CalculatorButton
              onClick={() => handleFunction('pi')}
              className="bg-primary-500/20 text-primary-400"
            >
              π
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleFunction('e')}
              className="bg-primary-500/20 text-primary-400"
            >
              e
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleFunction('square')}
              className="bg-primary-500/20 text-primary-400"
            >
              x²
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleFunction('sqrt')}
              className="bg-primary-500/20 text-primary-400"
            >
              √
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleOperator('**')}
              className="bg-primary-500/20 text-primary-400"
            >
              xʸ
            </CalculatorButton>
          </div>

          {/* Main Keypad */}
          <div className="grid grid-cols-4 gap-2">
            <CalculatorButton
              onClick={handleClear}
              className="bg-error-500 text-white"
            >
              C
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleOperator('/')}
              className="bg-primary-500/20 text-primary-400"
            >
              <Divide className="w-4 h-4 mx-auto" />
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleOperator('*')}
              className="bg-primary-500/20 text-primary-400"
            >
              <X className="w-4 h-4 mx-auto" />
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleOperator('-')}
              className="bg-primary-500/20 text-primary-400"
            >
              <Minus className="w-4 h-4 mx-auto" />
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber('7')}
              className="bg-dark-500 text-white"
            >
              7
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleNumber('8')}
              className="bg-dark-500 text-white"
            >
              8
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleNumber('9')}
              className="bg-dark-500 text-white"
            >
              9
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleOperator('+')}
              className="bg-primary-500/20 text-primary-400 row-span-2"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber('4')}
              className="bg-dark-500 text-white"
            >
              4
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleNumber('5')}
              className="bg-dark-500 text-white"
            >
              5
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleNumber('6')}
              className="bg-dark-500 text-white"
            >
              6
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber('1')}
              className="bg-dark-500 text-white"
            >
              1
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleNumber('2')}
              className="bg-dark-500 text-white"
            >
              2
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleNumber('3')}
              className="bg-dark-500 text-white"
            >
              3
            </CalculatorButton>
            <CalculatorButton
              onClick={handleEqual}
              className="bg-primary-500 text-white row-span-2"
            >
              =
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber('0')}
              className="bg-dark-500 text-white col-span-2"
            >
              0
            </CalculatorButton>
            <CalculatorButton
              onClick={handleDecimal}
              className="bg-dark-500 text-white"
            >
              .
            </CalculatorButton>
          </div>
        </motion.div>
      </div>
    </CalculatorLayout>
  );
};

export default ScientificCalculator;