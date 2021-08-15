import ControlAction from "./control-action";
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

type PlayerControlsProps = {
  play: () => void;
  pause: () => void;
  previous: () => void;
  next: () => void;
  isPlaying: boolean;
};

const PlayerControls = ({
  play,
  pause,
  previous,
  next,
  isPlaying,
}: PlayerControlsProps) => {
  return (
    <div className="player-controls">
      <ControlAction icon={faStepBackward} onClick={previous} />
      <ControlAction
        icon={isPlaying ? faPause : faPlay}
        onClick={isPlaying ? pause : play}
        className={
          isPlaying ? "play-pause-btn pause-btn" : "play-pause-btn play-btn"
        }
      />
      <ControlAction icon={faStepForward} onClick={next} />
    </div>
  );
};

export default PlayerControls;
