import Image from "next/image";
import Album from "../../common/album-item";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../../common/spinner";

type ArtistProps = {
  param: string;
};

const GET_ARTIST_DATA = gql`
  query GetArtistData($id: ID!) {
    artist(id: $id) {
      cover
      name
      songs {
        album {
          id
          title
          cover
          songs {
            title
            src
            album {
              id
              cover
              title
            }
            artists {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const Artist = ({ param }: ArtistProps) => {
  const { loading, error, data } = useQuery(GET_ARTIST_DATA, {
    variables: { id: param },
  });

  return loading ? (
    <div className="player-artist-section">
      <Spinner />
    </div>
  ) : (
    <div className="player-artist-section">
      <div className="player-artist-header">
        <Image
          src={data.artist.cover}
          height="128px"
          width="128px"
          alt={data.artist.name}
        />
        <span className="player-artist-name">{data.artist.name}</span>
      </div>
      <div className="player-artist-appears-on">
        <span className="text-appears-on">Appears On</span>
        <div className="artist-appears-on-container">
          {data.artist.songs.map(({ album }: any) => (
            <Album
              key={album.id}
              playlist={album.songs}
              playlistID={album.id}
              cover={album.cover}
              isPlaylist={false}
            >
              {album.title}
            </Album>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
