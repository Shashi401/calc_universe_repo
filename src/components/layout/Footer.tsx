import React from 'react';
import { Calculator, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-dark-800 py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Calculator className="h-6 w-6 text-primary-500" />
              <span className="text-xl font-heading font-bold text-white">CalcUniverse</span>
            </Link>
            <p className="text-gray-400 mb-4">
              From math to science, finance to custom logic—welcome to the universe of calculators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading mb-4 text-lg">Calculators</h4>
            <ul className="space-y-2">
              <li><Link to="/basic" className="text-gray-400 hover:text-primary-400 transition-colors">Math</Link></li>
              <li><Link to="/physics" className="text-gray-400 hover:text-primary-400 transition-colors">Science</Link></li>
              <li><Link to="/financial" className="text-gray-400 hover:text-primary-400 transition-colors">Finance</Link></li>
              <li><Link to="/health" className="text-gray-400 hover:text-primary-400 transition-colors">Health</Link></li>
              <li><button onClick={() => handleNavigation('#calculators')} className="text-gray-400 hover:text-primary-400 transition-colors">All Calculators</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading mb-4 text-lg">Resources</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('#featured')} className="text-gray-400 hover:text-primary-400 transition-colors">Featured</button></li>
              <li><button onClick={() => handleNavigation('#about')} className="text-gray-400 hover:text-primary-400 transition-colors">About</button></li>
              <li><Link to="/scientific" className="text-gray-400 hover:text-primary-400 transition-colors">Scientific</Link></li>
              <li><Link to="/financial" className="text-gray-400 hover:text-primary-400 transition-colors">Financial</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading mb-4 text-lg">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('#about')} className="text-gray-400 hover:text-primary-400 transition-colors">About Us</button></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-600 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Calculator Universe. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Designed with passion for mathematics and science.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;