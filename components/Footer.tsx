

import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [framesDropped, setFramesDropped] = useState<number>(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setFramesDropped(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#0a0a0a] p-2 z-50 border-t border-[rgba(0,255,65,0.2)]">
      <div className="container mx-auto flex justify-between items-center text-xs md:text-sm font-tech-mono text-[rgba(255,255,255,0.5)]">
        <span>[ CONNECTION: UNSTABLE ]</span>
        <span className="hidden md:inline">[ FRAMES DROPPED: {framesDropped} ]</span>
        <span>[ © TOXICFILMS // SYSTEM_FAILURE ]</span>
      </div>
    </footer>
  );
};

export default Footer;