import React, { useState } from 'react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';
import { Calculator } from 'lucide-react';

function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [investmentYears, setInvestmentYears] = useState<number>(10);

  const calculateInvestmentGrowth = () => {
    let balance = initialInvestment;
    const monthlyRate = (annualReturn / 100) / 12;
    const months = investmentYears * 12;

    for (let i = 0; i < months; i++) {
      balance += monthlyContribution;
      balance *= (1 + monthlyRate);
    }

    return balance.toFixed(2);
  };

  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="Calculate potential investment growth over time"
      icon={<Calculator className="w-6 h-6" />}
    >
      <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Initial Investment ($)
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Annual Return (%)
            </label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold text-gray-900">
            Projected Investment Value
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ${calculateInvestmentGrowth()}
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}

export default InvestmentCalculator;