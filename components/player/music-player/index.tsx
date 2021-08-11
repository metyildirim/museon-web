import React from "react";
import Image from "next/image";
import Link from "next/link";
import ControlAction from "./control-action";
import QueueAction from "./queue-action";
import MMP, { LoopStates } from "../../../utils/museon-music-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStepForward,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import LoopIcon from "../../../icons/Loop";

type MusicPlayerProps = {};
type StateTypes = {
  isPlaying: boolean;
  volume: string;
  lastVolume: string;
  loopState: number;
  isShuffle: boolean;
};

class MusicPlayer extends React.Component<{}, StateTypes> {
  mmp?: MMP;

  constructor(props: MusicPlayerProps) {
    super(props);
    this.state = {
      isPlaying: false,
      volume: "1",
      lastVolume: "1",
      loopState: LoopStates.NOLOOP,
      isShuffle: false,
    };
  }

  componentDidMount() {
    this.mmp = new MMP([
      "https://firebasestorage.googleapis.com/v0/b/actuel.appspot.com/o/sil-mp3%2Fwhere_is_my_mind.mp3?alt=media&token=e802d401-a50b-48e0-95f2-8934f7673e60",
      "https://firebasestorage.googleapis.com/v0/b/actuel.appspot.com/o/sil-mp3%2Fblinding_lights.mp3?alt=media&token=09e47aba-a517-4de1-a95f-6f20f49129b1",
    ]);
  }

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

  getVolumeIcon = () => {
    const vol = this.state.volume;
    return vol === "0" ? faVolumeMute : vol > "0.6" ? faVolumeUp : faVolumeDown;
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
                  src="https://f4.bcbits.com/img/a2736265476_16.jpg"
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
        <div className="player-center-container"></div>
        <div className="player-right-container">
          <div className="player-queue-action-container">
            <QueueAction
              icon={faRandom}
              onClick={() => {}}
              isActive={this.state.isShuffle}
            />
            <QueueAction
              IconSVGR={<LoopIcon />}
              onClick={() => {}}
              isActive={this.state.loopState !== LoopStates.NOLOOP}
              labelText={
                this.state.loopState === LoopStates.LOOPONE ? "1" : null
              }
            />
          </div>
          <div className="player-volume-container">
            <div className="player-volume-icon">
              <button className="common-btn" onClick={this.onVolumeIconClicked}>
                <FontAwesomeIcon icon={this.getVolumeIcon()} />
              </button>
            </div>
            <input
              className="player-volume-input"
              type="range"
              value={this.state.volume}
              onChange={this.onVolumeChanged}
              max="1"
              min="0"
              step={0.01}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
