import { useContext, useEffect, useState } from "react";
import { FaCaretRight, FaRegCheckCircle, FaTimes } from "react-icons/fa";

import { CountDownContext } from "../../contexts/CountDownContext";

import style from "./styles.module.css";

const CountDown = () => {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCount,
    startCount,
  } = useContext(CountDownContext);

  const [minuteOne, minuteTwo] = String(minutes).padStart(2, "0").split("");

  const [secondOne, secondTwo] = String(seconds).padStart(2, "0").split("");

  return (
    <>
      <div className={style.countDownContainer}>
        <div>
          <span>{minuteOne}</span>
          <span>{minuteTwo}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondOne}</span>
          <span>{secondTwo}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={style.startCountDown}>
          Ciclo encerrado <FaRegCheckCircle />
        </button>
      ) : (
        <button
          onClick={isActive ? resetCount : startCount}
          type="button"
          className={`${style.startCountDown} ${
            isActive ? style.countDisabled : ""
          }`}
        >
          {isActive ? (
            <>
              Abandonar o ciclo <FaTimes />
            </>
          ) : (
            <>
              Iniciar um ciclo <FaCaretRight />
            </>
          )}
        </button>
      )}
    </>
  );
};

export default CountDown;
