
import React from 'react';

const TheScript: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-20">
        <h2 className="text-[#9EFD38] font-tech-mono text-sm tracking-[0.4em] uppercase mb-4">// ACT I: THE PHILOSOPHY</h2>
        <h1 className="text-white font-bebas text-7xl md:text-9xl leading-none mb-12">WEAR THE <span className="text-[#C0C0C0]">SCENE</span></h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-[#C0C0C0] text-xl leading-relaxed">
            <p>
              Toxic Films was born from the grain of 35mm celluloid and the grit of the concrete jungle. We don't just design apparel; we storyboard identities.
            </p>
            <p>
              Every garment is a frame. Every collection is an act. Our design ethos balances the industrial harshness of a soundstage with the fluid rebellion of modern streetwear.
            </p>
          </div>
          <div className="aspect-square bg-white/5 border border-white/10 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059" className="w-full h-full object-cover grayscale opacity-40 hover:opacity-80 transition-opacity" alt="Manifesto Image" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-20">
        <h2 className="text-[#D90429] font-tech-mono text-sm tracking-[0.4em] uppercase mb-4">// ACT II: THE COLLECTIVE</h2>
        <h3 className="text-white font-bebas text-6xl mb-12 uppercase">THE PRODUCTION CREW</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { role: "Director of Design", name: "K. VOID", bio: "Visual architect specializing in dystopian textures." },
            { role: "Artistic Lead", name: "S. CHROMA", bio: "Master of high-contrast graphic storytelling." },
            { role: "Tech Specialist", name: "D. LOG", bio: "Engineering the intersection of fashion and function." }
          ].map((member, i) => (
            <div key={i} className="bg-[#111] p-8 border-l-2 border-[#C0C0C0] hover:border-[#9EFD38] transition-colors group">
              <span className="text-[#9EFD38] font-tech-mono text-xs uppercase block mb-2">{member.role}</span>
              <h4 className="text-white font-bebas text-4xl mb-4 group-hover:tracking-widest transition-all">{member.name}</h4>
              <p className="text-[#C0C0C0] font-inter text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheScript;
