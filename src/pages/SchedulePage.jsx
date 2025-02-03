import { DndProvider } from "react-dnd"; // <-- 이 줄을 추가해주세요.
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import ScheduleDragForm from "../components/ScheduleDrag/ScheduleDragForm";

const SchedulePage = () => {
  const [currentStep] = useState(1);

  return (
    <div className="">
      <StepIndicator
        title="일정 조율하기"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
      <DndProvider backend={HTML5Backend}>
        <ScheduleDragForm />
      </DndProvider>
    </div>
  );
};

export default SchedulePage;
