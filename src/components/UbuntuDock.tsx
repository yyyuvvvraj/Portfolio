import { Link, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useGame } from '../context/GameContext';

// Native SVG Components for flawless adblock-bypassing app icons

function TerminalAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="termGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#2c2c2c" />
        </radialGradient>
        <linearGradient id="termBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#666" />
          <stop offset="100%" stopColor="#444" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <rect x="10" y="15" width="80" height="70" rx="8" fill="url(#termGrad)" />
        <rect x="10" y="15" width="80" height="15" rx="8" fill="url(#termBar)" />
        <rect x="10" y="25" width="80" height="5" fill="url(#termBar)" />
        {/* Buttons */}
        <circle cx="20" cy="22" r="3" fill="#ff5f56" />
        <circle cx="30" cy="22" r="3" fill="#ffbd2e" />
        <circle cx="40" cy="22" r="3" fill="#27c93f" />
        {/* Prompt */}
        <polyline points="20,45 30,52 20,59" fill="none" stroke="#87d23f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="35" y1="59" x2="50" y2="59" stroke="#fff" strokeWidth="4" />
      </g>
    </svg>
  );
}

function SysMonitorAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sysGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E10600" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E10600" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g filter="url(#shadow)">
        <circle cx="50" cy="50" r="40" fill="url(#sysGrad)" stroke="#444" strokeWidth="2" />
        {/* Grid lines */}
        <line x1="30" y1="20" x2="30" y2="80" stroke="#333" strokeWidth="1" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="#333" strokeWidth="1" />
        <line x1="70" y1="20" x2="70" y2="80" stroke="#333" strokeWidth="1" />
        <line x1="20" y1="30" x2="80" y2="30" stroke="#333" strokeWidth="1" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#333" strokeWidth="1" />
        <line x1="20" y1="70" x2="80" y2="70" stroke="#333" strokeWidth="1" />
        {/* Graph */}
        <path d="M 20 60 L 35 40 L 50 55 L 65 30 L 80 50 L 80 80 L 20 80 Z" fill="url(#chartGlow)" />
        <polyline points="20,60 35,40 50,55 65,30 80,50" fill="none" stroke="#E10600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#E10600" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
      </g>
    </svg>
  );
}

function MailAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mailGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4aa3df" />
          <stop offset="100%" stopColor="#1e6b9f" />
        </linearGradient>
        <linearGradient id="mailFlap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6bbdf0" />
          <stop offset="100%" stopColor="#3c8bc2" />
        </linearGradient>
      </defs>
      <g filter="url(#shadow)">
        <circle cx="50" cy="50" r="40" fill="#ffffff" />
        <path d="M 25 40 L 50 60 L 75 40 L 75 65 C 75 68 72 70 70 70 L 30 70 C 28 70 25 68 25 65 Z" fill="url(#mailGrad)" />
        <path d="M 25 40 L 50 60 L 75 40 L 70 30 C 68 30 65 30 65 30 L 35 30 C 30 30 25 40 25 40 Z" fill="url(#mailFlap)" />
        <polyline points="25,40 50,60 75,40" fill="none" stroke="#2c85c2" strokeWidth="2" strokeLinejoin="round" />
        {/* Stamp or accent */}
        <circle cx="65" cy="45" r="5" fill="#E10600" />
      </g>
    </svg>
  );
}

function FolderAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcb37b" />
          <stop offset="100%" stopColor="#c39d6b" />
        </linearGradient>
        <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eed5a9" />
          <stop offset="100%" stopColor="#deb87d" />
        </linearGradient>
      </defs>
      <g filter="url(#shadow)">
        <path d="M 15 25 L 40 25 L 45 35 L 85 35 L 85 80 L 15 80 Z" fill="url(#folderBack)" />
        <path d="M 15 40 L 45 40 L 50 35 L 85 35 L 85 80 L 15 80 Z" fill="url(#folderFront)" />
      </g>
    </svg>
  );
}

export default function UbuntuDock() {
  const location = useLocation();
  const { isUnlocked } = useGame();

  const navItems = [
    { path: '/', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg', label: 'Home', type: 'image' },
    { path: '/telemetry', IconComponent: SysMonitorAppIcon, label: 'Telemetry (System Monitor)', type: 'component' },
    { path: '/projects', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg', label: 'Projects (Browser)', type: 'image' },
    { path: '/logs', IconComponent: TerminalAppIcon, label: 'Operation Logs (Terminal)', type: 'component' },
    { path: '/contact', IconComponent: MailAppIcon, label: 'Secure Channel (Comms)', type: 'component' },
    { path: '/downloads', IconComponent: FolderAppIcon, label: 'Secure Downloads (Files)', type: 'component' },
  ];

  return (
    <div className="fixed left-0 top-7 bottom-0 w-16 bg-[#300a24]/80 backdrop-blur-md border-r border-[#E10600]/30 flex flex-col items-center py-4 gap-4 z-40">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        // Normalize path to match context route keys
        const routeKey = item.path === '/' ? 'home' : item.path.slice(1) as any;
        const unlocked = isUnlocked(routeKey);

        if (!unlocked) {
          return (
            <div
              key={item.path}
              className="relative p-2 rounded-2xl transition-all group cyber-border text-white/20 cursor-not-allowed bg-black/40"
              title="ACCESS DENIED: Required security clearance terminal command not executed."
            >
              {item.type === 'image' ? (
                <img src={item.iconUrl} alt={item.label} className="w-8 h-8 opacity-30 object-contain" />
              ) : item.IconComponent ? (
                <item.IconComponent className="w-8 h-8 opacity-30 object-contain drop-shadow-md" />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#ef6464] drop-shadow-[0_0_5px_rgba(239,100,100,0.8)]" />
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`relative p-2 rounded-2xl transition-all group cyber-border ${
              isActive ? 'bg-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.3)]' : 'hover:bg-white/10'
            }`}
            title={item.label}
          >
            {isActive && (
              <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-6 bg-[#E10600] rounded-r-md shadow-[0_0_10px_#E10600]" />
            )}
            {item.type === 'image' ? (
              <img src={item.iconUrl} alt={item.label} className="w-8 h-8 object-contain drop-shadow-lg hover:scale-110 transition-transform duration-200" />
            ) : item.IconComponent ? (
              <item.IconComponent className="w-8 h-8 object-contain drop-shadow-lg hover:scale-110 transition-transform duration-200" />
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
