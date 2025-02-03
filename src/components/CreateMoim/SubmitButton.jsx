// import "./CreateMoimForm.css";
// import { Link } from "react-router-dom";

// const SubmitButton = ({ onNextStep }) => {
//   return (
//     <div className="center">
//       <Link to="schedule" onClick={onNextStep}>
//         <button className="submit-button">
//           <span className="center">다음 단계</span>
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default SubmitButton;

import "./CreateMoimForm.css";
import { useNavigate } from "react-router-dom";

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
  setTimeBlocks, // ✅ 추가
}) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 것
  const requestData = {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    console.log("📤 백엔드로 보낼 데이터:", requestData); // 추가해서 확인!
    // 백엔드로 데이터 전송
    fetch("/new-calendars", {
      // 일단 노션 보고 url 집어넣음...
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("데이터 전송 성공");
          console.log("✅ navigate 실행됨!"); // 🔥 로그 추가해서 확인
          onNextStep?.();
          navigate("/schedule"); // ✅ 페이지 이동
        } else {
          console.error("데이터 전송 실패");
        }
      })

      .catch((error) => {
        console.error("네트워크 오류:", error);
      });
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
