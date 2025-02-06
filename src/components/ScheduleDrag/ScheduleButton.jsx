import "../CreateMoim/CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // ✅ API 주소 설정

const ScheduleButton = ({ data, scheduleId }) => {
  const navigate = useNavigate();

  if (!data) {
    console.error("❌ ScheduleButton에서 받은 데이터가 없습니다! (undefined)");
    return null; // 데이터 없으면 버튼 안 보이게 처리
  }

  const handleSubmit = async () => {
    const response = await fetch(`${API_URL}/schedules/${scheduleId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      alert("일정 선택이 완료되었습니다.");
      navigate("/select");
    } else alert("일정 선택에 실패하였습니다. 다시 시도해 주세요.");
  };

  return (
    <div className="center">
      <button className="submit-button" onClick={handleSubmit}>
        <span className="center">다음 단계</span>
      </button>
    </div>
  );
};

export default ScheduleButton;
