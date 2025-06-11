import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Percent, Calendar } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

const CreditCardCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(18.9);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(200);
  const [additionalPayment, setAdditionalPayment] = useState<number>(0);
  const [payoffTime, setPayoffTime] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const calculatePayoff = () => {
    const monthlyRate = interestRate / 100 / 12;
    let remainingBalance = balance;
    let months = 0;
    let interestPaid = 0;
    const totalMonthlyPayment = monthlyPayment + additionalPayment;

    while (remainingBalance > 0 && months < 1200) { // 100 years max to prevent infinite loops
      const interestCharge = remainingBalance * monthlyRate;
      interestPaid += interestCharge;
      remainingBalance += interestCharge;
      remainingBalance -= totalMonthlyPayment;
      months++;

      if (remainingBalance < totalMonthlyPayment) {
        remainingBalance = 0;
      }
    }

    setPayoffTime(months);
    setTotalInterest(interestPaid);
  };

  useEffect(() => {
    calculatePayoff();
  }, [balance, interestRate, monthlyPayment, additionalPayment]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatTime = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <CalculatorLayout
      title="Credit Card Calculator"
      description="Calculate how long it will take to pay off your credit card balance and how much interest you'll pay."
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
              <h2 className="text-2xl font-heading text-white mb-6">Credit Card Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Current Balance</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Annual Interest Rate (%)</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Monthly Payment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Additional Monthly Payment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={additionalPayment}
                      onChange={(e) => setAdditionalPayment(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card bg-primary-500/10">
              <h2 className="text-2xl font-heading text-white mb-6">Time to Pay Off</h2>
              <div className="text-4xl font-bold text-primary-400">
                {formatTime(payoffTime)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-success-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Total Interest</h3>
                <div className="text-2xl font-bold text-success-400">
                  {formatCurrency(totalInterest)}
                </div>
              </div>

              <div className="card bg-warning-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Total Cost</h3>
                <div className="text-2xl font-bold text-warning-400">
                  {formatCurrency(balance + totalInterest)}
                </div>
              </div>
            </div>

            <div className="card bg-accent-500/10">
              <h3 className="text-lg font-heading text-white mb-2">Payment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Payment:</span>
                  <span className="text-white">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Additional Payment:</span>
                  <span className="text-white">{formatCurrency(additionalPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Monthly Payment:</span>
                  <span className="text-white">{formatCurrency(monthlyPayment + additionalPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Interest Rate:</span>
                  <span className="text-white">{(interestRate / 12).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CreditCardCalculator;