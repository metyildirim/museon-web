import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PlaylistItemProps = {
  text: string;
  listId: string;
  icon?: IconProp;
};

const PlaylistItem = ({ text, listId, icon }: PlaylistItemProps) => {
  return (
    <Link href={"/player/playlist/" + listId}>
      <a className="player-playlist-item">
        {text}
        {icon && <FontAwesomeIcon icon={icon} />}
      </a>
    </Link>
  );
};

export default PlaylistItem;
