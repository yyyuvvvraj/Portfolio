import { useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, ChevronDown, Activity, Flag, Wrench, Calendar, Gauge, Terminal as TerminalIcon, ShieldAlert, Lock, Cpu, Binary, Radio, Phone, X, Timer } from "lucide-react";
import Chatbot from "./Chatbot";

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const sequence = [
      "INIT_ECU_SYSTEM --force",
      "ESTABLISHING SECURE CONNECTION...",
      "BYPASSING FIREWALL [██████████] 100%",
      "DECRYPTING DRIVER_PROFILE.DAT...",
      "ACCESS GRANTED. WELCOME, YUVRAJ."
    ];
    
    let delay = 500;
    sequence.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === sequence.length - 1) setIsTyping(false);
      }, delay);
      delay += Math.random() * 600 + 400;
    });
  }, []);

  return (
    <div className="font-mono text-xs md:text-sm bg-black/80 border border-[var(--color-f1-red)]/50 p-4 rounded backdrop-blur-md h-56 overflow-y-auto w-full shadow-[0_0_20px_rgba(225,6,0,0.15)] relative cyber-border">
      <div className="absolute top-0 left-0 w-full h-full scanlines opacity-50 pointer-events-none"></div>
      <div className="flex gap-2 mb-4 border-b border-[var(--color-f1-red)]/30 pb-2 relative z-10">
        <div className="w-3 h-3 rounded-full bg-[var(--color-f1-red)] animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-[var(--color-papaya)]"></div>
        <div className="w-3 h-3 rounded-full bg-[var(--color-neon-blue)]"></div>
        <span className="text-[var(--color-f1-red)]/70 text-[10px] ml-2 tracking-widest">root@f1-cyber-sec:~</span>
      </div>
      <div className="relative z-10">
        {lines.map((line, i) => (
          <div key={i} className="text-[var(--color-neon-blue)] mb-2 drop-shadow-[0_0_5px_rgba(0,210,190,0.5)]">
            <span className="text-[var(--color-f1-red)] mr-2">{'>'}</span>
            {line}
          </div>
        ))}
        {isTyping && (
          <div className="animate-pulse w-2 h-4 bg-[var(--color-f1-red)] inline-block align-middle shadow-[0_0_8px_var(--color-f1-red)]"></div>
        )}
      </div>
    </div>
  );
}

function StartingLights() {
  return (
    <div className="flex gap-4 mb-8 bg-[#151515] p-4 rounded-xl border-t-4 border-black shadow-2xl w-fit cyber-border">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="w-6 h-6 rounded-full bg-[#222] border-2 border-black shadow-inner relative">
            <div className={`absolute inset-0 rounded-full bg-[var(--color-f1-red)] f1-light-${i}`} />
          </div>
          <div className="w-6 h-6 rounded-full bg-[#222] border-2 border-black shadow-inner relative">
            <div className={`absolute inset-0 rounded-full bg-[var(--color-f1-red)] f1-light-${i}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-white font-sans selection:bg-[var(--color-f1-red)] selection:text-white relative">
      {/* Global Scanlines Overlay */}
      <div className="fixed inset-0 scanlines z-50 pointer-events-none opacity-20 mix-blend-overlay"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-[var(--color-carbon)]/90 backdrop-blur-md border-b border-[var(--color-f1-red)]/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 f1-skew bg-[var(--color-f1-red)] px-4 py-1 shadow-[0_0_15px_rgba(225,6,0,0.4)]">
            <span className="font-display text-xl tracking-wider f1-skew-reverse uppercase">Yuvraj Deshmukh</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-white/70">
            <div className="flex items-center gap-2 text-[var(--color-neon-blue)] text-xs border border-[var(--color-neon-blue)]/30 px-2 py-1 rounded bg-[var(--color-neon-blue)]/5">
              <Lock className="w-3 h-3" /> SECURE CONNECTION
            </div>
            <a href="#driver" className="hover:text-[var(--color-f1-red)] transition-colors">Driver_Profile</a>
            <a href="#telemetry" className="hover:text-[var(--color-f1-red)] transition-colors">Telemetry_Data</a>
            <a href="#calendar" className="hover:text-[var(--color-f1-red)] transition-colors">Op_Logs</a>
            <a href="#pit-stop" className="hover:text-[var(--color-f1-red)] transition-colors">Secure_Channel</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="driver" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-20 telemetry-grid"
        />
        <div className="absolute top-0 right-0 w-1/3 h-full checkered-pattern opacity-[0.03] pointer-events-none mix-blend-overlay" />
        <div className="absolute -top-32 right-1/4 w-8 h-[150%] bg-[var(--color-f1-red)] opacity-10 f1-skew-reverse pointer-events-none blur-sm" />
        <div className="absolute -top-32 right-[28%] w-2 h-[150%] bg-[var(--color-f1-red)] opacity-20 f1-skew-reverse pointer-events-none blur-[1px]" />
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <StartingLights />
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[var(--color-f1-red)] text-lg animate-pulse">● REC</span>
              <div className="h-[1px] w-12 bg-[var(--color-f1-red)]" />
              <span className="font-mono text-white/50 uppercase tracking-widest text-sm">Lead Driver & Security Eng</span>
            </div>
            
            <h1 className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tight mb-6">
              <span className="glitch-text" data-text="Yuvraj">Yuvraj</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                Deshmukh
              </span>
            </h1>
            
            <p className="font-mono text-white/70 max-w-md mb-8 leading-relaxed border-l-2 border-[var(--color-f1-red)] pl-4">
              Full-stack engineer engineered for high performance. Merging the speed of F1 telemetry with the precision of modern cybersecurity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/yyyuvvvraj" 
                target="_blank" 
                rel="noreferrer"
                className="f1-skew bg-white text-black px-8 py-4 hover:bg-[var(--color-f1-red)] hover:text-white transition-all duration-300 group text-center cyber-border"
              >
                <div className="f1-skew-reverse flex items-center justify-center gap-2 font-display uppercase tracking-wider">
                  <Github className="w-5 h-5" />
                  <span>GitHub_Access</span>
                </div>
              </a>
              <a 
                href="https://linkedin.com/in/yuvraj-rajni-sachin-deshmukh-116627283/" 
                target="_blank" 
                rel="noreferrer"
                className="f1-skew border border-[var(--color-neon-blue)]/50 px-8 py-4 hover:bg-[var(--color-neon-blue)]/10 hover:border-[var(--color-neon-blue)] transition-all duration-300 text-center"
              >
                <div className="f1-skew-reverse flex items-center justify-center gap-2 font-display uppercase tracking-wider text-[var(--color-neon-blue)]">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn_Node</span>
                </div>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden md:flex flex-col items-center justify-center gap-8"
          >
            <Terminal />
            
            <div className="aspect-square w-64 rounded-full border border-[var(--color-neon-blue)]/20 relative flex items-center justify-center mt-4">
              <div className="absolute inset-2 rounded-full border border-dashed border-[var(--color-f1-red)]/40 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-[var(--color-neon-blue)]/30" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-f1-red)]/5 to-[var(--color-neon-blue)]/5 rounded-full" />
              <div className="text-center relative z-10">
                <ShieldAlert className="w-12 h-12 mx-auto text-[var(--color-f1-red)] mb-2 opacity-80" />
                <div className="font-mono text-[var(--color-neon-blue)] text-xs bg-[var(--color-carbon)] px-3 py-1 border border-[var(--color-neon-blue)]/30">SYS: SECURE</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-f1-red)]/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Skills / Telemetry */}
      <section id="telemetry" className="py-32 bg-[var(--color-asphalt)] relative border-y border-[var(--color-f1-red)]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <Radio className="w-8 h-8 text-[var(--color-neon-blue)] animate-pulse" />
            <h2 className="font-display text-5xl uppercase tracking-wide">Telemetry & Threat Detection</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <TyreCard type="RED" color="#E10600" title="Offensive / Frontend" skills={["React", "Next.js", "Tailwind", "Pen Testing"]} desc="Aggressive grip for fast UI and vulnerability exploitation." />
            <TyreCard type="PURPLE" color="#B026FF" title="Full-Stack / API" skills={["Node.js", "Express", "GraphQL", "AppSec"]} desc="Balanced performance bridging the gap between systems." />
            <TyreCard type="BLUE" color="#00D2BE" title="Defensive / DevOps" skills={["Docker", "AWS", "Cryptography", "Zero Trust"]} desc="Durable infrastructure and hardened security postures." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard label="ENCRYPTION" value="256" unit="bit" desc="AES Standard" color="var(--color-neon-blue)" />
            <MetricCard label="LATENCY" value="12" unit="ms" desc="Network Ping" color="var(--color-f1-red)" />
            <MetricCard label="UPTIME" value="99.9" unit="%" desc="System Reliability" color="var(--color-papaya)" />
            <MetricCard label="BREACHES" value="0" unit="" desc="Incidents Detected" color="var(--color-neon-blue)" />
          </div>
        </div>
      </section>

      {/* Experience / Race Calendar */}
      <section id="calendar" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <TerminalIcon className="w-8 h-8 text-[var(--color-f1-red)]" />
            <h2 className="font-display text-5xl uppercase tracking-wide">Operation Logs</h2>
          </div>

          <div className="relative border-l-2 border-[var(--color-f1-red)]/30 ml-4 md:ml-0 md:border-none">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[var(--color-f1-red)]/30" />
            
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
        </div>
      </section>

      {/* Projects / Track Record */}
      <section id="track-record" className="py-32 bg-[var(--color-asphalt)] relative border-y border-[var(--color-f1-red)]/20">
        <div className="absolute top-10 right-10 md:right-20 border-2 border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] px-4 py-1 font-display text-xl md:text-2xl uppercase tracking-widest f1-skew animate-pulse bg-[var(--color-neon-blue)]/10 backdrop-blur-sm z-20 shadow-[0_0_15px_rgba(0,210,190,0.4)]">
          DRS ZONE ENABLED
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <Binary className="w-8 h-8 text-[var(--color-neon-blue)]" />
            <h2 className="font-display text-5xl uppercase tracking-wide">Exploits & Engineering</h2>
          </div>
          
          <div className="space-y-12 relative z-10">
            <ProjectRow 
              position="0x01"
              title="Cadence (Capstone)"
              tech="TypeScript, React, Node.js, Full-Stack"
              time="DEPLOYED"
              desc="A comprehensive full-stack application serving as a capstone project. Engineered with a robust backend architecture and an interactive frontend interface."
              link="https://github.com/yyyuvvvraj/Cadence"
              badge={
                <div className="bg-[var(--color-papaya)] text-black font-display text-xs px-3 py-1 f1-skew shadow-[0_0_10px_var(--color-papaya)]">
                  <div className="f1-skew-reverse flex items-center gap-1">
                    <Timer className="w-3 h-3" /> FASTEST LAP
                  </div>
                </div>
              }
            />
            <ProjectRow 
              position="0x02"
              title="AdditiveCurriculum"
              tech="TypeScript, React, EdTech"
              time="ACTIVE"
              desc="An innovative educational platform for building and managing additive curriculums, enhancing learning progression and tracking."
              link="https://github.com/yyyuvvvraj/AdditiveCurriculum"
            />
            <ProjectRow 
              position="0x03"
              title="Zenith"
              tech="TypeScript, Web UI, Performance"
              time="STABLE"
              desc="A high-performance web application built with modern web technologies, focusing on optimal user experience and secure data handling."
              link="https://github.com/yyyuvvvraj/zenith"
            />
          </div>
        </div>
      </section>

      {/* Classified Research */}
      <section id="research" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <Activity className="w-8 h-8 text-[var(--color-papaya)]" />
            <h2 className="font-display text-5xl uppercase tracking-wide">Classified Research</h2>
          </div>
          
          <div className="border border-[var(--color-papaya)]/30 bg-[var(--color-papaya)]/5 p-8 md:p-12 relative overflow-hidden cyber-border group hover:border-[var(--color-papaya)] transition-colors duration-500">
            <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-papaya)]/10 blur-3xl rounded-full group-hover:bg-[var(--color-papaya)]/20 transition-colors duration-500" />
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-24 bg-[var(--color-papaya)] group-hover:h-32 transition-all duration-500" />
            
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs bg-[var(--color-papaya)]/20 text-[var(--color-papaya)] px-3 py-1 border border-[var(--color-papaya)]/30 uppercase tracking-widest">
                Published Intel
              </span>
              <span className="font-mono text-xs text-white/40">STATUS: DECLASSIFIED</span>
            </div>
            
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide mb-4 text-white leading-tight">
              Enhanced Alpha-Beta Pruning and Evaluation Function Optimization for Intelligent Pac-Man AI Agents
            </h3>
            
            <div className="font-mono text-[var(--color-neon-blue)] text-sm mb-6 flex flex-col gap-1 border-l-2 border-[var(--color-neon-blue)] pl-4">
              <span>CONFERENCE: ICASS-2026 (IEEE)</span>
              <span>LOCATION: Manav Rachna University</span>
              <span>AFFILIATION: NIIT University</span>
            </div>
            
            <p className="font-mono text-sm md:text-base text-white/70 leading-relaxed mb-6 max-w-3xl">
              This research focuses on improving decision-making efficiency in adversarial game environments. By optimizing traditional Alpha-Beta Pruning to reduce unnecessary node expansions and designing an improved heuristic evaluation function tailored for dynamic environments, the study achieves significantly better real-time performance in multi-agent adversarial scenarios.
            </p>

            <div className="font-mono text-xs text-white/40 mb-8 max-w-3xl">
              IMPLICATIONS: Search optimization in robotics, autonomous systems, and real-time decision engines.<br/>
              MENTIONS: Dr. Shweta Malwe, Prof. Prachi Mehta.
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center gap-2 font-display uppercase tracking-wider text-[var(--color-papaya)] hover:text-white transition-colors border-b border-[var(--color-papaya)]/30 hover:border-white pb-1"
            >
              <TerminalIcon className="w-4 h-4" />
              Access Full Document
            </a>
          </div>
        </div>
      </section>

      {/* Contact / Pit Stop */}
      <section id="pit-stop" className="py-32 bg-[var(--color-carbon)] text-white relative overflow-hidden border-t border-[var(--color-f1-red)]/50">
        <div className="absolute inset-0 opacity-5 telemetry-grid" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Cpu className="w-16 h-16 mx-auto mb-8 text-[var(--color-f1-red)] animate-pulse" />
          <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-6 glitch-text" data-text="SECURE CHANNEL">SECURE CHANNEL</h2>
          <p className="font-mono text-xl mb-12 text-white/70">
            [!] Connection encrypted. Ready to transmit coordinates for the next stint.
          </p>
          
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="group relative inline-flex items-center justify-center bg-[var(--color-f1-red)] text-white px-12 py-6 transition-all duration-300 cyber-border shadow-[0_0_20px_rgba(225,6,0,0.4)] mb-12 overflow-hidden"
          >
            <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <div className="relative z-10 flex items-center justify-center gap-3 font-display text-2xl uppercase tracking-wider group-hover:text-[var(--color-f1-red)] transition-colors duration-300">
              <Lock className="w-6 h-6" />
              <span>INITIATE_HANDSHAKE</span>
            </div>
          </button>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 border-t border-white/10 pt-12">
            <a href="https://linkedin.com/in/yuvraj-rajni-sachin-deshmukh-116627283/" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-lg text-white/70 hover:text-[var(--color-neon-blue)] transition-colors group">
              <div className="p-3 border border-white/10 group-hover:border-[var(--color-neon-blue)]/50 bg-white/5 group-hover:bg-[var(--color-neon-blue)]/10 transition-colors">
                <Linkedin className="w-6 h-6" />
              </div>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/yyyuvvvraj" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-lg text-white/70 hover:text-white transition-colors group">
              <div className="p-3 border border-white/10 group-hover:border-white/50 bg-white/5 group-hover:bg-white/10 transition-colors">
                <Github className="w-6 h-6" />
              </div>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--color-carbon)] border-2 border-[var(--color-f1-red)] max-w-md w-full cyber-border shadow-[0_0_30px_rgba(225,6,0,0.3)] relative overflow-hidden"
            >
              {/* Checkered Flag Header */}
              <div className="h-4 w-full checkered-pattern opacity-50" />
              
              <div className="p-8">
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="absolute top-8 right-6 text-white/50 hover:text-white transition-colors bg-black/50 p-1 rounded"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--color-f1-red)]/30 pb-4">
                  <Radio className="w-6 h-6 text-[var(--color-f1-red)] animate-pulse" />
                  <h3 className="font-display text-2xl uppercase tracking-widest text-white">Secure Comms Link</h3>
                </div>

                <div className="space-y-6 font-mono">
                  <div className="group">
                    <div className="text-[10px] text-[var(--color-f1-red)] tracking-widest mb-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--color-f1-red)] rounded-full animate-pulse" />
                      DIRECT_LINE (PHONE)
                    </div>
                    <div className="text-xl text-white flex items-center justify-between border border-white/10 bg-white/5 p-3 group-hover:border-[var(--color-f1-red)]/50 transition-colors relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-f1-red)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 tracking-wider">8668488303</span>
                      <Phone className="w-5 h-5 text-white/30 group-hover:text-[var(--color-f1-red)] relative z-10" />
                    </div>
                  </div>

                  <div className="group">
                    <div className="text-[10px] text-[var(--color-f1-red)] tracking-widest mb-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--color-f1-red)] rounded-full animate-pulse" />
                      ENCRYPTED_MAIL (EMAIL)
                    </div>
                    <div className="text-xl text-white flex items-center justify-between border border-white/10 bg-white/5 p-3 group-hover:border-[var(--color-f1-red)]/50 transition-colors relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-f1-red)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm sm:text-base relative z-10 tracking-wider">yuvraj280605@gmail.com</span>
                      <Mail className="w-5 h-5 text-white/30 group-hover:text-[var(--color-f1-red)] relative z-10" />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <div className="text-xs text-center text-[var(--color-neon-blue)] uppercase tracking-widest flex items-center justify-center gap-2 bg-[var(--color-neon-blue)]/10 p-2 border border-[var(--color-neon-blue)]/30">
                      <ShieldAlert className="w-4 h-4" />
                      End-to-End Encrypted
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Checkered Flag Footer */}
              <div className="h-2 w-full checkered-pattern opacity-30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center font-mono text-xs text-white/40 bg-black">
        <p>SYSTEM_ID: YD_2026 | STATUS: ONLINE | ENCRYPTION: ACTIVE</p>
        <p className="mt-2 text-white/20">© {new Date().getFullYear()} Yuvraj Deshmukh. Engineered with precision.</p>
      </footer>

      <Chatbot />
    </div>
  );
}

function TyreCard({ type, color, title, skills, desc }: { type: string, color: string, title: string, skills: string[], desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[var(--color-carbon)] border border-white/10 p-8 relative overflow-hidden group flex flex-col items-center text-center cyber-border"
    >
      <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
      
      <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mb-6 relative shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ borderColor: color, boxShadow: `0 0 15px ${color}40` }}>
        <div className="absolute inset-1 rounded-full border border-white/20" />
        <span className="font-display text-2xl" style={{ color }}>{type[0]}</span>
      </div>
      
      <h3 className="font-display text-2xl uppercase tracking-wide mb-2">{title}</h3>
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
    <div className="border border-white/10 p-6 bg-[var(--color-carbon)] relative overflow-hidden group hover:border-[var(--color-f1-red)]/30 transition-colors duration-300">
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
        <div className="font-mono text-[var(--color-f1-red)] text-xs tracking-widest mb-1 bg-[var(--color-f1-red)]/10 px-2 py-1 border border-[var(--color-f1-red)]/20 inline-block relative overflow-hidden">
          <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          <span className="relative z-10">{round}</span>
        </div>
        <h3 className="font-display text-3xl uppercase tracking-wide mb-1 mt-2 group-hover:text-[var(--color-f1-red)] transition-colors duration-300">{role}</h3>
        <div className="font-mono text-[var(--color-neon-blue)] text-sm mb-4">{company}</div>
        <p className={`font-mono text-sm text-white/60 ${isLeft ? 'text-left' : 'md:text-right text-left'}`}>
          {desc}
        </p>
      </div>
      
      <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-[var(--color-f1-red)] rounded-full border-2 border-[var(--color-carbon)] z-10 shadow-[0_0_10px_var(--color-f1-red)]" />
      
      <div className={`md:w-1/2 flex ${isLeft ? 'md:justify-end pr-8 md:pr-12' : 'md:justify-start pl-8 md:pl-12'} w-full pl-8 mt-2 md:mt-0`}>
        <div className="font-mono text-sm text-white/30 border-b border-white/10 pb-1">{date}</div>
      </div>
    </motion.div>
  );
}

function ProjectRow({ position, title, tech, time, desc, link, badge }: { position: string, title: string, tech: string, time: string, desc: string, link?: string, badge?: ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group border border-white/5 bg-white/[0.02] p-6 hover:border-[var(--color-neon-blue)]/50 hover:bg-[var(--color-neon-blue)]/5 transition-all duration-300 cyber-border relative overflow-hidden"
    >
      {badge && (
        <div className="absolute -top-3 -right-3 z-30">
          {badge}
        </div>
      )}
      <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
      <div className="absolute left-0 top-0 w-1 h-full bg-[var(--color-f1-red)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
      
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="absolute inset-0 z-10" aria-label={`View ${title} on GitHub`} />
      )}
      <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-20 pointer-events-none">
        <div className="font-mono text-2xl text-[var(--color-f1-red)] group-hover:text-[var(--color-neon-blue)] transition-colors w-16">
          {position}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-3xl uppercase tracking-wide mb-2">{title}</h3>
          <p className="font-mono text-sm text-white/50 mb-4">{desc}</p>
          <div className="flex flex-wrap gap-2 pointer-events-auto">
            {tech.split(', ').map(t => (
              <span key={t} className="font-mono text-[10px] px-2 py-1 bg-black/50 border border-white/10 text-[var(--color-neon-blue)] uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="font-mono text-sm text-[var(--color-f1-red)] hidden md:flex items-center gap-2 border border-[var(--color-f1-red)]/30 px-3 py-1 bg-[var(--color-f1-red)]/10">
          <Lock className="w-3 h-3" /> {time}
        </div>
      </div>
    </motion.div>
  );
}
