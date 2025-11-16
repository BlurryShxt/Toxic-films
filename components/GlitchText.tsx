

import React from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children }) => {
  // Sound hook would be called here
  // const [playBlip] = useSound('/sounds/blip.wav');

  const handleMouseEnter = () => {
    // playBlip();
  };

  const textContent = typeof children === 'string' ? children : '';

  return (
    <span 
      className="glitch-text"
      data-text={textContent}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </span>
  );
};

export default GlitchText;