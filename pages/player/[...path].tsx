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

const getBodySection = (query: ParsedUrlQuery) => {
  let index = 0;
  let param = "";
  if (query.path) {
    const path = query.path[0];
    param = query.path[1];
    switch (path) {
      case "search":
        index = 1;
        break;
      case "playlist":
        index = 2;
        break;
      case "album":
        index = 3;
        break;
      case "artist":
        index = 4;
        break;
      default:
        index = 0;
        break;
    }
  }

  if (index === 1) {
    return <Search param={param} />;
  } else if (index === 2) {
    return <Playlist param={param} />;
  } else if (index === 3) {
    return <Album param={param} />;
  } else if (index === 4) {
    return <Artist param={param} />;
  } else {
    return <Home />;
  }
};

export default function Player() {
  const router = useRouter();
  const query = router.query;
  return (
    <div className="web-player-container">
      <div className="player-top-container">
        <UserSection />
        <BodySection>{getBodySection(query)}</BodySection>
      </div>
      <MusicPlayer />
    </div>
  );
}
