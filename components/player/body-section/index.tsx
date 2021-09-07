import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
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

enum RouteActions {
  NEW_ROUTE,
  BACK,
  FORWARD,
}

const routeStack: Array<string> = [];
let routeAction = RouteActions.NEW_ROUTE;
let routeIndex = 0;
let isInitialPath = true;
let shouldClearHistory = false;

const BodySection = ({ children }: BodySectionProps) => {
  const router = useRouter();
  const [disabledHome, setDisabledHome] = useState(true);
  const [disabledBack, setDisabledBack] = useState(true);
  const [disabledForward, setDisabledForward] = useState(true);

  const onHomeClicked = () => {
    router.push("/player/home", undefined, { shallow: true });
    setDisabledHome(true);
  };

  const onBackClicked = () => {
    routeAction = RouteActions.BACK;
    shouldClearHistory = true;
    router.push(routeStack[routeIndex - 1], undefined, { shallow: true });
  };

  const onForwardClicked = () => {
    routeAction = RouteActions.FORWARD;
    router.push(routeStack[routeIndex + 1], undefined, { shallow: true });
  };

  const onRouteChanged = (url: string) => {
    if (routeAction === RouteActions.NEW_ROUTE) {
      if (shouldClearHistory) {
        routeStack.splice(routeIndex + 1);
        setDisabledForward(true);
        shouldClearHistory = false;
      }
      if (!isInitialPath) {
        setDisabledBack(false);
        routeIndex += 1;
      } else {
        isInitialPath = false;
      }
      routeStack.push(url);
    } else if (routeAction === RouteActions.BACK) {
      routeIndex -= 1;
      if (routeIndex === 0) {
        setDisabledBack(true);
      }
      setDisabledForward(false);
    } else {
      routeIndex += 1;
      if (routeIndex === routeStack.length - 1) {
        setDisabledForward(true);
      }
      setDisabledBack(false);
    }

    routeAction = RouteActions.NEW_ROUTE;
    if (url === "/player/home") {
      setDisabledHome(true);
    } else {
      setDisabledHome(false);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", onRouteChanged);
    return () => {
      router.events.off("routeChangeComplete", onRouteChanged);
    };
  });

  return (
    <div className="player-body-section">
      <div className="player-body-header">
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
