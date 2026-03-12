import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import UbuntuDock from './UbuntuDock';
import Chatbot from '../Chatbot';
import { audioSystem } from '../utils/audio';
import { useGame } from '../context/GameContext';

function UbuntuTopBar() {
  const [time, setTime] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { score, isGameMode } = useGame();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsPanelOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const toggleVolume = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioSystem.toggleMute();
    setIsMuted(audioSystem.isMuted);
    if (!audioSystem.isMuted) {
      setTimeout(() => audioSystem.playSuccessBeep(), 50);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-7 bg-black/95 backdrop-blur-md z-50 flex items-center justify-between px-4 text-white font-ubuntu text-13px shadow-md border-b border-white/5">
      <div className="flex items-center gap-4 h-full">
        <div className="hover:bg-white/10 h-full px-2 flex items-center cursor-pointer transition-colors rounded-sm text-[#E10600] font-bold md:block hidden">Activities</div>
        {isGameMode && (
          <div className="flex items-center gap-2 h-full px-2 text-[#87d23f] font-mono whitespace-nowrap hidden lg:flex">
            <span>SEC_CLEARANCE_SCORE:</span>
            <span className="font-bold border border-[#87d23f]/30 px-1 bg-[#87d23f]/10">{score.toString().padStart(4, '0')}</span>
          </div>
        )}
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 hover:bg-white/10 h-full px-3 flex items-center cursor-pointer transition-colors rounded-sm font-bold">
        {time}
      </div>

      <div 
        ref={panelRef}
        className={`relative flex items-center justify-center h-full px-2 cursor-pointer transition-colors rounded-sm ml-auto mr-2 ${isPanelOpen ? 'bg-white/10' : 'hover:bg-white/10'}`} 
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        <div className="flex items-center gap-3 opacity-80 pl-2 pr-1">
          <div className="hover:text-[#E10600] transition-colors" title="Toggle System Sound" onClick={(e) => { e.stopPropagation(); toggleVolume(e); }}>
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#87d23f]" />}
          </div>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13v6h4v-6c0-3.31 2.69-6 6-6s6 2.69 6 6v6h4v-6c0-5.52-4.48-10-10-10z"/></svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Dropdown Menu */}
        {isPanelOpen && (
          <div className="absolute top-full mt-1 right-0 w-[calc(100vw-1rem)] sm:w-80 bg-[#1e1e1ede] backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/10 p-4 text-white font-ubuntu cursor-default flex flex-col gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 translate-x-[-0.5rem] sm:translate-x-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4">
               <button onClick={toggleVolume} className={`p-2 rounded-full transition-colors ${!isMuted ? 'bg-[#E10600] text-white hover:bg-[#E10600]/80' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
                 {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
               </button>
               <div className="flex-1 h-1.5 bg-black/50 rounded-full overflow-hidden relative">
                 <div className={`absolute left-0 top-0 h-full transition-all duration-300 ${!isMuted ? 'w-3/4 bg-[#E10600]' : 'w-0 bg-transparent'}`} />
               </div>
            </div>

            <div className="h-[1px] w-full bg-white/10" />

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#E10600] rounded-full"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13v6h4v-6c0-3.31 2.69-6 6-6s6 2.69 6 6v6h4v-6c0-5.52-4.48-10-10-10z"/></svg></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">Wi-Fi</span>
                    <span className="text-xs text-white/50">Yuvraj_5G</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full"><svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">82%</span>
                    <span className="text-xs text-white/50">Discharging</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/10" />
            
            <div className="flex justify-between items-center px-1">
               <span className="text-xs text-white/40">Secure Node Online</span>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#87d23f] animate-pulse"></div>
                 <span className="text-xs font-mono text-[#87d23f]">CONNECTED</span>
               </div>
            </div>
          </div>
        )}
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

      <div className="pl-0 md:pl-16 pb-16 md:pb-0 pt-7 min-h-screen flex flex-col">
        <div className="flex-1 w-full bg-[#1e1e1e] relative overflow-hidden shadow-inner border border-white/5 m-2 sm:m-4 rounded-xl border-[#5e2750]">
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
