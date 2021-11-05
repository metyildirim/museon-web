import Album from "../../common/album-item";
import Artist from "../../common/artist";
import { useQuery } from "@apollo/client";
import { GET_SEARCH_RESULT } from "../../../app/queries";
import {
  ArtistType,
  AlbumType,
  SongType,
} from "../../../utils/museon-music-player";
import styles from "./search.module.sass";

type SearchProps = {
  param: string;
};

const Search = ({ param }: SearchProps) => {
  const { error, loading, data } = useQuery(GET_SEARCH_RESULT, {
    variables: {
      query: param,
    },
  });
  return loading || !data ? (
    <div className={styles.searchContainer}>
      <span className={styles.searchText}>Searching...</span>
    </div>
  ) : (
    <div className={styles.searchContainer}>
      <span className={styles.searchText}>
        Search results for &apos;{param}&apos;
      </span>
      {data.search.songs.length > 0 ? (
        <>
          <span className={styles.title}>Songs</span>
          <div className={styles.container}>
            {data.search.songs.map(
              ({ id, title, album, artists, src }: SongType) => (
                <Album
                  key={title}
                  cover={album.cover}
                  playlist={[
                    {
                      id: id,
                      album: album,
                      title: title,
                      artists: artists,
                      src: src,
                    },
                  ]}
                  playlistID={album.id}
                  isPlaylist={false}
                >
                  {title}
                </Album>
              )
            )}
          </div>
        </>
      ) : null}
      {data.search.albums.length > 0 ? (
        <>
          <span className={styles.title}>Albums</span>
          <div className={styles.container}>
            {data.search.albums.map(
              ({ title, id, cover, songs }: AlbumType) => (
                <Album
                  key={id}
                  cover={cover}
                  playlist={songs}
                  playlistID={id}
                  isPlaylist={false}
                >
                  {title}
                </Album>
              )
            )}
          </div>
        </>
      ) : null}
      {data.search.artists.length > 0 ? (
        <>
          <span className={styles.title}>Artists</span>
          <div className={styles.container}>
            {data.search.artists.map(({ id, name, cover }: ArtistType) => (
              <Artist key={id} cover={cover} artistId={id}>
                {name}
              </Artist>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Search;
