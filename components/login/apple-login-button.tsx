import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import styles from "./login.module.sass";

const Button = () => {
  return (
    <button onClick={() => {}} className={styles.appleLoginButton}>
      <FontAwesomeIcon icon={faApple} size="lg" />
      <span className={styles.socialLoginText}>Continue with Apple</span>
    </button>
  );
};

export default Button;
