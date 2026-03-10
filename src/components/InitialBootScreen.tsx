import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Fingerprint, Lock, ShieldCheck } from "lucide-react";
import { audioSystem } from "../utils/audio";

type BootPhase = 'DECRYPT' | 'SCAN' | 'LOGS';

export default function InitialBootScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<BootPhase>('DECRYPT');
  const [lines, setLines] = useState<string[]>([]);
  const [decryptText, setDecryptText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs
  useEffect(() => {
    if (containerRef.current && phase === 'LOGS') {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, phase]);

  // Phase 1: Decryption Matrix
  useEffect(() => {
    if (phase !== 'DECRYPT') return;

    let iterations = 0;
    const maxIterations = 20;
    const finalString = "INITIALIZING CORE SYSTEMS...";
    
    const interval = setInterval(() => {
      setDecryptText(
        finalString.split("")
          .map((char, index) => {
            if (index < iterations) {
              return finalString[index];
            }
            return String.fromCharCode(33 + Math.floor(Math.random() * 94));
          })
          .join("")
      );

      if (iterations >= finalString.length) {
        clearInterval(interval);
        setTimeout(() => setPhase('SCAN'), 500);
      }
      iterations += 1/2; // speed
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase 2: Biometric Scan
  useEffect(() => {
    if (phase !== 'SCAN') return;
    
    const timeout1 = setTimeout(() => {
       audioSystem.playSuccessBeep(); 
    }, 1500);

    const timeout2 = setTimeout(() => setPhase('LOGS'), 2000);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    }
  }, [phase]);

  // Phase 3: System Logs
  useEffect(() => {
    if (phase !== 'LOGS') return;

    const bootSequence = [
      "[    0.000000] Linux version 6.8.0-f1-generic (yuvraj@ubuntu) (gcc (Ubuntu 13.2.0-23ubuntu4) 13.2.0, GNU ld 2.42)",
      "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.8.0-f1 root=UUID=1a2b3c4d ro quiet splash",
      "[    0.143212] secureboot: Secure boot enabled",
      "[    0.342111] smpboot: CPU0: Intel(R) Core(TM) i9-14900KS (family: 0x6, model: 0xb7, stepping: 0x1)",
      "[    1.523412] Loading F1 Telemetry Engine modules... [OK]",
      "[    1.611111] Initialize CyberSec Defensive protocols... [OK]",
      "[    2.100133] Mount encrypted volumes.................. [OK]",
      "[    2.422211] [SECURE] Validating user profile: YUVRAJ DESHMUKH",
      "[    2.833132] [SECURE] Profile validation passed.",
      "[    3.011244] Starting GUI Interface System...",
    ];

    let currentStep = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const interval = setInterval(() => {
      if (currentStep < bootSequence.length) {
        const line = bootSequence[currentStep];
        if (line) {
          setLines(prev => [...prev, line]);
          // Optional subtle click for log append if not mutated
          // audioSystem.playTypingSound(); 
        }
        currentStep++;
      } else {
        clearInterval(interval);
        audioSystem.playSuccessBeep();
        timeoutId = setTimeout(onComplete, 800); 
      }
    }, 150);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono text-sm text-gray-300 p-8 overflow-hidden">
      
      {/* Background Matrix/Scanlines */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <AnimatePresence mode="wait">
        {phase === 'DECRYPT' && (
          <motion.div
            key="decrypt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="text-center"
          >
            <Lock className="w-16 h-16 mx-auto mb-6 text-[#E95420] animate-pulse" />
            <div className="text-2xl tracking-widest text-white/80 font-bold glitch-text" data-text={decryptText}>
              {decryptText}
            </div>
            <div className="mt-4 text-xs text-[#E95420] animate-pulse">OVERRIDING MAINFRAME ENCRYPTION...</div>
          </motion.div>
        )}

        {phase === 'SCAN' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative mb-8">
              <Fingerprint className="w-32 h-32 text-[#3a80ca] opacity-20" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3a80ca]/50 to-transparent"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                style={{ height: '50%' }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <ShieldCheck className="w-16 h-16 text-[#87d23f] bg-black rounded-full" />
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0] }}
              transition={{ delay: 1 }}
              className="text-[#3a80ca] tracking-widest text-xl mb-2"
            >
              AWAITING BIOMETRIC INPUT
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[#87d23f] tracking-widest text-xl font-bold"
            >
              IDENTITY CONFIRMED
            </motion.div>
          </motion.div>
        )}

        {phase === 'LOGS' && (
          <motion.div
            key="logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col justify-between max-w-5xl"
          >
            <div ref={containerRef} className="overflow-y-auto w-full text-left font-mono tracking-tight whitespace-pre-wrap leading-relaxed">
              {lines.map((l, i) => (
                <div key={i} className={l && l.includes("[OK]") ? "text-[#87d23f]" : (l && l.includes("[SECURE]") ? "text-[#3a80ca] font-bold" : "")}>
                  {l}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={onComplete} 
          className="text-[#E95420] hover:text-white underline uppercase text-xs tracking-widest border border-transparent hover:border-[#E95420] p-2 transition-colors bg-black/50 backdrop-blur-sm"
        >
          [SKIP_BOOT_SEQUENCE]
        </button>
      </div>
    </div>
  );
}
