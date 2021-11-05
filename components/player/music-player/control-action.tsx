import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./music-player.module.sass";

type ControlActionProps = {
  icon: IconDefinition;
  onClick: () => void;
  className?: string;
};

const ControlAction = ({ icon, onClick, className }: ControlActionProps) => {
  return (
    <button onClick={onClick} className="common-btn">
      <div className={!className ? styles.playerControlAction : className}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </button>
  );
};

export default ControlAction;
