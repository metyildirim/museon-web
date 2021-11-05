import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./body-section.module.sass";

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
      className={"common-btn " + styles.navigationButton}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default NavigationButton;
