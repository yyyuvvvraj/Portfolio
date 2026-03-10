import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldAlert } from "lucide-react";

export default function ThreatMonitor() {
  const [threats, setThreats] = useState<{ id: number; ip: string; type: string; time: string }[]>([
    { id: 1, ip: "192.168.1.45", type: "BRUTE_FORCE_SSH", time: new Date(Date.now() - 15000).toLocaleTimeString() },
    { id: 2, ip: "10.0.0.99", type: "SQL_INJECTION", time: new Date(Date.now() - 85000).toLocaleTimeString() }
  ]);

  useEffect(() => {
    const types = ["PORT_SCAN", "XSS_ATTACK", "RATE_LIMIT_EXCEEDED", "UNAUTHORIZED_ACCESS"];
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now(),
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        type: types[Math.floor(Math.random() * types.length)],
        time: new Date().toLocaleTimeString()
      };
      setThreats(prev => [newThreat, ...prev].slice(0, 5));
    }, 8000); // New threat every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-premium-card p-6 border-l-4 border-[#ff5555] relative overflow-hidden group bg-black/40 backdrop-blur-md">
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-2">
        <ShieldAlert className="w-5 h-5 text-[#ff5555] animate-pulse" />
        <h3 className="font-mono uppercase tracking-widest text-[#ff5555] text-sm font-bold">Live Threat feed</h3>
      </div>
      <div className="font-mono text-xs space-y-3">
        {threats.map((t) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-start border-l-2 border-[#ff5555]/50 pl-2 bg-[#ff5555]/5 py-2 pr-2"
          >
            <div>
              <div className="text-white/80 font-bold">{t.type}</div>
              <div className="text-white/50">{t.ip}</div>
            </div>
            <div className="text-[#ff5555]/80">{t.time}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
