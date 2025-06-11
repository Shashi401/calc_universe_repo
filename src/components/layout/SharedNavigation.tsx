import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Calculator, TrendingUp, Menu, Home, ArrowLeft, 
  Plus, FunctionSquare as Function, Square, Divide, Binary, Building2, 
  PiggyBank, Coins, FileText, LineChart, Wallet, BadgeDollarSign, Car,
  CreditCard, DollarSign, Percent, GraduationCap, CalendarDays, Timer,
  Calendar, Building, Leaf, Zap, Sun, Construction, Utensils, Scale,
  Ruler, Sigma, Infinity, Hash, Braces, Dumbbell, Gauge, Droplet,
  Search, X, Moon
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface SharedNavigationProps {
  showBackButton?: boolean;
}

const SharedNavigation: React.FC<SharedNavigationProps> = ({ showBackButton = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const calculatorGroups = [
    {
      title: 'Mathematics',
      icon: <Function className="h-6 w-6 text-primary-400" />,
      calculators: [
        { name: 'Basic Calculator', path: '/basic', icon: <Calculator className="h-5 w-5" /> },
        { name: 'Scientific Calculator', path: '/scientific', icon: <Function className="h-5 w-5" /> },
        { name: 'Algebra Calculator', path: '/algebra', icon: <Function className="h-5 w-5" /> },
        { name: 'Geometry Calculator', path: '/geometry', icon: <Square className="h-5 w-5" /> },
        { name: 'Unit Converter', path: '/converter', icon: <Divide className="h-5 w-5" /> },
        { name: 'Percentage Calculator', path: '/percentage', icon: <Percent className="h-5 w-5" /> },
        { name: 'Grade Calculator', path: '/grade', icon: <GraduationCap className="h-5 w-5" /> },
        { name: 'Fraction Calculator', path: '/fraction', icon: <Divide className="h-5 w-5" /> },
        { name: 'Graphing Calculator', path: '/graphing', icon: <LineChart className="h-5 w-5" /> },
        { name: 'Equation Solver', path: '/equation-solver', icon: <Function className="h-5 w-5" /> },
        { name: 'Matrix Calculator', path: '/matrix', icon: <Square className="h-5 w-5" /> },
        { name: 'Statistics Calculator', path: '/statistics', icon: <Sigma className="h-5 w-5" /> },
        { name: 'Calculus Calculator', path: '/calculus', icon: <Infinity className="h-5 w-5" /> },
        { name: 'Complex Numbers', path: '/complex', icon: <Braces className="h-5 w-5" /> },
        { name: 'Programmer Calculator', path: '/programmer', icon: <Binary className="h-5 w-5" /> }
      ]
    },
    {
      title: 'Finance',
      icon: <TrendingUp className="h-6 w-6 text-success-400" />,
      calculators: [
        { name: 'Mortgage Calculator', path: '/financial/mortgage', icon: <Building2 className="h-5 w-5" /> },
        { name: 'Investment Returns', path: '/financial/investment', icon: <TrendingUp className="h-5 w-5" /> },
        { name: 'Compound Interest', path: '/financial/compound-interest', icon: <PiggyBank className="h-5 w-5" /> },
        { name: 'Auto Loan Calculator', path: '/financial/auto-loan', icon: <Car className="h-5 w-5" /> },
        { name: 'Car Payment Calculator', path: '/financial/car-payment', icon: <Car className="h-5 w-5" /> },
        { name: 'Credit Card Calculator', path: '/financial/credit-card', icon: <CreditCard className="h-5 w-5" /> },
        { name: 'Paycheck Calculator', path: '/financial/paycheck', icon: <DollarSign className="h-5 w-5" /> },
        { name: 'Inflation Calculator', path: '/financial/inflation', icon: <TrendingUp className="h-5 w-5" /> },
        { name: 'Profit & Loss Calculator', path: '/financial/profit-loss', icon: <LineChart className="h-5 w-5" /> },
        { name: 'Balance Sheet Calculator', path: '/financial/balance-sheet', icon: <FileText className="h-5 w-5" /> },
        { name: 'Loan Calculator', path: '/financial/loan', icon: <PiggyBank className="h-5 w-5" /> },
        { name: 'Retirement Calculator', path: '/financial/retirement', icon: <Coins className="h-5 w-5" /> },
        { name: 'Tax Calculator', path: '/financial/tax', icon: <FileText className="h-5 w-5" /> },
        { name: 'Portfolio Calculator', path: '/financial/portfolio', icon: <LineChart className="h-5 w-5" /> },
        { name: 'Budget Calculator', path: '/financial/budget', icon: <Wallet className="h-5 w-5" /> },
        { name: 'Currency Calculator', path: '/financial/currency', icon: <BadgeDollarSign className="h-5 w-5" /> }
      ]
    },
    {
      title: 'Time & Date',
      icon: <Calendar className="h-6 w-6 text-warning-400" />,
      calculators: [
        { name: 'Time Calculator', path: '/time', icon: <Timer className="h-5 w-5" /> },
        { name: 'Age Calculator', path: '/age', icon: <CalendarDays className="h-5 w-5" /> },
        { name: 'Date Calculator', path: '/date', icon: <Calendar className="h-5 w-5" /> },
        { name: 'Working Days Calculator', path: '/working-days', icon: <Calendar className="h-5 w-5" /> },
        { name: 'Deadline Calculator', path: '/deadline', icon: <Calendar className="h-5 w-5" /> }
      ]
    },
    {
      title: 'Health',
      icon: <Scale className="h-6 w-6 text-accent-400" />,
      calculators: [
        { name: 'Health Calculator', path: '/health', icon: <Scale className="h-5 w-5" /> },
        { name: 'TDEE Calculator', path: '/tdee', icon: <Dumbbell className="h-5 w-5" /> },
        { name: 'Calorie Deficit', path: '/calorie-deficit', icon: <Scale className="h-5 w-5" /> },
        { name: 'Macro Calculator', path: '/macro', icon: <Utensils className="h-5 w-5" /> }
      ]
    },
    {
      title: 'Construction',
      icon: <Construction className="h-6 w-6 text-warning-400" />,
      calculators: [
        { name: 'Concrete Calculator', path: '/concrete', icon: <Building className="h-5 w-5" /> },
        { name: 'Sod Calculator', path: '/sod', icon: <Leaf className="h-5 w-5" /> },
        { name: 'Paint Calculator', path: '/paint', icon: <Droplet className="h-5 w-5" /> },
        { name: 'Material Calculator', path: '/materials', icon: <Ruler className="h-5 w-5" /> }
      ]
    },
    {
      title: 'Sustainability',
      icon: <Leaf className="h-6 w-6 text-success-400" />,
      calculators: [
        { name: 'Carbon Footprint', path: '/carbon-footprint', icon: <Leaf className="h-5 w-5" /> },
        { name: 'EV Cost Calculator', path: '/ev-cost', icon: <Zap className="h-5 w-5" /> },
        { name: 'Solar Panel Calculator', path: '/solar-panel', icon: <Sun className="h-5 w-5" /> },
        { name: 'Energy Usage Calculator', path: '/energy-usage', icon: <Gauge className="h-5 w-5" /> }
      ]
    }
  ];

  const allCalculators = calculatorGroups.flatMap(group => 
    group.calculators.map(calc => ({
      ...calc,
      group: group.title,
      groupIcon: group.icon
    }))
  );

  const filteredCalculators = searchQuery
    ? allCalculators.filter(calc => 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.group.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Top Menu Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-dark-600 border-b border-dark-400 z-50 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-dark-500 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>

          <div className="flex items-center gap-3 ml-4">
            <Calculator className="h-6 w-6 text-primary-500" />
            <span className="text-lg font-heading text-white">Calculator Universe</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-dark-500 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-400" />
            )}
          </button>

          {/* Search Bar */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-dark-500 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-300 hover:bg-dark-500 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isSearchFocused && searchQuery && filteredCalculators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-dark-500 rounded-lg shadow-lg border border-dark-400 max-h-96 overflow-y-auto"
          >
            {filteredCalculators.map((calc, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(calc.path);
                  setSearchQuery('');
                }}
                className="flex items-center gap-3 w-full p-3 hover:bg-dark-400 transition-colors text-left"
              >
                <div className="flex items-center gap-2 min-w-[120px] text-gray-400">
                  {calc.groupIcon}
                  <span className="text-sm">{calc.group}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  {calc.icon}
                  <span>{calc.name}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-screen w-[280px] bg-dark-600 border-r border-dark-400 z-50"
            >
              {/* Sidebar Header */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-dark-400">
                <div className="flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-primary-500" />
                  <span className="text-lg font-heading text-white">Calculator Universe</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="overflow-y-auto h-[calc(100vh-4rem)] py-6">
                {/* Home Button */}
                <button
                  onClick={() => {
                    navigate('/');
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-2 transition-colors ${
                    location.pathname === '/'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-300 hover:bg-dark-500'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span className="text-lg">Home</span>
                </button>

                {/* Calculator Groups */}
                {calculatorGroups.map((group, index) => (
                  <div key={index} className="mt-8">
                    <div className="flex items-center gap-3 px-4 mb-3">
                      {group.icon}
                      <h3 className="text-xl font-heading font-bold text-white tracking-wide">
                        {group.title}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {group.calculators.map((calc, calcIndex) => (
                        <button
                          key={calcIndex}
                          onClick={() => {
                            navigate(calc.path);
                            setIsSidebarOpen(false);
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-2 transition-colors ${
                            location.pathname === calc.path
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-300 hover:bg-dark-500'
                          }`}
                        >
                          {calc.icon}
                          <span>{calc.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SharedNavigation;