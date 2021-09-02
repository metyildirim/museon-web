type SearchProps = {
  param: string;
};

const Search = ({ param }: SearchProps) => {
  return <div>Searching {param}</div>;
};

export default Search;
