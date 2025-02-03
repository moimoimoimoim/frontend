import { DndProvider } from "react-dnd"; // <-- 이 줄을 추가해주세요.
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import ScheduleDragForm from "../components/ScheduleDrag/ScheduleDragForm";
import ScheduleButton from "../components/ScheduleDrag/ScheduleButton";

const SchedulePage = () => {
  const [currentStep] = useState(1);
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState(null);

  // ✅ `DragTable`에서 받은 데이터를 업데이트하는 함수
  const handleScheduleSubmit = (data) => {
    console.log(
      "📥 SchedulePage에서 받은 데이터:",
      JSON.stringify(data, null, 2)
    );
    setSelectedSlots(data);
  };
  return (
    <div className="">
      <StepIndicator
        title="일정 선택하기"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
      <DndProvider backend={HTML5Backend}>
        <ScheduleDragForm onSubmit={handleScheduleSubmit} />
      </DndProvider>

      <ScheduleButton data={selectedSlots} navigate={navigate} />
    </div>
  );
};

export default SchedulePage;
