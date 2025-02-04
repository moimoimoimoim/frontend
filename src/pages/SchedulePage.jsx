import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import ScheduleDragForm from "../components/ScheduleDrag/ScheduleDragForm";
import ScheduleButton from "../components/ScheduleDrag/ScheduleButton";

const SchedulePage = () => {
  const navigate = useNavigate();
  const [currentStep] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState(null); // ✅ 선택한 데이터를 저장

  console.log("📥 SchedulePage에서 받은 데이터:", selectedSlots);

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
        <ScheduleDragForm onSubmit={handleScheduleSubmit} />
      </DndProvider>

      {/* ✅ ScheduleButton에 selectedSlots 데이터 전달 */}
      <ScheduleButton data={selectedSlots} navigate={navigate} />
    </div>
  );
};

export default SchedulePage;
