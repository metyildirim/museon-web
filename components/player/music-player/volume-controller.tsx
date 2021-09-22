import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const getVolumeIcon = (vol: string) => {
  return vol === "0" ? faVolumeMute : vol > "0.6" ? faVolumeUp : faVolumeDown;
};

type VolumeControllerProps = {
  volume: string;
  setVolume: (volume: string) => void;
  onVolumeChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeIconClicked: () => void;
};

const VolumeController = ({
  volume,
  setVolume,
  onVolumeChanged,
  onVolumeIconClicked,
}: VolumeControllerProps) => {
  return (
    <div className="player-volume-container">
      <div className="player-volume-icon">
        <button className="common-btn" onClick={onVolumeIconClicked}>
          <FontAwesomeIcon icon={getVolumeIcon(volume)} />
        </button>
      </div>
      <input
        onWheelCapture={(event) => {
          let vol;
          if (event.deltaY > 0) {
            vol = Number(volume) - 0.1;
            vol = vol < 0 ? 0 : vol;
          } else {
            vol = Number(volume) + 0.1;
            vol = vol > 1 ? 1 : vol;
          }
          setVolume(vol.toString());
        }}
        className="common-range-input player-volume-input"
        type="range"
        value={volume}
        onChange={onVolumeChanged}
        max="1"
        min="0"
        step={0.01}
      />
    </div>
  );
};

export default VolumeController;
