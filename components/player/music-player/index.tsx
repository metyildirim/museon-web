import React from "react";
import Image from "next/image";
import Link from "next/link";
import ControlAction from "./control-action";
import QueueAction from "./queue-action";
import VolumeController from "./volume-controller";
import MMP, { LOOP_STATES, ListType } from "../../../utils/museon-music-player";
import {
  faStepBackward,
  faStepForward,
  faPlay,
  faPause,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import LoopIcon from "../../../icons/Loop";
import MusicInfo from "./music-info";
import MusicController from "./music-controller";

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
  artists: Array<string>;
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
      progress: "0.5",
      song: "",
      artists: [""],
      cover: "https://f4.bcbits.com/img/a2736265476_16.jpg",
    };
    this.list = [
      {
        song: "Where Is My Mind",
        artists: ["Pixies"],
        cover: "https://f4.bcbits.com/img/a2736265476_16.jpg",
        src: "https://firebasestorage.googleapis.com/v0/b/actuel.appspot.com/o/sil-mp3%2Fwhere_is_my_mind.mp3?alt=media&token=e802d401-a50b-48e0-95f2-8934f7673e60",
      },
      {
        song: "Blinding Lights",
        artists: ["The Weeknd"],
        cover:
          "https://firebasestorage.googleapis.com/v0/b/actuel.appspot.com/o/sil-mp3%2Fblinding-lights-cover.png?alt=media&token=fe6a3c23-6b7e-40ca-bac2-dc20aca8c6c6",
        src: "https://firebasestorage.googleapis.com/v0/b/actuel.appspot.com/o/sil-mp3%2Fblinding_lights.mp3?alt=media&token=09e47aba-a517-4de1-a95f-6f20f49129b1",
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
    artists: Array<string>
  ) => {
    this.setState({
      cover,
      isPlaying,
      index,
      currentTime,
      duration,
      progress,
      song,
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
        <div className="player-left-container">
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
          <div className="player-controls">
            <ControlAction icon={faStepBackward} onClick={this.previous} />
            <ControlAction
              icon={this.state.isPlaying ? faPause : faPlay}
              onClick={this.state.isPlaying ? this.pause : this.play}
              className={
                this.state.isPlaying
                  ? "play-pause-btn pause-btn"
                  : "play-pause-btn play-btn"
              }
            />
            <ControlAction icon={faStepForward} onClick={this.next} />
          </div>
        </div>
        <div className="player-center-container">
          <MusicInfo
            isLiked={this.state.isLiked}
            artists={this.state.artists}
            song={this.state.song}
          />
          <MusicController
            duration={this.state.duration}
            currentTime={this.state.currentTime}
            progress={this.state.progress}
            onProgressChanged={this.onProgressChanged}
          />
        </div>
        <div className="player-right-container">
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
      </div>
    );
  }
}

export default MusicPlayer;
