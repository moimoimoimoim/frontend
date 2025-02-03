import "./CreateMoimForm.css";
import { Link } from "react-router-dom";

const SubmitButton = ({ onNextStep }) => {
  return (
    <div className="center">
      <Link to="schedule" onClick={onNextStep}>
        <button className="submit-button">
          <span className="center">다음 단계</span>
        </button>
      </Link>
    </div>
  );
};

export default SubmitButton;
