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
  setTimeBlocks,
  data, // ✅ ScheduleButton에서 받은 data 추가
  onClick,
}) => {
  const navigate = useNavigate();

  // ✅ `data` 값 확인
  console.log("🔍 드래그에서 받은 data:", JSON.stringify(data, null, 2));

  // 전송할 데이터 결정
  const requestData = data || {
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

  // console.log("📤 최종 requestData:", JSON.stringify(requestData, null, 2)); // 🔥 여기서 최종 데이터 확인
  console.log("🚀 handleSubmit 실행됨!"); // ✅ 버튼이 눌렸는지 확인

  const targetUrl = data ? "/result" : "/new-calendars";
  const nextPage = data ? "/next-step" : "/schedule";

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    console.log(
      "📤 백엔드로 보낼 데이터:",
      JSON.stringify(requestData, null, 2)
    );

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
          navigate(nextPage);
        } else {
          console.error("❌ 데이터 전송 실패");
        }
      })
      .catch((error) => {
        console.error("🚨 네트워크 오류:", error);
      });
    // onClick 함수가 있다면 실행 (모달 열기 기능 포함)
    if (onClick) {
      onClick();
    }

    // onNextStep 실행 (다음 단계 진행)
    if (onNextStep) {
      onNextStep();
    }
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
