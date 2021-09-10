import { useState } from "react";
import Link from "next/link";
import GoogleLoginButton from "../login/google-login-button";
import AppleLoginButton from "../login/apple-login-button";
import AuthDivider from "../common/auth-divider";
import Heading from "../common/heading";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required().min(4).label("Username"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(6).label("Password"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [emailErrorVisibility, setEmailErrorVisibility] = useState(false);
  const [usernameErrorVisibility, setUsernameErrorVisibility] = useState(false);
  const [passwordErrorVisibility, setPasswordErrorVisibility] = useState(false);

  const onRegister = (values: typeof initialValues) => {
    alert(JSON.stringify(values));
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onRegister,
  });

  return (
    <div className="common-container">
      <Heading>Sign Up</Heading>
      <div className="common-auth-container">
        <span className="auth-description">It&apos;s always free and open</span>
        <GoogleLoginButton />
        <AppleLoginButton />
        <AuthDivider />
        <form
          className="form-common"
          onSubmit={(e) => {
            setEmailErrorVisibility(true);
            setUsernameErrorVisibility(true);
            setPasswordErrorVisibility(true);
            formik.handleSubmit(e);
          }}
        >
          <label htmlFor="username" className="input-label">
            Username:
          </label>
          <input
            placeholder="Username"
            className={
              usernameErrorVisibility && formik.errors.username
                ? "input-common input-common-error"
                : "input-common"
            }
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={() => {
              setUsernameErrorVisibility(true);
            }}
          />
          <span className="form-error-message">
            {usernameErrorVisibility && formik.errors.username}
          </span>
          <label htmlFor="email" className="input-label">
            Email:
          </label>
          <input
            type="email"
            placeholder="Email"
            className={
              emailErrorVisibility && formik.errors.email
                ? "input-common input-common-error"
                : "input-common"
            }
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={() => {
              setEmailErrorVisibility(true);
            }}
          />
          <span className="form-error-message">
            {emailErrorVisibility && formik.errors.email}
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
