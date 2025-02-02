import PropTypes from "prop-types";
import "./SelectedScheduleList.css";

const SelectedScheduleList = ({ schedules, children }) => {
  return (
    <div className="schedule-container">
      {children} {/* ✅ 전달된 그룹명, 참여코드 등 출력 */}
      <span className="schedule-container__title">🗓 선택한 일정 목록</span>
      <div className="schedule-fields">
        {schedules.length > 0 ? (
          <ul>
            {schedules.map((schedule, index) => (
              <li key={index}>
                <div className="schedule">
                  <span className="schedule-list">요일</span> {schedule.days}{" "}
                </div>
                <div className="schedule">
                  <span className="schedule-list">시작 시간</span>{" "}
                  {schedule.startTime}{" "}
                </div>
                <div className="schedule">
                  <span className="schedule-list">종료 시간</span>{" "}
                  {schedule.endTime}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <span className="no-schedule">선택된 일정이 없습니다.</span>
        )}
      </div>
    </div>
  );
};

SelectedScheduleList.propTypes = {
  schedules: PropTypes.array.isRequired, // ✅ 배열 타입 검증
  children: PropTypes.node, // ✅ 내부 내용(children)도 받도록 설정
};

export default SelectedScheduleList;
