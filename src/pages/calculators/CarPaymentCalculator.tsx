import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, DollarSign, Percent, Calendar } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

const CarPaymentCalculator: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [salesTax, setSalesTax] = useState<number>(6);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const calculatePayment = () => {
    const taxAmount = carPrice * (salesTax / 100);
    const totalPrice = carPrice + taxAmount;
    const loanAmount = totalPrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm;

    const payment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
    setTotalCost(payment * numberOfPayments + downPayment);
  };

  useEffect(() => {
    calculatePayment();
  }, [carPrice, downPayment, loanTerm, interestRate, salesTax]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <CalculatorLayout
      title="Car Payment Calculator"
      description="Calculate your monthly car payments including taxes and interest."
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
              <h2 className="text-2xl font-heading text-white mb-6">Car Loan Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Car Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={carPrice}
                      onChange={(e) => setCarPrice(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Down Payment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Loan Term (months)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value={36}>36 months (3 years)</option>
                      <option value={48}>48 months (4 years)</option>
                      <option value={60}>60 months (5 years)</option>
                      <option value={72}>72 months (6 years)</option>
                      <option value={84}>84 months (7 years)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Interest Rate (%)</label>
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
                  <label className="block text-gray-300 mb-2">Sales Tax Rate (%)</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      step="0.1"
                      value={salesTax}
                      onChange={(e) => setSalesTax(Number(e.target.value))}
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
              <h2 className="text-2xl font-heading text-white mb-6">Monthly Payment</h2>
              <div className="text-4xl font-bold text-primary-400">
                {formatCurrency(monthlyPayment)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-success-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Down Payment</h3>
                <div className="text-2xl font-bold text-success-400">
                  {formatCurrency(downPayment)}
                </div>
              </div>

              <div className="card bg-warning-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Total Cost</h3>
                <div className="text-2xl font-bold text-warning-400">
                  {formatCurrency(totalCost)}
                </div>
              </div>
            </div>

            <div className="card bg-accent-500/10">
              <h3 className="text-lg font-heading text-white mb-2">Loan Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Car Price:</span>
                  <span className="text-white">{formatCurrency(carPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sales Tax:</span>
                  <span className="text-white">{formatCurrency(carPrice * (salesTax / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Loan Amount:</span>
                  <span className="text-white">{formatCurrency(carPrice + (carPrice * (salesTax / 100)) - downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Interest:</span>
                  <span className="text-white">{formatCurrency(totalCost - carPrice - (carPrice * (salesTax / 100)))}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CarPaymentCalculator;