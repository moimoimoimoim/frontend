import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import ScheduleDragForm from "../components/ScheduleDrag/ScheduleDragForm";
import ScheduleButton from "../components/ScheduleDrag/ScheduleButton";

const API_URL = import.meta.env.VITE_API_URL;

const SchedulePage = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [currentStep] = useState(1);
  const [meetingTimezone, setMeetingTimezone] = useState([]);
  const [initialTimeslots, setInitialTimeslots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState(null); // ✅ 선택한 데이터를 저장

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/schedules/" + scheduleId, {
        credentials: "include",
      });
      const data = await response.json();
      setMeetingTimezone(data.schedule.meeting.meetingTimezone);
      setInitialTimeslots(data.schedule.timeslots);
    })();
  }, [scheduleId]);

  // ✅ 부모에서 `selectedSlots` 상태를 업데이트하는 함수
  const handleScheduleSubmit = (scheduleData) => {
    console.log("📥 handleScheduleSubmit에서 받은 데이터:", scheduleData);
    setSelectedSlots(scheduleData); // ✅ 데이터 업데이트
  };

  return (
    <div>
      <StepIndicator
        title="일정 선택하기"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
      <DndProvider backend={HTML5Backend}>
        {/* ✅ ScheduleDragForm에 onSubmit 전달 */}
        <ScheduleDragForm
          meetingTimezone={meetingTimezone}
          initialTimeslots={initialTimeslots}
          onSubmit={handleScheduleSubmit}
        />
      </DndProvider>

      {/* ✅ ScheduleButton에 selectedSlots 데이터 전달 */}
      <ScheduleButton
        scheduleId={scheduleId}
        data={selectedSlots}
        navigate={navigate}
      />
    </div>
  );
};

export default SchedulePage;
