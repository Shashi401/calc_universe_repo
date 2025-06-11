import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Minus, X, Divide, Equal } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
  const [lastNumber, setLastNumber] = useState<string>('');
  const [lastOperator, setLastOperator] = useState<string>('');

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    if (lastNumber && lastOperator && !isNewNumber) {
      try {
        const result = eval(`${lastNumber} ${lastOperator} ${display}`);
        setDisplay(result.toString());
        setEquation(`${result} ${op}`);
        setLastNumber(result.toString());
      } catch (error) {
        setDisplay('Error');
        setEquation('');
        setLastNumber('');
        setIsNewNumber(true);
        return;
      }
    } else {
      setEquation(`${display} ${op}`);
      setLastNumber(display);
    }
    setLastOperator(op);
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    if (lastNumber && lastOperator && !isNewNumber) {
      try {
        const result = eval(`${lastNumber} ${lastOperator} ${display}`);
        setDisplay(result.toString());
        setEquation('');
        setLastNumber('');
        setLastOperator('');
        setIsNewNumber(true);
      } catch (error) {
        setDisplay('Error');
        setEquation('');
        setLastNumber('');
        setLastOperator('');
        setIsNewNumber(true);
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setLastNumber('');
    setLastOperator('');
    setIsNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setIsNewNumber(false);
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
      className={`h-16 rounded-xl font-medium text-xl ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <CalculatorLayout
      title="Basic Calculator"
      description="Perform simple arithmetic calculations with ease."
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card bg-dark-600 p-6"
        >
          <div className="bg-dark-500 rounded-xl p-4 mb-4">
            <div className="text-gray-400 text-right text-sm h-6">
              {equation}
            </div>
            <div className="text-white text-right text-4xl font-medium truncate">
              {display}
            </div>
          </div>

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

            {[7, 8, 9].map(num => (
              <CalculatorButton
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-dark-500 text-white"
              >
                {num}
              </CalculatorButton>
            ))}
            <CalculatorButton
              onClick={() => handleOperator('+')}
              className="bg-primary-500/20 text-primary-400"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </CalculatorButton>

            {[4, 5, 6].map(num => (
              <CalculatorButton
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-dark-500 text-white"
              >
                {num}
              </CalculatorButton>
            ))}
            <CalculatorButton
              onClick={handleEqual}
              className="bg-primary-500 text-white row-span-2"
            >
              <Equal className="w-4 h-4 mx-auto" />
            </CalculatorButton>

            {[1, 2, 3].map(num => (
              <CalculatorButton
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-dark-500 text-white"
              >
                {num}
              </CalculatorButton>
            ))}

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

export default BasicCalculator;