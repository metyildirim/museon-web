import Link from "next/link";
import { selectIsLoggedIn } from "../../../app/authSlice";
import { useAppSelector } from "../../../app/hooks";
import styles from "./jumbotron.module.sass";

const Jumbotron = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className={styles.container}>
      <span className={styles.heading}>Enjoy The Music Freedom</span>
      <span className={styles.description}>
        Free and open-source music platform.
      </span>
      {isLoggedIn ? (
        <Link href="/player">
          <a className={styles.button}>Open Web Player</a>
        </Link>
      ) : (
        <Link href="/signup">
          <a className={styles.button}>Join</a>
        </Link>
      )}
    </div>
  );
};

export default Jumbotron;
