import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, TrendingUp, Thermometer, HeartPulse, Menu, Home, ArrowLeft, 
  Plus, FunctionSquare as Function, Square, Divide, Binary, Building2, 
  PiggyBank, Coins, FileText, LineChart, Wallet, BadgeDollarSign, Car,
  CreditCard, DollarSign, Percent, GraduationCap, CalendarDays, Timer,
  Calendar, Building, Leaf, Zap, Sun, Construction, Utensils, Scale,
  Ruler, Sigma, Infinity, Hash, Braces, Dumbbell, Gauge, Droplet
} from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ 
  title, 
  description, 
  icon, 
  color,
  onClick 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card relative group cursor-pointer h-[200px]"
      onClick={onClick}
    >
      <div className={`absolute inset-0 ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`${color} bg-opacity-20 p-3 rounded-xl w-fit mb-4`}>
          {icon}
        </div>

        <h3 className="text-xl font-heading font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
      </div>
    </motion.div>
  );
};

const CalculatorGallery: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Calculators', icon: <Calculator /> },
    { id: 'math', name: 'Mathematics', icon: <Function /> },
    { id: 'finance', name: 'Finance', icon: <TrendingUp /> },
    { id: 'time', name: 'Time & Date', icon: <Calendar /> },
    { id: 'health', name: 'Health', icon: <HeartPulse /> },
    { id: 'construction', name: 'Construction', icon: <Construction /> },
    { id: 'sustainability', name: 'Sustainability', icon: <Leaf /> }
  ];

  const calculators = [
    // Math Calculators
    {
      title: 'Basic Calculator',
      description: 'Perform simple arithmetic operations with ease.',
      icon: <Calculator className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/basic',
      category: 'math'
    },
    {
      title: 'Scientific Calculator',
      description: 'Advanced calculations with trigonometric and logarithmic functions.',
      icon: <Function className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/scientific',
      category: 'math'
    },
    {
      title: 'Algebra Calculator',
      description: 'Solve equations, factor polynomials, and simplify expressions.',
      icon: <Function className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/algebra',
      category: 'math'
    },
    {
      title: 'Geometry Calculator',
      description: 'Calculate areas, volumes, and geometric properties.',
      icon: <Square className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/geometry',
      category: 'math'
    },
    {
      title: 'Unit Converter',
      description: 'Convert between different units of measurement.',
      icon: <Divide className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/converter',
      category: 'math'
    },
    {
      title: 'Programmer Calculator',
      description: 'Convert between number bases and perform bitwise operations.',
      icon: <Binary className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/programmer',
      category: 'math'
    },
    {
      title: 'Graphing Calculator',
      description: 'Plot and analyze mathematical functions visually.',
      icon: <LineChart className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/graphing',
      category: 'math'
    },
    {
      title: 'Equation Solver',
      description: 'Solve mathematical equations step by step.',
      icon: <Function className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/equation-solver',
      category: 'math'
    },
    {
      title: 'Matrix Calculator',
      description: 'Perform matrix operations and solve linear systems.',
      icon: <Square className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/matrix',
      category: 'math'
    },
    {
      title: 'Percentage Calculator',
      description: 'Calculate percentages, increases, and decreases.',
      icon: <Percent className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/percentage',
      category: 'math'
    },
    {
      title: 'Grade Calculator',
      description: 'Calculate final grades and GPA.',
      icon: <GraduationCap className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/grade',
      category: 'math'
    },
    {
      title: 'Fraction Calculator',
      description: 'Add, subtract, multiply, and divide fractions.',
      icon: <Divide className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/fraction',
      category: 'math'
    },
    {
      title: 'Statistics Calculator',
      description: 'Calculate mean, median, mode, and standard deviation.',
      icon: <Sigma className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/statistics',
      category: 'math'
    },
    {
      title: 'Calculus Calculator',
      description: 'Solve derivatives, integrals, and limits.',
      icon: <Infinity className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/calculus',
      category: 'math'
    },
    {
      title: 'Number Theory',
      description: 'Find prime factors, GCD, LCM, and more.',
      icon: <Hash className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/number-theory',
      category: 'math'
    },
    {
      title: 'Complex Numbers',
      description: 'Perform operations with complex numbers.',
      icon: <Braces className="h-6 w-6 text-primary-400" />,
      color: 'bg-primary-500',
      path: '/complex',
      category: 'math'
    },

    // Financial Calculators
    {
      title: 'Mortgage Calculator',
      description: 'Calculate monthly payments and amortization schedules.',
      icon: <Building2 className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/mortgage',
      category: 'finance'
    },
    {
      title: 'Investment Returns',
      description: 'Project your investment growth with compound interest.',
      icon: <TrendingUp className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/investment',
      category: 'finance'
    },
    {
      title: 'Loan Calculator',
      description: 'Calculate loan payments and view amortization schedules.',
      icon: <PiggyBank className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/loan',
      category: 'finance'
    },
    {
      title: 'Retirement Calculator',
      description: 'Plan your retirement savings and calculate monthly savings needed.',
      icon: <Coins className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/retirement',
      category: 'finance'
    },
    {
      title: 'Tax Calculator',
      description: 'Estimate your tax liability and plan your tax payments.',
      icon: <FileText className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/tax',
      category: 'finance'
    },
    {
      title: 'Portfolio Calculator',
      description: 'Track and analyze your stock portfolio performance.',
      icon: <LineChart className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/portfolio',
      category: 'finance'
    },
    {
      title: 'Budget Calculator',
      description: 'Create and manage your monthly budget with expense tracking.',
      icon: <Wallet className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/budget',
      category: 'finance'
    },
    {
      title: 'Currency Calculator',
      description: 'Convert between different currencies using real-time rates.',
      icon: <BadgeDollarSign className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/currency',
      category: 'finance'
    },
    {
      title: 'Car Payment Calculator',
      description: 'Calculate monthly car payments including taxes and interest.',
      icon: <Car className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/car-payment',
      category: 'finance'
    },
    {
      title: 'Credit Card Calculator',
      description: 'Calculate payoff time and interest for credit card debt.',
      icon: <CreditCard className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/credit-card',
      category: 'finance'
    },
    {
      title: 'Paycheck Calculator',
      description: 'Calculate take-home pay after taxes and deductions.',
      icon: <DollarSign className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/paycheck',
      category: 'finance'
    },
    {
      title: 'Compound Interest',
      description: 'Calculate compound interest growth over time.',
      icon: <TrendingUp className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/compound-interest',
      category: 'finance'
    },
    {
      title: 'Inflation Calculator',
      description: 'Calculate the effects of inflation on purchasing power.',
      icon: <TrendingUp className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/financial/inflation',
      category: 'finance'
    },

    // Time & Date Calculators
    {
      title: 'Time Calculator',
      description: 'Add or subtract time intervals.',
      icon: <Timer className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/time',
      category: 'time'
    },
    {
      title: 'Age Calculator',
      description: 'Calculate age and time between dates.',
      icon: <CalendarDays className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/age',
      category: 'time'
    },
    {
      title: 'Date Calculator',
      description: 'Add or subtract days from a date.',
      icon: <Calendar className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/date',
      category: 'time'
    },
    {
      title: 'Working Days Calculator',
      description: 'Calculate working days between dates.',
      icon: <Calendar className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/working-days',
      category: 'time'
    },
    {
      title: 'Deadline Calculator',
      description: 'Calculate project deadlines and milestones.',
      icon: <Calendar className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/deadline',
      category: 'time'
    },

    // Health Calculators
    {
      title: 'Health Calculator',
      description: 'Calculate BMI, body fat percentage, and daily calorie needs.',
      icon: <HeartPulse className="h-6 w-6 text-accent-400" />,
      color: 'bg-accent-500',
      path: '/health',
      category: 'health'
    },
    {
      title: 'TDEE Calculator',
      description: 'Calculate your Total Daily Energy Expenditure.',
      icon: <Dumbbell className="h-6 w-6 text-accent-400" />,
      color: 'bg-accent-500',
      path: '/tdee',
      category: 'health'
    },
    {
      title: 'Calorie Deficit',
      description: 'Calculate your daily calorie deficit for weight loss.',
      icon: <Scale className="h-6 w-6 text-accent-400" />,
      color: 'bg-accent-500',
      path: '/calorie-deficit',
      category: 'health'
    },
    {
      title: 'Macro Calculator',
      description: 'Calculate your daily macronutrient needs.',
      icon: <Utensils className="h-6 w-6 text-accent-400" />,
      color: 'bg-accent-500',
      path: '/macro',
      category: 'health'
    },

    // Construction Calculators
    {
      title: 'Concrete Calculator',
      description: 'Calculate concrete volume and materials needed.',
      icon: <Building className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/concrete',
      category: 'construction'
    },
    {
      title: 'Sod Calculator',
      description: 'Calculate sod needed for your lawn.',
      icon: <Leaf className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/sod',
      category: 'construction'
    },
    {
      title: 'Paint Calculator',
      description: 'Calculate paint needed for your project.',
      icon: <Droplet className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/paint',
      category: 'construction'
    },
    {
      title: 'Material Calculator',
      description: 'Calculate building materials and costs.',
      icon: <Ruler className="h-6 w-6 text-warning-400" />,
      color: 'bg-warning-500',
      path: '/materials',
      category: 'construction'
    },

    // Sustainability Calculators
    {
      title: 'Carbon Footprint',
      description: 'Calculate your carbon footprint and environmental impact.',
      icon: <Leaf className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/carbon-footprint',
      category: 'sustainability'
    },
    {
      title: 'EV Cost Calculator',
      description: 'Compare electric vehicle costs with gas vehicles.',
      icon: <Zap className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/ev-cost',
      category: 'sustainability'
    },
    {
      title: 'Solar Panel Calculator',
      description: 'Calculate solar panel savings and ROI.',
      icon: <Sun className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/solar-panel',
      category: 'sustainability'
    },
    {
      title: 'Energy Usage Calculator',
      description: 'Calculate and optimize your energy consumption.',
      icon: <Gauge className="h-6 w-6 text-success-400" />,
      color: 'bg-success-500',
      path: '/energy-usage',
      category: 'sustainability'
    }
  ];

  const filteredCalculators = activeCategory === 'all'
    ? calculators
    : calculators.filter(calc => calc.category === activeCategory);

  return (
    <section id="calculators" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-white font-heading mb-4">Calculator Gallery</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our extensive collection of calculators designed to solve any problem you might encounter.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-600 text-gray-300 hover:bg-dark-500'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCalculators.map((calculator, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <CalculatorCard
                title={calculator.title}
                description={calculator.description}
                icon={calculator.icon}
                color={calculator.color}
                onClick={() => navigate(calculator.path)}
              />
            </motion.div>
          ))}

          {/* Request Calculator Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="card h-[200px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-dark-400 group hover:border-primary-500/50 transition-colors duration-300">
              <Plus className="w-10 h-10 text-dark-300 group-hover:text-primary-500 transition-colors duration-300 mb-4" />
              <h3 className="text-xl font-heading text-gray-300 group-hover:text-white transition-colors duration-300 mb-2">Request Calculator</h3>
              <p className="text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                Need a specific calculator? Let us know what you need.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-4 py-2 rounded-lg text-sm font-medium bg-dark-500 text-gray-300 hover:bg-primary-500 hover:text-white transition-colors duration-300"
              >
                Request Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorGallery;