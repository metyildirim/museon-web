import { useState } from "react";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PlaylistItem from "./playlist-item";
import { gql, useQuery } from "@apollo/client";
import MMP, { ListType, SongType } from "../../../utils/museon-music-player";
import { useAppSelector } from "../../../app/hooks";
import { selectLikedSongs } from "../../../app/playerSlice";

type PlaylistSectionProps = {
  isAlbum?: boolean;
  isLikes?: boolean;
  id: string;
  likeSong: (song: SongType) => void;
  removeLike: (song: SongType) => void;
};

const GET_ALBUM = gql`
  query GetAlbum($id: ID!) {
    album(id: $id) {
      id
      title
      cover
      songs {
        id
        title
        src
        album {
          id
          title
          cover
        }
        artists {
          id
          name
        }
      }
    }
  }
`;

const GET_PLAYLIST = gql`
  query GetPlaylist($id: ID!) {
    album: playlist(id: $id) {
      id
      title
      cover
      songs {
        id
        title
        src
        album {
          id
          title
          cover
        }
        artists {
          id
          name
        }
      }
    }
  }
`;

const PlaylistSection = ({
  isAlbum,
  isLikes,
  id,
  likeSong,
  removeLike,
}: PlaylistSectionProps) => {
  const { loading, error, data } = useQuery(
    isAlbum ? GET_ALBUM : GET_PLAYLIST,
    {
      variables: { id: id },
    }
  );
  const likedSongs = useAppSelector(selectLikedSongs);
  const [isPlaying, setPlaying] = useState(false);
  const [isActive, setActive] = useState(false);
  const mmp = MMP.instance;

  const updateList = (index: number, listID: string) => {
    mmp.updateList(
      isLikes ? likedSongs : data.album.songs,
      isAlbum || false,
      index,
      listID
    );
  };

  return loading ? (
    <div>LOADING...</div>
  ) : (
    <div className="player-playlist-section">
      <div className="player-playlist-header">
        <div className="player-playlist-image">
          {isLikes ? (
            <div className="playlist-likes-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          ) : (
            <Image
              src={data.album.cover}
              height="144px"
              width="144px"
              alt={data.album.title}
            />
          )}
        </div>
        <span className="player-playlist-title">
          {isLikes ? "Liked Songs" : data.album.title}
        </span>
        <div
          className={
            "playlist-play-btn " + (isPlaying ? "playlist-pause-btn" : "")
          }
          onClick={() => {
            if (!isActive) {
              updateList(0, isLikes ? "likes" : data.album.id);
              setActive(true);
              setPlaying(true);
            } else if (isPlaying) {
              mmp.pause();
              setPlaying(false);
            } else {
              mmp.play();
              setPlaying(true);
            }
          }}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </div>
      </div>
      <div className="playlist-table-titles">
        <div className="playlist-table-title-item w-1/12">#</div>
        <div className="playlist-table-title-item w-3/12">TITLE</div>
        <div className="playlist-table-title-item w-3/12">ARTISTS</div>
        <div className="playlist-table-title-item w-3/12">ALBUM</div>
        <div className="playlist-table-title-item w-2/12"></div>
      </div>
      <div className="playlist-table-items">
        {isLikes
          ? likedSongs.map(
              ({ id, title, src, artists, album }: ListType, index: number) => (
                <PlaylistItem
                  id={id}
                  key={index}
                  title={title}
                  album={album}
                  artists={artists}
                  src={src}
                  index={index}
                  likeSong={likeSong}
                  removeLike={removeLike}
                  updateList={updateList}
                  listID={isLikes ? "likes" : data.album.id}
                />
              )
            )
          : data.album.songs.map(
              ({ id, title, src, artists, album }: ListType, index: number) => (
                <PlaylistItem
                  id={id}
                  key={index}
                  title={title}
                  album={album}
                  artists={artists}
                  src={src}
                  index={index}
                  likeSong={likeSong}
                  removeLike={removeLike}
                  updateList={updateList}
                  listID={isLikes ? "likes" : data.album.id}
                />
              )
            )}
      </div>
    </div>
  );
};

export default PlaylistSection;
