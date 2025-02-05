import "./CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

// ✅ 환경 변수에서 API_URL 가져오기
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // 기본값 설정
const targetUrl = `${API_URL}/new-calendars`; // ✅ 백엔드(JSON Server)로 요청 보내기
const SubmitButton = ({
  onNextStep,
  moimName,
  group,
  joinCode,
  participantCount,
  schedules,
  selectedDays,
  startTime,
  endTime,
  timeBlocks,
  onClick,
}) => {
  const navigate = useNavigate();

  // 전송할 데이터 결정
  const requestData = {
    moimName,
    group,
    joinCode,
    participantCount,
    schedules,
    selectedDays,
    startTime,
    endTime,
    timeBlocks,
  };

  console.log("🚀 handleSubmit 실행됨!"); // ✅ 버튼이 눌렸는지 확인
  console.log("📤 백엔드로 보낼 데이터:", JSON.stringify(requestData, null, 2));
  console.log("🚀 API 요청 URL:", targetUrl); // ✅ 올바른 URL인지 확인

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("✅ 데이터 전송 성공");
          console.log("✅ navigate 실행됨!");

          onNextStep?.();
        } else {
          console.error("❌ 데이터 전송 실패");
        }
      })
      .catch((error) => {
        console.error("🚨 네트워크 오류:", error);
      });

    // onClick 함수 실행 (모달 열기 등)
    onClick?.();
    onNextStep?.();
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
