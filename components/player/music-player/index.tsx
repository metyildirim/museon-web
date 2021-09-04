import React from "react";
import Image from "next/image";
import Link from "next/link";
import QueueAction from "./queue-action";
import VolumeController from "./volume-controller";
import MMP, {
  LOOP_STATES,
  ListType,
  Artist,
} from "../../../utils/museon-music-player";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import LoopIcon from "../../../icons/Loop";
import MusicInfo from "./music-info";
import MusicController from "./music-controller";
import PlayerControls from "./player-controls";

type MusicPlayerProps = {};
type StateTypes = {
  isPlaying: boolean;
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
  album: string;
  artists: Array<Artist>;
};

class MusicPlayer extends React.Component<{}, StateTypes> {
  mmp?: MMP;
  list: Array<ListType>;

  constructor(props: MusicPlayerProps) {
    super(props);
    this.state = {
      isPlaying: false,
      index: 0,
      volume: "1",
      lastVolume: "1",
      loopState: LOOP_STATES.NoLoop,
      isShuffle: false,
      isLiked: false,
      duration: "0:00",
      currentTime: "0:00",
      progress: "0",
      song: "",
      album: "",
      artists: [],
      cover:
        "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
    };
    this.list = [
      {
        title: "Other Side",
        album: "The Best of LMMS Vol. 6",
        artists: [{ id: "1", name: "Umcaruje" }],
        cover:
          "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
        src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2FUmcaruje%20-%20The%20Best%20of%20LMMS%20Vol.%206%20-%2001%20Other%20side.mp3?alt=media&token=c6b46661-09d2-44dd-88b5-6ee7b6f94d8f",
      },
    ];
  }

  componentDidMount() {
    this.mmp = new MMP(this.playerCallback, this.list);
  }

  playerCallback = (
    cover: string,
    isPlaying: boolean,
    index: number,
    currentTime: string,
    duration: string,
    progress: string,
    song: string,
    album: string,
    artists: Array<Artist>
  ) => {
    this.setState({
      cover,
      isPlaying,
      index,
      currentTime,
      duration,
      progress,
      song,
      album,
      artists,
    });
  };

  previous = () => {
    this.mmp?.prev();
  };

  next = () => {
    this.mmp?.next();
  };

  play = () => {
    this.mmp?.play();
    this.setState({ isPlaying: true });
  };

  pause = () => {
    this.mmp?.pause();
    this.setState({ isPlaying: false });
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

  onProgressChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const progress = event.target.value;
    this.mmp?.setProgress(progress);
    this.setState({ progress });
  };

  render() {
    return (
      <div className="player-container">
        <div className="player-album-cover">
          <Link href="/player/album/2h7D8GjdYtg6">
            <a>
              <Image
                height="100%"
                width="100%"
                src={this.state.cover}
                alt="Album Cover"
              />
            </a>
          </Link>
        </div>
        <div className="player-center-container">
          <MusicInfo
            isLiked={this.state.isLiked}
            artists={this.state.artists}
            song={this.state.song}
            album={this.state.album}
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
          isPlaying={this.state.isPlaying}
        />
        <div className="player-queue-action-container">
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
          onVolumeChanged={this.onVolumeChanged}
          onVolumeIconClicked={this.onVolumeIconClicked}
        />
      </div>
    );
  }
}

export default MusicPlayer;
