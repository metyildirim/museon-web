import { useState } from "react";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PlaylistItem from "./playlist-item";
import { gql, useQuery } from "@apollo/client";
import MMP, {
  ListType,
  SongType,
  LIST_STATES,
} from "../../../utils/museon-music-player";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectIsPlaying,
  selectListState,
  selectLikedSongs,
  selectListID,
  setListState,
  setListID,
  setIsPlaying,
} from "../../../app/playerSlice";

type PlaylistSectionProps = {
  id: string;
  listState: LIST_STATES;
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
  id,
  listState,
  likeSong,
  removeLike,
}: PlaylistSectionProps) => {
  const { loading, error, data } = useQuery(
    listState === LIST_STATES.Album ? GET_ALBUM : GET_PLAYLIST,
    {
      variables: { id: id },
    }
  );
  const dispatch = useAppDispatch();
  const likedSongs = useAppSelector(selectLikedSongs);
  const listStateApp = useAppSelector(selectListState);
  const listID = useAppSelector(selectListID);
  const isPlaying = useAppSelector(selectIsPlaying);
  const mmp = MMP.instance;

  const updateList = (index: number, listID: string) => {
    mmp.updateList(
      listState === LIST_STATES.Likes ? likedSongs : data.album.songs,
      listState === LIST_STATES.Album || false,
      index,
      listID
    );
    dispatch(setListID(listID));
    dispatch(setListState(listState));
  };

  const isActive = () => {
    return listState === listStateApp && listID === id;
  };

  const isPauseActive = () => {
    if (isPlaying && isActive()) {
      return true;
    }
    return false;
  };

  const getPlayButtonClassName = () => {
    return "playlist-play-btn " + (isPauseActive() ? "playlist-pause-btn" : "");
  };

  const getPlayButtonIcon = () => {
    return isPauseActive() ? faPause : faPlay;
  };

  const onPlayButtonClicked = () => {
    if (!isActive()) {
      updateList(0, listState === LIST_STATES.Likes ? "likes" : data.album.id);
      dispatch(setListState(listState));
      dispatch(setListID(id));
      dispatch(setIsPlaying(true));
    } else if (isPauseActive()) {
      mmp.pause();
      dispatch(setIsPlaying(false));
    } else {
      mmp.play();
      dispatch(setIsPlaying(true));
    }
  };

  const getPlaylist = () => {
    return listState === LIST_STATES.Likes ? likedSongs : data.album.songs;
  };

  return loading ? (
    <div>LOADING...</div>
  ) : (
    <div className="player-playlist-section">
      <div className="player-playlist-header">
        <div className="player-playlist-image">
          {listState === LIST_STATES.Likes ? (
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
          {listState === LIST_STATES.Likes ? "Liked Songs" : data.album.title}
        </span>
        {listState === LIST_STATES.Likes && likedSongs.length === 0 ? (
          <div />
        ) : (
          <div
            className={getPlayButtonClassName()}
            onClick={onPlayButtonClicked}
          >
            <FontAwesomeIcon icon={getPlayButtonIcon()} />
          </div>
        )}
      </div>
      <div className="playlist-table-titles">
        <div className="playlist-table-title-item w-1/12">#</div>
        <div className="playlist-table-title-item w-3/12">TITLE</div>
        <div className="playlist-table-title-item w-3/12">ARTISTS</div>
        <div className="playlist-table-title-item w-3/12">ALBUM</div>
        <div className="playlist-table-title-item w-2/12"></div>
      </div>
      <div className="playlist-table-items">
        {getPlaylist().map(
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
              listID={listState === LIST_STATES.Likes ? "likes" : data.album.id}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PlaylistSection;
