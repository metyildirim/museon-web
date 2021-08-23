type AlbumProps = {
  param: string;
};

const Album = ({ param }: AlbumProps) => {
  return <div>Album Page {param}</div>;
};

export default Album;
