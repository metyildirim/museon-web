import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavigationButton from "./navigation-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

type BodySectionProps = {
  children: JSX.Element;
};

const BodySection = ({ children }: BodySectionProps) => {
  const [disabledHome, setDisabledHome] = useState(false);
  const [disabledBack, setDisabledBack] = useState(true);
  const [disabledForward, setDisabledForward] = useState(true);
  const onHomeClicked = () => {};
  const onBackClicked = () => {};
  const onForwardClicked = () => {};
  return (
    <div className="player-body-section">
      <div className="player-body-header">
        <Link href="/">
          <a>
            <div className="common-header-logo">
              <Image src="/logo.svg" alt="logo" height="50px" width="150px" />
            </div>
          </a>
        </Link>
        <div className="player-navigation-container">
          <NavigationButton
            onClick={onHomeClicked}
            icon={faHome}
            disabled={disabledHome}
          />
          <NavigationButton
            onClick={onBackClicked}
            icon={faChevronLeft}
            disabled={disabledBack}
          />
          <NavigationButton
            onClick={onForwardClicked}
            icon={faChevronRight}
            disabled={disabledForward}
          />
        </div>
        <div className="search-container">
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
          <input
            placeholder="Search anything..."
            className="input-common input-search"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default BodySection;
