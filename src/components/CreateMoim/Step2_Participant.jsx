import "./CreateMoimForm.css";
import "./Step2_Participant.css";

const Step2_Participant = ({ memberTotal, setMemberTotal }) => {
  return (
    <div className="form-section">
      <span className="create-container__title">
        2. 참여 인원을 설정해주세요.
      </span>
      <div className="step2-form-fields">
        <select
          className="step2-people"
          value={memberTotal}
          onChange={(e) => setMemberTotal(e.target.value)}
        >
          <option value="" disabled>
            인원수
          </option>
          <option value="1">미정</option>
          <option value="2">2명</option>
          <option value="3">3명</option>
          <option value="4">4명</option>
          <option value="5">5명</option>
          <option value="6">6명</option>
          <option value="7">7명</option>
          <option value="8">8명</option>
          <option value="9">9명</option>
          <option value="10">10명</option>
        </select>
      </div>
    </div>
  );
};

export default Step2_Participant;
