import { useEffect, useState } from "react";
import Step1_MoimInfo from "../components/CreateMoim/Step1_MoimInfo";
import Step2_Participant from "../components/CreateMoim/Step2_Participant";
import Step3_Schedule from "../components/CreateMoim/Step3_Schedule";
import SelectedScheduleList from "../components/CreateMoim/SelectedScheduleList";
import SubmitButton from "../components/CreateMoim/SubmitButton";
import StepIndicator from "../components/StepIndicator";
import CreateMoimForm from "../components/CreateMoim/CreateMoimForm";
import LinkModal from "../components/ShareLink/LinkModal";

const API_URL = import.meta.env.VITE_API_URL;

const CreatePage = () => {
  // const [currentStep, setCurrentStep] = useState(0);
  const [currentStep] = useState(0); //현재 단계 -> 사용을 하나?
  const [meeting_name, setmeeting_name] = useState(""); // 모임명
  const [group, setGroup] = useState(""); // 모임이 속한 그룹
  const [groups, setGroups] = useState([]);
  const [meetingCode, setmeetingCode] = useState(""); // 참여 코드
  const [memberTotal, setMemberTotal] = useState(""); // 인원수
  const [schedules, setSchedules] = useState([]); // 일정 리스트 추가
  const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일
  const [startTime, setStartTime] = useState(""); // 시작 시간
  const [endTime, setEndTime] = useState(""); // 종료 시간
  const [timeBlocks, setTimeBlocks] = useState([]); // timeBlocks 상태 추가
  const [isModalOpen, setModalOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [ownerScheduleId, setOwnerScheduleId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/groups", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.groups.length > 0)
        setGroups(data.groups.map(({ _id, name }) => ({ id: _id, name })));
    })();
  }, []);

  return (
    <div>
      <StepIndicator
        title="모임 생성하기"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />

      <CreateMoimForm>
        <Step1_MoimInfo
          meetingName={meeting_name}
          setmeetingName={setmeeting_name}
          groups={groups}
          group={group}
          setGroup={setGroup}
          meetingCode={meetingCode}
          setmeetingCode={setmeetingCode}
        />
        <Step2_Participant
          memberTotal={memberTotal}
          setMemberTotal={setMemberTotal}
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
        <p>입력된 모임 이름: {meeting_name}</p>
        <p>입력한 참여 코드: {meetingCode}</p> */}
        {/* <p>인원수: {participantCount}명</p> */}
      </SelectedScheduleList>
      <SubmitButton
        meetingName={meeting_name}
        meetingCode={meetingCode}
        memberTotal={memberTotal}
        meetingGroup={group}
        timeBlocks={timeBlocks}
        setOwnerScheduleId={setOwnerScheduleId}
        onClick={(url) => {
          if (!url) {
            alert(
              "모임이 정상적으로 생성되지 않았습니다. 누락된 부분이 없는지 확인해 주세요."
            );
            return;
          }
          setModalOpen(true);
          setMeetingLink("http://" + window.location.host + url);
        }}
      />
      <LinkModal
        isOpen={isModalOpen}
        meetingLink={meetingLink}
        onClose={() => setModalOpen(false)}
        ownerScheduleId={ownerScheduleId}
      ></LinkModal>
    </div>
  );
};

export default CreatePage;
