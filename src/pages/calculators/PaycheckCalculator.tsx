import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar } from 'lucide-react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface DeductionItem {
  name: string;
  amount: number;
  type: 'percentage' | 'fixed';
}

const PaycheckCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(50000);
  const [payFrequency, setPayFrequency] = useState<string>('bi-weekly');
  const [federalTaxRate, setFederalTaxRate] = useState<number>(22);
  const [stateTaxRate, setStateTaxRate] = useState<number>(5);
  const [deductions, setDeductions] = useState<DeductionItem[]>([
    { name: 'Social Security', amount: 6.2, type: 'percentage' },
    { name: 'Medicare', amount: 1.45, type: 'percentage' },
    { name: 'Health Insurance', amount: 150, type: 'fixed' },
    { name: '401(k)', amount: 5, type: 'percentage' }
  ]);

  const [grossPaycheck, setGrossPaycheck] = useState<number>(0);
  const [netPaycheck, setNetPaycheck] = useState<number>(0);
  const [annualNet, setAnnualNet] = useState<number>(0);

  const calculatePaycheck = () => {
    const periodsPerYear = {
      'weekly': 52,
      'bi-weekly': 26,
      'semi-monthly': 24,
      'monthly': 12
    }[payFrequency];

    const grossPerPeriod = salary / periodsPerYear;
    let net = grossPerPeriod;

    // Calculate tax deductions
    const federalTax = grossPerPeriod * (federalTaxRate / 100);
    const stateTax = grossPerPeriod * (stateTaxRate / 100);
    net -= (federalTax + stateTax);

    // Calculate other deductions
    deductions.forEach(deduction => {
      if (deduction.type === 'percentage') {
        net -= grossPerPeriod * (deduction.amount / 100);
      } else {
        net -= deduction.amount;
      }
    });

    setGrossPaycheck(grossPerPeriod);
    setNetPaycheck(net);
    setAnnualNet(net * periodsPerYear);
  };

  useEffect(() => {
    calculatePaycheck();
  }, [salary, payFrequency, federalTaxRate, stateTaxRate, deductions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <CalculatorLayout
      title="Paycheck Calculator"
      description="Calculate your take-home pay after taxes and deductions."
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
              <h2 className="text-2xl font-heading text-white mb-6">Salary Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Annual Salary</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Pay Frequency</label>
                  <select
                    value={payFrequency}
                    onChange={(e) => setPayFrequency(e.target.value)}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="semi-monthly">Semi-Monthly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Federal Tax Rate (%)</label>
                  <input
                    type="number"
                    value={federalTaxRate}
                    onChange={(e) => setFederalTaxRate(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">State Tax Rate (%)</label>
                  <input
                    type="number"
                    value={stateTaxRate}
                    onChange={(e) => setStateTaxRate(Number(e.target.value))}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Deductions</h2>
              <div className="space-y-4">
                {deductions.map((deduction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{deduction.name}</span>
                    <span className="text-white">
                      {deduction.type === 'percentage' 
                        ? `${deduction.amount}%`
                        : formatCurrency(deduction.amount)}
                    </span>
                  </div>
                ))}
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
              <h2 className="text-2xl font-heading text-white mb-6">Take-Home Pay</h2>
              <div className="text-4xl font-bold text-primary-400">
                {formatCurrency(netPaycheck)}
              </div>
              <p className="text-gray-400 mt-2">per {payFrequency} paycheck</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-success-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Gross Pay</h3>
                <div className="text-2xl font-bold text-success-400">
                  {formatCurrency(grossPaycheck)}
                </div>
                <p className="text-gray-400 text-sm">per paycheck</p>
              </div>

              <div className="card bg-warning-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Annual Net</h3>
                <div className="text-2xl font-bold text-warning-400">
                  {formatCurrency(annualNet)}
                </div>
                <p className="text-gray-400 text-sm">after taxes & deductions</p>
              </div>
            </div>

            <div className="card bg-accent-500/10">
              <h3 className="text-lg font-heading text-white mb-4">Deduction Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Federal Tax:</span>
                  <span className="text-white">{formatCurrency(grossPaycheck * (federalTaxRate / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">State Tax:</span>
                  <span className="text-white">{formatCurrency(grossPaycheck * (stateTaxRate / 100))}</span>
                </div>
                {deductions.map((deduction, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-400">{deduction.name}:</span>
                    <span className="text-white">
                      {deduction.type === 'percentage'
                        ? formatCurrency(grossPaycheck * (deduction.amount / 100))
                        : formatCurrency(deduction.amount)}
                    </span>
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

export default PaycheckCalculator;