import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";

type MusicInfoProps = {
  isLiked: boolean;
  artists: Array<string>;
  song: string;
};

const MusicInfo = ({ isLiked, artists, song }: MusicInfoProps) => {
  return (
    <div className="player-music-info">
      <div className="player-song-name">{song}</div>
      <div className="player-like">
        <FontAwesomeIcon icon={faHeartOutline} />
      </div>

      <div className="player-artists">
        {artists.map((artist, index) => (
          <div key={artist} className="player-artist-link">
            <Link href={"/player/artist/" + artist.toLowerCase()}>
              <a>{artist + (index !== artists.length - 1 ? ", " : "")}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicInfo;
