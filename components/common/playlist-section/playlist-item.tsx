import { useState, useEffect } from "react";
import { faHeart, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MMP, { ListType, SongType } from "../../../utils/museon-music-player";
import Image from "next/image";
import Link from "next/link";
import DropDown from "../dropdown";
import { useAppSelector } from "../../../app/hooks";
import { selectLikedSongs } from "../../../app/playerSlice";

type PlaylistItemProps = {
  likeSong: (song: SongType) => void;
  removeLike: (song: SongType) => void;
  updateList: (index: number) => void;
};

interface CombinedProps extends ListType, PlaylistItemProps {}

const PlaylistItem = ({
  id,
  title,
  album,
  artists,
  src,
  index,
  likeSong,
  removeLike,
  updateList,
}: CombinedProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const likedSongs = useAppSelector(selectLikedSongs);
  const mmp = MMP.instance;

  useEffect(() => {
    let isLiked = false;
    likedSongs.forEach((song) => {
      if (song.id === id) {
        isLiked = true;
      }
    });
    setIsLiked(isLiked);
  }, [id, likedSongs, setIsLiked]);

  const toggleLike = () => {
    if (isLiked) {
      removeLike({ id, title, album, artists, src });
    } else {
      likeSong({ id, title, album, artists, src });
    }
  };

  const addToQueue = () => {
    // TODO: fix queue bug
    // mmp.addToQueue({ id, title, album, artists, src });
  };

  return (
    <div
      className="playlist-table-item-container"
      onMouseEnter={() => {
        setIsMouseOn(true);
      }}
      onMouseLeave={() => {
        setIsMouseOn(false);
      }}
    >
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
        {isMouseOn ? (
          <div className="playlist-table-item-action" onClick={toggleLike}>
            <FontAwesomeIcon icon={isLiked ? faHeart : faHeartOutline} />
          </div>
        ) : (
          <div />
        )}
        {isMouseOn ? (
          <div
            className="playlist-table-item-action"
            onClick={() => {
              updateList(index || 0);
            }}
          >
            <FontAwesomeIcon icon={faPlayCircle} />
          </div>
        ) : (
          <div />
        )}
        <div className="playlist-table-item-action">
          <DropDown items={[{ title: "Add to queue", action: addToQueue }]}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </DropDown>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
