import React from "react";
import Image from "next/image";
import Link from "next/link";
import QueueAction from "./queue-action";
import VolumeController from "./volume-controller";
import MMP, {
  LOOP_STATES,
  ListType,
  ArtistType,
  AlbumType,
  SongType,
} from "../../../utils/museon-music-player";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import LoopIcon from "../../../icons/Loop";
import MusicInfo from "./music-info";
import MusicController from "./music-controller";
import PlayerControls from "./player-controls";
import styles from "./music-player.module.sass";

type MusicPlayerProps = {
  likedSongs: Array<SongType>;
  likeSong: (song: SongType) => void;
  removeLike: (song: SongType) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  list: Array<ListType>;
  listID: string;
};

type StateTypes = {
  index: number;
  volume: string;
  lastVolume: string;
  loopState: number;
  isShuffle: boolean;
  isLiked: boolean;
  duration: string;
  currentTime: string;
  progress: string;
  cover: string;
  song: string;
  album: AlbumType;
  artists: Array<ArtistType>;
  isAlbum: boolean;
  listID: string;
};

class MusicPlayer extends React.Component<MusicPlayerProps, StateTypes> {
  mmp?: MMP;
  list: Array<ListType>;
  songID: string;
  likedSongs: Array<SongType>;

  constructor(props: MusicPlayerProps) {
    super(props);
    this.state = {
      index: 0,
      volume: "1",
      lastVolume: "1",
      loopState: LOOP_STATES.NoLoop,
      isShuffle: false,
      isLiked: false,
      duration: "0:00",
      currentTime: "0:00",
      progress: "0",
      song: this.props.list[0].title,
      album: this.props.list[0].album,
      artists: this.props.list[0].artists,
      cover: this.props.list[0].album.cover,
      isAlbum: false,
      listID: this.props.listID,
    };
    this.list = this.props.list;
    this.songID = this.props.list[0].id;
    this.likedSongs = this.props.likedSongs;
  }

  componentDidMount() {
    try {
      this.mmp = new MMP(
        this.playerCallback,
        this.state.isAlbum,
        this.list,
        this.props.listID
      );
    } catch {
      this.mmp = MMP.instance;
      this.mmp.updatePlayer(
        this.playerCallback,
        this.state.isAlbum,
        this.list,
        this.props.listID
      );
    }
  }

  playerCallback = (
    cover: string,
    isPlaying: boolean,
    index: number,
    currentTime: string,
    duration: string,
    progress: string,
    song: string,
    album: AlbumType,
    artists: Array<ArtistType>,
    isAlbum: boolean,
    list: Array<ListType>,
    listID: string
  ) => {
    this.setState({
      cover,
      index,
      currentTime,
      duration,
      progress,
      song,
      album,
      artists,
      isAlbum,
      listID,
    });
    this.props.setIsPlaying(isPlaying);
    this.list = list;
    const songID = list[index].id;
    if (
      this.props.likedSongs.length !== this.likedSongs.length ||
      this.songID !== songID
    ) {
      this.likedSongs = this.props.likedSongs;
      this.songID = songID;
      let isLiked = false;
      this.props.likedSongs.forEach((likedSong) => {
        if (likedSong.id === songID) {
          isLiked = true;
        }
      });
      this.setState({ isLiked });
    }
  };

  previous = () => {
    this.mmp?.prev();
  };

  next = () => {
    this.mmp?.next();
  };

  play = () => {
    this.mmp?.play();
    this.props.setIsPlaying(true);
  };

  pause = () => {
    this.mmp?.pause();
    this.props.setIsPlaying(false);
  };

  onShuffleClicked = () => {
    const isShuffle = !this.state.isShuffle;
    this.mmp?.setShuffle(isShuffle);
    this.setState({ isShuffle });
  };

  onLoopClicked = () => {
    let loopState = this.state.loopState;
    if (loopState === LOOP_STATES.NoLoop) {
      loopState = LOOP_STATES.LoopAll;
    } else if (loopState === LOOP_STATES.LoopAll) {
      loopState = LOOP_STATES.LoopOne;
    } else {
      loopState = LOOP_STATES.NoLoop;
    }
    this.mmp?.setLoop(loopState);
    this.setState({ loopState });
  };

  onVolumeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = event.target.value;
    this.mmp?.setVolume(Number(volume));
    this.setState({ volume });
  };

  onVolumeIconClicked = () => {
    let volume = this.state.volume;
    if (volume === "0") {
      volume = this.state.lastVolume;
    } else {
      this.setState({ lastVolume: volume });
      volume = "0";
    }
    this.setState({ volume });
    this.mmp?.setVolume(Number(volume));
  };

  setVolume = (volume: string) => {
    this.mmp?.setVolume(Number(volume));
    this.setState({ volume });
  };

  onProgressChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const progress = event.target.value;
    this.mmp?.setProgress(progress);
    this.setState({ progress });
  };

  toggleLike = () => {
    if (!this.state.isLiked) {
      this.props.likeSong(this.list[this.state.index]);
      this.setState({ isLiked: true });
    } else {
      this.props.removeLike(this.list[this.state.index]);
      this.setState({ isLiked: false });
    }
  };

  render() {
    return (
      <div className={styles.musicPlayerContainer}>
        <div className={styles.albumCover}>
          <Link
            href={
              "/player/" +
              (this.state.isAlbum
                ? `album/${this.state.listID}`
                : `playlist/${this.state.listID}`)
            }
          >
            <a>
              <Image
                height="max-content"
                width="max-content"
                src={this.state.cover}
                alt="Album Cover"
                layout="responsive"
              />
            </a>
          </Link>
        </div>
        <div className={styles.playerCenterContainer}>
          <MusicInfo
            isLiked={this.state.isLiked}
            artists={this.state.artists}
            song={this.state.song}
            album={this.state.album}
            toggleLike={this.toggleLike}
          />
          <MusicController
            duration={this.state.duration}
            currentTime={this.state.currentTime}
            progress={this.state.progress}
            onProgressChanged={this.onProgressChanged}
          />
        </div>
        <PlayerControls
          play={this.play}
          pause={this.pause}
          next={this.next}
          previous={this.previous}
          isPlaying={this.props.isPlaying}
        />
        <div className={styles.queueActionContainer}>
          <QueueAction
            icon={faRandom}
            onClick={this.onShuffleClicked}
            isActive={this.state.isShuffle}
          />
          <QueueAction
            IconSVGR={<LoopIcon />}
            onClick={this.onLoopClicked}
            isActive={this.state.loopState !== LOOP_STATES.NoLoop}
            labelText={
              this.state.loopState === LOOP_STATES.LoopOne ? "1" : null
            }
          />
        </div>
        <VolumeController
          volume={this.state.volume}
          setVolume={this.setVolume}
          onVolumeChanged={this.onVolumeChanged}
          onVolumeIconClicked={this.onVolumeIconClicked}
        />
      </div>
    );
  }
}

export default MusicPlayer;
