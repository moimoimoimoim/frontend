import "./CreateMoimForm.css";
import "./Step3_Schedule.css";
import { convertToSlot } from "../../utils/convertTimeslot.jsx";
import React, { useEffect, useState } from "react";

const Step3_Schedule = ({
  schedules = [], // 기본값 설정
  setSchedules = () => {},
  selectedDays = [], // 기본값 설정
  setSelectedDays = () => {},
  startTime = "",
  setStartTime = () => {},
  endTime = "",
  setEndTime = () => {},
  setTimeBlocks = () => {},
}) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [timeslots, setTimeslots] = useState([]);

  // ✅ 시간 선택 옵션 (00:00 ~ 23:30, 30분 단위)
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  }).filter((time) => parseInt(time.split(":")[0]) < 24);

  // ✅ 종료 시간 선택 시, 시작 시간 이후의 시간만 선택 가능하도록 수정
  const filteredEndTimeOptions = timeOptions.filter((time) => {
    if (!startTime) return true;
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = time.split(":").map(Number);

    // 분 단위로 변환하여 비교
    return endHour * 60 + endMinute > startHour * 60 + startMinute;
  });

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
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

      setSchedules((prevSchedules) => [
        ...prevSchedules,
        { days: selectedDays.join(", "), startTime, endTime },
      ]);

      // 기존 timeslots 업데이트 함수
      setTimeslots((prevTimeslots) => {
        const newTimeslots = updateTimeslots(scheduleData, prevTimeslots);

        return newTimeslots;
      });

      // 중복 제거된 timeBlocks 저장하기
      setTimeBlocks((prevTimeBlocks) => {
        const newTimeBlocks = updateTimeslots(scheduleData, prevTimeBlocks).map(
          (slot) => slot // 또는 추가적인 매핑
        );
        // 중복 제거하기
        const uniqueTimeBlocks = [...new Set(newTimeBlocks)];
        console.log("📤 중복 제거된 timeBlocks:", uniqueTimeBlocks);
        return uniqueTimeBlocks;
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
            {selectedDays?.length > 0
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

        {/* ✅ 종료 시간 선택 (startTime 이후의 시간만 표시) */}
        <div className="time-picker">
          <div className="dropdown">
            <button
              className="dropdown-btn time-selector-style"
              onClick={() => setIsOpenEnd(!isOpenEnd)}
              disabled={!startTime} // 시작 시간을 선택하지 않으면 비활성화
            >
              {endTime || "종료 시간"}
            </button>
            {isOpenEnd && (
              <div className="dropdown-list">
                {filteredEndTimeOptions.map((time) => (
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
