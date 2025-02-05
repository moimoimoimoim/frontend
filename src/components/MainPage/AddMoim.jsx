import { useNavigate } from "react-router-dom";
import "./AddMoim.css";
import calendarAdd from "../../assets/calendar-add.png";

const AddMoim = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  return (
    <button className="add-moim-button" onClick={() => navigate("/create")}>
      <img src={calendarAdd} alt="모임 추가" className="add-moim-icon" />
    </button>
  );
};

export default AddMoim;
