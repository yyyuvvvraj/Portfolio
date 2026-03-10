import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { Github, Linkedin, ShieldAlert, Flame, Download } from "lucide-react";
import Terminal from "../components/Terminal";
import F1CarScene from "../components/F1CarScene";

function StartingLights() {
  return (
    <div className="flex gap-4 mb-8 bg-[#151515] p-4 rounded-xl border-t-4 border-black shadow-2xl w-fit cyber-border">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="w-6 h-6 rounded-full bg-[#222] border-2 border-black shadow-inner relative">
            <div className={`absolute inset-0 rounded-full bg-[#E95420] f1-light-${i}`} />
          </div>
          <div className="w-6 h-6 rounded-full bg-[#222] border-2 border-black shadow-inner relative">
            <div className={`absolute inset-0 rounded-full bg-[#E95420] f1-light-${i}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="driver" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16">
      {/* RBR Championship Banner — top right */}
      <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-1 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="f1-skew bg-[#001F5B] border border-[#FFD700]/70 px-3 py-1 shadow-[0_0_20px_rgba(255,215,0,0.25)]"
        >
          <div className="f1-skew-reverse flex items-center gap-2">
            <Flame className="w-3 h-3 text-[#E10600]" />
            <span className="font-display text-[#FFD700] text-xs tracking-widest">ORACLE RED BULL RACING</span>
            <span className="font-display text-white text-base leading-none">#1</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="flex items-center gap-0 origin-right"
        >
          <div className="h-[3px] w-20 bg-[#001F5B]" />
          <div className="h-[3px] w-6 bg-[#E10600]" />
          <div className="h-[3px] w-3 bg-[#FFD700]" />
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <F1CarScene />
      </div>
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-20 telemetry-grid pointer-events-none"
      />
      <div className="absolute top-0 right-0 w-1/3 h-full checkered-pattern opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-32 right-1/4 w-8 h-[150%] bg-[#E95420] opacity-10 f1-skew-reverse pointer-events-none blur-sm" />
      <div className="absolute -top-32 right-[28%] w-2 h-[150%] bg-[#E95420] opacity-20 f1-skew-reverse pointer-events-none blur-[1px]" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col gap-12 pt-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <StartingLights />
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[#E95420] text-lg animate-pulse">● REC</span>
              <div className="h-[1px] w-12 bg-[#E95420]" />
              <span className="font-mono text-white/50 uppercase tracking-widest text-sm">Lead Driver & Security Eng</span>
            </div>
            
            <h1 className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tight mb-6">
              <span className="glitch-text" data-text="Yuvraj">Yuvraj</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                Deshmukh
              </span>
            </h1>
            
            <p className="font-mono text-white/70 max-w-md mb-8 leading-relaxed border-l-2 border-[#E95420] pl-4">
              Full-stack engineer engineered for high performance. Merging the speed of F1 telemetry with the precision of modern cybersecurity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/yyyuvvvraj" 
                target="_blank" 
                rel="noreferrer"
                className="f1-skew bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 hover:bg-[#E95420] hover:text-white transition-all duration-300 group text-center shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-tl-lg rounded-br-lg"
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
              <Link 
                to="/downloads"
                className="f1-skew border border-[#87d23f]/50 bg-[#87d23f]/10 px-8 py-4 hover:bg-[#87d23f] hover:text-black transition-all duration-300 text-center text-[#87d23f] shadow-[0_0_15px_rgba(135,210,63,0.15)] rounded-tr-lg rounded-bl-lg group"
              >
                <div className="f1-skew-reverse flex items-center justify-center gap-2 font-display uppercase tracking-wider group-hover:text-black">
                  <Download className="w-5 h-5" />
                  <span>Extract_Resume</span>
                </div>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden md:flex flex-col items-center justify-center gap-8"
          >
            <div className="aspect-square w-64 rounded-full border border-[var(--color-neon-blue)]/20 relative flex items-center justify-center mt-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-md">
              <div className="absolute inset-2 rounded-full border border-dashed border-[#E95420]/40 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-[var(--color-neon-blue)]/30" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E95420]/5 to-[var(--color-neon-blue)]/5 rounded-full" />
              <div className="text-center relative z-10">
                <ShieldAlert className="w-12 h-12 mx-auto text-[#E95420] mb-2 opacity-80" />
                <div className="font-mono text-[var(--color-neon-blue)] text-xs bg-[var(--color-carbon)] px-3 py-1 border border-[var(--color-neon-blue)]/30 shadow-[0_0_10px_var(--color-neon-blue)]">SYS: SECURE</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Terminal Full Width Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full mt-4"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
