import React from 'react';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

const BudgetCalculator: React.FC = () => {
  return (
    <CalculatorLayout 
      title="Budget Calculator" 
      description="Plan and analyze your budget with our comprehensive budget calculator."
    >
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Budget Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Track your income and expenses to create a balanced budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Income
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monthly Income
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your monthly income"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Expenses
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Housing
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Rent/Mortgage"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Utilities
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Electricity, water, etc."
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Calculate Budget
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-300">Total Income:</p>
                <p className="font-semibold text-gray-900 dark:text-white">$0.00</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-300">Total Expenses:</p>
                <p className="font-semibold text-gray-900 dark:text-white">$0.00</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-300">Net Balance:</p>
                <p className="font-semibold text-gray-900 dark:text-white">$0.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default BudgetCalculator;