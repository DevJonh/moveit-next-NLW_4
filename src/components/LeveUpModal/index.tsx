import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import style from "./styles.module.css";

const LevelUpModal = () => {
  const { level, closeModal } = useContext(ChallengesContext);

  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>

        <button onClick={closeModal} type="button">
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
