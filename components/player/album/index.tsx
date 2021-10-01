import { LIST_STATES, SongType } from "../../../utils/museon-music-player";
import PlaylistSection from "../../common/playlist-section";

type AlbumProps = {
  param: string;
  likeSong: (song: SongType) => void;
  removeLike: (song: SongType) => void;
};

const Album = ({ param, likeSong, removeLike }: AlbumProps) => {
  return (
    <PlaylistSection
      listState={LIST_STATES.Album}
      id={param}
      likeSong={likeSong}
      removeLike={removeLike}
    />
  );
};

export default Album;
