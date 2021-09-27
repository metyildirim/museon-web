import { SongType } from "../../../utils/museon-music-player";
import PlaylistSection from "../../common/playlist-section";

type PlaylistProps = {
  param: string;
  likeSong: (song: SongType) => void;
  removeLike: (song: SongType) => void;
};

const Playlist = ({ param, likeSong, removeLike }: PlaylistProps) => {
  return (
    <PlaylistSection
      isAlbum={false}
      id={param}
      isLikes={param === "likes"}
      likeSong={likeSong}
      removeLike={removeLike}
    />
  );
};

export default Playlist;
