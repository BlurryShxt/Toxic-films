
import React from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  text?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, text }) => {
  const textContent = text || (typeof children === 'string' ? children : '');

  return (
    <span 
      className="glitch-text"
      data-text={textContent}
    >
      {children}
    </span>
  );
};

export default GlitchText;
