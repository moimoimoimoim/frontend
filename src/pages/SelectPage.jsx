import { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import SelectMoim from "../components/SelectMoim/SelectMoim";
import SelectButton from "../components/SelectMoim/SelectButton";

const SelectPage = () => {
  const [currentStep] = useState(2);
  return (
    <div>
      <StepIndicator
        title="이런 일정은 어떠세요?"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
      <SelectMoim />
    </div>
  );
};

export default SelectPage;
