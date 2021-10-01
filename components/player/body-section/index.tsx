import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import NavigationButton from "./navigation-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { selectID } from "../../../app/authSlice";
import { setLikes } from "../../../app/playerSlice";
import { useQuery, gql } from "@apollo/client";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

const GET_LIKES = gql`
  query GetLikes($id: ID!) {
    likes(id: $id) {
      id
      title
      src
      album {
        id
        title
        cover
      }
      artists {
        id
        name
      }
    }
  }
`;

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
let likedSongsFetched = false;

const BodySection = ({ children }: BodySectionProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [disabledHome, setDisabledHome] = useState(true);
  const [disabledBack, setDisabledBack] = useState(true);
  const [disabledForward, setDisabledForward] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const userID = useAppSelector(selectID);
  const { data, loading, error } = useQuery(GET_LIKES, {
    variables: { id: userID },
  });

  if (data && !likedSongsFetched) {
    dispatch(setLikes(data.likes));
    likedSongsFetched = true;
  }

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
    if (url === routeStack[routeIndex]) {
      return;
    }
    if (url.includes("/player/search")) {
      setDisabledHome(false);
      return;
    } else {
      setSearchValue("");
    }
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

  const onSearchTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    router.push("/player/search/" + value, undefined, {
      shallow: true,
    });
    setSearchValue(value);
  };

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
            value={searchValue}
            onChange={onSearchTextChanged}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default BodySection;
