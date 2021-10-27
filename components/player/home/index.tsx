import Album from "../../common/album-item";
import Artist from "../../common/artist";
import { useQuery } from "@apollo/client";
import { GET_FEATURED } from "../../../app/queries";
import { ArtistType, AlbumType } from "../../../utils/museon-music-player";
import Spinner from "../../common/spinner";

const Home = () => {
  const { loading, error, data } = useQuery(GET_FEATURED);
  return loading ? (
    <div className="player-home">
      <Spinner />
    </div>
  ) : (
    <div className="player-home">
      <span className="player-welcome-text">Welcome to Museon!</span>
      <span className="player-home-title">Featured playlists</span>
      <div className="player-album-container">
        {data.featured.playlists.map(
          ({ title, id, cover, songs }: AlbumType) => (
            <Album
              key={id}
              cover={cover}
              playlist={songs}
              playlistID={id}
              isPlaylist={true}
            >
              {title}
            </Album>
          )
        )}
      </div>
      <span className="player-home-title">Featured artists</span>
      <div className="player-album-container">
        {data.featured.artists.map(({ id, name, cover }: ArtistType) => (
          <Artist key={id} cover={cover} artistId={id}>
            {name}
          </Artist>
        ))}
      </div>
    </div>
  );
};

export default Home;
