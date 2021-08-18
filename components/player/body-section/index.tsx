import Link from "next/link";
import Image from "next/image";

const BodySection = () => {
  return (
    <div className="player-body-section">
      <div className="player-body-header">
        <Link href="/">
          <a>
            <div className="common-header-logo">
              <Image
                src="/logo-simple.svg"
                alt="logo"
                height="50px"
                width="50px"
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BodySection;
