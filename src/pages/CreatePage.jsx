import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1_MoimInfo from "../components/CreateMoim/Step1_MoimInfo";
import Step2_Participant from "../components/CreateMoim/Step2_Participant";
import Step3_Schedule from "../components/CreateMoim/Step3_Schedule";
import SelectedScheduleList from "../components/CreateMoim/SelectedScheduleList";
import SubmitButton from "../components/CreateMoim/SubmitButton";
import StepIndicator from "../components/StepIndicator";
import CreateMoimForm from "../components/CreateMoim/CreateMoimForm";

const CreatePage = ({ onCreateMoim }) => {
  const navigate = useNavigate();

  const [moimName, setMoimName] = useState("");
  const [group, setGroup] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [schedules, setSchedules] = useState([]);

  // ✅ 모임 생성 함수
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
      ), // ✅ 요일 + 시작~종료 시간 조합
    };

    onCreateMoim(newMoim); // ✅ App.jsx에서 받아온 onCreateMoim 실행
    navigate("/main"); // ✅ 모임 생성 후 메인페이지로 이동
  };

  return (
    <div>
      <StepIndicator steps={[1, 2, 3]} currentStep={0} />
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
      </CreateMoimForm>
      <SelectedScheduleList schedules={schedules} />
      <SubmitButton onNextStep={handleCreateMoim} />
    </div>
  );
};

export default CreatePage;
