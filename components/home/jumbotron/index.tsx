import Link from "next/link";
import { selectIsLoggedIn } from "../../../app/authSlice";
import { useAppSelector } from "../../../app/hooks";

const Jumbotron = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className="jumbotron-container">
      <span className="jumbotron-heading">Enjoy The Music Freedom</span>
      <span className="jumbotron-text">
        Free and open-source music platform.
      </span>
      {isLoggedIn ? (
        <Link href="/player">
          <a className="jumbotron-btn-join">Open Web Player</a>
        </Link>
      ) : (
        <Link href="/signup">
          <a className="jumbotron-btn-join">Join</a>
        </Link>
      )}
    </div>
  );
};

export default Jumbotron;
