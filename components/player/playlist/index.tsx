import PlaylistSection from "../../common/playlist-section";

type PlaylistProps = {
  param: string;
};

const Playlist = ({ param }: PlaylistProps) => {
  return <PlaylistSection isAlbum={false} id={param} />;
};

export default Playlist;
