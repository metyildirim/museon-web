import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Button = () => {
  return (
    <button onClick={() => {}} className="social-login-btn google-login-btn">
      <FontAwesomeIcon icon={faGoogle} size="1x" />
      <span className="social-login-text">Continue with Google</span>
    </button>
  );
};

export default Button;
