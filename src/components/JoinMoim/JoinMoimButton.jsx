import "./JoinMoimButton.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // 기본 API URL

const JoinMoimButton = ({ nickname, code, inviteToken }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname || !code) {
      alert("닉네임과 참여 코드를 입력해주세요!");
      return;
    }

    let data;
    try {
      // ✅ 참가자 정보 저장 API 호출
      const response = await fetch(`${API_URL}/join/${inviteToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, participantCode: code }),
        credentials: "include",
      });

      data = await response.json();

      // ✅ 성공하면 /schedule 페이지로 이동
      navigate("/schedule/" + data.schedule._id);
    } catch (error) {
      console.error("🚨 서버 연결 실패:", error);
      alert(data?.message);
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
