import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styles from "./login.module.sass";

const Button = () => {
  return (
    <button onClick={() => {}} className={styles.googleLoginButton}>
      <FontAwesomeIcon icon={faGoogle} size="1x" />
      <span className={styles.socialLoginText}>Continue with Google</span>
    </button>
  );
};

export default Button;
