import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import style from "./styles.module.css";

const CompletedChallenges = () => {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={style.ChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};

export default CompletedChallenges;
