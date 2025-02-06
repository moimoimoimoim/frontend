import { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import SelectMoim from "../components/SelectMoim/SelectMoim";
import { useParams } from "react-router-dom";

const SelectPage = () => {
  const { meetingId } = useParams();
  const [currentStep] = useState(2);
  return (
    <div>
      <StepIndicator
        title="이런 일정은 어떠세요?"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
      <SelectMoim meetingId={meetingId} />
    </div>
  );
};

export default SelectPage;
