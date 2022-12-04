import GithubIcon from "../../assets/img/icons/github-square.svg";
import LinkedinIcon from "../../assets/img/icons/linkedin-square.svg";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.title}>
        Acesse minhas redes sociais e veja mais projetos
      </p>
      <div className={styles.socialContainer}>
        <a href="https://github.com/Lucas-Henrique-Lopes-Costa">
          <div className={styles.socialIcon}>
            <GithubIcon />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/lucas-henrique-lopes-costa/">
          <div className={`${styles.socialIcon} ${styles.socialIconLinkedin}`}>
            <LinkedinIcon />
          </div>
        </a>
      </div>
      <p className={styles.copyright}>
        Criado por Lucas Henrique @ 2022 com diversas melhorias no projeto MoveIt da 4ª Next Level Week oferecido pela RocketSeat
      </p>
    </footer>
  );
};

export { Footer };
