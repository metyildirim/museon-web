import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./music-player.module.sass";

type QueueActionProps = {
  icon?: IconDefinition;
  IconSVGR?: JSX.Element;
  onClick: () => void;
  isActive: boolean;
  labelText?: string | null;
};

const QueueAction = ({
  icon,
  onClick,
  IconSVGR,
  isActive,
  labelText,
}: QueueActionProps) => {
  return (
    <button onClick={onClick} className="common-btn">
      <div
        className={
          isActive ? styles.playerActionSelected : styles.playerQueueAction
        }
      >
        {icon ? <FontAwesomeIcon icon={icon} /> : IconSVGR}
        {isActive ? <div className={styles.actionActiveIndicator} /> : null}
        {labelText ? (
          <div className={styles.actionLabel}>{labelText}</div>
        ) : null}
      </div>
    </button>
  );
};

export default QueueAction;
