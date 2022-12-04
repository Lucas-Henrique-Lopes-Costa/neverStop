import { useContext, useEffect, useState } from "react";
import { CountdownContext, Log, LoggerContext } from "../../contexts";
import { toast } from "react-toastify";
import styles from "./Countdown.module.scss";

const CountDown = () => {
  const {
    maxMinutes,
    minutes,
    seconds,
    isActive,
    hasFinished,
    startCountDown,
    resetCountDown,
  } = useContext(CountdownContext);

  const { setMaxMinutes } = useContext(CountdownContext);

  const changeTime10 = () => {
    setMaxMinutes(10);
    toast.success(`O tempo foi atualizado com sucesso`);
  };
  
  const changeTime15 = () => {
    setMaxMinutes(15);
    toast.success(`O tempo foi atualizado com sucesso`);
  };
  
  const changeTime20 = () => {
    setMaxMinutes(20);
    toast.success(`O tempo foi atualizado com sucesso`);
  };

  const { addLog } = useContext(LoggerContext);

  const [percentToFinish, setPercentToFinish] = useState(100);
  const [minuteLeft, setMinuteLeft] = useState(
    String(maxMinutes).padStart(2, "0").split("")[0]
  );
  const [minuteRight, setMinuteRight] = useState(
    String(maxMinutes).padStart(2, "0").split("")[1]
  );
  const [secondLeft, setSecondLeft] = useState("0");
  const [secondRight, setSecondRight] = useState("0");

  const reset = () => {
    resetCountDown();
  };

  const updatePercentToFinish = () => {
    const percUnit = (maxMinutes * 60) / 100;
    let newPercentToFinish =
      100 - Math.floor((minutes * 60 + seconds) / percUnit);
    if (newPercentToFinish > 100) {
      newPercentToFinish = 100;
    }
    setPercentToFinish(newPercentToFinish);
  };

  const startCountDownAndResetBar = () => {
    reset();
    updatePercentToFinish();
    startCountDown();

    const newLog = {
      date: new Date(),
      msg: "Contagem começou",
      type: "info",
    } as Log;
    addLog(newLog);
  };

  useEffect(() => {
    if (isActive) {
      updatePercentToFinish();
    }
  }, [seconds]);

  useEffect(() => {
    if (isActive) {
      const [minuteLeftAux, minuteRightAux] = String(minutes)
        .padStart(2, "0")
        .split("");
      const [secondLeftAux, secondRightAux] = String(seconds)
        .padStart(2, "0")
        .split("");
      setMinuteLeft(minuteLeftAux);
      setMinuteRight(minuteRightAux);
      setSecondLeft(secondLeftAux);
      setSecondRight(secondRightAux);
    } else {
      const [minuteLeftAux, minuteRightAux] = String(maxMinutes)
        .padStart(2, "0")
        .split("");
      const [secondLeftAux, secondRightAux] = String(0)
        .padStart(2, "0")
        .split("");
      setMinuteLeft(minuteLeftAux);
      setMinuteRight(minuteRightAux);
      setSecondLeft(secondLeftAux);
      setSecondRight(secondRightAux);
    }
  }, [seconds]);

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <div className={styles.timeUnitContainer}>
          <span className={styles.timeUnit}>{minuteLeft}</span>
          <span className={styles.timeUnit}>{minuteRight}</span>
        </div>
        <span className={styles.timeUnitSeparator}>:</span>
        <div className={styles.timeUnitContainer}>
          <span className={styles.timeUnit}>{secondLeft}</span>
          <span className={styles.timeUnit}>{secondRight}</span>
        </div>
      </div>

      <div>
        <br/>
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={`${styles.buttonTime} ${styles.buttonFailed}`}
          onClick={changeTime10}
        >
          10 minutos
        </button>
        <button
          type="button"
          className={`${styles.buttonTime} ${styles.buttonNext}`}
          onClick={changeTime15}
        >
          15 minutos
        </button>
        <button
          type="button"
          className={`${styles.buttonTime} ${styles.buttonSucceeded}`}
          onClick={changeTime20}
        >
          20 minutos
        </button>
      </footer>

      {hasFinished ? (
        <button disabled className={styles.button}>
          Ciclo encerrado
          <i className={styles.buttonIconFinished}>🚀</i>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.button} ${styles.isActive}`}
              onClick={reset}
            >
              Abandonar Ciclo
              <span
                className={styles.buttonIsActivePercBar}
                style={{ width: `${percentToFinish}%` }}
              ></span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={startCountDownAndResetBar}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
};

export { CountDown };
