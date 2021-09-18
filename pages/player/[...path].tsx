import React from "react";
import { useRouter } from "next/router";
import MusicPlayer from "../../components/player/music-player";
import UserSection from "../../components/player/user-section";
import BodySection from "../../components/player/body-section";
import Home from "../../components/player/home";
import Search from "../../components/player/search";
import Playlist from "../../components/player/playlist";
import Artist from "../../components/player/artist";
import Album from "../../components/player/album";
import { ParsedUrlQuery } from "querystring";
import { useAppSelector } from "../../app/hooks";
import { selectIsLoggedIn } from "../../app/authSlice";
import AppLogin from "../../components/login";

const getBodySection = (query: ParsedUrlQuery) => {
  if (query.path) {
    const path = query.path[0];
    const param = query.path[1];
    if (path === "search") {
      return <Search param={param} />;
    } else if (path === "playlist") {
      return <Playlist param={param} />;
    } else if (path === "album") {
      return <Album param={param} />;
    } else if (path === "artist") {
      return <Artist param={param} />;
    }
  }
  return <Home />;
};

export default function Player() {
  const router = useRouter();
  const query = router.query;
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className="web-player-container">
      {isLoggedIn ? (
        <React.Fragment>
          <div className="player-top-container">
            <UserSection />
            <BodySection>{getBodySection(query)}</BodySection>
          </div>
          <MusicPlayer />
        </React.Fragment>
      ) : (
        <div className="player-login-container">
          <AppLogin />
        </div>
      )}
    </div>
  );
}
