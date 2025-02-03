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
}) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [isOpen, setIsOpen] = useState(false); // ✅ isOpen 추가
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [timeslots, setTimeslots] = useState([]);
  // ✅ 1~12시까지만 선택할 수 있도록 설정
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2); // 시간 계산 (0~23)
    const minutes = i % 2 === 0 ? "00" : "30"; // 30분 단위
    return `${hours}:${minutes}`;
  }).filter((time) => parseInt(time.split(":")[0]) < 24); // 24:00 이상 제거

  // 요일 선택 핸들러
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const convertToSlot = (day, time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return (day - 1) * 48 + hours * 2 + minutes / 30;
  };

  // ✅ 기존 timeslots을 유지하면서 새로운 슬롯 추가
  const updateTimeslots = (newSchedules, prevTimeslots) => {
    let updatedTimeslots = [...prevTimeslots]; // 기존 timeslots 유지

    newSchedules.forEach(({ startSlot, endSlot }) => {
      for (let slot = startSlot; slot <= endSlot; slot++) {
        if (!updatedTimeslots.includes(slot)) {
          updatedTimeslots.push(slot);
        }
      }
    });

    return updatedTimeslots;
  };
  // 일정 추가 핸들러
  const addSchedule = () => {
    if (selectedDays.length > 0 && startTime && endTime) {
      const scheduleData = selectedDays.map((day) => {
        const dayNumber = days.indexOf(day) + 1; // "월" → 1, "화" → 2 ...
        return {
          days: day, // 기존 요일
          startTime,
          endTime,
          startSlot: convertToSlot(dayNumber, startTime),
          endSlot: convertToSlot(dayNumber, endTime) - 1,
        };
      });
      // ✅ 콘솔에서 변환된 슬롯 값 확인하기!
      console.log("📤 변환된 일정 데이터:", scheduleData, days);

      // ✅ 기존 schedules에 새로운 일정 추가
      setSchedules((prevSchedules) => [
        ...prevSchedules,

        { days: selectedDays.join(", "), startTime, endTime },
      ]);

      // ✅ 기존 timeslots 유지하면서 업데이트
      setTimeslots((prevTimeslots) => {
        const timeBlocks = updateTimeslots(scheduleData, prevTimeslots);
        console.log("📤 업데이트된 timeBlocks:", timeBlocks);
        return timeBlocks;
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
