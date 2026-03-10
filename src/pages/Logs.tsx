import { motion } from "motion/react";
import { Terminal as TerminalIcon, Activity, Flame, Trophy } from "lucide-react";

function RaceEvent({ round, date, role, company, desc, align }: { round: string, date: string, role: string, company: string, desc: string, align: 'left' | 'right' }) {
  const isLeft = align === 'left';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative flex flex-col md:flex-row items-center group ${isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`md:w-1/2 flex flex-col ${isLeft ? 'md:items-start pl-8 md:pl-12' : 'md:items-end pr-8 md:pr-12'} w-full pl-8`}>
        <div className="font-mono text-[#E95420] text-xs tracking-widest mb-1 bg-[#E95420]/10 px-2 py-1 border border-[#E95420]/20 inline-block relative overflow-hidden">
          <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          <span className="relative z-10">{round}</span>
        </div>
        <h3 className="font-display text-3xl uppercase tracking-wide mb-1 mt-2 text-white group-hover:text-[#E95420] transition-colors duration-300">{role}</h3>
        <div className="font-mono text-[var(--color-neon-blue)] text-sm mb-4">{company}</div>
        <p className={`font-mono text-sm text-white/60 ${isLeft ? 'text-left' : 'md:text-right text-left'}`}>
          {desc}
        </p>
      </div>
      
      <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-[#E95420] rounded-full border-2 border-[var(--color-carbon)] z-10 shadow-[0_0_10px_#E95420]" />
      
      <div className={`md:w-1/2 flex ${isLeft ? 'md:justify-end pr-8 md:pr-12' : 'md:justify-start pl-8 md:pl-12'} w-full pl-8 mt-2 md:mt-0`}>
        <div className="font-mono text-sm text-white/30 border-b border-white/10 pb-1">{date}</div>
      </div>
    </motion.div>
  );
}

export default function Logs() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      
      <div className="flex items-center gap-4 mb-16">
        <TerminalIcon className="w-8 h-8 text-[#E95420]" />
        <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white">Operation Logs</h2>
      </div>

      <div className="relative border-l-2 border-[#E95420]/30 ml-4 md:ml-0 md:border-none mb-32">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#E95420]/30" />
        
        <div className="space-y-12">
          <RaceEvent 
            round="OP: 03"
            date="FEB 2026"
            role="AI Research Author & Presenter"
            company="ICASS-2026 (IEEE) | Manav Rachna Univ."
            desc="Presented research on Advanced Game Tree Optimization. Engineered enhanced Alpha-Beta Pruning and heuristic evaluation functions for intelligent AI agents, improving real-time decision-making in adversarial environments."
            align="right"
          />
          <RaceEvent 
            round="OP: 02"
            date="2024 - 2025"
            role="Lead Full-Stack Architect (Projects)"
            company="Independent Engineering"
            desc="Architected and deployed complex full-stack systems including Cadence (Capstone) and AdditiveCurriculum. Focused on secure data handling, scalable backends, and high-performance React interfaces."
            align="left"
          />
          <RaceEvent 
            round="OP: 01"
            date="2023 - 2027"
            role="Computer Science Engineering"
            company="NIIT University"
            desc="Building a rigorous foundation in software engineering, cybersecurity, and artificial intelligence. Fostering research, innovation, and hands-on exploit mitigation techniques."
            align="right"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-16 pt-12 border-t border-white/10">
        <Activity className="w-8 h-8 text-[#FF8700]" />
        <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white">Classified Research</h2>
      </div>
      
      <div className="border border-[#FF8700]/30 bg-[#FF8700]/5 p-8 md:p-12 relative overflow-hidden cyber-border group hover:border-[#FF8700] transition-colors duration-500 rounded-xl mb-12">
        <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8700]/10 blur-3xl rounded-full group-hover:bg-[#FF8700]/20 transition-colors duration-500" />
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-24 bg-[#FF8700] group-hover:h-32 transition-all duration-500 shadow-[0_0_15px_#FF8700]" />
        
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs bg-[#FF8700]/20 text-[#FF8700] px-3 py-1 border border-[#FF8700]/30 uppercase tracking-widest shadow-[0_0_10px_rgba(255,135,0,0.3)]">
            Published Intel
          </span>
          <span className="font-mono text-xs text-white/40 font-bold">STATUS: DECLASSIFIED</span>
        </div>
        
        <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide mb-4 text-white leading-tight">
          Enhanced Alpha-Beta Pruning and Evaluation Function Optimization for Intelligent Pac-Man AI Agents
        </h3>
        
        <div className="font-mono text-[var(--color-neon-blue)] text-sm mb-6 flex flex-col gap-1 border-l-2 border-[var(--color-neon-blue)] pl-4 py-1 bg-[var(--color-neon-blue)]/5 w-fit pr-8">
          <span>CONFERENCE: ICASS-2026 (IEEE)</span>
          <span>LOCATION: Manav Rachna University</span>
          <span>AFFILIATION: NIIT University</span>
        </div>
        
        <p className="font-mono text-sm md:text-base text-white/80 leading-relaxed mb-6 max-w-3xl">
          This research focuses on improving decision-making efficiency in adversarial game environments. By optimizing traditional Alpha-Beta Pruning to reduce unnecessary node expansions and designing an improved heuristic evaluation function tailored for dynamic environments, the study achieves significantly better real-time performance in multi-agent adversarial scenarios.
        </p>

        <div className="font-mono text-xs text-white/50 mb-8 max-w-3xl border border-white/10 p-4 bg-black/40">
          IMPLICATIONS: Search optimization in robotics, autonomous systems, and real-time decision engines.<br/>
          MENTIONS: Dr. Shweta Malwe, Prof. Prachi Mehta.
        </div>
        
        <a 
          href="#" 
          className="inline-flex items-center gap-2 font-display uppercase tracking-wider text-[#FF8700] hover:text-white transition-colors border-b border-[#FF8700]/30 hover:border-white pb-1"
        >
          <TerminalIcon className="w-4 h-4" />
          Access Full Document
        </a>
      </div>

      {/* ─── F1 Fan Section ───────────────────────────────────────── */}
      <div className="pt-12 border-t border-white/10">
        <div className="flex items-center gap-4 mb-10">
          <Flame className="w-8 h-8 text-[#E10600]" />
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white">F1 Fan Logs</h2>
          <div className="f1-skew bg-[#001F5B] border border-[#FFD700]/60 px-3 py-1 ml-2">
            <div className="f1-skew-reverse font-display text-[#FFD700] text-xs tracking-widest">ORACLE RBR</div>
          </div>
        </div>

        {/* VER Championship card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 border border-[#FFD700]/30 bg-gradient-to-r from-[#001F5B]/30 to-transparent p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD700] group-hover:shadow-[0_0_10px_#FFD700] transition-all" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 blur-3xl pointer-events-none" />
          <div className="flex flex-wrap gap-8 items-center">
            <div className="text-center">
              <div className="font-display text-7xl text-[#FFD700] leading-none">1</div>
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Permanent Number</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-[#FFD700]" />
                <span className="font-display text-2xl uppercase text-white">Max Verstappen</span>
              </div>
              <div className="font-mono text-sm text-[#FFD700]/70 mb-4">Oracle Red Bull Racing · 4× World Drivers' Champion</div>
              <div className="flex flex-wrap gap-3">
                {["2021 WDC", "2022 WDC", "2023 WDC", "2024 WDC", "19 Wins in 2023", "Avg 1.5s gap to P2"].map(tag => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-1 border border-[#FFD700]/30 text-[#FFD700]/70 bg-[#FFD700]/5 uppercase">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Favourite GPs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { gp: "Monaco GP", year: "2023", desc: "The jewel of the calendar — Verstappen's coronation circuit. Pure F1 artistry at its finest.", flag: "🇲🇨" },
            { gp: "Bahrain GP", year: "2023", desc: "Season opener, dominant win. Verstappen set the tone for the most dominant season in F1 history.", flag: "🇧🇭" },
            { gp: "Dutch GP", year: "2023", desc: "Zandvoort at night in the orange sea. Home race energy unlike anything else in motorsport.", flag: "🇳🇱" },
          ].map((race) => (
            <motion.div
              key={race.gp}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-[#001F5B]/60 bg-[#001F5B]/10 hover:border-[#FFD700]/40 hover:bg-[#001F5B]/20 transition-all p-6 relative group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700]/5 blur-2xl pointer-events-none" />
              <div className="text-3xl mb-3">{race.flag}</div>
              <div className="font-display text-xl uppercase text-white mb-1">{race.gp}</div>
              <div className="font-mono text-xs text-[#FFD700]/60 mb-3">{race.year} · RBR #1-2</div>
              <p className="font-mono text-xs text-white/50 leading-relaxed">{race.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
