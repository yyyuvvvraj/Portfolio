import { motion } from "motion/react";
import { Download } from "lucide-react";
import BrowserWindow from "../components/BrowserWindow";
import Terminal from "../components/Terminal";

export default function Downloads() {
  return (
    <BrowserWindow url="https://yuvraj.dev/downloads" title="Downloads - Yuvraj Deshmukh">
      <div className="min-h-full bg-[#0a0a0f] relative overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
        {/* Background grids and patterns */}
        <div className="absolute inset-0 telemetry-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full checkered-pattern opacity-[0.02] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-4xl flex flex-col gap-8"
        >
          {/* Header section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-black/40 backdrop-blur-md p-8 border border-white/10 cyber-border">
            <div className="p-4 bg-[#E10600]/10 rounded-full border border-[#E10600]/30 shadow-[0_0_20px_rgba(225, 6, 0,0.2)]">
              <Download className="w-10 h-10 text-[#E10600]" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-widest text-white mb-2">
                Secure File Transfer
              </h2>
              <p className="font-mono text-white/50 text-sm max-w-lg leading-relaxed">
                Welcome to the secure download portal. Direct HTTP downloads are disabled. 
                You must interface with the terminal node below to extract the payloads.
              </p>
            </div>
          </div>

          {/* Instruction Panel */}
          <div className="bg-[#001F5B]/20 border-l-4 border-[#FFD700] p-6 shadow-[0_0_15px_rgba(0,31,91,0.3)]">
            <h3 className="font-mono text-[#FFD700] font-bold mb-2 uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FFD700] animate-pulse"></span>
              Mission Objective
            </h3>
            <p className="font-mono text-white/70 text-sm">
              Extract the engineer's resume by executing the <code className="bg-black/50 text-[#87d23f] px-2 py-1 mx-1 rounded">get-resume</code> command in the subsystem terminal.
            </p>
          </div>

          {/* Terminal container */}
          <div className="w-full mt-4">
             <Terminal />
          </div>
        </motion.div>
      </div>
    </BrowserWindow>
  );
}
