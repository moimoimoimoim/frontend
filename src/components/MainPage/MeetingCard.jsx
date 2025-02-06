import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동을 위한 useNavigate 추가
import "./MeetingCard.css";
import calendarIcon from "../../assets/schedule.png";
import folder from "../../assets/folder-allblack.png";
import { convertToTime } from "../../utils/convertTimeslot";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const MeetingCard = ({ meeting, user, isOwner }) => {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 추가
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
  let scheduleText = "";
  if (meeting?.confirmedSchedule?.start && meeting?.confirmedSchedule?.end) {
    const [startDay, startHour, startMinute] = convertToTime(
      meeting.confirmedSchedule.start
    );
    const [endDay, endHour, endMinute] = convertToTime(
      meeting.confirmedSchedule.end
    );
    scheduleText = `${startDay} ${startHour}:${startMinute} ~ ${endDay} ${endHour}:${endMinute}`;
  } else scheduleText = "투표중";

  let schedule = null;
  if (meeting.meetingSchedules && user) {
    schedule = meeting.meetingSchedules.find(
      (scheduleItem) => scheduleItem.user === user._id
    );
  }

  // ✅ 카드 클릭 시 경로 변경하는 함수
  const handleCardClick = () => {
    if (scheduleText === "투표중" && isOwner) {
      navigate("/select/" + meeting._id); // ✅ 일정이 확정되지 않았으면 /select로 이동
    } else {
      navigate("/show/" + meeting._id); // ✅ 일정이 확정되었으면 /show로 이동
    }
  };

  const toggleExpiration = () => {
    fetch(
      `${API_URL}/${meeting.isExpired ? "activate" : "expire"}/${meeting._id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    ).then((res) => res.json());
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
          {schedule && scheduleText === "투표중" && (
            <button
              className="button-end main-header-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/schedule/" + schedule._id);
              }}
            >
              일정 수정
            </button>
          )}
          <button
            className="button-end main-header-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpiration();
            }}
          >
            {meeting.isExpired ? "활성화" : "마감"}
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
          <span className="meeting-group">
            {meeting.meetingGroup ? meeting.meetingGroup.name : "그룹 없음"}
          </span>
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
