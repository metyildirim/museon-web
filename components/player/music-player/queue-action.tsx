import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type QueueActionProps = {
  icon?: IconDefinition;
  IconSVGR?: JSX.Element;
  onClick: () => void;
  isActive: boolean;
  labelText?: string | null;
};

const getClassName = (isActive: boolean) => {
  if (isActive) {
    return "player-queue-action player-action-selected";
  }
  return "player-queue-action";
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
      <div className={getClassName(isActive)}>
        {icon ? <FontAwesomeIcon icon={icon} /> : IconSVGR}
        {isActive ? <div className="player-action-active-indicator" /> : null}
        {labelText ? (
          <div className="player-action-label">{labelText}</div>
        ) : null}
      </div>
    </button>
  );
};

export default QueueAction;
