import { useState } from "react";
import Step1_MoimInfo from "../components/CreateMoim/Step1_MoimInfo";
import Step2_Participant from "../components/CreateMoim/Step2_Participant";
import Step3_Schedule from "../components/CreateMoim/Step3_Schedule";
import SelectedScheduleList from "../components/CreateMoim/SelectedScheduleList";
import SubmitButton from "../components/CreateMoim/SubmitButton";
import StepIndicator from "../components/StepIndicator";
import CreateMoimForm from "../components/CreateMoim/CreateMoimForm";

const CreatePage = () => {
  // const [currentStep, setCurrentStep] = useState(0);
  const [currentStep] = useState(0); //현재 단계 -> 사용을 하나?
  const [moimName, setMoimName] = useState(""); // 모임명
  const [group, setGroup] = useState(""); // 모임이 속한 그룹
  const [joinCode, setJoinCode] = useState(""); // 참여 코드
  const [participantCount, setParticipantCount] = useState(""); // 인원수
  const [schedules, setSchedules] = useState([]); // ✅ 일정 리스트 추가
  const [selectedDays, setSelectedDays] = useState([]); // ✅ 선택된 요일
  const [startTime, setStartTime] = useState(""); // ✅ 시작 시간
  const [endTime, setEndTime] = useState(""); // ✅ 종료 시간
  const [onNextStep, handleNextStep] = useState(""); // ✅ 종료 시간
  const [timeBlocks, setTimeBlocks] = useState([]); // ✅ timeBlocks 상태 추가

  const formData = {
    moimName,
    group,
    joinCode,
    participantCount,
    schedules,
    selectedDays,
    startTime,
    endTime,
  };

  return (
    <div>
      <StepIndicator
        title="모임 생성하기"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />

      {/* ✅ Step1_MoimInfo에 props로 상태 전달 */}
      {/* 단계 변경 버튼 예시 추후에 바꿀 것*/}
      {/* <button onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}>
        이전 단계
      </button>
      <button onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 2))}>
        다음 단계
      </button> */}

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
        {/* <Step3_Schedule schedules={schedules} setSchedules={setSchedules} /> */}
      </CreateMoimForm>

      {/* ✅ 입력된 값이 반영되는지 확인 */}
      <SelectedScheduleList schedules={schedules} setSchedules={setSchedules}>
        {/* <p>선택한 그룹: {group}</p>
        <p>입력된 모임 이름: {moimName}</p>
        <p>입력한 참여 코드: {joinCode}</p> */}
        {/* <p>인원수: {participantCount}명</p> */}
      </SelectedScheduleList>
      <SubmitButton
        moimName={moimName}
        group={group}
        joinCode={joinCode}
        participantCount={participantCount}
        selectedDays={selectedDays} // ✅ 추가
        startTime={startTime} // ✅ 추가
        endTime={endTime} // ✅ 추가
        schedules={schedules}
        timeBlocks={timeBlocks}
        onNextStep={handleNextStep}
      />
    </div>
  );
};

export default CreatePage;
