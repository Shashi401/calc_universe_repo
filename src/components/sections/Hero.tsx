import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Plus, Minus, X, Divide } from 'lucide-react';

const Hero: React.FC = () => {
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

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-white font-heading mb-4">
                <span className="block">Free Online Calculators</span>
                <span className="text-primary-500">For Every Need</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Access 50+ calculators for math, finance, science, and more. Get instant results for mortgage payments, investment returns, scientific equations, and unit conversions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#calculators"
                  className="btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Calculators
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#featured"
                  className="btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Popular Calculators
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="card bg-dark-500/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden border border-dark-400">
                <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 to-transparent opacity-70"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-lg font-medium">Basic Calculator</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-error-500"></div>
                      <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                      <div className="w-3 h-3 rounded-full bg-success-500"></div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-700 rounded-lg p-4 mb-6">
                    <div className="text-gray-400 text-sm mb-1">{equation}</div>
                    <div className="text-white text-3xl font-medium text-right">{display}</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={handleClear}
                      className="calculator-button bg-error-500 text-white"
                    >
                      C
                    </button>
                    <button
                      onClick={() => handleOperator('/')}
                      className="calculator-button bg-primary-600 text-white"
                    >
                      <Divide className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleOperator('*')}
                      className="calculator-button bg-primary-600 text-white"
                    >
                      <X className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleOperator('-')}
                      className="calculator-button bg-primary-600 text-white"
                    >
                      <Minus className="h-4 w-4 mx-auto" />
                    </button>

                    {[7, 8, 9].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNumber(num.toString())}
                        className="calculator-button bg-dark-600 text-gray-200"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={() => handleOperator('+')}
                      className="calculator-button bg-primary-600 text-white"
                    >
                      <Plus className="h-4 w-4 mx-auto" />
                    </button>

                    {[4, 5, 6].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNumber(num.toString())}
                        className="calculator-button bg-dark-600 text-gray-200"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={handleEqual}
                      className="calculator-button bg-primary-500 text-white row-span-2"
                    >
                      =
                    </button>

                    {[1, 2, 3].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNumber(num.toString())}
                        className="calculator-button bg-dark-600 text-gray-200"
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      onClick={() => handleNumber('0')}
                      className="calculator-button bg-dark-600 text-gray-200 col-span-2"
                    >
                      0
                    </button>
                    <button
                      onClick={handleDecimal}
                      className="calculator-button bg-dark-600 text-gray-200"
                    >
                      .
                    </button>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="absolute -top-10 -left-10 w-20 h-20 bg-accent-500/20 rounded-full blur-2xl"
                animate={{ 
                  y: [0, 15, 0],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl"
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;