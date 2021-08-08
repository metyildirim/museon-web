import Link from "next/link";
import GoogleLoginButton from "../login/google-login-button";
import AppleLoginButton from "../login/apple-login-button";
import AuthDivider from "../common/auth-divider";
import Heading from "../common/heading";

const onRegister = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // TODO: register
};

const Register = () => {
  return (
    <div className="common-container">
      <Heading>Sign Up</Heading>
      <div className="common-auth-container">
        <span className="auth-description">It&apos;s always free and open</span>
        <GoogleLoginButton />
        <AppleLoginButton />
        <AuthDivider />
        <form className="form-common" onSubmit={onRegister}>
          <label className="input-label">Username:</label>
          <input placeholder="Username" className="input-common" />
          <label className="input-label">Email:</label>
          <input type="email" placeholder="Email" className="input-common" />
          <label className="input-label">Password:</label>
          <input
            type="Password"
            placeholder="Password"
            className="input-common"
          />
          <div className="signup-links-container">
            By signing up, you agree the{" "}
            <Link href="/terms">
              <a>
                <span className="signup-link">Terms of Service</span>
              </a>
            </Link>{" "}
            and{" "}
            <Link href="/privacy">
              <a>
                <span className="signup-link">Privacy Policy</span>
              </a>
            </Link>
            , including{" "}
            <Link href="/cookies">
              <a>
                <span className="signup-link">Cookie</span>
              </a>
            </Link>{" "}
            use.
          </div>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <div className="auth-question-container">
            <span>Have an account?</span>
            <Link href="/login">
              <a className="auth-question-link">Sign In</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
