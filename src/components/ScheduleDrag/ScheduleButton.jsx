import "../CreateMoim/CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ API 주소 설정

const ScheduleButton = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    console.error("❌ ScheduleButton에서 받은 데이터가 없습니다! (undefined)");
    return null; // 데이터 없으면 버튼 안 보이게 처리
  }

  console.log(
    "🔍 ScheduleButton에서 받은 데이터:",
    JSON.stringify(data, null, 2)
  );

  const handleSubmit = async () => {
    console.log("📤 서버로 보낼 데이터:", JSON.stringify(data, null, 2));

    fetch(`${API_URL}/new-calendars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }
        const serverData = await response.json();
        console.log(
          "✅ 서버 응답 데이터:",
          JSON.stringify(serverData, null, 2)
        );
        navigate("/select"); // ✅ 데이터 전송 후 페이지 이동
      })
      .catch((error) => console.error("🚨 서버 연결 실패:", error));
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
