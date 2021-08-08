import { useState } from "react";
import Link from "next/link";
import GoogleLoginButton from "./google-login-button";
import AppleLoginButton from "./apple-login-button";
import AuthDivider from "../common/auth-divider";
import Heading from "../common/heading";
import Switch from "../common/switch";

const onLogin = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // TODO: login
};

const Login = () => {
  const [staySignedIn, setStaySignedIn] = useState(true);

  return (
    <div className="common-container">
      <Heading>Sign In</Heading>
      <div className="common-auth-container">
        <span className="auth-description">It&apos;s always free and open</span>
        <GoogleLoginButton />
        <AppleLoginButton />
        <AuthDivider />
        <form className="form-common" onSubmit={onLogin}>
          <label className="input-label">Username or Email:</label>
          <input placeholder="Username or Email" className="input-common" />
          <label className="input-label">Password:</label>
          <input
            type="Password"
            placeholder="Password"
            className="input-common"
          />
          <Link href="/reset-password">
            <a className="reset-password">Forgot your password?</a>
          </Link>
          <div className="login-switch-container">
            <Switch
              checked={staySignedIn}
              onChange={setStaySignedIn}
              className="login-switch"
            />
            <span className="stay-signed-in">Stay signed in</span>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <div className="auth-question-container">
            <span>Don&apos;t have an account?</span>
            <Link href="/signup">
              <a className="auth-question-link">Sign Up</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
