import { useState } from "react";
import "./MeetingCard.css";
import calendarIcon from "../../assets/schedule.png";
import folder from "../../assets/folder-allblack.png";

const MeetingCard = ({ meeting }) => {
  const [memo, setMemo] = useState(""); // 📝 메모 상태
  const [isEditing, setIsEditing] = useState(false); // ✏️ 수정 모드 상태

  // ✅ 메모 변경 핸들러 (최대 50자)
  const handleMemoChange = (e) => {
    if (e.target.value.length <= 75) {
      setMemo(e.target.value);
    }
  };

  // ✅ "수정" 버튼 클릭 시
  const handleEditClick = () => {
    if (isEditing) {
    }
    setIsEditing(!isEditing);
  };

  //텍스트 전체보기
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  // ✅ 확정된 일정이 없으면 "투표중" 표시
  const scheduleText =
    meeting.schedule && meeting.schedule.length > 0
      ? meeting.schedule.join(", ") // ✅ 여러 일정이 있으면 ", "로 연결
      : "투표중";

  return (
    <div className="meeting-card">
      <div className="meeting-header">
        <h3 className="meeting-title">{meeting.title}</h3>
        <div className="btn-container">
          <button
            className="button-re main-header-btn"
            onClick={handleEditClick}
          >
            {isEditing ? "완료" : "수정"}
          </button>
          <button className="button-end main-header-btn">마감</button>
        </div>
      </div>
      <div className="meeting-main">
        <div className="meeting-info">
          <img src={calendarIcon} alt="일정 아이콘" className="schedule-icon" />
          <span
            className="meeting-schedule"
            data-full-text={scheduleText}
            onClick={() => setShowFullSchedule(!showFullSchedule)}
          >
            {showFullSchedule
              ? scheduleText
              : scheduleText.length > 10
              ? `${scheduleText.slice(0, 10)}...`
              : scheduleText}
          </span>
        </div>

        <hr />

        <div className="meeting-group-info">
          <img src={folder} alt="폴더 아이콘" className="folder-icon" />
          <span className="meeting-group">{meeting.group}</span>
        </div>

        <div className="memo-container">
          {isEditing ? (
            <textarea
              className="memo-input"
              value={memo}
              onChange={handleMemoChange}
            />
          ) : (
            <span className={`memo-text ${memo ? "filled" : ""}`}>
              {memo || "메모를 입력해주세요. (최대 75자)"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
