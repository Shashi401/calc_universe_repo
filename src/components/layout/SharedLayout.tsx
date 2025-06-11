import React from 'react';
import SharedNavigation from './SharedNavigation';
import Footer from './Footer';
import MathBackground from '../ui/MathBackground';

interface SharedLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children, showBackButton = false }) => {
  return (
    <div className="min-h-screen bg-dark-700 flex flex-col relative">
      <MathBackground />
      <div className="relative z-10">
        <SharedNavigation showBackButton={showBackButton} />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SharedLayout;