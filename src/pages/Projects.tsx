import { motion, AnimatePresence } from "motion/react";
import { Binary, ExternalLink, Trophy, Zap, Github, Globe, ArrowLeft, Star } from "lucide-react";
import { useState, type ReactNode } from "react";
import BrowserWindow from "../components/BrowserWindow";

interface Project {
  position: string;
  title: string;
  tech: string[];
  time: string;
  desc: string;
  longDesc: string;
  github: string;
  live?: string;
  badge?: ReactNode;
  isMajor?: boolean;
  highlights?: string[];
}

const PROJECTS: Project[] = [
  {
    position: "0x00",
    title: "Mini AirBnB",
    tech: ["JavaScript", "Node.js", "MongoDB", "Express", "EJS"],
    time: "MAJOR PROJECT",
    isMajor: true,
    desc: "Full-stack accommodation booking platform inspired by AirBnB.",
    longDesc:
      "A complete full-stack accommodation platform built from scratch — featuring user authentication with Passport.js, real CRUD listings with image uploads via Cloudinary, interactive Mapbox maps for listing locations, review & rating system, and a fully responsive EJS-templated UI. Deployed on Render with MongoDB Atlas as the cloud database.",
    github: "https://github.com/yyyuvvvraj/MiniAirBnB",
    live: "https://miniairbnb-ouv9.onrender.com/listings",
    highlights: ["User Auth (Passport.js)", "Cloudinary Image Upload", "Mapbox Integration", "Review System", "Render Deployment"],
    badge: undefined, // set below
  },
  {
    position: "0x01",
    title: "Cadence (Capstone)",
    tech: ["TypeScript", "React", "Node.js", "MongoDB", "Full-Stack"],
    time: "DEPLOYED",
    isMajor: false,
    desc: "Comprehensive full-stack capstone with robust backend and interactive frontend.",
    longDesc:
      "Cadence is a full-stack capstone project engineered with a robust Node.js/Express backend and a dynamic React frontend. It features secure RESTful API design, JWT authentication, and a modular architecture separating frontend and backend concerns across two repositories.",
    github: "https://github.com/yyyuvvvraj/Cadence",
    highlights: ["JWT Auth", "RESTful API", "Modular Architecture", "React Frontend", "Express Backend"],
  },
  {
    position: "0x02",
    title: "AdditiveCurriculum",
    tech: ["TypeScript", "React", "EdTech", "Vite"],
    time: "ACTIVE",
    isMajor: false,
    desc: "Innovative educational platform for additive curriculum building and management.",
    longDesc:
      "An innovative EdTech platform for building and managing additive curriculums. Students can track learning progression module by module, with a system that stacks skills additively — each unit building upon the last. Deployed on Vercel with a clean, performance-optimized React + Vite setup.",
    github: "https://github.com/yyyuvvvraj/AdditiveCurriculum",
    live: "https://additive-curriculum.vercel.app/",
    highlights: ["Modular Curriculum Design", "Progress Tracking", "Vercel Deployment", "Vite Build", "TypeScript"],
  },
  {
    position: "0x03",
    title: "Zenith",
    tech: ["TypeScript", "React", "Web UI", "Performance"],
    time: "STABLE",
    isMajor: false,
    desc: "High-performance web application with optimal UX and secure data handling.",
    longDesc:
      "Zenith is a high-performance web application focusing on optimal user experience and secure data handling. Built with modern TypeScript and React, it showcases advanced UI patterns, smooth animations, and a strong emphasis on security-first architecture and clean code practices.",
    github: "https://github.com/yyyuvvvraj/zenith",
    live: "https://zenith-vert-alpha.vercel.app/",
    highlights: ["Advanced UI Patterns", "Security-First Design", "Performance Optimized", "TypeScript", "Smooth Animations"],
  },
];


// ─── Project List Card ───────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={`group border relative p-6 transition-all duration-300 cyber-border cursor-pointer
        ${project.isMajor
          ? "border-[#FFD700]/40 bg-gradient-to-r from-[#001F5B]/30 to-[#1E3A5F]/20 hover:border-[#FFD700]/80 hover:from-[#001F5B]/50 hover:to-[#1E3A5F]/40"
          : "border-white/5 bg-white/[0.02] hover:border-[var(--color-rbr-yellow)]/50 hover:bg-[var(--color-rbr-yellow)]/5"
        }`}
    >
      {/* Badge floats above card */}
      {project.isMajor && (
        <div className="absolute -top-4 -right-2 z-30">
          <div className="bg-[#001F5B] border border-[#FFD700] font-display text-xs px-3 py-1 f1-skew shadow-[0_0_12px_rgba(255,215,0,0.5)]">
            <div className="f1-skew-reverse flex items-center gap-1 text-[#FFD700]">
              <Trophy className="w-3 h-3" /> CHAMPION
            </div>
          </div>
        </div>
      )}
      {!project.isMajor && project.position === "0x01" && (
        <div className="absolute -top-4 -right-2 z-30">
          <div className="bg-[#FF8700] text-black font-display text-xs px-3 py-1 f1-skew shadow-[0_0_10px_#FF8700]">
            <div className="f1-skew-reverse flex items-center gap-1">
              <Zap className="w-3 h-3" /> FASTEST LAP
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 checkered-pattern opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
      <div
        className={`absolute left-0 top-0 w-1 h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top
          ${project.isMajor ? "bg-[#FFD700]" : "bg-[var(--color-f1-red)]"}`}
      />

      <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-20">
        <div className={`font-mono text-2xl transition-colors w-16 ${project.isMajor ? "text-[#FFD700]" : "text-[var(--color-f1-red)] group-hover:text-[var(--color-rbr-yellow)]"}`}>
          {project.position}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-3xl uppercase tracking-wide mb-2 text-white flex items-center gap-3">
            {project.title}
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[var(--color-rbr-yellow)] transition-colors" />
          </h3>
          <p className="font-mono text-sm text-white/50 mb-4">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className={`font-mono text-[10px] px-2 py-1 bg-black/50 border uppercase tracking-wider
                ${project.isMajor ? "border-[#FFD700]/30 text-[#FFD700]" : "border-white/10 text-[var(--color-rbr-yellow)]"}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className={`font-mono text-sm hidden md:flex items-center gap-2 border px-3 py-1 bg-black/40 backdrop-blur-md rounded-full
          ${project.isMajor ? "text-[#FFD700] border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.2)]" : "text-[var(--color-f1-red)] border-[var(--color-f1-red)]/30 shadow-[0_0_15px_rgba(225,6,0,0.2)]"}`}>
          {project.isMajor ? <Trophy className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
          {project.time}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Project Detail View ─────────────────────────────────────────────────────
function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="detail"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
        className="min-h-full bg-[#0a0a0f] relative overflow-hidden"
      >
        {/* RBR-styled top accent for major project */}
        {project.isMajor && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#001F5B] via-[#FFD700] to-[#E10600]" />
        )}
        {!project.isMajor && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-f1-red)] to-transparent" />
        )}

        {/* Background grid */}
        <div className="absolute inset-0 telemetry-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full checkered-pattern opacity-[0.02] pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-sm text-white/40 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>back to projects</span>
          </button>

          {/* Position tag */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`font-mono text-sm px-3 py-1 border ${project.isMajor ? "text-[#FFD700] border-[#FFD700]/40 bg-[#001F5B]/40" : "text-[var(--color-f1-red)] border-[var(--color-f1-red)]/30 bg-[var(--color-f1-red)]/5"}`}>
              {project.position}
            </span>
            <span className={`font-mono text-xs uppercase tracking-widest ${project.isMajor ? "text-[#FFD700]/70" : "text-[var(--color-f1-red)]/70"}`}>
              {project.time}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-white mb-6 leading-[0.9]">
            {project.title}
          </h2>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t) => (
              <span key={t} className={`font-mono text-xs px-3 py-1.5 border uppercase tracking-wider
                ${project.isMajor ? "border-[#FFD700]/40 text-[#FFD700] bg-[#FFD700]/5" : "border-[var(--color-rbr-yellow)]/30 text-[var(--color-rbr-yellow)] bg-[var(--color-rbr-yellow)]/5"}`}>
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className={`border-l-2 pl-6 mb-10 ${project.isMajor ? "border-[#FFD700]" : "border-[var(--color-f1-red)]"}`}>
            <p className="font-mono text-base text-white/75 leading-relaxed">
              {project.longDesc}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && (
            <div className="mb-12">
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">// Key Features</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 font-mono text-sm text-white/70">
                    <Star className={`w-3 h-3 flex-shrink-0 ${project.isMajor ? "text-[#FFD700]" : "text-[var(--color-rbr-yellow)]"}`} />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="f1-skew flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 py-4 px-6 font-display uppercase tracking-wider text-white text-sm"
            >
              <div className="f1-skew-reverse flex items-center gap-3">
                <Github className="w-5 h-5" />
                GitHub Repo
              </div>
            </a>

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`f1-skew flex-1 flex items-center justify-center gap-3 transition-all duration-300 py-4 px-6 font-display uppercase tracking-wider text-sm
                  ${project.isMajor
                    ? "bg-[#FFD700]/10 border border-[#FFD700]/50 hover:bg-[#FFD700]/20 hover:border-[#FFD700] text-[#FFD700]"
                    : "bg-[var(--color-rbr-yellow)]/10 border border-[var(--color-rbr-yellow)]/50 hover:bg-[var(--color-rbr-yellow)]/20 hover:border-[var(--color-rbr-yellow)] text-[var(--color-rbr-yellow)]"
                  }`}
              >
                <div className="f1-skew-reverse flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  Live Site
                </div>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <BrowserWindow
      url={selectedProject ? `https://yuvraj.dev/projects/${selectedProject.title.toLowerCase().replace(/\s+/g, "-")}` : "https://yuvraj.dev/projects"}
      onBack={selectedProject ? () => setSelectedProject(null) : undefined}
    >
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="detail"
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 px-6 max-w-7xl mx-auto relative min-h-full"
          >
            {/* DRS Zone + RBR Banner */}
            <div className="absolute top-10 right-10 md:right-20 flex flex-col items-end gap-2 z-20">
              <div className="border-2 border-[var(--color-rbr-yellow)] text-[var(--color-rbr-yellow)] px-4 py-1 font-display text-xl md:text-2xl uppercase tracking-widest f1-skew animate-pulse bg-[var(--color-rbr-yellow)]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255, 215, 0,0.4)]">
                DRS ZONE ENABLED
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="f1-skew flex items-center gap-2 bg-[#001F5B] border border-[#FFD700]/60 px-3 py-1 shadow-[0_0_12px_rgba(255,215,0,0.3)]"
              >
                <div className="f1-skew-reverse flex items-center gap-2">
                  <span className="font-display text-[#FFD700] text-sm tracking-widest">MAX VERSTAPPEN</span>
                  <span className="font-display text-white text-xl leading-none">#1</span>
                </div>
              </motion.div>
              <div className="flex items-center gap-0 overflow-hidden rounded-sm opacity-70">
                <div className="h-1 w-16 bg-[#001F5B]" />
                <div className="h-1 w-4 bg-[#E10600]" />
                <div className="h-1 w-2 bg-[#FFD700]" />
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center gap-4 mb-16">
              <Binary className="w-8 h-8 text-[var(--color-rbr-yellow)]" />
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-gray-800 mix-blend-difference">
                Exploits &amp; Engineering
              </h2>
            </div>

            {/* Project cards */}
            <div className="space-y-12 relative z-10">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.position} project={p} onClick={() => setSelectedProject(p)} />
              ))}
            </div>

            {/* Oracle Red Bull Racing Footer Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex items-center gap-3"
            >
              <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
                <div className="w-3 h-3 bg-[#001F5B] rounded-sm border border-[#FFD700]/50" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Oracle Red Bull Racing</span>
                <div className="w-3 h-3 bg-[#E10600] rounded-sm" />
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserWindow>
  );
}
