import { useState, useRef, useEffect } from "react";
import "./MeetingCard.css";
import calendarIcon from "../../assets/schedule.png";
import folder from "../../assets/folder-allblack.png";

const MeetingCard = ({ meeting }) => {
  const [memo, setMemo] = useState(""); // 📝 메모 상태
  const [isEditing, setIsEditing] = useState(false); // ✏️ 수정 모드 상태
  const [isExpanded, setIsExpanded] = useState(false);
  const scheduleRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (scheduleRef.current) {
      setIsOverflowing(
        scheduleRef.current.scrollWidth > scheduleRef.current.clientWidth
      );
    }
  }, [meeting.schedule]);

  const scheduleText =
    meeting.schedule && meeting.schedule.length > 0
      ? meeting.schedule.join(" / ")
      : "투표중";

  // ✅ "수정" 버튼 클릭 시
  const handleEditClick = () => {
    if (isEditing) {
    }
    setIsEditing(!isEditing);
  };

  // ✅ 메모 변경 핸들러 (최대 75자)
  const handleMemoChange = (e) => {
    if (e.target.value.length <= 75) {
      setMemo(e.target.value);
    }
  };

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
            className={`meeting-schedule ${isExpanded ? "show" : ""}`}
            ref={scheduleRef}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {scheduleText}
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
