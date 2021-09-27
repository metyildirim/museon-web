import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { AlbumType, ArtistType } from "../../../utils/museon-music-player";

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
    <div className="player-music-info">
      <div className="player-song-name">{song}</div>
      <div className={`player-like ${isLiked ? "player-like-liked" : ""}`}>
        <button className="common-btn" onClick={toggleLike}>
          <FontAwesomeIcon icon={isLiked ? faHeart : faHeartOutline} />
        </button>
      </div>
      <div className="player-album-name">
        <Link href={"/player/album/" + album.id}>
          <a>{album.title}</a>
        </Link>
      </div>
      <div className="player-artists">
        {artists.map((artist, index) => (
          <div key={artist.id} className="player-artist-link">
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
