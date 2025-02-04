import "../CreateMoim/CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

const ScheduleButton = ({ data }) => {
  const navigate = useNavigate();

  // ✅ `data`가 undefined인지 확인
  if (!data) {
    console.error("❌ ScheduleButton에서 받은 데이터가 없습니다! (undefined)");
  } else {
    console.log(
      "🔍 ScheduleButton에서 받은 데이터:",
      JSON.stringify(data, null, 2)
    );
  }

  const handleSubmit = async () => {
    if (!data) {
      console.error("🚨 서버로 보낼 데이터가 없습니다! (data가 undefined)");
      alert("데이터가 없습니다. 다시 시도해주세요.");
      return;
    }

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
