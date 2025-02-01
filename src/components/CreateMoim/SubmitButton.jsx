import "./CreateMoimForm.css";

const SubmitButton = ({ onNextStep }) => {
  return (
    <div className="center">
      <button className="submit-button" onClick={onNextStep}>
        <span className="center">다음 단계</span>
      </button>
    </div>
  );
};

export default SubmitButton;
