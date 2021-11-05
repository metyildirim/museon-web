import Image from "next/image";
import Album from "../../common/album-item";
import { useQuery } from "@apollo/client";
import { GET_ARTIST_DATA } from "../../../app/queries";
import Spinner from "../../common/spinner";
import styles from "./artist.module.sass";

type ArtistProps = {
  param: string;
};

const Artist = ({ param }: ArtistProps) => {
  const { loading, error, data } = useQuery(GET_ARTIST_DATA, {
    variables: { id: param },
  });

  return loading ? (
    <div className={styles.container}>
      <Spinner />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={data.artist.cover}
          height="128px"
          width="128px"
          alt={data.artist.name}
        />
        <span className={styles.name}>{data.artist.name}</span>
      </div>
      <div className={styles.appearsOn}>
        <span className={styles.textAppearsOn}>Appears On</span>
        <div className={styles.appearsOnContainer}>
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
