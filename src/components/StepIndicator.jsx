import "./StepIndicator.css"; // CSS 파일에서 스타일 지정

const StepIndicator = ({ steps, currentStep, title }) => {
  return (
    <section className="step-container">
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? "active" : ""}`}
          />
        ))}
      </div>
      <span className="step-title">{title}</span>
    </section>
  );
};

export default StepIndicator;
