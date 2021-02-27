import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDownData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCount: () => void;
  resetCount: () => void;
}
interface CountDownProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownData);

export function CountDownProvider({ children }: CountDownProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);

  const seconds = Math.floor(time % 60);

  const startCount = () => {
    setIsActive(true);
  };
  const resetCount = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCount,
        resetCount,
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
}
