import { useState } from "react";
import StepIndicator from "../components/StepIndicator";

const SchedulePage = () => {
  const [currentStep] = useState(1);
  return (
    <div>
      <StepIndicator
        title="일정 조율하기"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
    </div>
  );
};

export default SchedulePage;
