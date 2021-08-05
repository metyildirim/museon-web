import Link from "next/link";
import Image from "next/image";

const CommonHeader = () => {
  return (
    <div className="common-header-container">
      <Link href="/">
        <a>
          <div className="common-header-logo">
            <Image src="/logo.svg" alt="logo" height="50px" width="165px" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CommonHeader;
