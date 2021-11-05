import Album from "../../common/album-item";
import Artist from "../../common/artist";
import { useQuery } from "@apollo/client";
import { GET_FEATURED } from "../../../app/queries";
import { ArtistType, AlbumType } from "../../../utils/museon-music-player";
import Spinner from "../../common/spinner";
import styles from "./home.module.sass";

const Home = () => {
  const { loading, error, data } = useQuery(GET_FEATURED);
  return loading ? (
    <div className={styles.home}>
      <Spinner />
    </div>
  ) : (
    <div className={styles.home}>
      <span className={styles.welcomeText}>Welcome to Museon!</span>
      <span className={styles.homeTitle}>Featured playlists</span>
      <div className={styles.albumContainer}>
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
      <span className={styles.homeTitle}>Featured artists</span>
      <div className={styles.albumContainer}>
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
