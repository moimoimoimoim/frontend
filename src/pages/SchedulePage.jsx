import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import ScheduleDragForm from "../components/ScheduleDrag/ScheduleDragForm";
import ScheduleButton from "../components/ScheduleDrag/ScheduleButton";

const API_URL = import.meta.env.VITE_API_URL;

const SchedulePage = () => {
  const { scheduleId } = useParams();
  const [currentStep] = useState(1);
  const [meetingTimezone, setMeetingTimezone] = useState([]);
  const [initialTimeslots, setInitialTimeslots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]); // ✅ 선택한 데이터를 저장
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/schedules/" + scheduleId, {
        credentials: "include",
      });
      const data = await response.json();
      setMeetingTimezone(data?.schedule?.meeting?.meetingTimezone);
      setInitialTimeslots(data?.schedule?.timeslots);
      setIsOwner(data.schedule?.user === data.schedule?.meeting?.owner);
    })();
  }, [scheduleId]);

  // ✅ 부모에서 `selectedSlots` 상태를 업데이트하는 함수
  const handleScheduleSubmit = (scheduleData) => {
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
        isOwner={isOwner}
      />
    </div>
  );
};

export default SchedulePage;
