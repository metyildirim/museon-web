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
import styles from "./header.module.sass";

const Header = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const username = useAppSelector(selectUsername);
  const [logout] = useMutation(LOGOUT_MUTATION);

  return (
    <div className={styles.header}>
      <Link href="/">
        <a>
          <div className={styles.logo}>
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
        <a className={styles.webPlayerButton}>Web Player</a>
      </Link>
      <Link href="/download">
        <a className={styles.downloadButton}>Download</a>
      </Link>
      <Divider />
      {isLoggedIn ? (
        <>
          <FontAwesomeIcon
            className={styles.userIcon}
            icon={faUserCircle}
            size="2x"
          />
          <span className={styles.username}>{username}</span>
          <button
            onClick={() => {
              logout();
              dispatch(signOut());
            }}
            className={styles.signupButton}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a className={styles.signinButton}>Sign In</a>
          </Link>
          <Link href="/signup">
            <a className={styles.signupButton}>Sign Up</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
