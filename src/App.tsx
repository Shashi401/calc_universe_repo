import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import SharedLayout from './components/layout/SharedLayout';
import Hero from './components/sections/Hero';
import CalculatorGallery from './components/sections/CalculatorGallery';
import FeaturedCalculators from './components/sections/FeaturedCalculators';
import AboutSection from './components/sections/AboutSection';
import MathBackground from './components/ui/MathBackground';
import FinancialCalculators from './pages/FinancialCalculators';
import MortgageCalculator from './pages/calculators/MortgageCalculator';
import InvestmentCalculator from './pages/calculators/InvestmentCalculator';
import LoanCalculator from './pages/calculators/LoanCalculator';
import RetirementCalculator from './pages/calculators/RetirementCalculator';
import TaxCalculator from './pages/calculators/TaxCalculator';
import PortfolioCalculator from './pages/calculators/PortfolioCalculator';
import BudgetCalculator from './pages/calculators/BudgetCalculator';
import CurrencyCalculator from './pages/calculators/CurrencyCalculator';
import BasicCalculator from './pages/calculators/BasicCalculator';
import ScientificCalculator from './pages/calculators/ScientificCalculator';
import AlgebraCalculator from './pages/calculators/AlgebraCalculator';
import GeometryCalculator from './pages/calculators/GeometryCalculator';
import UnitConverter from './pages/calculators/UnitConverter';
import HealthCalculator from './pages/calculators/HealthCalculator';
import ProgrammerCalculator from './pages/calculators/ProgrammerCalculator';
import GraphingCalculator from './pages/calculators/GraphingCalculator';
import EquationSolver from './pages/calculators/EquationSolver';
import MatrixCalculator from './pages/calculators/MatrixCalculator';
import CarPaymentCalculator from './pages/calculators/CarPaymentCalculator';
import CreditCardCalculator from './pages/calculators/CreditCardCalculator';
import PaycheckCalculator from './pages/calculators/PaycheckCalculator';
import CompoundInterestCalculator from './pages/calculators/CompoundInterestCalculator';
import FractionCalculator from './pages/calculators/FractionCalculator';
import StatisticsCalculator from './pages/calculators/StatisticsCalculator';
import ComplexNumberCalculator from './pages/calculators/ComplexNumberCalculator';
import CalculusCalculator from './pages/calculators/CalculusCalculator';
import StaticCalculator from './pages/calculators/StaticCalculator';

function HomePage() {
  return (
    <SharedLayout>
      <Hero />
      <FeaturedCalculators />
      <CalculatorGallery />
      <AboutSection />
    </SharedLayout>
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`${theme} overflow-hidden`}>
        <MathBackground />
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/financial" element={<SharedLayout showBackButton><FinancialCalculators /></SharedLayout>} />
              <Route path="/financial/mortgage" element={<MortgageCalculator />} />
              <Route path="/financial/investment" element={<InvestmentCalculator />} />
              <Route path="/financial/loan" element={<LoanCalculator />} />
              <Route path="/financial/retirement" element={<RetirementCalculator />} />
              <Route path="/financial/tax" element={<TaxCalculator />} />
              <Route path="/financial/portfolio" element={<PortfolioCalculator />} />
              <Route path="/financial/budget" element={<BudgetCalculator />} />
              <Route path="/financial/currency" element={<CurrencyCalculator />} />
              <Route path="/financial/car-payment" element={<CarPaymentCalculator />} />
              <Route path="/financial/credit-card" element={<CreditCardCalculator />} />
              <Route path="/financial/paycheck" element={<PaycheckCalculator />} />
              <Route path="/financial/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/basic" element={<BasicCalculator />} />
              <Route path="/scientific" element={<ScientificCalculator />} />
              <Route path="/algebra" element={<AlgebraCalculator />} />
              <Route path="/geometry" element={<GeometryCalculator />} />
              <Route path="/converter" element={<UnitConverter />} />
              <Route path="/health" element={<HealthCalculator />} />
              <Route path="/programmer" element={<ProgrammerCalculator />} />
              <Route path="/graphing" element={<GraphingCalculator />} />
              <Route path="/equation-solver" element={<EquationSolver />} />
              <Route path="/matrix" element={<MatrixCalculator />} />
              <Route path="/fraction" element={<FractionCalculator />} />
              <Route path="/statistics" element={<StatisticsCalculator />} />
              <Route path="/complex" element={<ComplexNumberCalculator />} />
              <Route path="/calculus" element={<CalculusCalculator />} />
              <Route path="/static" element={<StaticCalculator />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;