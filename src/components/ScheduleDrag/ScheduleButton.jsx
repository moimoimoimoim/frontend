import "../CreateMoim/CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

const ScheduleButton = ({ data }) => {
  const navigate = useNavigate();

  // ✅ `data`가 올바르게 들어왔는지 확인
  console.log(
    "🔍 ScheduleButton에서 받은 데이터:",
    JSON.stringify(data, null, 2)
  );

  if (!data) {
    console.error("⚠️ ScheduleButton: data가 없음! 데이터가 전달되지 않음.");
    return null; // ❌ 데이터가 없으면 버튼을 렌더링하지 않음
  }

  const handleSubmit = async () => {
    console.log("📤 서버로 보낼 데이터:", JSON.stringify(data, null, 2));

    fetch("/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((serverData) => {
        console.log(
          "✅ 서버 응답 데이터:",
          JSON.stringify(serverData, null, 2)
        );
        navigate("/next-step"); // ✅ 데이터 전송 후 페이지 이동
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
