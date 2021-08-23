type PlaylistProps = {
  param: string;
};

const Playlist = ({ param }: PlaylistProps) => {
  return <div>Playlist Page {param}</div>;
};

export default Playlist;
