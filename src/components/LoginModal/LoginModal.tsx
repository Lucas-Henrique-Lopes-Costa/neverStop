import { useContext, useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import ArrowRightIcon from "../../assets/img/icons/arrow-right.svg";
import GithubIcon from "../../assets/img/icons/github-fill.svg";
import LogoIcon from "../../assets/img/icons/pomoTraining-icon-invert.svg";
import { ChallengesContext } from "../../contexts";
import styles from "./LoginModal.module.scss";

const TEXTS = [
  "Faça exercícios físicos",
  "Descanse seus olhos",
  "Faça Pomodoro",
];

const LoginModal = () => {
  const { setGithubUsername } = useContext(ChallengesContext);
  const [username, setUsername] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 4000);
    return () => clearTimeout(intervalId);
  }, []);

  const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const changeGithubUsername = () => {
    if (!username) {
      return;
    }
    setGithubUsername(username);
  };

  return (
    <div className={styles.overlay}>
      <section className={styles.container}>
        <section className={styles.containerMsg}>
          <TextTransition
            text={TEXTS[index % TEXTS.length]}
            springConfig={presets.wobbly}
            className={styles.msg}
          />
        </section>
        <section className={styles.containerData}>
          <div className={styles.appInfo}>
            <div className={styles.appIcon}>
              <LogoIcon />
            </div>
            <span className={styles.appName}>NeverStop</span>
          </div>
          <div className={styles.loginContainer}>
            <span className={styles.loginBemvindo}>Bem-vindo</span>

            <div className={styles.loginGithubContainer}>
              <div className={styles.loginGithubDataContainer}>
                <div className={styles.loginGithubIcon}>
                  <GithubIcon />
                </div>
                <span className={styles.loginGithubMsg}>
                  Entre com seu nome de usuário do Github para começar
                </span>
              </div>

              <form>
                <fieldset className={styles.loginFields}>
                  <input
                    onChange={updateUsername}
                    type="text"
                    className={styles.loginField}
                    placeholder="Lucas-Henrique-Lopes-Costa"
                  />
                  <button
                    type="submit"
                    className={styles.loginButton}
                    onClick={changeGithubUsername}
                  >
                    <div className={styles.loginButtonIcon}>
                      <ArrowRightIcon />
                    </div>
                  </button>
                </fieldset>
              </form>
            </div>
            <div></div>
          </div>
        </section>
      </section>
    </div>
  );
};

export { LoginModal };
