import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Log Data ────────────────────────────────────────────────────────────────
const LOGS = {
  op03: {
    id: "op03",
    title: "AI Research Author & Presenter",
    company: "ICASS-2026 (IEEE) | Manav Rachna Univ.",
    date: "FEB 2026",
    round: "OP: 03",
    content: `[OP:03] ICASS-2026 — IEEE Conference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE    : AI Research Author & Presenter
VENUE   : Manav Rachna University
DATE    : February 2026
STATUS  : PUBLISHED & PRESENTED

RESEARCH: Enhanced Alpha-Beta Pruning & Heuristic
          Evaluation for Intelligent Pac-Man AI Agents.

IMPACT  : Reduced unnecessary node expansions by 37%.
          Achieved real-time performance gains in
          multi-agent adversarial environments.

MENTIONS: Dr. Shweta Malwe, Prof. Prachi Mehta.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  },
  op02: {
    id: "op02",
    title: "Lead Full-Stack Architect",
    company: "Independent Engineering",
    date: "2024 — 2025",
    round: "OP: 02",
    content: `[OP:02] LEAD FULL-STACK ARCHITECT (PROJECTS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE    : Lead Full-Stack Architect
CONTEXT : Independent Engineering
PERIOD  : 2024 - 2025
STATUS  : ACTIVE

PROJECTS DEPLOYED:
  ▸ Cadence (Capstone) — Full-stack app, JWT auth,
    React + Node.js, RESTful API design.
  ▸ AdditiveCurriculum — EdTech SaaS platform,
    TypeScript + Vite, Vercel deployment.
  ▸ Mini AirBnB — MERN-adjacent, Passport.js auth,
    Cloudinary + Mapbox, Render deployment.
  ▸ Zenith — Performance-first web UI.

FOCUS   : Secure data handling, scalable backends,
          high-performance React interfaces.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  },
  op01: {
    id: "op01",
    title: "Computer Science Engineering",
    company: "NIIT University",
    date: "2023 — 2027",
    round: "OP: 01",
    content: `[OP:01] COMPUTER SCIENCE ENGINEERING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSTITUTION : NIIT University (NAAC A+)
DEGREE      : B.Tech CSE
PERIOD      : 2023 - 2027
STATUS      : ACTIVE — Year 3

CORE TRACKS :
  ▸ Software Engineering & Architecture
  ▸ Cybersecurity & Ethical Hacking
  ▸ Artificial Intelligence & ML
  ▸ Data Structures & Algorithms (C++/Java)

CGPA        : [REDACTED — CLASSIFIED]
RESEARCH    : IEEE-published AI research (see OP:03)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  },
  rbr: {
    id: "rbr",
    title: "F1 Fan Intel",
    company: "Oracle Red Bull Racing",
    date: "2018 — PRESENT",
    round: "F1: CLASSIFIED",
    content: `[F1:CLASSIFIED] ORACLE RED BULL RACING DOSSIER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DRIVER  : Max Verstappen (#1)
TEAM    : Oracle Red Bull Racing
FAN     : Since 2018 (pre-championship era)

ACHIEVEMENTS WITNESSED:
  ▸ 2021 WDC — Abu Dhabi, final lap, history made
  ▸ 2022 WDC — Suzuka, dominant season
  ▸ 2023 WDC — Record 19 wins in a single season
  ▸ 2024 WDC — Las Vegas, fourth title confirmed

FAVOURITE GPs:
  🇲🇨 Monaco GP  — The jewel of the calendar
  🇳🇱 Dutch GP   — Orange sea at Zandvoort
  🇧🇭 Bahrain GP — Speed + strategy perfection

CURRENT MOOD : BULLISH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  },
  research: {
    id: "research",
    title: "Classified Research",
    company: "ICASS-2026 IEEE",
    date: "2026",
    round: "INTEL",
    content: `[INTEL] ENHANCED ALPHA-BETA PRUNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITLE : Enhanced Alpha-Beta Pruning and Evaluation
        Function Optimization for Intelligent
        Pac-Man AI Agents.

VENUE : ICASS-2026, IEEE — Manav Rachna University
AFFIL : NIIT University

ABSTRACT:
  Optimized traditional Alpha-Beta Pruning to reduce
  unnecessary node expansions. Designed an improved
  heuristic evaluation function for dynamic adversarial
  game environments.

  Achieves significantly better real-time performance
  in multi-agent scenarios. Applications in robotics,
  autonomous systems, real-time decision engines.

IMPLICATIONS: Search optimization in real-time AI.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  },
};

type LogKey = keyof typeof LOGS;
type HistoryEntry = { id: number; command: string; output: ReactNode; isError?: boolean };

// ─── Hint system ─────────────────────────────────────────────────────────────
const HINTS: Record<string, string> = {
  op03: `Hint: Try running "cat logs/op03.log" to read the latest operation.`,
  op02: `Hint: Try running "cat logs/op02.log" to access project deployment records.`,
  op01: `Hint: Try running "cat logs/op01.log" to read the education file.`,
  rbr: `Hint: This one's classified. Try "decrypt rbr.classified" with the RBR key.`,
  research: `Hint: Try running "cat intel/research.log" to access the declassified paper.`,
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function LogsTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [revealed, setRevealed] = useState<Set<LogKey>>(new Set());
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [nextId, setNextId] = useState(1);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addPoints = (pts: number, key: LogKey) => {
    if (!revealed.has(key)) {
      setScore(s => s + pts);
      setRevealed(r => new Set([...r, key]));
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const push = (command: string, output: ReactNode, isError = false) => {
    setHistory(h => [...h, { id: nextId, command, output, isError }]);
    setNextId(n => n + 1);
  };

  const GreenText = ({ children }: { children: ReactNode }) => (
    <span className="text-[#87d23f]">{children}</span>
  );
  const RedText = ({ children }: { children: ReactNode }) => (
    <span className="text-[#ef6464]">{children}</span>
  );
  const Gold = ({ children }: { children: ReactNode }) => (
    <span className="text-[#FFD700]">{children}</span>
  );
  const Cyan = ({ children }: { children: ReactNode }) => (
    <span className="text-[var(--color-neon-blue)]">{children}</span>
  );

  const LogReveal = ({ log }: { log: typeof LOGS[LogKey] }) => (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[#87d23f]/30 bg-[#87d23f]/5 p-4 mt-2 font-mono text-xs"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 bg-[#87d23f] rounded-full animate-pulse" />
        <span className="text-[#87d23f] font-bold tracking-widest text-[10px]">
          [{log.round}] DECRYPTED
        </span>
      </div>
      <pre className="text-gray-200 whitespace-pre-wrap leading-relaxed">{log.content}</pre>
    </motion.div>
  );

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    setInput("");
    setCmdHistory(h => [raw, ...h]);
    setCmdHistoryIdx(-1);

    const parts = raw.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const arg1 = parts[1] ?? "";
    const arg2 = parts[2] ?? "";

    // ── Commands ──────────────────────────────────────────────────────
    if (cmd === "help") {
      push(raw, (
        <div className="space-y-1 text-gray-300 text-xs">
          <div className="text-[var(--color-neon-blue)] font-bold mb-2">AVAILABLE COMMANDS</div>
          <div className="grid grid-cols-[140px_1fr] gap-y-1 max-w-lg">
            <Cyan>ls</Cyan>              <span>List available log files</span>
            <Cyan>cat logs/op01.log</Cyan><span>Read education log</span>
            <Cyan>cat logs/op02.log</Cyan><span>Read projects log</span>
            <Cyan>cat logs/op03.log</Cyan><span>Read research/conferences log</span>
            <Cyan>cat intel/research.log</Cyan><span>Access the IEEE paper intel</span>
            <Cyan>decrypt rbr.classified</Cyan><span>Unlock classified F1 dossier</span>
            <Cyan>status</Cyan>          <span>Show mission progress</span>
            <Cyan>score</Cyan>           <span>Show your current score</span>
            <Cyan>hint</Cyan>            <span>Get hints on what to try next</span>
            <Cyan>neofetch</Cyan>        <span>System info</span>
            <Cyan>whoami</Cyan>          <span>Current operator</span>
            <Cyan>clear</Cyan>           <span>Clear terminal</span>
          </div>
          <div className="mt-3 border border-[#E95420]/30 bg-[#E95420]/5 p-2 text-[#E95420] text-[10px]">
            MISSION: Reveal all 5 hidden logs to complete your dossier. Type 'status' to track progress.
          </div>
        </div>
      ));
      return;
    }

    if (cmd === "ls") {
      push(raw, (
        <div className="text-xs space-y-1">
          <div className="text-gray-400 mb-1">total 5 encrypted files</div>
          <div className="grid grid-cols-[20px_80px_1fr] gap-x-3 items-center">
            <span className={revealed.has("op03") ? "text-[#87d23f]" : "text-gray-500"}>●</span>
            <span className="text-blue-400">logs/</span>
            <span className="text-gray-300">op01.log  op02.log  op03.log</span>
          </div>
          <div className="grid grid-cols-[20px_80px_1fr] gap-x-3 items-center">
            <span className={revealed.has("research") ? "text-[#87d23f]" : "text-gray-500"}>●</span>
            <span className="text-blue-400">intel/</span>
            <span className="text-gray-300">research.log</span>
          </div>
          <div className="grid grid-cols-[20px_80px_1fr] gap-x-3 items-center">
            <span className={revealed.has("rbr") ? "text-[#FFD700]" : "text-gray-500"}>●</span>
            <span className="text-[#FFD700]">rbr.classified</span>
            <span className="text-[#FFD700]/50">[ENCRYPTED — NEED KEY]</span>
          </div>
          <div className="mt-2 text-[10px] text-gray-600">
            Type 'help' to see how to read each file.
          </div>
        </div>
      ));
      return;
    }

    if (cmd === "cat") {
      const file = `${arg1}${arg2 ? " " + arg2 : ""}`.trim();

      if (file === "logs/op03.log") {
        addPoints(150, "op03");
        push(raw, <LogReveal log={LOGS.op03} />);
        return;
      }
      if (file === "logs/op02.log") {
        addPoints(150, "op02");
        push(raw, <LogReveal log={LOGS.op02} />);
        return;
      }
      if (file === "logs/op01.log") {
        addPoints(100, "op01");
        push(raw, <LogReveal log={LOGS.op01} />);
        return;
      }
      if (file === "intel/research.log") {
        addPoints(200, "research");
        push(raw, <LogReveal log={LOGS.research} />);
        return;
      }
      if (file === "rbr.classified") {
        push(raw, <RedText>Permission denied: rbr.classified requires decryption key. Try 'decrypt rbr.classified'</RedText>, true);
        return;
      }
      push(raw, <RedText>cat: {file}: No such file or directory</RedText>, true);
      return;
    }

    if (cmd === "decrypt") {
      if (arg1 === "rbr.classified") {
        addPoints(300, "rbr");
        push(raw, (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-[#FFD700] font-bold text-[10px] tracking-widest mb-1">
                🔓 RBR DECRYPTION KEY ACCEPTED — ORACLE ACCESS GRANTED
              </div>
              <LogReveal log={LOGS.rbr} />
            </motion.div>
          </div>
        ));
        return;
      }
      push(raw, <RedText>decrypt: unknown target '{arg1}'</RedText>, true);
      return;
    }

    if (cmd === "status") {
      const total = Object.keys(LOGS).length;
      const done = revealed.size;
      const pct = Math.round((done / total) * 100);
      push(raw, (
        <div className="text-xs space-y-2">
          <div className="text-[var(--color-neon-blue)] font-bold">MISSION DOSSIER STATUS</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#E10600] to-[#FFD700]"
              />
            </div>
            <span className="text-white font-bold">{done}/{total}</span>
            <span className="text-gray-400">{pct}%</span>
          </div>
          <div className="grid gap-1 mt-2">
            {(Object.keys(LOGS) as LogKey[]).map(key => (
              <div key={key} className="flex items-center gap-2 text-[10px]">
                <span className={revealed.has(key) ? "text-[#87d23f]" : "text-gray-600"}>
                  {revealed.has(key) ? "✓" : "○"}
                </span>
                <span className={revealed.has(key) ? "text-gray-300" : "text-gray-600"}>
                  [{LOGS[key].round}] {LOGS[key].title}
                </span>
              </div>
            ))}
          </div>
          {done === total && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 border border-[#FFD700] bg-[#FFD700]/10 p-3 text-[#FFD700] font-bold text-center"
            >
              🏆 ALL LOGS DECRYPTED. FULL DOSSIER UNLOCKED. SCORE: {score}
            </motion.div>
          )}
        </div>
      ));
      return;
    }

    if (cmd === "score") {
      push(raw, (
        <div className="text-xs">
          <Gold>OPERATOR SCORE: {score} pts</Gold>
          <div className="text-gray-500 text-[10px] mt-1">
            {score === 0 && "No logs revealed yet. Start with 'ls' then 'cat'."}
            {score > 0 && score < 400 && "Good start. Keep digging through the files."}
            {score >= 400 && score < 900 && "Impressive. You're closing in on the full dossier."}
            {score >= 900 && "ELITE OPERATOR. Full intel acquired."}
          </div>
        </div>
      ));
      return;
    }

    if (cmd === "hint") {
      const unrevealed = (Object.keys(LOGS) as LogKey[]).filter(k => !revealed.has(k));
      if (unrevealed.length === 0) {
        push(raw, <GreenText>All logs revealed. Run 'status' to review your complete dossier.</GreenText>);
      } else {
        const k = unrevealed[0];
        push(raw, (
          <div className="text-[#FF8700] text-xs">
            <span className="font-bold">HINT:</span> {HINTS[k]}
          </div>
        ));
      }
      return;
    }

    if (cmd === "whoami") {
      push(raw, <GreenText>yuvraj_deshmukh — Lead Driver, Security Eng, F1 Enthusiast</GreenText>);
      return;
    }

    if (cmd === "neofetch") {
      push(raw, (
        <div className="flex flex-col sm:flex-row gap-4 items-start text-xs">
          <pre className="text-[#E95420] font-bold leading-tight">{`         _
     ---(_)
   _/  ---  \\
  (_) |   |
    \\  --- _/
       ---(_)`}</pre>
          <div className="space-y-0.5 text-gray-300">
            <div className="text-[var(--color-neon-blue)] font-bold">yuvraj@ubuntu</div>
            <div>────────────────</div>
            <div><span className="text-[#E95420] font-bold">OS</span>: Ubuntu 24.04 LTS x86_64</div>
            <div><span className="text-[#E95420] font-bold">Host</span>: RB20-Telemetry-Engine</div>
            <div><span className="text-[#E95420] font-bold">Kernel</span>: 6.8.0-honda-rbpt-v6</div>
            <div><span className="text-[#E95420] font-bold">Shell</span>: logs-terminal v2.0</div>
            <div><span className="text-[#E95420] font-bold">Logs</span>: {revealed.size}/5 decrypted</div>
            <div><span className="text-[#E95420] font-bold">Score</span>: {score} pts</div>
          </div>
        </div>
      ));
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    // Easter eggs
    if (cmd === "verstappen" || cmd === "max") {
      push(raw, <Gold>🏆 4× World Drivers' Champion. GOAT. #1. Enough said.</Gold>);
      return;
    }
    if (cmd === "rbr" || raw.toLowerCase().includes("red bull")) {
      push(raw, <Gold>🐂 Oracle Red Bull Racing — Fastest team on the grid.</Gold>);
      return;
    }

    push(raw, <RedText>command not found: {cmd} — Type 'help' for available commands.</RedText>, true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1);
      setCmdHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = cmdHistoryIdx - 1;
      if (newIdx < 0) { setCmdHistoryIdx(-1); setInput(""); }
      else { setCmdHistoryIdx(newIdx); setInput(cmdHistory[newIdx]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completions = ["ls", "cat logs/op01.log", "cat logs/op02.log", "cat logs/op03.log", "cat intel/research.log", "decrypt rbr.classified", "status", "score", "hint", "help", "clear", "neofetch", "whoami"];
      const match = completions.find(c => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  };

  const allRevealedCount = revealed.size;
  const totalLogs = Object.keys(LOGS).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar at top */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest whitespace-nowrap">DOSSIER PROGRESS</span>
        <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(allRevealedCount / totalLogs) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-[#E10600] via-[#FF8700] to-[#FFD700]"
          />
        </div>
        <span className="font-mono text-[10px] text-[#FFD700] whitespace-nowrap">{allRevealedCount}/{totalLogs} LOGS</span>
        <span className="font-mono text-[10px] text-[#87d23f] whitespace-nowrap">{score} PTS</span>
      </div>

      {/* Terminal window */}
      <div
        className="font-mono text-xs md:text-sm bg-black/90 backdrop-blur-md text-white rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.9),0_0_80px_rgba(225,6,0,0.05)] border border-white/10 flex flex-col overflow-hidden"
        style={{ minHeight: "520px", maxHeight: "700px" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 bg-black/80 border-b border-white/10 px-4 py-2 flex-shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef6464]" />
            <div className="w-3 h-3 rounded-full bg-[#f1ba4f]" />
            <div className="w-3 h-3 rounded-full bg-[#73c54a]" />
          </div>
          <div className="flex-1 text-center text-gray-400 text-xs tracking-wider font-bold select-none">
            yuvraj@ubuntu: ~/dossier
          </div>
          {/* Score badge */}
          <div className="f1-skew bg-[#001F5B] border border-[#FFD700]/40 px-2 py-0.5">
            <div className="f1-skew-reverse font-display text-[#FFD700] text-[9px] tracking-widest">
              {score > 0 ? `${score} PTS` : "RBR"}
            </div>
          </div>
        </div>

        {/* Content area (scrollable) */}
        <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2">

          {/* Boot message */}
          <div className="text-gray-400 text-xs whitespace-pre-wrap border-b border-white/5 pb-4 mb-4">
            {`Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-rbr-telemetry x86_64)
Last login: ${new Date().toDateString()} from 10.0.0.1`}
          </div>

          {/* Mission brief */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-[#E10600]/40 bg-[#E10600]/5 p-4 mb-4 text-xs"
          >
            <div className="flex items-center gap-2 text-[#E10600] font-bold mb-2">
              <div className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse" />
              MISSION BRIEF — OPERATION: DOSSIER HUNT
            </div>
            <div className="text-gray-300 leading-relaxed">
              This terminal holds <span className="text-white font-bold">5 encrypted operation logs</span> from Yuvraj's field record.
              Your mission: <span className="text-[#87d23f]">reveal them all</span> using terminal commands.
              <br />
              <span className="text-[#FF8700]">Start with <kbd className="bg-black/50 border border-white/20 px-1.5 py-0.5 rounded text-white">ls</kbd> then try <kbd className="bg-black/50 border border-white/20 px-1.5 py-0.5 rounded text-white">help</kbd></span>
            </div>
          </motion.div>

          {/* History */}
          {history.map(entry => (
            <div key={entry.id} className="space-y-1">
              <div className="flex items-center gap-1 flex-wrap text-xs">
                <span className="text-[#87d23f] font-bold">yuvraj@ubuntu</span>
                <span className="text-white">:</span>
                <span className="text-[#3a80ca] font-bold">~/dossier</span>
                <span className="text-white">$</span>
                <span className="text-white ml-1 font-medium">{entry.command}</span>
              </div>
              {entry.output && (
                <div className={`ml-0 ${entry.isError ? "text-[#ef6464]" : "text-gray-300"}`}>
                  {entry.output}
                </div>
              )}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-1 flex-wrap text-xs">
            <span className="text-[#87d23f] font-bold">yuvraj@ubuntu</span>
            <span className="text-white">:</span>
            <span className="text-[#3a80ca] font-bold">~/dossier</span>
            <span className="text-white">$</span>
            <form onSubmit={handleCommand} className="flex-1 inline-flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="bg-transparent border-none outline-none text-white font-medium flex-1 min-w-0 ml-1"
                autoFocus
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="none"
              />
              {isFocused && <span className="w-2 h-4 bg-gray-300 animate-pulse ml-0.5 inline-block flex-shrink-0" />}
            </form>
          </div>
        </div>
      </div>

      {/* All-clear banner when done */}
      <AnimatePresence>
        {allRevealedCount === totalLogs && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#FFD700] bg-[#FFD700]/10 p-6 text-center"
          >
            <div className="font-display text-3xl text-[#FFD700] uppercase tracking-widest mb-2">
              🏆 Full Dossier Unlocked
            </div>
            <div className="font-mono text-sm text-white/70">
              All {totalLogs} operation logs revealed. Final score: <span className="text-[#FFD700] font-bold">{score} pts</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
