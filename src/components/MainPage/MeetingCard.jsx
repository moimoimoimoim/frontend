import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동을 위한 useNavigate 추가
import "./MeetingCard.css";
import calendarIcon from "../../assets/schedule.png";
import folder from "../../assets/folder-allblack.png";

const MeetingCard = ({ meeting }) => {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 추가
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

  // ✅ 확정된 모임이 있으면 해당 일정 표시, 없으면 "투표중"
  const scheduleText = meeting?.confirmedSchedule?.type
    ? `${meeting?.confirmedSchedule?.type} (${meeting.meetingName})`
    : "투표중";

  // ✅ 카드 클릭 시 경로 변경하는 함수
  const handleCardClick = () => {
    if (scheduleText === "투표중") {
      navigate("/select/" + meeting._id); // ✅ 일정이 확정되지 않았으면 /select로 이동
    } else {
      navigate("/show/" + meeting._id); // ✅ 일정이 확정되었으면 /show로 이동
    }
  };

  return (
    <div
      className="meeting-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="meeting-header">
        <h3 className="meeting-title">{meeting.meetingName}</h3>
        <div className="btn-container">
          {/* <button
            className="button-re main-header-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick();
            }}
          >
            {isEditing ? "완료" : "수정"}
          </button> */}
          <button
            className="button-end main-header-btn"
            onClick={(e) => e.stopPropagation()}
          >
            마감
          </button>
        </div>
      </div>
      <div className="meeting-main">
        <div className="meeting-info">
          <img src={calendarIcon} alt="일정 아이콘" className="schedule-icon" />
          <span
            className={`meeting-schedule ${isExpanded ? "show" : ""}`}
            ref={scheduleRef}
          >
            {scheduleText}
          </span>
        </div>

        <hr />

        <div className="meeting-group-info">
          <img src={folder} alt="폴더 아이콘" className="folder-icon" />
          <span className="meeting-group">{meeting.meetingGroup.name}</span>
        </div>

        {/* <div className="memo-container">
          {isEditing ? (
            <textarea
              className="memo-input"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          ) : (
            <span className={`memo-text ${memo ? "filled" : ""}`}>
              {memo || "메모를 입력해주세요. (최대 75자)"}
            </span>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default MeetingCard;
