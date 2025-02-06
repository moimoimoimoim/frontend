import "./CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

// ✅ 환경 변수에서 API_URL 가져오기
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"; // 기본값 설정

const targetUrl = `${API_URL}/create`; // ✅ 백엔드(JSON Server)로 요청 보내기
const SubmitButton = ({
  meetingName,
  meetingCode,
  memberTotal,
  meetingGroup,
  setOwnerScheduleId,
  timeBlocks,
  onClick,
}) => {
  const navigate = useNavigate();

  // 전송할 데이터 결정
  const requestData = {
    meetingName,
    meetingCode,
    meetingGroup,
    memberTotal,
    meetingTimezone: timeBlocks.map((slot) => ({ slot })),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(targetUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    const data = await response.json();
    console.log(data);

    // onClick 함수 실행 (모달 열기 등)
    onClick?.(data.inviteLink);
    setOwnerScheduleId?.(data.ownerSchedule._id);
  };

  return (
    <div className="center">
      <button className="submit-button" onClick={handleSubmit}>
        <span className="center">다음 단계</span>
      </button>
    </div>
  );
};

export default SubmitButton;
