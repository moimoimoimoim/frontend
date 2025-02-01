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
  const [currentStep] = useState(0);
  // ✅ 상태 변수 설정
  const [moimName, setMoimName] = useState("");
  const [group, setGroup] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [schedules, setSchedules] = useState([]); // ✅ 일정 리스트 추가

  return (
    <div>
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />

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
        <Step3_Schedule schedules={schedules} setSchedules={setSchedules} />
        {/* <Step3_Schedule schedules={schedules} setSchedules={setSchedules} /> */}
      </CreateMoimForm>

      {/* ✅ 입력된 값이 반영되는지 확인 */}
      <SelectedScheduleList schedules={schedules} setSchedules={setSchedules}>
        {/* <p>선택한 그룹: {group}</p>
        <p>입력된 모임 이름: {moimName}</p>
        <p>입력한 참여 코드: {joinCode}</p> */}
        {/* <p>인원수: {participantCount}명</p> */}
      </SelectedScheduleList>
      <SubmitButton></SubmitButton>
    </div>
  );
};

export default CreatePage;
