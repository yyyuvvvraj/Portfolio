import { motion } from "motion/react";
import { Binary, Lock, Timer } from "lucide-react";
import { useState, type ReactNode } from "react";
import BrowserWindow from "../components/BrowserWindow";

function ProjectRow({ position, title, tech, time, desc, link, badge, onClick }: { position: string, title: string, tech: string, time: string, desc: string, link?: string, badge?: ReactNode, onClick?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
        <button onClick={onClick} className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none" aria-label={`View ${title}`} />
      )}
      <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-20 pointer-events-none">
        <div className="font-mono text-2xl text-[var(--color-f1-red)] group-hover:text-[var(--color-neon-blue)] transition-colors w-16">
          {position}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-3xl uppercase tracking-wide mb-2 text-white">{title}</h3>
          <p className="font-mono text-sm text-white/50 mb-4">{desc}</p>
          <div className="flex flex-wrap gap-2 pointer-events-auto">
            {tech.split(', ').map(t => (
              <span key={t} className="font-mono text-[10px] px-2 py-1 bg-black/50 border border-white/10 text-[var(--color-neon-blue)] uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="font-mono text-sm text-[var(--color-f1-red)] hidden md:flex items-center gap-2 border border-[var(--color-f1-red)]/30 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(225,6,0,0.2)]">
          <Lock className="w-3 h-3" /> {time}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProjectUrl, setSelectedProjectUrl] = useState<string | null>(null);

  return (
    <BrowserWindow 
      url={selectedProjectUrl || "https://yuvraj.dev/projects"} 
      onBack={selectedProjectUrl ? () => setSelectedProjectUrl(null) : undefined}
    >
      {selectedProjectUrl ? (
        <div className="w-full h-full bg-[#1e1e1e]">
          <iframe 
            src={selectedProjectUrl} 
            title="Project Viewer" 
            className="w-full h-full border-none bg-white"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      ) : (
        <div className="py-16 px-6 max-w-7xl mx-auto relative min-h-full">
          <div className="absolute top-10 right-10 md:right-20 border-2 border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] px-4 py-1 font-display text-xl md:text-2xl uppercase tracking-widest f1-skew animate-pulse bg-[var(--color-neon-blue)]/10 backdrop-blur-sm z-20 shadow-[0_0_15px_rgba(0,210,190,0.4)]">
            DRS ZONE ENABLED
          </div>
          
          <div className="flex items-center gap-4 mb-16">
            <Binary className="w-8 h-8 text-[var(--color-neon-blue)]" />
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-gray-800 mix-blend-difference">Exploits & Engineering</h2>
          </div>
          
          <div className="space-y-12 relative z-10">
          <ProjectRow 
            position="0x01"
            title="Cadence (Capstone)"
            tech="TypeScript, React, Node.js, Full-Stack"
            time="DEPLOYED"
            desc="A comprehensive full-stack application serving as a capstone project. Engineered with a robust backend architecture and an interactive frontend interface."
            link="https://github.com/yyyuvvvraj/Cadence"
            onClick={() => setSelectedProjectUrl("https://github.com/yyyuvvvraj/Cadence")}
            badge={
              <div className="bg-[#FF8700] text-black font-display text-xs px-3 py-1 f1-skew shadow-[0_0_10px_#FF8700]">
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
            onClick={() => setSelectedProjectUrl("https://github.com/yyyuvvvraj/AdditiveCurriculum")}
          />
          <ProjectRow 
            position="0x03"
            title="Zenith"
            tech="TypeScript, Web UI, Performance"
            time="STABLE"
            desc="A high-performance web application built with modern web technologies, focusing on optimal user experience and secure data handling."
            link="https://github.com/yyyuvvvraj/zenith"
            onClick={() => setSelectedProjectUrl("https://github.com/yyyuvvvraj/zenith")}
          />
        </div>
      </div>
      )}
    </BrowserWindow>
  );
}
