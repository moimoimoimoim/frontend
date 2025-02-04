import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const JoinPage = () => {
  const { moimId } = useParams(); // ✅ 모임 ID 가져오기
  const navigate = useNavigate();

  console.log("현재 모임 ID:", moimId);

  const [nickname, setNickname] = useState(""); // 닉네임 입력 상태
  const [participants, setParticipants] = useState([]); // 참여자 리스트 (임시로 관리)

  const handleJoin = () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력하세요!");
      return;

      // ✅ 일정 선택 페이지로 이동하면서 닉네임 전달
      navigate(`/schedule/${moimId}`, { state: { nickname } });
    }

    // 이미 참여한 닉네임인지 확인
    if (participants.includes(nickname)) {
      alert("이미 등록된 닉네임입니다!");
      return;
    }

    // 참여자 추가 (백엔드 없이 프론트에서 테스트용)
    setParticipants([...participants, nickname]);

    alert(`${nickname}님이 ${moimId} 모임에 참여하셨습니다!`);
  };

  return (
    <div>
      <h2>모임 참여</h2>
      <p>모임 ID: {moimId}</p>

      <input
        type="text"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleJoin}>참여하기</button>

      <h3>현재 참여자</h3>
      <ul>
        {participants.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default JoinPage;
