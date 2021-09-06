import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListType } from "../../../utils/museon-music-player";
import Image from "next/image";
import Link from "next/link";

const PlaylistItem = ({ title, album, artists, src, index }: ListType) => {
  return (
    <div className="playlist-table-item-container">
      <div className="playlist-table-item w-1/12">
        {index !== undefined ? index + 1 : null}
        <Image src={album.cover} height="36px" width="36px" alt="cover" />
      </div>
      <div className="playlist-table-item w-3/12">{title}</div>
      <div className="playlist-table-item w-3/12">
        <div>
          {artists.map((artist, index) => (
            <Link key={artist.id} href={"/player/artist/" + artist.id}>
              <a className="player-artist-link">
                {artist.name + (index === artists.length - 1 ? "" : ", ")}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="playlist-table-item w-3/12">
        <Link href={"/player/album/" + album.id}>
          <a className="player-artist-link">{album.title}</a>
        </Link>
      </div>
      <div className="playlist-table-item w-2/12">
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
};

export default PlaylistItem;
