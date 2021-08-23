import Link from "next/link";
import Image from "next/image";
import Divider from "./divider";

const Header = () => {
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
          <a className="header-btn">Web Player</a>
        </Link>
        <Link href="/download">
          <a className="header-btn">Download</a>
        </Link>
        <Divider className="header-divider" />
        <Link href="/login">
          <a className="header-btn">Sign In</a>
        </Link>
        <Link href="/signup">
          <a className="header-btn-signup">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
