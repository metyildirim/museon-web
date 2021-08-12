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
    <div className="player-music-controller">
      <div className="player-music-time">{currentTime}</div>
      <input
        className="player-music-controller-input"
        type="range"
        value={progress}
        onChange={onProgressChanged}
        max="1"
        min="0"
        step={0.01}
      />
      <div className="player-music-time">{duration}</div>
    </div>
  );
};

export default MusicController;
