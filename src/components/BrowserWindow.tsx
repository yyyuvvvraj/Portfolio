import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Shield, Maximize2, X, Minus, Lock } from 'lucide-react';

interface BrowserWindowProps {
  children: ReactNode;
  url?: string;
  title?: string;
  onBack?: () => void;
}

export default function BrowserWindow({ children, url = "https://yuvraj.dev/projects", title = "Projects - Yuvraj Deshmukh", onBack }: BrowserWindowProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-zinc-200 font-sans rounded-xl overflow-hidden shadow-2xl border border-zinc-800/50 relative z-20">
      {/* OS Window Header / Tab Bar */}
      <div className="bg-zinc-900 h-10 flex items-end px-2 gap-2 pt-2 border-b border-zinc-800">
        <div className="flex gap-1.5 sm:gap-2 mb-2 px-2 sm:px-3 items-center opacity-80">
           <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
           <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
           <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        
        {/* Active Tab */}
        <div className="bg-zinc-800 h-8 min-w-[120px] sm:min-w-[200px] max-w-[240px] rounded-t-lg flex items-center px-2 sm:px-3 gap-2 relative group flex-1 pb-1 border-t border-l border-r border-zinc-700/50">
          <div className="w-4 h-4 rounded-sm bg-[#E10600] flex items-center justify-center text-[8px] text-white font-bold shadow-sm flex-shrink-0">YD</div>
          <span className="text-xs truncate text-zinc-100 flex-1 select-none font-medium hidden xs:block">{title}</span>
          <X className="w-4 h-4 text-zinc-400 hover:text-zinc-100 cursor-pointer rounded-full hover:bg-zinc-600/50 p-0.5 transition-colors" />
          
          {/* Tab SVG corners for realistic look */}
          <div className="absolute -left-2 bottom-0 w-2 h-2 bg-transparent shadow-[2px_2px_0_0_#27272a] rounded-br-lg"></div>
          <div className="absolute -right-2 bottom-0 w-2 h-2 bg-transparent shadow-[-2px_2px_0_0_#27272a] rounded-bl-lg"></div>
        </div>
      </div>

      {/* URL Bar Area */}
      <div className="bg-zinc-800 h-10 sm:h-12 flex items-center px-2 sm:px-3 gap-2 sm:gap-4 border-b border-zinc-900 shadow-sm">
        <div className="flex items-center gap-1 text-zinc-400">
          <button 
            onClick={onBack}
            className={`p-1.5 rounded-md transition-colors ${!onBack ? 'cursor-not-allowed opacity-30 text-zinc-500' : 'hover:bg-zinc-700 text-zinc-200 hover:text-white'}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 cursor-not-allowed opacity-30 text-zinc-500 rounded-md"><ArrowRight className="w-4 h-4" /></button>
          <button onClick={handleRefresh} className="p-1.5 hover:bg-zinc-700 rounded-md transition-colors text-zinc-300 ml-1">
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#E10600]' : ''}`} />
          </button>
        </div>

        {/* Omnibox / URL Bar */}
        <div className="flex-1 bg-zinc-950/80 hover:bg-zinc-900 transition-colors h-8 rounded-md flex items-center px-3 gap-2 border border-zinc-700/50 focus-within:border-[#E10600]/50 focus-within:ring-1 focus-within:ring-[#E10600]/30 shadow-inner">
          <Lock className="w-3.5 h-3.5 text-zinc-500" />
          <input 
            type="text" 
            readOnly 
            value={url} 
            className="bg-transparent border-none outline-none text-sm text-zinc-300 flex-1 cursor-default font-mono placeholder-zinc-600 truncate"
            spellCheck="false"
          />
          <Shield className="w-4 h-4 text-zinc-600" />
        </div>

        <div className="flex items-center gap-2 pr-1">
          <button className="w-7 h-7 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-[#E10600] text-[8px] flex items-center justify-center text-white border border-zinc-600">Me</div>
          </button>
        </div>
      </div>

      {/* Browser Content Area */}
      <div className="flex-1 overflow-auto bg-zinc-950 relative">
        {isRefreshing && (
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-all">
             <div className="w-8 h-8 border-2 border-[#E10600] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className={`h-full transition-opacity duration-300 ${isRefreshing ? 'opacity-30' : 'opacity-100'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
