import PlaylistSection from "../../common/playlist-section";

type PlaylistProps = {
  param: string;
};

const Playlist = ({ param }: PlaylistProps) => {
  return (
    <PlaylistSection
      isAlbum={false}
      title="Daily Mix 1"
      src="https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2Fcover7.png?alt=media&token=36d5a7ed-3779-4fb6-9056-eabebc2003f8"
    />
  );
};

export default Playlist;
