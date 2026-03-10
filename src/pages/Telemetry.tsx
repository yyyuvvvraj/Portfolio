import { motion } from "motion/react";
import { Radio, Activity, Flame } from "lucide-react";
import ThreatMonitor from "../components/ThreatMonitor";

function TyreCard({ type, color, title, skills, desc }: { type: string, color: string, title: string, skills: string[], desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-premium-card p-8 relative overflow-hidden group flex flex-col items-center text-center bg-black/40 backdrop-blur-md border border-white/10"
    >
      <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
      
      <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mb-6 relative shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ borderColor: color, boxShadow: `0 0 15px ${color}40` }}>
        <div className="absolute inset-1 rounded-full border border-white/20" />
        <span className="font-display text-2xl" style={{ color }}>{type[0]}</span>
      </div>
      
      <h3 className="font-display text-2xl uppercase tracking-wide mb-2 text-white">{title}</h3>
      <p className="font-mono text-xs text-white/50 mb-6">{desc}</p>
      
      <div className="flex flex-wrap justify-center gap-2 mt-auto">
        {skills.map(s => (
          <span key={s} className="font-mono text-[10px] px-2 py-1 bg-white/5 border border-white/10 text-white/70 uppercase tracking-wider">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function MetricCard({ label, value, unit, desc, color = "var(--color-f1-red)" }: { label: string, value: string, unit: string, desc: string, color?: string }) {
  return (
    <div className="glass-premium-card p-6 relative overflow-hidden group hover:border-[var(--color-f1-red)]/30 transition-colors duration-300 bg-black/40 backdrop-blur-md border border-white/10">
      <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-4 text-white/50">
        <Activity className="w-4 h-4" style={{ color }} />
        <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="font-display text-5xl" style={{ color }}>{value}</span>
        <span className="font-mono text-xl text-white/50">{unit}</span>
      </div>
      <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{desc}</p>
    </div>
  );
}

export default function Telemetry() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">

      {/* RBR Race Data Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap items-center gap-px overflow-hidden border border-[#001F5B]/60"
      >
        <div className="bg-[#001F5B] px-4 py-2 flex items-center gap-2 border-r border-[#FFD700]/30">
          <Flame className="w-4 h-4 text-[#E10600]" />
          <span className="font-display text-[#FFD700] text-xs uppercase tracking-widest">VER #1</span>
        </div>
        {[
          { label: "LAP RECORD", value: "1:11.097", track: "COTA" },
          { label: "TOP SPEED", value: "373 km/h", track: "Monza" },
          { label: "2023 WINS", value: "19/22", track: "Record Season" },
          { label: "FASTEST LAPS", value: "7", track: "2023 Season" },
        ].map((d) => (
          <div key={d.label} className="flex-1 min-w-[130px] bg-black/40 px-4 py-2 border-r border-[#001F5B]/40 last:border-r-0">
            <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{d.label}</div>
            <div className="font-display text-lg text-[#FFD700] leading-tight">{d.value}</div>
            <div className="font-mono text-[9px] text-white/40">{d.track}</div>
          </div>
        ))}
      </motion.div>
      <div className="flex items-center gap-4 mb-12">
        <Radio className="w-8 h-8 text-[var(--color-rbr-yellow)] animate-pulse" />
        <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white">Telemetry & Threat Detection</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <TyreCard type="RED" color="#E10600" title="Offensive / Frontend" skills={["React", "Next.js", "Tailwind", "Pen Testing"]} desc="Aggressive grip for fast UI and vulnerability exploitation." />
        <TyreCard type="PURPLE" color="#77216F" title="Full-Stack / API" skills={["Node.js", "Express", "GraphQL", "AppSec"]} desc="Balanced performance bridging the gap between systems." />
        <TyreCard type="BLUE" color="#3a80ca" title="Defensive / DevOps" skills={["Docker", "AWS", "Cryptography", "Zero Trust"]} desc="Durable infrastructure and hardened security postures." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <MetricCard label="ENCRYPTION" value="256" unit="bit" desc="AES Standard" color="#3a80ca" />
        <MetricCard label="LATENCY" value="12" unit="ms" desc="Network Ping" color="#E10600" />
        <MetricCard label="UPTIME" value="99.9" unit="%" desc="System Reliability" color="#87d23f" />
        <MetricCard label="BREACHES" value="0" unit="" desc="Incidents Detected" color="#3a80ca" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 glass-premium-card p-6 relative group overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#E10600]/5 blur-3xl pointer-events-none group-hover:bg-[#E10600]/10 transition-colors" />
           <h3 className="font-display text-2xl uppercase tracking-wide mb-4 text-white">Network Architecture</h3>
           <p className="font-mono text-sm text-white/60 mb-8 max-w-lg leading-relaxed">
             All inbound traffic is routed through dual-layered WAFs. Critical system endpoints are isolated in secure DMZs to prevent lateral movement during active exploitation attempts.
           </p>
           <div className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-white/5">
             <div className="flex items-center gap-2 font-mono text-xs bg-[#87d23f]/10 px-3 py-2 border border-[#87d23f]/30 text-[#87d23f] rounded">
               <div className="w-2 h-2 rounded-full bg-[#87d23f] animate-pulse shadow-[0_0_10px_#87d23f]"></div> NODE_A_SECURE
             </div>
             <div className="w-8 h-1 bg-[#87d23f]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#87d23f] animate-[pulse_1s_ease-in-out_infinite]" />
             </div>
             <div className="flex items-center gap-2 font-mono text-xs bg-[#87d23f]/10 px-3 py-2 border border-[#87d23f]/30 text-[#87d23f] rounded">
               <div className="w-2 h-2 rounded-full bg-[#87d23f] animate-pulse shadow-[0_0_10px_#87d23f]"></div> NODE_B_SECURE
             </div>
           </div>
        </div>
        <ThreatMonitor />
      </div>

      {/* RBR Tyre Strategy Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-4 border border-[#001F5B]/40 bg-[#001F5B]/10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFD700]/70">Oracle Red Bull Racing — Tyre Strategy Analogy</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { compound: "SOFT", color: "#E10600", analogy: "React / Frontend — Fast, high grip, short runs" },
            { compound: "MEDIUM", color: "#FFD700", analogy: "Full-Stack / API — Balanced, versatile" },
            { compound: "HARD", color: "#E0E0E0", analogy: "DevOps / Security — Durable, long-run performance" },
          ].map((t) => (
            <div key={t.compound} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: t.color }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
              </div>
              <span className="font-mono text-[10px] text-white/50">{t.analogy}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
