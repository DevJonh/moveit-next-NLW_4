import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from "js-cookie";

import challenges from "../../challenges.json";
import LevelUpModal from "../components/LeveUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}
interface ChallengesProps {
  children: ReactNode;
  level?: number;
  currentExperience?: number;
  challengesCompleted?: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeModal: () => void;
  experienceToNextLevel: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUp, setIsLevelUp] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookie.set("level", level.toString());
    Cookie.set("currentExperience", currentExperience.toString());
    Cookie.set("challengesCompleted", challengesCompleted.toString());
  }, [level, currentExperience, challengesCompleted]);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUp(true);
  };

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();
    if (Notification.permission === "granted") {
      new Notification("Novo Desafio 🎉", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  const closeModal = () => {
    setIsLevelUp(false);
  };

  const completedChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallenge,
        closeModal,
      }}
    >
      {children}
      {isLevelUp && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
