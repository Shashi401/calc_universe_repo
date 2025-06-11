import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, UserPlus, BrainCog, Zap } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="bg-dark-500 p-3 rounded-lg inline-block mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-heading text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-6 w-6 text-primary-400" />,
      title: 'Advanced Algorithms',
      description: 'Our calculators use cutting-edge mathematical algorithms to provide accurate results in milliseconds.',
      delay: 0.1
    },
    {
      icon: <UserPlus className="h-6 w-6 text-accent-400" />,
      title: 'User Accounts',
      description: 'Create an account to save your calculation history and custom calculators for future use.',
      delay: 0.2
    },
    {
      icon: <BrainCog className="h-6 w-6 text-warning-400" />,
      title: 'AI-Powered Assistance',
      description: 'Get suggestions and help from our AI assistant to find the right calculator for your needs.',
      delay: 0.3
    },
    {
      icon: <Zap className="h-6 w-6 text-success-400" />,
      title: 'Real-time Calculations',
      description: 'See results update instantly as you input values, with no page reloads or delays.',
      delay: 0.4
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-white font-heading mb-6">About Calculator Universe</h2>
            <p className="text-gray-300 mb-6">
              Calculator Universe began with a simple mission: to make calculation accessible, educational, and engaging for everyone. We believe that the right tools can unlock new understanding and solutions to complex problems.
            </p>
            <p className="text-gray-400 mb-8">
              Our team of mathematicians, developers, and educators work together to create calculators that are not only accurate but also help you understand the underlying concepts. Whether you're a student, professional, or just curious, we have the right calculator for you.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 font-bold">50+</div>
                <div className="ml-3">
                  <p className="text-white font-medium">Calculators</p>
                  <p className="text-gray-400 text-sm">And growing weekly</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-500 font-bold">1M+</div>
                <div className="ml-3">
                  <p className="text-white font-medium">Calculations</p>
                  <p className="text-gray-400 text-sm">Performed monthly</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;