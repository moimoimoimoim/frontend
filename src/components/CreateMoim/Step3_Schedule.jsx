import "./CreateMoimForm.css";
import "./Step3_Schedule.css";
import { convertToSlot } from "../../utils/convertTimeslot.jsx";
import { useState } from "react";

const Step3_Schedule = ({
  schedules,
  setSchedules,
  selectedDays,
  setSelectedDays,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  setTimeBlocks, // ✅ 부모로 전달할 timeBlocks 상태 추가
}) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [timeslots, setTimeslots] = useState([]);

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  }).filter((time) => parseInt(time.split(":")[0]) < 24);

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const convertToSlot = (day, time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return (day - 1) * 48 + hours * 2 + minutes / 30;
  };

  const updateTimeslots = (newSchedules, prevTimeslots) => {
    let updatedTimeslots = [...prevTimeslots];

    newSchedules.forEach(({ startSlot, endSlot }) => {
      for (let slot = startSlot; slot <= endSlot; slot++) {
        if (!updatedTimeslots.includes(slot)) {
          updatedTimeslots.push(slot);
        }
      }
    });

    return updatedTimeslots;
  };

  const addSchedule = () => {
    if (selectedDays.length > 0 && startTime && endTime) {
      const scheduleData = selectedDays.map((day) => {
        const dayNumber = days.indexOf(day) + 1;
        return {
          days: day,
          startTime,
          endTime,
          startSlot: convertToSlot(dayNumber, startTime),
          endSlot: convertToSlot(dayNumber, endTime) - 1,
        };
      });

      console.log("📤 변환된 일정 데이터:", scheduleData);

      setSchedules((prevSchedules) => [
        ...prevSchedules,
        { days: selectedDays.join(", "), startTime, endTime },
      ]);

      setTimeslots((prevTimeslots) => {
        const newTimeslots = updateTimeslots(scheduleData, prevTimeslots);
        console.log("📤 업데이트된 timeslots:", newTimeslots);
        return newTimeslots;
      });

      // ✅ timeBlocks 상태도 같이 업데이트
      setTimeBlocks((prevTimeBlocks) => {
        const newTimeBlocks = updateTimeslots(scheduleData, prevTimeBlocks).map(
          (slot) => ({ timeBlocks: slot }) // JSON 형식 맞추기
        );
        console.log("📤 업데이트된 timeBlocks:", newTimeBlocks);
        return newTimeBlocks;
      });
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
