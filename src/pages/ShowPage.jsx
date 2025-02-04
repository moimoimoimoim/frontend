import { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import ShowMoim from "../components/ShowPage/ShowMoim";
import SelectButton from "../components/SelectMoim/SelectButton";

const ShowPage = () => {
  const [currentStep] = useState(2);
  return (
    <div>
      <StepIndicator
        title="해당 일정을 친구들에게 공유해 보세요!"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
      <ShowMoim />
    </div>
  );
};

export default ShowPage;
