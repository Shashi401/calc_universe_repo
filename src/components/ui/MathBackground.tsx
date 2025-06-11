import React, { useEffect, useRef } from 'react';

interface Symbol {
  value: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
}

const MathBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const symbolsRef = useRef<Symbol[]>([]);
  const animationRef = useRef<number | null>(null);

  const symbols = [
    '∫', '∑', '∞', '√', 'π', 'θ', 'Δ', 'λ', 'Ω', 'φ', 'μ', 'α', 'β', 'γ',
    '∂', '∇', '≈', '≠', '≤', '≥', '⊂', '⊃', '∈', '∉', '∩', '∪',
    'dx/dt', 'dy/dx', 'PV=nRT', 'F=G(m₁m₂)/r²'
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    symbolsRef.current = Array(40).fill(null).map(() => ({
      value: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * width,
      y: Math.random() * height * 2,
      size: Math.random() * 20 + 14,
      opacity: Math.random() * 0.08 + 0.02,
      speed: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5
    }));

    const animate = () => {
      if (!container) return;
      
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      symbolsRef.current.forEach(symbol => {
        symbol.y -= symbol.speed;
        if (symbol.y < -50) {
          symbol.y = height + 50;
          symbol.x = Math.random() * width;
          symbol.value = symbols[Math.floor(Math.random() * symbols.length)];
        }

        symbol.rotation += symbol.rotationSpeed;

        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.style.left = `${symbol.x}px`;
        symbolElement.style.top = `${symbol.y}px`;
        symbolElement.style.fontSize = `${symbol.size}px`;
        symbolElement.style.opacity = `${symbol.opacity}`;
        symbolElement.style.transform = `rotate(${symbol.rotation}deg)`;
        symbolElement.textContent = symbol.value;
        container.appendChild(symbolElement);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      symbolsRef.current.forEach(symbol => {
        if (symbol.x > width) symbol.x = Math.random() * width;
        if (symbol.y > height * 1.5) symbol.y = Math.random() * height;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, rgba(19, 19, 31, 0.97), rgba(19, 19, 31, 0.99))',
        zIndex: 0
      }}
    />
  );
};

export default MathBackground;