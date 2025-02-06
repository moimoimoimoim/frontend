import { useState, useEffect } from "react";
import "./SelectMoim.css";
import SelectButton from "./SelectButton";
import { convertToTime } from "../../utils/convertTimeslot";

const API_URL = import.meta.env.VITE_API_URL; // 기본값 설정

const SelectMoim = ({ meetingId }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [moimData, setMoimData] = useState([]); // 백엔드에서 가져온 데이터 저장
  const [isFirstLoad, setIsFirstLoad] = useState(true); // ✅ 처음 한 번만 애니메이션 실행

  // ✅ 백엔드에서 모임 데이터 가져오기
  useEffect(() => {
    fetch(`${API_URL}/filter-timeslots/${meetingId}`, {
      method: "POST",
      body: JSON.stringify({ minDuration: 0, minMembers: 1 }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }) // 실제 백엔드 API URL로 변경하세요.
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMoimData(data);
        } else {
          setMoimData([]);
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
        setMoimData([]);
      });

    setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000);
  }, []);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <section>
      <div className="moim-section">
        {moimData && moimData.length > 0 ? (
          moimData.map((moim, index) => {
            const [startDay, startHour, startMinute] = convertToTime(
              moim.start
            );
            const [endDay, endHour, endMinute] = convertToTime(moim.end);
            return (
              <div
                key={index}
                className={`moim-list ${isFirstLoad ? "animated" : ""} ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onClick={() => handleSelect(index)}
              >
                <h3>
                  {moim &&
                    `${startDay} ${startHour}:${startMinute} ~ ${endDay} ${endHour}:${endMinute}`}
                </h3>
              </div>
            );
          })
        ) : (
          <span>추천 일정이 없습니다.</span>
        )}
      </div>
      {/* ✅ 선택된 일정 확인 UI */}
      {selectedIndex !== null && (
        <div className="show-elements">
          <span className="question center">
            해당 일정으로 확정하시겠습니까?
          </span>
          <div className="select-btn">
            <SelectButton
              selectedMoim={
                selectedIndex !== null ? moimData[selectedIndex] : null
              }
              meetingId={meetingId}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectMoim;
