import React, { createContext, useContext, useState, ReactNode } from 'react';

type RouteKey = 'home' | 'telemetry' | 'projects' | 'logs' | 'contact';

interface GameContextType {
  score: number;
  unlockedRoutes: RouteKey[];
  isGameMode: boolean;
  addScore: (points: number) => void;
  unlockRoute: (route: RouteKey) => void;
  unlockAll: () => void;
  isUnlocked: (route: RouteKey) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [unlockedRoutes, setUnlockedRoutes] = useState<RouteKey[]>(['home']);
  const [isGameMode, setIsGameMode] = useState(true);

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const unlockRoute = (route: RouteKey) => {
    if (!unlockedRoutes.includes(route)) {
      setUnlockedRoutes(prev => [...prev, route]);
    }
  };

  const unlockAll = () => {
    setUnlockedRoutes(['home', 'telemetry', 'projects', 'logs', 'contact']);
    setIsGameMode(false);
  };

  const isUnlocked = (route: RouteKey) => {
    if (!isGameMode) return true;
    return unlockedRoutes.includes(route);
  };

  return (
    <GameContext.Provider value={{ score, unlockedRoutes, isGameMode, addScore, unlockRoute, unlockAll, isUnlocked }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
