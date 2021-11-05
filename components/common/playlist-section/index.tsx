import Image from "next/image";
import PlaylistItem from "./playlist-item";
import { useQuery } from "@apollo/client";
import { GET_ALBUM, GET_PLAYLIST } from "../../../app/queries";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../spinner";
import styles from "./playlist-section.module.sass";

type PlaylistSectionProps = {
  id: string;
  listState: LIST_STATES;
  likeSong: (song: SongType) => void;
  removeLike: (song: SongType) => void;
};

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
    <div className={styles.playlistSection}>
      <Spinner />
    </div>
  ) : (
    <div className={styles.playlistSection}>
      <div className={styles.playlistHeader}>
        <div className={styles.playlistImage}>
          {listState === LIST_STATES.Likes ? (
            <div className={styles.likesIcon}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          ) : (
            <Image
              src={data.album.cover}
              height="max-content"
              width="max-content"
              alt={data.album.title}
              layout="responsive"
            />
          )}
        </div>
        <span className={styles.playlistTitle}>
          {listState === LIST_STATES.Likes ? "Liked Songs" : data.album.title}
        </span>
        {listState === LIST_STATES.Likes && likedSongs.length === 0 ? (
          <div />
        ) : (
          <div
            className={isPauseActive() ? styles.pauseButton : styles.playButton}
            onClick={onPlayButtonClicked}
          >
            <FontAwesomeIcon icon={getPlayButtonIcon()} />
          </div>
        )}
      </div>
      <div className={styles.tableTitles}>
        <div className={styles.tableTitleItem + " w-1/12"}>#</div>
        <div className={styles.tableTitleItem + " w-3/12"}>TITLE</div>
        <div className={styles.tableTitleItem + " w-3/12"}>ARTISTS</div>
        <div className={styles.tableTitleItem + " w-3/12 md-invisible"}>
          ALBUM
        </div>
        <div className={styles.tableTitleItem + " w-2/12 md-invisible"}></div>
      </div>
      <div className={styles.tableItems}>
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
