import { useState } from "react";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PlaylistItem from "./playlist-item";
import { gql, useQuery } from "@apollo/client";
import MMP, { ListType } from "../../../utils/museon-music-player";
import { selectID } from "../../../app/authSlice";
import { useAppSelector } from "../../../app/hooks";

type PlaylistSectionProps = {
  isAlbum?: boolean;
  id: string;
};

const GET_ALBUM = gql`
  query GetAlbum($id: ID!) {
    album(id: $id) {
      title
      cover
      songs {
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
      title
      cover
      songs {
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

const GET_LIKES = gql`
  query GetLikes($id: ID!) {
    likes(id: $id) {
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
`;

const PlaylistSection = ({ isAlbum, id }: PlaylistSectionProps) => {
  const userID = useAppSelector(selectID);
  const { loading, error, data } = useQuery(
    isAlbum ? GET_ALBUM : id === "likes" ? GET_LIKES : GET_PLAYLIST,
    {
      variables: { id: id === "likes" ? userID : id },
    }
  );
  const [isPlaying, setPlaying] = useState(false);
  const [isActive, setActive] = useState(false);
  const mmp = MMP.instance;

  return loading ? (
    <div>LOADING...</div>
  ) : (
    <div className="player-playlist-section">
      <div className="player-playlist-header">
        <div className="player-playlist-image">
          {id === "likes" ? (
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
          {id === "likes" ? "Liked Songs" : data.album.title}
        </span>
        <div
          className={
            "playlist-play-btn " + (isPlaying ? "playlist-pause-btn" : "")
          }
          onClick={() => {
            if (!isActive) {
              mmp.updateList(
                id === "likes" ? data.likes : data.album.songs,
                isAlbum || true,
                0
              );
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
        {id === "likes"
          ? data.likes.map(
              ({ title, src, artists, album }: ListType, index: number) => (
                <PlaylistItem
                  key={index}
                  title={title}
                  album={album}
                  artists={artists}
                  src={src}
                  index={index}
                />
              )
            )
          : data.album.songs.map(
              ({ title, src, artists, album }: ListType, index: number) => (
                <PlaylistItem
                  key={index}
                  title={title}
                  album={album}
                  artists={artists}
                  src={src}
                  index={index}
                />
              )
            )}
      </div>
    </div>
  );
};

export default PlaylistSection;
