import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ navigate 유지
import Step1_MoimInfo from "../components/CreateMoim/Step1_MoimInfo";
import Step2_Participant from "../components/CreateMoim/Step2_Participant";
import Step3_Schedule from "../components/CreateMoim/Step3_Schedule";
import SelectedScheduleList from "../components/CreateMoim/SelectedScheduleList";
import SubmitButton from "../components/CreateMoim/SubmitButton";
import StepIndicator from "../components/StepIndicator";
import CreateMoimForm from "../components/CreateMoim/CreateMoimForm";

const CreatePage = ({ onCreateMoim }) => {
  const navigate = useNavigate(); // ✅ 메인 페이지 이동을 유지

  const [moimName, setMoimName] = useState(""); // 모임명
  const [group, setGroup] = useState(""); // 모임이 속한 그룹
  const [joinCode, setJoinCode] = useState(""); // 참여 코드
  const [participantCount, setParticipantCount] = useState(""); // 인원수
  const [schedules, setSchedules] = useState([]); // ✅ 일정 리스트 추가

  // ✅ Step3_Schedule 내부 관리로 돌려도 됨, 필요하면 유지
  const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일
  const [startTime, setStartTime] = useState(""); // 시작 시간
  const [endTime, setEndTime] = useState(""); // 종료 시간
  const [timeBlocks, setTimeBlocks] = useState([]); // ✅ DragTable 연동

  // ✅ 모임 생성 함수 (기존 코드 유지)
  const handleCreateMoim = () => {
    if (
      !moimName ||
      !group ||
      !joinCode ||
      !participantCount ||
      schedules.length === 0
    ) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    const newMoim = {
      id: Date.now(),
      title: moimName,
      group,
      joinCode,
      participantCount,
      schedule: schedules.map(
        (sch) => `${sch.days} ${sch.startTime}~${sch.endTime}`
      ),
    };

    onCreateMoim(newMoim); // ✅ 부모 컴포넌트(App.jsx)에서 받은 onCreateMoim 실행
    navigate("/main"); // ✅ 모임 생성 후 메인페이지로 이동
  };

  return (
    <div>
      <StepIndicator title="모임 생성하기" steps={[1, 2, 3]} currentStep={0} />

      <CreateMoimForm>
        <Step1_MoimInfo
          moimName={moimName}
          setMoimName={setMoimName}
          group={group}
          setGroup={setGroup}
          joinCode={joinCode}
          setJoinCode={setJoinCode}
        />
        <Step2_Participant
          participantCount={participantCount}
          setParticipantCount={setParticipantCount}
        />
        <Step3_Schedule
          schedules={schedules}
          setSchedules={setSchedules}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          setTimeBlocks={setTimeBlocks}
        />
      </CreateMoimForm>

      <SelectedScheduleList schedules={schedules} />

      <SubmitButton
        onNextStep={handleCreateMoim} // ✅ handleCreateMoim을 여기에 전달
        moimName={moimName}
        group={group}
        joinCode={joinCode}
        participantCount={participantCount}
        schedules={schedules}
        timeBlocks={timeBlocks}
      />
    </div>
  );
};

export default CreatePage;
