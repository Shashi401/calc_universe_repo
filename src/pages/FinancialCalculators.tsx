import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  PiggyBank, 
  Building2, 
  Coins, 
  Calculator, 
  LineChart, 
  Wallet, 
  BadgeDollarSign 
} from 'lucide-react';

interface FinancialCalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const FinancialCalculatorCard: React.FC<FinancialCalculatorCardProps> = ({ 
  title, 
  description, 
  icon, 
  color,
  onClick 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card cursor-pointer"
      onClick={onClick}
    >
      <div className={`p-4 rounded-lg ${color} bg-opacity-20 mb-4 inline-block`}>
        {icon}
      </div>
      <h3 className="text-xl font-heading font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const FinancialCalculators: React.FC = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      title: 'Mortgage Calculator',
      description: 'Calculate monthly payments, interest rates, and amortization schedules for your home loan.',
      icon: <Building2 className="h-8 w-8 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/mortgage'
    },
    {
      title: 'Investment Returns',
      description: 'Project your investment growth with compound interest and various investment scenarios.',
      icon: <TrendingUp className="h-8 w-8 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/financial/investment'
    },
    {
      title: 'Loan Calculator',
      description: 'Determine loan payments, interest costs, and payoff schedules for any type of loan.',
      icon: <PiggyBank className="h-8 w-8 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/financial/loan'
    },
    {
      title: 'Retirement Planner',
      description: 'Plan your retirement savings and calculate how much you need to save monthly.',
      icon: <Coins className="h-8 w-8 text-accent-400" />,
      color: 'bg-accent-500',
      path: '/financial/retirement'
    },
    {
      title: 'Tax Calculator',
      description: 'Estimate your tax liability and plan your tax payments effectively.',
      icon: <Calculator className="h-8 w-8 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/tax'
    },
    {
      title: 'Stock Portfolio',
      description: 'Track and analyze your stock portfolio performance and returns.',
      icon: <LineChart className="h-8 w-8 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/financial/portfolio'
    },
    {
      title: 'Budget Planner',
      description: 'Create and manage your monthly budget with detailed expense tracking.',
      icon: <Wallet className="h-8 w-8 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/financial/budget'
    },
    {
      title: 'Currency Converter',
      description: 'Convert between different currencies using real-time exchange rates.',
      icon: <BadgeDollarSign className="h-8 w-8 text-accent-400" />,
      color: 'bg-accent-500',
      path: '/financial/currency'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-700 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">Financial Calculators</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Make informed financial decisions with our comprehensive suite of financial calculators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FinancialCalculatorCard
                {...calc}
                onClick={() => navigate(calc.path)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculators;