import "./JoinMoimButton.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // 기본 API URL

const JoinMoimButton = ({ nickname, code }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname || !code) {
      alert("닉네임과 참여 코드를 입력해주세요!");
      return;
    }

    console.log("📤 서버로 보낼 데이터:", { nickname, inviteToken: code });

    try {
      // ✅ 참가자 정보 저장 API 호출
      const response = await fetch(`${API_URL}/participant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, inviteToken: code }),
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const serverData = await response.json();
      console.log("✅ 서버 응답 데이터:", serverData);

      // ✅ 성공하면 /schedule 페이지로 이동
      navigate("/schedule");
    } catch (error) {
      console.error("🚨 서버 연결 실패:", error);
      alert("서버와 연결에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="center">
      <button className="join-button" onClick={handleSubmit}>
        <span className="center">다음</span>
      </button>
    </div>
  );
};

export default JoinMoimButton;
