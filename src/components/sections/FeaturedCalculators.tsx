import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Thermometer, Divide, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeaturedCalculatorProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  path: string;
}

const FeaturedCalculator: React.FC<FeaturedCalculatorProps> = ({ 
  title, 
  description, 
  icon, 
  color,
  delay,
  path
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card relative group cursor-pointer"
      onClick={() => navigate(path)}
    >
      <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-20 text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-heading font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
          
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 10 }}
            className="mt-4 text-primary-400 hover:text-primary-300 flex items-center gap-1 text-sm font-medium"
          >
            Try It Now
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCalculators: React.FC = () => {
  const calculators = [
    {
      title: 'Scientific Calculator',
      description: 'Advanced calculations with scientific notation and complex functions.',
      icon: <Calculator className="h-6 w-6" />,
      color: 'bg-primary-500',
      delay: 0.1,
      path: '/scientific'
    },
    {
      title: 'Financial Calculator',
      description: 'Calculate investments, loans, mortgage rates, and retirement plans.',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-success-500',
      delay: 0.2,
      path: '/financial'
    },
    {
      title: 'Unit Converter',
      description: 'Convert between different units of measurement effortlessly.',
      icon: <Divide className="h-6 w-6" />,
      color: 'bg-warning-500',
      delay: 0.3,
      path: '/converter'
    },
    {
      title: 'Physics Calculator',
      description: 'Calculate force, energy, momentum, and other physical quantities.',
      icon: <Thermometer className="h-6 w-6" />,
      color: 'bg-accent-500',
      delay: 0.4,
      path: '/physics'
    }
  ];

  return (
    <section id="featured" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white font-heading mb-4">Featured Calculators</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our most popular tools that users love. These calculators offer powerful capabilities to solve your everyday problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calc, index) => (
            <FeaturedCalculator
              key={index}
              title={calc.title}
              description={calc.description}
              icon={calc.icon}
              color={calc.color}
              delay={calc.delay}
              path={calc.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculators;