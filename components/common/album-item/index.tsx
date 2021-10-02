import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ListType, LIST_STATES } from "../../../utils/museon-music-player";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../../app/hooks";
import { setListID, setListState } from "../../../app/playerSlice";
import MMP from "../../../utils/museon-music-player";

type AlbumProps = {
  cover: string;
  playlist: Array<ListType>;
  playlistID: string;
  children: string;
  isPlaylist: boolean;
};

const Album = ({
  cover,
  playlist,
  playlistID,
  children,
  isPlaylist,
}: AlbumProps) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };

  const onPlayClicked = () => {
    MMP.instance.updateList(playlist, !isPlaylist, 0, playlistID);
    dispatch(setListID(playlistID));
    dispatch(
      setListState(isPlaylist ? LIST_STATES.Playlist : LIST_STATES.Album)
    );
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
          (isPlaylist ? "/player/playlist/" : "/player/album/") + playlistID
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
