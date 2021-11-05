import ControlAction from "./control-action";
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./music-player.module.sass";

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
    <div className={styles.playerControls}>
      <ControlAction icon={faStepBackward} onClick={previous} />
      <ControlAction
        icon={isPlaying ? faPause : faPlay}
        onClick={isPlaying ? pause : play}
        className={isPlaying ? styles.pauseButton : styles.playButton}
      />
      <ControlAction icon={faStepForward} onClick={next} />
    </div>
  );
};

export default PlayerControls;
