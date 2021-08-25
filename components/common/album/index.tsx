import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ListType } from "../../../utils/museon-music-player";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MMP from "../../../utils/museon-music-player";

type AlbumProps = {
  cover: string;
  playlist: Array<ListType>;
  playlistId: string;
  children: string;
  isPlaylist: boolean;
};

const Album = ({
  cover,
  playlist,
  playlistId,
  children,
  isPlaylist,
}: AlbumProps) => {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  const onPlayClicked = () => {
    MMP.instance.updateList(playlist, 0);
  };
  return (
    <div className="album-item">
      <div
        className="album-item-cover"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isHover ? (
          <button className="common-btn album-play-btn" onClick={onPlayClicked}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        ) : null}
        <Image src={cover} alt="cover" height="128px" width="128px" />
      </div>
      <Link
        href={
          (isPlaylist ? "/player/playlist/" : "/player/album/") + playlistId
        }
      >
        <a>
          <span className="album-item-title">{children}</span>
        </a>
      </Link>
    </div>
  );
};

export default Album;