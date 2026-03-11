import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

interface Collectible {
  x: number;
  y: number;
  type: "point" | "multiplier";
  color: string;
  id: number;
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [gameActive, setGameActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const gameStateRef = useRef({
    playerX: 400,
    playerY: 300,
    playerRadius: 15,
    playerColor: "#00FF88",
    mouseX: 400,
    mouseY: 300,
    particles: [] as Particle[],
    collectibles: [] as Collectible[],
    score: 0,
    multiplier: 1,
    level: 1,
    nextCollectibleId: 0,
    lives: 3,
    invulnerable: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Mouse move for player control
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      gameStateRef.current.mouseX = e.clientX - rect.left;
      gameStateRef.current.mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Spawn collectibles
    const spawnCollectible = () => {
      const state = gameStateRef.current;
      const types = ["point", "multiplier"] as const;
      const colors = ["#FF00FF", "#00FFFF", "#FFFF00", "#FF0088", "#00FF88"];
      const type = Math.random() > 0.85 ? "multiplier" : "point";

      state.collectibles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        id: state.nextCollectibleId++,
      });
    };

    const spawnInterval = setInterval(() => {
      if (
        gameActive &&
        gameStateRef.current.collectibles.length <
          15 + gameStateRef.current.level * 2
      ) {
        spawnCollectible();
      }
    }, 300);

    // Game loop
    const gameLoop = setInterval(() => {
      if (!gameActive) return;

      const state = gameStateRef.current;

      // Smooth player movement towards mouse
      const dx = state.mouseX - state.playerX;
      const dy = state.mouseY - state.playerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 6;

      if (distance > 5) {
        state.playerX += (dx / distance) * speed;
        state.playerY += (dy / distance) * speed;
      }

      // Keep player in bounds
      state.playerX = Math.max(
        state.playerRadius,
        Math.min(width - state.playerRadius, state.playerX),
      );
      state.playerY = Math.max(
        state.playerRadius,
        Math.min(height - state.playerRadius, state.playerY),
      );

      // Update particles
      state.particles = state.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life--;
        return p.life > 0;
      });

      // Invulnerability counter
      if (state.invulnerable > 0) state.invulnerable--;

      // Check collectible collisions
      state.collectibles = state.collectibles.filter((c) => {
        const cdx = c.x - state.playerX;
        const cdy = c.y - state.playerY;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

        if (cdist < state.playerRadius + 12) {
          // Create particle burst
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            state.particles.push({
              x: c.x,
              y: c.y,
              vx: Math.cos(angle) * 4,
              vy: Math.sin(angle) * 4,
              life: 40,
              size: Math.random() * 3 + 2,
              color: c.color,
            });
          }

          if (c.type === "point") {
            state.score += 10 * state.multiplier;
            setScore(state.score);
          } else {
            state.multiplier = Math.min(5, state.multiplier + 0.5);
            setMultiplier(state.multiplier);
          }

          return false;
        }
        return true;
      });

      // Level up logic
      if (state.score > state.level * 500) {
        state.level++;
        setLevel(state.level);
        state.playerRadius = Math.min(20, 15 + state.level * 0.5);
      }

      // Draw
      ctx.fillStyle = "#0a0e27";
      ctx.fillRect(0, 0, width, height);

      // Draw animated background grid
      const gridSize = 40;
      const offset = (Date.now() / 50) % gridSize;
      ctx.strokeStyle = "rgba(0, 255, 136, 0.08)";
      ctx.lineWidth = 1;

      for (let i = -1; i < width / gridSize + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize + offset, 0);
        ctx.lineTo(i * gridSize + offset, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize + offset);
        ctx.lineTo(width, i * gridSize + offset);
        ctx.stroke();
      }

      // Draw collectibles with glow
      state.collectibles.forEach((c) => {
        ctx.shadowColor = c.color;
        ctx.shadowBlur = 20;
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Draw border
        ctx.strokeStyle = c.color + "80";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      ctx.shadowColor = "transparent";

      // Draw particles
      state.particles.forEach((p) => {
        ctx.fillStyle =
          p.color +
          Math.floor((p.life / 40) * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw player with glow
      const pulseAmount = Math.sin(Date.now() / 200) * 3 + 3;
      ctx.shadowColor = state.playerColor;
      ctx.shadowBlur = 20 + pulseAmount;

      // Invulnerability flash
      if (state.invulnerable > 0 && state.invulnerable % 10 < 5) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      } else {
        ctx.fillStyle = state.playerColor;
      }

      ctx.beginPath();
      ctx.arc(state.playerX, state.playerY, state.playerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw player border
      ctx.strokeStyle = state.playerColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw inner glow circle
      ctx.strokeStyle = state.playerColor + "60";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(
        state.playerX,
        state.playerY,
        state.playerRadius - 5,
        0,
        Math.PI * 2,
      );
      ctx.stroke();

      ctx.shadowColor = "transparent";

      // Draw HUD
      ctx.fillStyle = "rgba(0, 255, 136, 0.3)";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`SCORE: ${state.score.toString().padStart(6, "0")}`, 20, 30);
      ctx.fillText(`MUL: ${state.multiplier.toFixed(1)}x`, 20, 55);
      ctx.fillText(`LVL: ${state.level}`, width - 120, 30);
      ctx.fillText(
        `COLLECTED: ${Math.max(0, 100 - state.collectibles.length)}`,
        width - 200,
        55,
      );
    }, 1000 / 60);

    return () => {
      clearInterval(gameLoop);
      clearInterval(spawnInterval);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gameActive]);

  const handleReset = () => {
    gameStateRef.current = {
      playerX: 400,
      playerY: 300,
      playerRadius: 15,
      playerColor: "#00FF88",
      mouseX: 400,
      mouseY: 300,
      particles: [],
      collectibles: [],
      score: 0,
      multiplier: 1,
      level: 1,
      nextCollectibleId: 0,
      lives: 3,
      invulnerable: 0,
    };
    setScore(0);
    setMultiplier(1);
    setLevel(1);
    setGameOver(false);
    setGameActive(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0d1117] text-white flex items-center justify-center py-16 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="rounded-2xl overflow-hidden border border-[#00FF88]/40 shadow-2xl bg-black/40 backdrop-blur-xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#00FF88] via-[#00FFFF] to-[#0088FF] p-6 overflow-hidden">
            <div className="absolute inset-0 opacity-10 pattern-dots" />
            <div className="relative flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-display font-bold tracking-wider text-black drop-shadow-lg">
                  QUANTUM SURGE
                </h1>
                <p className="text-black/70 font-mono text-sm mt-1">
                  Collect particles • Avoid restrictions • Beat your high score
                </p>
              </div>
              <div className="text-right bg-black/30 backdrop-blur px-6 py-3 rounded-xl border border-black/50">
                <div className="font-mono text-3xl font-bold text-[#00FF88]">
                  {score.toString().padStart(6, "0")}
                </div>
                <div className="text-xs text-black/70 uppercase font-bold">
                  Score
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative bg-[#0a0e27] p-4">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full border-2 border-[#00FF88]/40 rounded-xl shadow-2xl cursor-none hover:border-[#00FF88]/100 transition-all"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm text-[#00FF88]/60 text-center pointer-events-none">
              <p>Move your mouse to collect particles</p>
              <p className="text-xs text-[#00FFFF]/40 mt-1">
                Avoid orange zones | Build multipliers
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-black/50 border-t border-[#00FF88]/20 px-6 py-4 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-[#00FFFF] font-mono font-bold">
                  MULTIPLIER
                </div>
                <div className="text-2xl text-[#FF00FF] font-mono font-bold">
                  {multiplier.toFixed(1)}x
                </div>
              </div>
              <div className="h-12 w-1 bg-[#00FF88]/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-t from-[#FF00FF] to-[#00FFFF] transition-all"
                  style={{ width: `${(multiplier / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="text-sm text-[#00FFFF] font-mono font-bold">
                LEVEL
              </div>
              <div className="text-2xl text-[#FFFF00] font-mono font-bold">
                {level}
              </div>
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setGameActive(!gameActive)}
                className="bg-[#00FF88]/20 hover:bg-[#00FF88]/40 border border-[#00FF88]/50 text-[#00FF88] px-4 py-2 rounded-lg font-mono text-sm transition-all font-bold"
              >
                {gameActive ? "PAUSE" : "RESUME"}
              </button>
              <button
                onClick={handleReset}
                className="bg-[#FF00FF]/20 hover:bg-[#FF00FF]/40 border border-[#FF00FF]/50 text-[#FF00FF] px-4 py-2 rounded-lg font-mono text-sm transition-all font-bold"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
