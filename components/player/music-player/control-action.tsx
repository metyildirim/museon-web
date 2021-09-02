import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type ControlActionProps = {
  icon: IconDefinition;
  onClick: () => void;
  className?: string;
};

const ControlAction = ({ icon, onClick, className }: ControlActionProps) => {
  return (
    <button onClick={onClick} className="common-btn">
      <div className={"player-control-action " + className}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </button>
  );
};

export default ControlAction;
