import PropTypes from "prop-types";
import "./SelectedScheduleList.css";

const SelectedScheduleList = ({ schedules, children }) => {
  return (
    <div className="schedule-container">
      {children} {/* ✅ 전달된 그룹명, 참여코드 등 출력 */}
      <span className="schedule-container__title">🗓 선택한 일정 목록</span>
      <div className="schedule-grid">
        {schedules.length > 0 ? (
          <div>
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="schedule-card center
              "
              >
                <div className="schedule-list">
                  <span className="schedule-key"> 요일 </span>
                  <span className="schedule-value">{schedule.days}</span>
                </div>
                <div className="schedule-list">
                  <span className="schedule-key">시작 시간 </span>
                  <span className="schedule-value">{schedule.startTime}</span>
                </div>
                <div className="schedule-list">
                  <span className="schedule-key">종료 시간 </span>
                  <span className="schedule-value">{schedule.endTime}</span>
                </div>
              </div>
            ))}
          </div>
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
