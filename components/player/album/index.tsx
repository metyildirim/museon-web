import PlaylistSection from "../../common/playlist-section";

type AlbumProps = {
  param: string;
};

const Album = ({ param }: AlbumProps) => {
  return <PlaylistSection isAlbum={true} id={param} />;
};

export default Album;
