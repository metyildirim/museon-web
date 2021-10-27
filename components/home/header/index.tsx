import Link from "next/link";
import Image from "next/image";
import Divider from "./divider";
import {
  selectIsLoggedIn,
  selectUsername,
  signOut,
} from "../../../app/authSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../../../app/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

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
            <Image
              height="max-content"
              width="max-content"
              src="/logo.svg"
              alt="logo"
            />
          </div>
        </a>
      </Link>
      <Link href="/player/home">
        <a className="header-btn md-visible ml-auto">Web Player</a>
      </Link>
      <Link href="/download">
        <a className="header-btn ml-auto md:ml-6 ">Download</a>
      </Link>
      <Divider className="header-divider md-visible" />
      {isLoggedIn ? (
        <>
          <FontAwesomeIcon
            className="ml-6 md-visible"
            icon={faUserCircle}
            size="2x"
          />
          <span className="header-username md-visible">{username}</span>
          <button
            onClick={() => {
              logout();
              dispatch(signOut());
            }}
            className="header-btn-signup"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a className="header-btn ml-6">Sign In</a>
          </Link>
          <Link href="/signup">
            <a className="header-btn-signup md-visible">Sign Up</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
