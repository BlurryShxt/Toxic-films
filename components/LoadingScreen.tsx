
import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [phase, setPhase] = useState<'INITIAL' | 'MEMORY' | 'VHS' | 'FINAL'>('INITIAL');
  const [logs, setLogs] = useState<string[]>([]);
  const [timer, setTimer] = useState("00:00:00");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Rapid Memory Check Logs
    const logPool = [
      "CHECKING BIOS... OK",
      "MOUNTING /DEV/ARCHIVE...",
      "LOADING SCANLINE.DRIVER...",
      "RECOVERING DELETED SCENES...",
      "DECRYPTING FILM_GRAIN.DAT",
      "BUFFERING STATIC...",
      "ALLOCATING VHS_HEAD_01",
      "ESTABLISHING CULT_LINK...",
      "0x80045 [CACHED]",
      "SIGNAL_STRENGTH: 82%",
      "TRACKING_ADJUST: AUTO",
    ];

    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < logPool.length) {
        setLogs(prev => [...prev.slice(-10), logPool[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
        setPhase('VHS');
      }
    }, 150);

    // Update the VHS timer
    const timeInterval = setInterval(() => {
      const date = new Date();
      const h = date.getHours().toString().padStart(2, '0');
      const m = date.getMinutes().toString().padStart(2, '0');
      const s = date.getSeconds().toString().padStart(2, '0');
      setTimer(`${h}:${m}:${s}`);
    }, 1000);

    // Final phase trigger
    const finalTimeout = setTimeout(() => {
      setPhase('FINAL');
    }, 2200);

    return () => {
      clearInterval(logInterval);
      clearInterval(timeInterval);
      clearTimeout(finalTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#060606] z-[200] overflow-hidden flex flex-col items-center justify-center font-tech-mono overflow-hidden">
      {/* VHS Static Effect Layer */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen bg-[url('https://media.giphy.com/media/oEI9uWUicKgH6/giphy.gif')] bg-cover"></div>
      
      {/* Tracking Line */}
      <div className="absolute left-0 right-0 h-1 bg-white/20 animate-tracking blur-sm"></div>

      {/* Terminal Logs (Bottom Left) */}
      <div className="absolute bottom-10 left-10 text-[#00ff41] text-xs opacity-60 leading-tight hidden md:block">
        {logs.map((log, i) => (
          <div key={i} className="mb-0.5">{`> ${log}`}</div>
        ))}
      </div>

      {/* VHS OSD Elements */}
      <div className="absolute top-10 left-10 text-white font-vt323 text-3xl tracking-widest opacity-80 uppercase animate-flicker">
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent"></div>
          PLAY
        </div>
      </div>
      
      <div className="absolute top-10 right-10 text-white font-vt323 text-3xl tracking-widest opacity-80 animate-flicker">
        {timer}
      </div>

      <div className="absolute bottom-10 right-10 text-white font-vt323 text-3xl tracking-widest opacity-80 animate-flicker uppercase">
        SLP 120m
      </div>

      {/* Center Brand Reveal */}
      <div className="relative z-10 text-center">
        <div className="relative inline-block">
          <h1 className={`text-white font-bebas text-7xl md:text-9xl tracking-tighter transition-all duration-300 ${phase === 'FINAL' ? 'scale-105 opacity-100' : 'scale-95 opacity-40'}`}>
            TOXIC<span className="text-[#C0C0C0]">FILMS</span>
          </h1>
          
          {/* Glitch Overlay */}
          <div className="absolute inset-0 text-[#9EFD38] font-bebas text-7xl md:text-9xl tracking-tighter opacity-0 group-hover:opacity-30 animate-flicker mix-blend-screen overflow-hidden whitespace-nowrap">
            TOXICFILMS TOXICFILMS TOXICFILMS
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
             <div 
               className="absolute top-0 left-0 h-full bg-[#9EFD38] transition-all duration-300 ease-out" 
               style={{ width: phase === 'VHS' ? '60%' : phase === 'FINAL' ? '100%' : '10%' }}
             ></div>
          </div>
          <p className="mt-4 text-[#C0C0C0] text-xs tracking-[0.4em] uppercase opacity-60">
            {phase === 'FINAL' ? 'LINK ESTABLISHED' : 'SYNCHRONIZING REEL...'}
          </p>
        </div>
      </div>

      {/* Corner "Recording" Dot */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
         <div className="w-3 h-3 bg-[#D90429] rounded-full animate-pulse shadow-[0_0_10px_#D90429]"></div>
         <span className="text-white font-vt323 text-2xl tracking-widest">REC</span>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
    </div>
  );
};

export default LoadingScreen;
