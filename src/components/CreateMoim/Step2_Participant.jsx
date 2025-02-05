import "./CreateMoimForm.css";
import "./Step2_Participant.css";

const Step2_Participant = ({ participant_count, setparticipant_count }) => {
  return (
    <div className="form-section">
      <span className="create-container__title">
        2. 참여 인원을 설정해주세요.
      </span>
      <div className="step2-form-fields">
        <select
          className="step2-people"
          value={participant_count}
          onChange={(e) => setparticipant_count(e.target.value)}
        >
          <option value="" disabled>
            인원수
          </option>
          <option value="1">미정</option>
          <option value="2">2명</option>
          <option value="3">3명</option>
          <option value="4">4명</option>
          <option value="5">5명 이상</option>
        </select>
      </div>
    </div>
  );
};

export default Step2_Participant;
