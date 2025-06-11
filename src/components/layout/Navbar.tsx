import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Search, Calculator, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    if (isMenuOpen) toggleMenu();
  };

  const navbarVariants = {
    top: {
      backgroundColor: 'rgba(19, 19, 31, 0)',
      boxShadow: 'none',
    },
    scrolled: {
      backgroundColor: 'rgba(19, 19, 31, 0.8)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300"
      initial="top"
      animate={isScrolled ? 'scrolled' : 'top'}
      variants={navbarVariants}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-heading font-bold text-white">CalcUniverse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('#featured')} className="text-gray-300 hover:text-primary-400 transition-colors">Featured</button>
            <button onClick={() => handleNavigation('#calculators')} className="text-gray-300 hover:text-primary-400 transition-colors">Calculators</button>
            <button onClick={() => handleNavigation('#about')} className="text-gray-300 hover:text-primary-400 transition-colors">About</button>
            
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search calculators..."
                className="bg-dark-600/50 text-white rounded-full pl-10 pr-4 py-2 w-48 focus:w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-dark-600/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-400" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-dark-700 shadow-lg md:hidden z-50 overflow-y-auto"
        variants={menuVariants}
        initial="closed"
        animate={isMenuOpen ? 'open' : 'closed'}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" onClick={toggleMenu}>
              <Calculator className="h-6 w-6 text-primary-500" />
              <span className="text-lg font-heading font-bold text-white">CalcUniverse</span>
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search calculators..."
              className="w-full bg-dark-600 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <nav className="flex flex-col space-y-4">
            <button onClick={() => handleNavigation('#featured')} className="text-gray-300 hover:text-primary-400 transition-colors py-2">Featured</button>
            <button onClick={() => handleNavigation('#calculators')} className="text-gray-300 hover:text-primary-400 transition-colors py-2">Calculators</button>
            <button onClick={() => handleNavigation('#about')} className="text-gray-300 hover:text-primary-400 transition-colors py-2">About</button>
          </nav>

          <div className="pt-4 border-t border-dark-500">
            <button 
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors py-2 w-full"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 text-indigo-400" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;