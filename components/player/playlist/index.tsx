import { LIST_STATES, SongType } from "../../../utils/museon-music-player";
import PlaylistSection from "../../common/playlist-section";

type PlaylistProps = {
  param: string;
  likeSong: (song: SongType) => void;
  removeLike: (song: SongType) => void;
};

const Playlist = ({ param, likeSong, removeLike }: PlaylistProps) => {
  return (
    <PlaylistSection
      listState={param === "likes" ? LIST_STATES.Likes : LIST_STATES.Playlist}
      id={param}
      likeSong={likeSong}
      removeLike={removeLike}
    />
  );
};

export default Playlist;
