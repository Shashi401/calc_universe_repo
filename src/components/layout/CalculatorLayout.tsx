import React from 'react';
import { motion } from 'framer-motion';
import SharedLayout from './SharedLayout';
import MathBackground from '../ui/MathBackground';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ children, title, description }) => {
  return (
    <SharedLayout showBackButton>
      <div className="relative min-h-screen bg-dark-700/50">
        <MathBackground />
        <div className="relative z-10 py-12 px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          {children}
        </div>
      </div>
    </SharedLayout>
  );
};

export default CalculatorLayout;