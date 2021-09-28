import Album from "../../common/album-item";
import Artist from "../../common/artist";
import { gql, useQuery } from "@apollo/client";
import {
  ArtistType,
  AlbumType,
  SongType,
} from "../../../utils/museon-music-player";

type SearchProps = {
  param: string;
};

const GET_SEARCH_RESULT = gql`
  query GetSearchResult($query: String!) {
    search(query: $query) {
      albums {
        id
        title
        cover
        songs {
          id
          title
          src
          album {
            id
            title
          }
          artists {
            id
            name
          }
        }
      }
      artists {
        id
        name
        cover
      }
      songs {
        id
        src
        title
        artists {
          id
          name
        }
        album {
          id
          title
          cover
        }
      }
    }
  }
`;

const Search = ({ param }: SearchProps) => {
  const { error, loading, data } = useQuery(GET_SEARCH_RESULT, {
    variables: {
      query: param,
    },
  });
  return loading || !data ? (
    <div className="player-home">
      <span className="player-welcome-text">Searching...</span>
    </div>
  ) : (
    <div className="player-home">
      <span className="player-welcome-text">
        Search results for &apos;{param}&apos;
      </span>
      {data.search.songs.length > 0 ? (
        <>
          <span className="player-home-title">Songs</span>
          <div className="player-album-container">
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
                  playlistId={album.id}
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
          <span className="player-home-title">Albums</span>
          <div className="player-album-container">
            {data.search.albums.map(
              ({ title, id, cover, songs }: AlbumType) => (
                <Album
                  key={id}
                  cover={cover}
                  playlist={songs}
                  playlistId={id}
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
          <span className="player-home-title">Artists</span>
          <div className="player-album-container">
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
