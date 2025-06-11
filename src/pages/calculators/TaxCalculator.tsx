import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Percent, Calculator, FileText } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface DeductionItem {
  name: string;
  amount: number;
}

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(75000);
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [deductions, setDeductions] = useState<DeductionItem[]>([
    { name: 'Standard Deduction', amount: 12950 },
    { name: 'IRA Contribution', amount: 6000 },
    { name: '401(k) Contribution', amount: 19500 }
  ]);
  const [customDeduction, setCustomDeduction] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<number>(0);

  // 2023 Tax Brackets (Simplified)
  const taxBrackets: Record<string, TaxBracket[]> = {
    single: [
      { min: 0, max: 11000, rate: 10 },
      { min: 11001, max: 44725, rate: 12 },
      { min: 44726, max: 95375, rate: 22 },
      { min: 95376, max: 182100, rate: 24 },
      { min: 182101, max: 231250, rate: 32 },
      { min: 231251, max: 578125, rate: 35 },
      { min: 578126, max: Infinity, rate: 37 }
    ],
    married: [
      { min: 0, max: 22000, rate: 10 },
      { min: 22001, max: 89450, rate: 12 },
      { min: 89451, max: 190750, rate: 22 },
      { min: 190751, max: 364200, rate: 24 },
      { min: 364201, max: 462500, rate: 32 },
      { min: 462501, max: 693750, rate: 35 },
      { min: 693751, max: Infinity, rate: 37 }
    ]
  };

  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [marginalRate, setMarginalRate] = useState<number>(0);
  const [takeHomeIncome, setTakeHomeIncome] = useState<number>(0);

  const calculateTax = () => {
    // Calculate total deductions
    const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
    const calculatedTaxableIncome = Math.max(0, income - totalDeductions);
    
    // Calculate tax
    let totalTax = 0;
    let lastRate = 0;
    const brackets = taxBrackets[filingStatus];
    
    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      if (calculatedTaxableIncome > bracket.min) {
        const taxableAmount = Math.min(
          calculatedTaxableIncome - bracket.min,
          bracket.max - bracket.min
        );
        totalTax += (taxableAmount * bracket.rate) / 100;
        if (calculatedTaxableIncome >= bracket.min) {
          lastRate = bracket.rate;
        }
      }
    }

    setTaxableIncome(calculatedTaxableIncome);
    setTotalTax(totalTax);
    setEffectiveRate((totalTax / income) * 100);
    setMarginalRate(lastRate);
    setTakeHomeIncome(income - totalTax);
  };

  useEffect(() => {
    calculateTax();
  }, [income, filingStatus, deductions]);

  const addCustomDeduction = () => {
    if (customDeduction && customAmount > 0) {
      setDeductions([...deductions, { name: customDeduction, amount: customAmount }]);
      setCustomDeduction('');
      setCustomAmount(0);
    }
  };

  const removeDeduction = (index: number) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <CalculatorLayout
      title="Tax Calculator"
      description="Estimate your tax liability and plan your tax payments effectively."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Income & Filing Status</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Annual Income</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Filing Status</label>
                  <select
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value)}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married Filing Jointly</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Deductions</h2>
              
              <div className="space-y-6">
                {deductions.map((deduction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{deduction.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">{formatCurrency(deduction.amount)}</span>
                      {index > 0 && (
                        <button
                          onClick={() => removeDeduction(index)}
                          className="text-error-400 hover:text-error-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="border-t border-dark-400 pt-6">
                  <h3 className="text-lg font-heading text-white mb-4">Add Custom Deduction</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Deduction Name"
                      value={customDeduction}
                      onChange={(e) => setCustomDeduction(e.target.value)}
                      className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={customAmount || ''}
                        onChange={(e) => setCustomAmount(Number(e.target.value))}
                        className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <button
                      onClick={addCustomDeduction}
                      className="w-full bg-primary-500 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
                    >
                      Add Deduction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card bg-primary-500/10">
              <h2 className="text-2xl font-heading text-white mb-6">Tax Summary</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 mb-1">Total Tax</p>
                  <div className="text-4xl font-bold text-primary-400">
                    {formatCurrency(totalTax)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-1">Effective Tax Rate</p>
                    <div className="text-2xl font-bold text-success-400">
                      {effectiveRate.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Marginal Tax Rate</p>
                    <div className="text-2xl font-bold text-warning-400">
                      {marginalRate}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-success-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Taxable Income</h3>
                <div className="text-2xl font-bold text-success-400">
                  {formatCurrency(taxableIncome)}
                </div>
              </div>

              <div className="card bg-accent-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Take Home Income</h3>
                <div className="text-2xl font-bold text-accent-400">
                  {formatCurrency(takeHomeIncome)}
                </div>
              </div>
            </div>

            <div className="card bg-dark-600">
              <h3 className="text-lg font-heading text-white mb-4">Tax Brackets ({filingStatus})</h3>
              <div className="space-y-3">
                {taxBrackets[filingStatus].map((bracket, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      taxableIncome > bracket.min && taxableIncome <= bracket.max
                        ? 'bg-primary-500/20'
                        : 'bg-dark-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '+' : formatCurrency(bracket.max)}
                      </span>
                      <span className="text-primary-400 font-bold">{bracket.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default TaxCalculator;