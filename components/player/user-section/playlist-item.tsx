import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./user-section.module.sass";

type PlaylistItemProps = {
  text: string;
  listId: string;
  icon?: IconProp;
};

const PlaylistItem = ({ text, listId, icon }: PlaylistItemProps) => {
  return (
    <Link href={"/player/playlist/" + listId}>
      <a className={styles.playlistItem}>
        {text}
        {icon && <FontAwesomeIcon icon={icon} />}
      </a>
    </Link>
  );
};

export default PlaylistItem;
