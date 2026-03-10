import { motion } from "motion/react";
import { Cpu, Lock, Radio, Phone, Mail, ShieldAlert, Github, Linkedin, Flame, Trophy } from "lucide-react";

export default function Contact() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      
      <Cpu className="w-20 h-20 mx-auto mb-8 text-[#E95420] animate-pulse drop-shadow-[0_0_15px_rgba(233,84,32,0.8)]" />
      <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-4 glitch-text text-white" data-text="SECURE CHANNEL">SECURE CHANNEL</h2>

      {/* RBR Pit Wall Radio Banner */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <div className="flex items-center gap-0 overflow-hidden">
          <div className="h-[3px] w-8 bg-[#001F5B]" />
          <div className="h-[3px] w-3 bg-[#E10600]" />
          <div className="h-[3px] w-2 bg-[#FFD700]" />
        </div>
        <div className="f1-skew bg-[#001F5B]/60 border border-[#FFD700]/40 px-4 py-1">
          <div className="f1-skew-reverse flex items-center gap-2">
            <Flame className="w-3 h-3 text-[#E10600]" />
            <span className="font-display text-[#FFD700] text-xs tracking-widest">RBR PIT WALL — COMMS OPEN</span>
            <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-0 overflow-hidden">
          <div className="h-[3px] w-2 bg-[#FFD700]" />
          <div className="h-[3px] w-3 bg-[#E10600]" />
          <div className="h-[3px] w-8 bg-[#001F5B]" />
        </div>
      </motion.div>
      
      <p className="font-mono text-xl mb-12 text-white/70 bg-black/40 px-6 py-3 border border-white/10 cyber-border">
        [!] Connection encrypted. Ready to transmit coordinates for the next stint.
      </p>

      <div className="w-full max-w-2xl bg-[#300a24]/90 backdrop-blur-md border border-[#5e2750] shadow-[0_0_40px_rgba(0,0,0,0.8)] relative rounded-xl overflow-hidden mb-16">
        <div className="flex items-center justify-between bg-black/60 border-b border-white/10 p-2">
           <div className="text-sm font-ubuntu text-gray-300 ml-2 tracking-wide font-bold">Secure_Comms.exe</div>
           <div className="flex gap-1.5 object-right mr-1">
             <div className="w-3 h-3 rounded-full bg-[#ef6464]"></div>
             <div className="w-3 h-3 rounded-full bg-[#f1ba4f]"></div>
             <div className="w-3 h-3 rounded-full bg-[#73c54a]"></div>
           </div>
        </div>
        
        <div className="p-8 text-left">
          <div className="flex items-center gap-3 mb-8 border-b border-[#E95420]/30 pb-4">
            <Radio className="w-6 h-6 text-[#E95420] animate-pulse" />
            <h3 className="font-display text-2xl uppercase tracking-widest text-white">Direct Comm Link</h3>
          </div>

          <div className="space-y-6 font-mono">
            <div className="group">
              <div className="text-[10px] text-[#E95420] tracking-widest mb-1 flex items-center gap-2 font-bold">
                <div className="w-1.5 h-1.5 bg-[#E95420] rounded-full animate-pulse shadow-[0_0_5px_#E95420]" />
                DIRECT_LINE (PHONE)
              </div>
              <div className="text-xl text-white flex items-center justify-between border border-white/10 bg-black/40 p-4 group-hover:border-[#E95420]/70 transition-colors relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E95420]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 tracking-wider">8668488303</span>
                <Phone className="w-6 h-6 text-white/30 group-hover:text-[#E95420] relative z-10 transition-colors" />
              </div>
            </div>

            <div className="group">
              <div className="text-[10px] text-[#E95420] tracking-widest mb-1 flex items-center gap-2 font-bold">
                <div className="w-1.5 h-1.5 bg-[#E95420] rounded-full animate-pulse shadow-[0_0_5px_#E95420]" />
                ENCRYPTED_MAIL (EMAIL)
              </div>
              <div className="text-xl text-white flex items-center justify-between border border-white/10 bg-black/40 p-4 group-hover:border-[#E95420]/70 transition-colors relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E95420]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm sm:text-base relative z-10 tracking-wider">yuvraj280605@gmail.com</span>
                <Mail className="w-6 h-6 text-white/30 group-hover:text-[#E95420] relative z-10 transition-colors" />
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <div className="text-xs text-center text-[var(--color-neon-blue)] uppercase tracking-widest flex items-center justify-center gap-2 bg-[var(--color-neon-blue)]/10 p-3 border border-[var(--color-neon-blue)]/30 font-bold shadow-[0_0_15px_rgba(0,210,190,0.2)]">
                <ShieldAlert className="w-5 h-5" />
                End-to-End Encrypted Handshake Established
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
        <a href="https://linkedin.com/in/yuvraj-rajni-sachin-deshmukh-116627283/" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-lg text-white/70 hover:text-[var(--color-neon-blue)] transition-colors group">
          <div className="p-3 border border-white/10 group-hover:border-[var(--color-neon-blue)]/50 bg-black/40 group-hover:bg-[var(--color-neon-blue)]/10 transition-colors shadow-lg">
            <Linkedin className="w-6 h-6" />
          </div>
          <span>LinkedIn_Node</span>
        </a>
        <a href="https://github.com/yyyuvvvraj" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-lg text-white/70 hover:text-white transition-colors group">
          <div className="p-3 border border-white/10 group-hover:border-white/50 bg-black/40 group-hover:bg-white/10 transition-colors shadow-lg">
            <Github className="w-6 h-6" />
          </div>
          <span>GitHub_Access</span>
        </a>
      </div>

      {/* RBR Fan Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2 text-[#FFD700]/40 hover:text-[#FFD700]/80 transition-colors">
          <Trophy className="w-4 h-4" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Max Verstappen fan since 2018 · Oracle Red Bull Racing · #1</span>
          <Trophy className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-0">
          <div className="h-[2px] w-12 bg-[#001F5B]/60" />
          <div className="h-[2px] w-4 bg-[#E10600]/60" />
          <div className="h-[2px] w-2 bg-[#FFD700]/60" />
        </div>
      </motion.div>

    </div>
  );
}
