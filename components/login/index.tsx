import { useState } from "react";
import Link from "next/link";
import GoogleLoginButton from "./google-login-button";
import AppleLoginButton from "./apple-login-button";
import LoginDivider from "./login-divider";
import Heading from "../common/heading";
import Switch from "../common/switch";

const Login = () => {
  const [staySignedIn, setStaySignedIn] = useState(true);

  return (
    <div className="login-section-container">
      <Heading>Sign In</Heading>
      <div className="social-login-container">
        <span className="login-description">
          It&apos;s always free and open
        </span>
        <GoogleLoginButton />
        <AppleLoginButton />
        <LoginDivider />
        <form
          className="form-common"
          onSubmit={(event) => {
            event.preventDefault();
            // TODO: login
          }}
        >
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
          <div className="login-signup-container">
            <span>Don&apos;t have an account?</span>
            <Link href="/signup">
              <a className="login-signup-link">Sign Up</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
