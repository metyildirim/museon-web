import Link from "next/link";
import Image from "next/image";
import Divider from "./divider";

const Header = () => {
  return (
    <div className="header">
      <Link href="/">
        <a>
          <div className="logo-container">
            <Image height="50px" width="165px" src="/logo.svg" alt="logo" />
          </div>
        </a>
      </Link>
      <div className="header-btn-container">
        <Link href="/">
          <a className="header-btn">Web Player</a>
        </Link>
        <Link href="/">
          <a className="header-btn">Download</a>
        </Link>
        <Divider className="header-divider" />
        <Link href="/">
          <a className="header-btn">Sign In</a>
        </Link>
        <Link href="/join">
          <a className="header-btn-join">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
