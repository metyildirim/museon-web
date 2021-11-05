import styles from "./music-player.module.sass";

type MusicControllerProps = {
  currentTime: string;
  duration: string;
  progress: string;
  onProgressChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MusicController = ({
  currentTime,
  duration,
  progress,
  onProgressChanged,
}: MusicControllerProps) => {
  return (
    <div className={styles.playerMusicController}>
      <div className={styles.playerMusicTime}>{currentTime}</div>
      <input
        className={"common-range-input " + styles.musicControllerInput}
        type="range"
        value={progress}
        onChange={onProgressChanged}
        max="1"
        min="0"
        step={0.001}
      />
      <div className={styles.playerMusicTime}>{duration}</div>
    </div>
  );
};

export default MusicController;
