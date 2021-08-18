import MusicPlayer from "../../components/player/music-player";
import UserSection from "../../components/player/user-section";
import BodySection from "../../components/player/body-section";

export default function Player() {
  return (
    <div className="web-player-container">
      <div className="player-top-container">
        <UserSection />
        <BodySection />
      </div>
      <MusicPlayer />
    </div>
  );
}
