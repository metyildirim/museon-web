import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MusicPlayer from "./music-player";
import UserSection from "./user-section";
import BodySection from "./body-section";
import Home from "./home";
import Search from "./search";
import Playlist from "./playlist";
import Artist from "./artist";
import Album from "./album";
import { ParsedUrlQuery } from "querystring";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectID, selectIsLoggedIn } from "../../app/authSlice";
import {
  selectLikedSongs,
  likeSong,
  removeLike,
  selectIsPlaying,
  setIsPlaying as setIsPlayingApp,
} from "../../app/playerSlice";
import { SongType } from "../../utils/museon-music-player";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FEATURED_PLAYLISTS } from "../../app/queries";
import { LIKE_SONG, REMOVE_LIKE } from "../../app/mutations";
import Spinner from "../common/spinner";
import styles from "./player.module.sass";

export default function Player() {
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const likedSongs = useAppSelector(selectLikedSongs);
  const isPlaying = useAppSelector(selectIsPlaying);
  const userID = useAppSelector(selectID);
  const [likeMutation] = useMutation(LIKE_SONG);
  const [removeLikeMutation] = useMutation(REMOVE_LIKE);
  const { loading, data } = useQuery(GET_FEATURED_PLAYLISTS);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login?next=player/home", undefined, { shallow: true });
    }
  }, [router, isLoggedIn]);

  const playerLikeSong = (song: SongType) => {
    dispatch(likeSong({ song: song }));
    likeMutation({ variables: { songID: song.id, userID: userID } });
  };

  const playerRemoveLike = (song: SongType) => {
    dispatch(removeLike({ song: song }));
    removeLikeMutation({ variables: { songID: song.id, userID: userID } });
  };

  const setIsPlaying = (isPlaying: boolean) => {
    dispatch(setIsPlayingApp(isPlaying));
  };

  const getBodySection = (query: ParsedUrlQuery) => {
    if (query.path) {
      const path = query.path[0];
      const param = query.path[1];
      if (path === "search") {
        return <Search param={param} />;
      } else if (path === "playlist") {
        return (
          <Playlist
            param={param}
            likeSong={playerLikeSong}
            removeLike={playerRemoveLike}
          />
        );
      } else if (path === "album") {
        return (
          <Album
            param={param}
            likeSong={playerLikeSong}
            removeLike={playerRemoveLike}
          />
        );
      } else if (path === "artist") {
        return <Artist param={param} />;
      }
    }
    return <Home />;
  };

  return (
    <div className={styles.webPlayerContainer}>
      {typeof window !== "undefined" ? (
        isLoggedIn ? (
          <React.Fragment>
            <div className={styles.topContainer}>
              <UserSection />
              <BodySection>{getBodySection(query)}</BodySection>
            </div>
            {loading ? (
              <div className={styles.musicPlayerContainer}>
                <Spinner />
              </div>
            ) : (
              <MusicPlayer
                likedSongs={likedSongs}
                likeSong={playerLikeSong}
                removeLike={playerRemoveLike}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                list={data.featured.playlists[0].songs}
                listID={data.featured.playlists[0].id}
              />
            )}
          </React.Fragment>
        ) : (
          <Spinner />
        )
      ) : null}
    </div>
  );
}
