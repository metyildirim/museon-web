import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthState, selectIsLoggedIn, signIn } from "../../app/authSlice";
import { useMutation, gql } from "@apollo/client";
import { useFormik } from "formik";
import Link from "next/link";
import GoogleLoginButton from "./google-login-button";
import AppleLoginButton from "./apple-login-button";
import AuthDivider from "../common/auth-divider";
import Heading from "../common/heading";
import Switch from "../common/switch";
import * as yup from "yup";

const LOGIN_MUTATION = gql`
  mutation Login($username_email: String!, $password: String!) {
    login(username_email: $username_email, password: $password) {
      result {
        id
        username
      }
      error
    }
  }
`;

const validationSchema = yup.object().shape({
  username_email: yup.string().required().min(4).label("Username or Email"),
  password: yup.string().required().min(6).label("Password"),
});

const initialValues = {
  username_email: "",
  password: "",
};

let loginErrorSet = false;

const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [usernameErrorVisibility, setUsernameErrorVisibility] = useState(false);
  const [passwordErrorVisibility, setPasswordErrorVisibility] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [login, { data, error }] = useMutation(LOGIN_MUTATION);
  const { next } = router.query;

  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/${next || ""}`, undefined, { shallow: true });
    }
    if (error && !loginErrorSet) {
      loginErrorSet = true;
      setLoginError(error.message);
    }
    if (data) {
      if (data.login.result) {
        const result: AuthState = data.login.result;
        dispatch(
          signIn({
            id: result.id,
            username: result.username,
            isLoggedIn: true,
          })
        );
      } else if (!loginErrorSet) {
        loginErrorSet = true;
        setLoginError(data.login.error);
      }
    }
  }, [setLoginError, data, error, router, isLoggedIn, dispatch, next]);

  const onLogin = async (values: typeof initialValues) => {
    loginErrorSet = false;
    login({
      variables: {
        username_email: values.username_email,
        password: values.password,
      },
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
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
          <span className="form-error-general">{loginError}</span>
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
            <Link href={`/signup${next ? `?next=${next}` : ""}`}>
              <a className="auth-question-link">Sign Up</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
