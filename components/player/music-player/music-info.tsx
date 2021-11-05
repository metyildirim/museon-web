import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { AlbumType, ArtistType } from "../../../utils/museon-music-player";
import styles from "./music-player.module.sass";

type MusicInfoProps = {
  isLiked: boolean;
  artists: Array<ArtistType>;
  song: string;
  album: AlbumType;
  toggleLike: () => void;
};

const MusicInfo = ({
  isLiked,
  artists,
  song,
  album,
  toggleLike,
}: MusicInfoProps) => {
  return (
    <div className={styles.musicInfo}>
      <div className={styles.songName}>{song}</div>
      <div className={isLiked ? styles.liked : styles.like}>
        <button className="common-btn" onClick={toggleLike}>
          <FontAwesomeIcon icon={isLiked ? faHeart : faHeartOutline} />
        </button>
      </div>
      <div className={styles.albumTitle}>
        <Link href={"/player/album/" + album.id}>
          <a>{album.title}</a>
        </Link>
      </div>
      <div className={styles.artists}>
        {artists.map((artist, index) => (
          <div key={artist.id} className={styles.artistLink}>
            <Link href={"/player/artist/" + artist.id}>
              <a className="ml-1">
                {artist.name + (index !== artists.length - 1 ? ", " : "")}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicInfo;
