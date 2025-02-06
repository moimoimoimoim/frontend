import "../CreateMoim/CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // 기본값 설정

const SelectButton = ({ selectedMoim, meetingId }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedMoim) {
      alert("모임을 선택해주세요!");
      return;
    }

    fetch(`${API_URL}/confirm-schedule/${meetingId}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedMoim),
    })
      .then((response) => response.json())
      .then((serverData) => {
        navigate("/show/" + meetingId); // ✅ 성공하면 다음 페이지로 이동
      })
      .catch((error) => console.error("🚨 서버 연결 실패:", error));
  };

  return (
    <div className="center">
      <button className="submit-button" onClick={handleSubmit}>
        <span className="center">확인</span>
      </button>
    </div>
  );
};

export default SelectButton;
