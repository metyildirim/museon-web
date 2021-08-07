import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";

const Button = () => {
  return (
    <button onClick={() => {}} className="social-login-btn apple-login-btn">
      <FontAwesomeIcon icon={faApple} size="lg" />
      <span className="social-login-text">Continue with Apple</span>
    </button>
  );
};

export default Button;
