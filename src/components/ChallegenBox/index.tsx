import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import { CountDownContext } from "../../contexts/CountDownContext";
import style from "./styles.module.css";

const ChallengeBox = () => {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengesContext
  );
  const { resetCount } = useContext(CountDownContext);

  const handleChallengeSuccess = () => {
    completedChallenge();
    resetCount();
  };

  const handleChallengeFailed = () => {
    resetChallenge();
    resetCount();
  };

  return (
    <div className={style.ChallegenBoxContainer}>
      {activeChallenge ? (
        <div className={style.ChallegenActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              onClick={handleChallengeFailed}
              type="button"
              className={style.ChallengeFail}
            >
              Falhei
            </button>
            <button
              onClick={handleChallengeSuccess}
              type="button"
              className={style.ChallengeSuccess}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={style.ChallegenNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level UP" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
