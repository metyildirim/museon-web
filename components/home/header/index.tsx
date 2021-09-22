import Link from "next/link";
import Image from "next/image";
import Divider from "./divider";
import {
  selectIsLoggedIn,
  selectUsername,
  signOut,
} from "../../../app/authSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

const Header = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const username = useAppSelector(selectUsername);
  const [logout] = useMutation(LOGOUT_MUTATION);

  return (
    <div className="header">
      <Link href="/">
        <a>
          <div className="header-logo">
            <Image height="50px" width="165px" src="/logo.svg" alt="logo" />
          </div>
        </a>
      </Link>
      <div className="header-btn-container">
        <Link href="/player/home">
          <a className="header-btn" target="_top">
            Web Player
          </a>
        </Link>
        <Link href="/download">
          <a className="header-btn">Download</a>
        </Link>
        <Divider className="header-divider" />
        {isLoggedIn ? (
          <div className="header-auth-container">
            <FontAwesomeIcon className="ml-6" icon={faUserCircle} size="2x" />
            <span className="header-username">{username}</span>
            <button
              onClick={() => {
                logout();
                dispatch(signOut());
              }}
              className="header-btn-signup"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="header-auth-container">
            <Link href="/login">
              <a className="header-btn">Sign In</a>
            </Link>
            <Link href="/signup">
              <a className="header-btn-signup">Sign Up</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
