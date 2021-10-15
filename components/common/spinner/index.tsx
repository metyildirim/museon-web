import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-item">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </div>
  );
};

export default Spinner;
