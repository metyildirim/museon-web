import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListType } from "../../../utils/museon-music-player";
import Image from "next/image";

const PlaylistItem = ({
  title,
  album,
  artists,
  cover,
  src,
  index,
}: ListType) => {
  const artistNames: Array<string> = [];
  artists.forEach(({ name }) => {
    artistNames.push(name);
  });
  return (
    <div className="playlist-table-item-container">
      <div className="playlist-table-item w-1/12">
        {index !== undefined ? index + 1 : null}
        <Image src={cover} height="36px" width="36px" alt="cover" />
      </div>
      <div className="playlist-table-item w-3/12">{title}</div>
      <div className="playlist-table-item w-3/12">{artistNames.join(", ")}</div>
      <div className="playlist-table-item w-3/12">{album}</div>
      <div className="playlist-table-item w-2/12">
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
};

export default PlaylistItem;
