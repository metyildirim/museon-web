import { useState } from "react";
import Link from "next/link";
import GoogleLoginButton from "./google-login-button";
import AppleLoginButton from "./apple-login-button";
import AuthDivider from "../common/auth-divider";
import Heading from "../common/heading";
import Switch from "../common/switch";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username_email: yup.string().required().min(4).label("Username or Email"),
  password: yup.string().required().min(6).label("Password"),
});

const initialValues = {
  username_email: "",
  password: "",
};

const Login = () => {
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [usernameErrorVisibility, setUsernameErrorVisibility] = useState(false);
  const [passwordErrorVisibility, setPasswordErrorVisibility] = useState(false);

  const onLogin = (values: typeof initialValues) => {
    alert(JSON.stringify(values));
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onLogin,
  });

  return (
    <div className="common-container">
      <Heading>Sign In</Heading>
      <div className="common-auth-container">
        <span className="auth-description">It&apos;s always free and open</span>
        <GoogleLoginButton />
        <AppleLoginButton />
        <AuthDivider />
        <form
          className="form-common"
          onSubmit={(e) => {
            setUsernameErrorVisibility(true);
            setPasswordErrorVisibility(true);
            formik.handleSubmit(e);
          }}
        >
          <label className="input-label" htmlFor="username_email">
            Username or Email:
          </label>
          <input
            placeholder="Username or Email"
            className={
              usernameErrorVisibility && formik.errors.username_email
                ? "input-common input-common-error"
                : "input-common"
            }
            id="username_email"
            name="username_email"
            onChange={formik.handleChange}
            value={formik.values.username_email}
            onBlur={() => {
              setUsernameErrorVisibility(true);
            }}
          />
          <span className="form-error-message">
            {usernameErrorVisibility && formik.errors.username_email}
          </span>
          <label htmlFor="password" className="input-label">
            Password:
          </label>
          <input
            type="Password"
            placeholder="Password"
            className={
              passwordErrorVisibility && formik.errors.password
                ? "input-common input-common-error"
                : "input-common"
            }
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={() => {
              setPasswordErrorVisibility(true);
            }}
          />
          <span className="form-error-message">
            {passwordErrorVisibility && formik.errors.password}
          </span>
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
