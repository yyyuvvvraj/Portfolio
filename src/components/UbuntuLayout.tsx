import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import UbuntuDock from './UbuntuDock';
import Chatbot from '../Chatbot';
import { audioSystem } from '../utils/audio';
import { useGame } from '../context/GameContext';

function UbuntuTopBar() {
  const [time, setTime] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const { score, isGameMode } = useGame();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + " " + 
             now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  const toggleVolume = () => {
    audioSystem.toggleMute();
    setIsMuted(audioSystem.isMuted);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-7 bg-black/95 backdrop-blur-md z-50 flex items-center justify-between px-4 text-white font-ubuntu text-13px shadow-md border-b border-white/5">
      <div className="flex items-center gap-4 h-full">
        <div className="hover:bg-white/10 h-full px-2 flex items-center cursor-pointer transition-colors rounded-sm text-[#E95420] font-bold">Activities</div>
        {isGameMode && (
          <div className="flex items-center gap-2 h-full px-2 text-[#87d23f] font-mono whitespace-nowrap hidden sm:flex">
            <span>SEC_CLEARANCE_SCORE:</span>
            <span className="font-bold border border-[#87d23f]/30 px-1 bg-[#87d23f]/10">{score.toString().padStart(4, '0')}</span>
          </div>
        )}
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 hover:bg-white/10 h-full px-3 flex items-center cursor-pointer transition-colors rounded-sm font-bold">
        {time}
      </div>

      <div className="flex items-center gap-3 h-full px-2 hover:bg-white/10 cursor-pointer transition-colors rounded-sm" onClick={toggleVolume}>
        <div className="flex items-center gap-3 opacity-80">
          <div className="hover:text-[#E95420] transition-colors" title="Toggle System Sound">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#87d23f]" />}
          </div>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13v6h4v-6c0-3.31 2.69-6 6-6s6 2.69 6 6v6h4v-6c0-5.52-4.48-10-10-10z"/></svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default function UbuntuLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-white font-ubuntu selection:bg-[var(--color-ubuntu-orange)] selection:text-white relative">
      <UbuntuTopBar />
      <UbuntuDock />
      
      {/* Global Scanlines Overlay */}
      <div className="fixed inset-0 scanlines z-50 pointer-events-none opacity-20 mix-blend-overlay"></div>

      <div className="pl-16 pt-7 min-h-screen flex flex-col">
        <div className="flex-1 w-full bg-[#1e1e1e] relative overflow-hidden shadow-inner border border-white/5 m-4 rounded-xl border-[#5e2750]">
          {/* Faux OS Window Header for the main content area */}
          <div className="h-8 bg-[#300a24] border-b border-[#5e2750] flex items-center px-4 sticky top-0 z-30">
             <div className="flex gap-2 w-full max-w-[60px]">
               <div className="w-3 h-3 rounded-full bg-[#ef6464]"></div>
               <div className="w-3 h-3 rounded-full bg-[#f1ba4f]"></div>
               <div className="w-3 h-3 rounded-full bg-[#73c54a]"></div>
             </div>
             <div className="flex-1 text-center font-ubuntu text-xs text-white/50 tracking-wide pointer-events-none">
                yuvraj_deshmukh@ubuntu
             </div>
             <div className="w-[60px]"></div>
          </div>
          
          <div className="h-[calc(100%-2rem)] overflow-y-auto overflow-x-hidden relative">
            <Outlet />
          </div>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
}
