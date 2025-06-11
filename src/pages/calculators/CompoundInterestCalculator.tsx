import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Percent, Calendar, PlusCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorLayout from '../../components/layout/CalculatorLayout';

interface CompoundingResult {
  year: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
}

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [years, setYears] = useState<number>(20);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('monthly');
  const [results, setResults] = useState<CompoundingResult[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [chartData, setChartData] = useState<Array<{
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }>>([]);

  const calculateCompoundInterest = () => {
    let periodsPerYear: number;
    switch (compoundingFrequency) {
      case 'daily':
        periodsPerYear = 365;
        break;
      case 'weekly':
        periodsPerYear = 52;
        break;
      case 'monthly':
        periodsPerYear = 12;
        break;
      case 'quarterly':
        periodsPerYear = 4;
        break;
      case 'annually':
        periodsPerYear = 1;
        break;
      default:
        periodsPerYear = 12;
    }

    const periodicRate = annualRate / 100 / periodsPerYear;
    const totalPeriods = years * periodsPerYear;
    let balance = principal;
    const yearlyResults: CompoundingResult[] = [];
    let totalContributed = principal;

    for (let year = 1; year <= years; year++) {
      const startBalance = balance;
      const yearlyContribution = monthlyContribution * 12;
      let yearlyInterest = 0;

      // Calculate compound interest for each period within the year
      for (let period = 1; period <= periodsPerYear; period++) {
        const periodicContribution = monthlyContribution * (12 / periodsPerYear);
        const interestEarned = (balance + periodicContribution) * periodicRate;
        yearlyInterest += interestEarned;
        balance += periodicContribution + interestEarned;
      }

      totalContributed += yearlyContribution;

      yearlyResults.push({
        year,
        startBalance,
        contribution: yearlyContribution,
        interest: yearlyInterest,
        endBalance: balance
      });
    }

    setResults(yearlyResults);
    setTotalContributions(totalContributed);
    setTotalInterest(balance - totalContributed);

    // Prepare chart data
    const chartPoints = yearlyResults.map(row => ({
      year: row.year,
      principal: totalContributed,
      interest: balance - totalContributed,
      balance: row.endBalance
    }));
    setChartData(chartPoints);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, monthlyContribution, annualRate, years, compoundingFrequency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate the growth of your investments with compound interest and regular contributions."
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-heading text-white mb-6">Investment Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Initial Investment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Monthly Contribution</label>
                  <div className="relative">
                    <PlusCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
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
                      value={annualRate}
                      onChange={(e) => setAnnualRate(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Investment Period (Years)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Compounding Frequency</label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                    className="w-full bg-dark-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
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
              <h2 className="text-2xl font-heading text-white mb-6">Final Balance</h2>
              <div className="text-4xl font-bold text-primary-400">
                {formatCurrency(results[results.length - 1]?.endBalance || 0)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-success-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Total Contributions</h3>
                <div className="text-2xl font-bold text-success-400">
                  {formatCurrency(totalContributions)}
                </div>
              </div>

              <div className="card bg-warning-500/10">
                <h3 className="text-lg font-heading text-white mb-2">Total Interest Earned</h3>
                <div className="text-2xl font-bold text-warning-400">
                  {formatCurrency(totalInterest)}
                </div>
              </div>
            </div>

            <div className="card bg-accent-500/10">
              <h3 className="text-lg font-heading text-white mb-2">Compound Effect</h3>
              <div className="text-2xl font-bold text-accent-400">
                {((totalInterest / totalContributions) * 100).toFixed(1)}x
              </div>
              <p className="text-gray-400 mt-1">Return on Investment</p>
            </div>

            <div className="card bg-dark-600 p-6">
              <h3 className="text-xl font-heading text-white mb-6">Investment Growth Over Time</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#292c43" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#cfd1d9"
                      label={{ value: 'Years', position: 'insideBottom', offset: -5, fill: '#cfd1d9' }}
                    />
                    <YAxis 
                      stroke="#cfd1d9"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft', fill: '#cfd1d9' }}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: '#13131f', border: '1px solid #292c43' }}
                      labelStyle={{ color: '#cfd1d9' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="principal" 
                      name="Principal + Contributions"
                      stroke="#10c46b" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="interest" 
                      name="Interest Earned"
                      stroke="#2979ff" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      name="Total Balance"
                      stroke="#b931f7" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-heading text-white mb-6">Year by Year Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-600">
                  <th className="px-4 py-3 text-left text-gray-300">Year</th>
                  <th className="px-4 py-3 text-left text-gray-300">Starting Balance</th>
                  <th className="px-4 py-3 text-left text-gray-300">Contribution</th>
                  <th className="px-4 py-3 text-left text-gray-300">Interest</th>
                  <th className="px-4 py-3 text-left text-gray-300">Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.year} className="border-b border-dark-500">
                    <td className="px-4 py-3 text-gray-300">{row.year}</td>
                    <td className="px-4 py-3 text-gray-300">{formatCurrency(row.startBalance)}</td>
                    <td className="px-4 py-3 text-gray-300">{formatCurrency(row.contribution)}</td>
                    <td className="px-4 py-3 text-gray-300">{formatCurrency(row.interest)}</td>
                    <td className="px-4 py-3 text-gray-300">{formatCurrency(row.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;