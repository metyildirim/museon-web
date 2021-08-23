type ArtistProps = {
  param: string;
};

const Artist = ({ param }: ArtistProps) => {
  return <div>Artist Page {param}</div>;
};

export default Artist;
