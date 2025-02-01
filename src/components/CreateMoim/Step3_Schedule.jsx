import "./CreateMoimForm.css";
import "./Step3_Schedule.css";
import { useState } from "react";

const Step3_Schedule = ({ schedules, setSchedules }) => {
  const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일
  const [startTime, setStartTime] = useState(""); // 시작 시간
  const [endTime, setEndTime] = useState(""); // 종료 시간
  const [isOpen, setIsOpen] = useState(false); // 요일 선택창 상태
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  // ✅ 1~12시까지만 선택할 수 있도록 설정
  const timeOptions = Array.from({ length: 24 }, (_, i) => `${i - 1 + 1}:00`);

  // 요일 선택 핸들러
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // 일정 추가 핸들러
  const addSchedule = () => {
    if (selectedDays.length > 0 && startTime && endTime) {
      setSchedules([
        ...schedules,
        { days: selectedDays.join(", "), startTime, endTime },
      ]);
      setSelectedDays([]);
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <div className="form-section">
      <span className="create-container__title">
        3. 요일 및 시간대를 설정해주세요. (여러 일정을 추가할 수 있습니다.)
      </span>

      <div className="step3-form-fields">
        {/* ✅ 요일 선택 버튼 */}
        <div className="day-selector">
          <button
            className="day-selector-style"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedDays.length > 0
              ? selectedDays.join(", ")
              : "요일을 선택해주세요."}
          </button>

          {isOpen && (
            <div className="day-dropdown">
              <div className="day-header">
                <label className="all-select">
                  <input
                    className="all-select_btn"
                    type="checkbox"
                    checked={selectedDays.length === days.length}
                    onChange={() =>
                      setSelectedDays(
                        selectedDays.length === days.length ? [] : [...days]
                      )
                    }
                  />
                  <span>전체 선택</span>
                </label>
                <button className="done-btn" onClick={() => setIsOpen(false)}>
                  완료
                </button>
              </div>

              <div className="day-options">
                {days.map((day) => (
                  <label
                    key={day}
                    className={`day-option ${
                      selectedDays.includes(day) ? "selected" : ""
                    } ${
                      day === "토" ? "saturday" : day === "일" ? "sunday" : ""
                    }`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ✅ 시작 시간 선택 */}
        <div className="time-picker">
          <div className="dropdown">
            <button
              className="dropdown-btn time-selector-style"
              onClick={() => setIsOpenStart(!isOpenStart)}
            >
              {startTime || "시작 시간"}
            </button>
            {isOpenStart && (
              <div className="dropdown-list">
                {timeOptions.map((time) => (
                  <div
                    key={time}
                    className="dropdown-item"
                    onClick={() => {
                      setStartTime(time);
                      setIsOpenStart(false);
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ✅ 종료 시간 선택 */}
        <div className="time-picker">
          <div className="dropdown">
            <button
              className="dropdown-btn time-selector-style"
              onClick={() => setIsOpenEnd(!isOpenEnd)}
            >
              {endTime || "종료 시간"}
            </button>
            {isOpenEnd && (
              <div className="dropdown-list">
                {timeOptions.map((time) => (
                  <div
                    key={time}
                    className="dropdown-item"
                    onClick={() => {
                      setEndTime(time);
                      setIsOpenEnd(false);
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ✅ 추가하기 버튼 */}
        <button className="add-button" onClick={addSchedule}>
          + 추가하기
        </button>
      </div>
    </div>
  );
};

export default Step3_Schedule;
