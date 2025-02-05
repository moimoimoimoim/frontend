import "./CreateMoimForm.css";
// import { useState } from "react"; // useState를 추가
// import Step1_MoimInfo from "./Step1_MoimInfo";
// import Step2_Participant from "./Step2_Participant";

// import Step3_Schedule from "./Step3_Schedule";
// import SelectedScheduleList from "./SelectedScheduleList";

// import SubmitButton from "./SubmitButton";

const CreateMoimForm = ({ children }) => {
  // const [meeting_name, setmeeting_name] = useState("");
  // const [group, setGroup] = useState("");
  // const [meeting_code, setmeeting_code] = useState("");
  // const [participant_count, setparticipant_count] = useState("");
  // const [schedules, setSchedules] = useState([]); // 일정 리스트

  return (
    <div className="create-container">
      {/* <h2>모임 생성하기</h2> */}
      {children}
    </div>
  );
};

export default CreateMoimForm;
