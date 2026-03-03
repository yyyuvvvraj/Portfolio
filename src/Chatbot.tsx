import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, X, Send, ShieldAlert, Flag, MessageSquare } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "SYS_ONLINE. RACE_ENGINEER AI active. Awaiting telemetry queries." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are RACE_ENGINEER, an AI assistant for Yuvraj Deshmukh's portfolio. 
          Yuvraj is a Full-Stack & Security Engineer at NIIT University. His projects include Cadence, AdditiveCurriculum, and Zenith. 
          He published a paper on AI Game Tree Optimization (Pac-Man AI) at ICASS-2026 (IEEE). 
          Respond in a concise, slightly robotic, cyberpunk/F1 engineer persona. Use terms like "telemetry", "encrypted", "pit wall", "sector clear". 
          Keep responses under 3 sentences.`,
        },
      });

      setMessages(prev => [...prev, { role: "ai", text: response.text || "NO_DATA_RECEIVED" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "ai", text: "ERR: CONNECTION_LOST. UNABLE TO REACH PIT WALL." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* F1-Styled Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-[9999] w-16 h-16 rounded-full bg-[var(--color-f1-red)] text-white shadow-[0_0_30px_rgba(225,6,0,0.8)] flex items-center justify-center group cyber-border cursor-pointer"
            style={{ position: 'fixed' }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-50" />
            <MessageSquare className="w-7 h-7 absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-50" />
            <Flag className="w-7 h-7 absolute opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Compact Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originBottom: true, originRight: true }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[9999] w-[320px] h-[450px] bg-[#0a0a0a] border border-[var(--color-f1-red)]/50 flex flex-col shadow-[0_10px_50px_rgba(0,0,0,0.9)] cyber-border"
            style={{ position: 'fixed' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-[var(--color-f1-red)]/30 bg-[var(--color-f1-red)]/10">
              <div className="flex items-center gap-2 text-[var(--color-f1-red)]">
                <Flag className="w-4 h-4" />
                <span className="font-display text-sm tracking-widest uppercase">Race_Engineer</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-[10px] scanlines relative">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-2 border ${
                    msg.role === "user" 
                      ? "bg-white/10 border-white/20 text-white" 
                      : "bg-[var(--color-f1-red)]/10 border-[var(--color-f1-red)]/30 text-[var(--color-f1-red)]"
                  }`}>
                    {msg.role === "ai" && <span className="opacity-50 block mb-1">SYS:</span>}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-2 border bg-[var(--color-f1-red)]/10 border-[var(--color-f1-red)]/30 text-[var(--color-f1-red)] flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 animate-spin" />
                    <span>DECRYPTING...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2 border-t border-[var(--color-f1-red)]/30 bg-black">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1">
                <span className="text-[var(--color-f1-red)] font-mono text-xs pl-2">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="CMD..."
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[10px] placeholder:text-white/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-1.5 text-[var(--color-f1-red)] hover:bg-[var(--color-f1-red)]/20 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
