import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavigationButtonProps = {
  onClick: () => void;
  icon: IconProp;
  disabled?: boolean;
};

const NavigationButton = ({
  onClick,
  icon,
  disabled,
}: NavigationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="common-btn navigation-btn"
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default NavigationButton;
