import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthState, selectIsLoggedIn, signIn } from "../../app/authSlice";
import Link from "next/link";
import GoogleLoginButton from "../login/google-login-button";
import AppleLoginButton from "../login/apple-login-button";
import AuthDivider from "../common/auth-divider";
import Heading from "../common/heading";
import Spinner from "../common/spinner";
import { useMutation, gql } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      result {
        id
        username
      }
      error
    }
  }
`;

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

let registerErrorSet = false;

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErrorVisibility, setEmailErrorVisibility] = useState(false);
  const [usernameErrorVisibility, setUsernameErrorVisibility] = useState(false);
  const [passwordErrorVisibility, setPasswordErrorVisibility] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [register, { data, error }] = useMutation(REGISTER_MUTATION);
  const { next } = router.query;

  const onRegister = (values: typeof initialValues) => {
    setIsLoading(true);
    registerErrorSet = false;
    register({
      variables: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/${next || ""}`, undefined, { shallow: true });
    }
    if (error && !registerErrorSet) {
      registerErrorSet = true;
      setRegisterError(error.message);
      setIsLoading(false);
    }
    if (data) {
      if (data.register.result) {
        const result: AuthState = data.register.result;
        dispatch(
          signIn({
            id: result.id,
            username: result.username,
            isLoggedIn: true,
          })
        );
      } else if (!registerErrorSet) {
        registerErrorSet = true;
        setRegisterError(data.register.error);
        setIsLoading(false);
      }
    }
  }, [setRegisterError, data, error, router, isLoggedIn, dispatch, next]);

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
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
          <span className="form-error-general">{registerError}</span>
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
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
          <div className="auth-question-container">
            <span>Have an account?</span>
            <Link href={`/login${next ? `?next=${next}` : ""}`}>
              <a className="auth-question-link">Sign In</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
