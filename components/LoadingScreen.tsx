

import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Booting toxicfilms.exe... [OK]";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0a0a0a] text-[#00ff41] font-tech-mono text-xl md:text-3xl">
      <div className="p-4" style={{ textShadow: '0 0 8px #00ff41, 0 0 12px #00ff41' }}>
        <span>&gt;_ {text}</span>
        <span className={`inline-block w-3 h-6 md:w-4 md:h-8 bg-[#00ff41] ml-1 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: '0 0 8px #00ff41' }}></span>
      </div>
    </div>
  );
};

export default LoadingScreen;