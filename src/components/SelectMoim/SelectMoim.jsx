import { useState, useEffect } from "react";
import "./SelectMoim.css";
import SelectButton from "./SelectButton";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // 기본값 설정
const SelectMoim = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [moimData, setMoimData] = useState([]); // 백엔드에서 가져온 데이터 저장
  const [isFirstLoad, setIsFirstLoad] = useState(true); // ✅ 처음 한 번만 애니메이션 실행

  // ✅ 백엔드에서 모임 데이터 가져오기
  useEffect(() => {
    fetch(`${API_URL}/new-calendars`) // 실제 백엔드 API URL로 변경하세요.
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMoimData(data);
        } else {
          // ✅ 데이터가 비었을 경우 기본 3개 칸을 유지하면서 첫 번째 칸에 샘플 데이터 추가
          setMoimData([
            { id: 1, title: "스터디 모임", date: "2025-02-10" },
            { id: null, title: "모임 없음", date: "" },
            { id: null, title: "모임 없음", date: "" },
          ]);
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
        setMoimData([
          { id: "ㅎㅇㅌ", title: "데이터 로딩 실패", date: "ㅎㅇ" },
          { id: null, title: "모임 없음", date: "" },
          { id: null, title: "모임 없음", date: "" },
        ]); // 오류 발생 시 기본 박스 표시
      });
    // ✅ 애니메이션 한 번 실행 후 비활성화
    setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000);
  }, []);

  const handleSelect = (index) => {
    console.log(`✅ 선택된 인덱스: ${index}, 데이터:`, moimData[index]);
    setSelectedIndex(index);
  };

  const handleConfirm = () => {
    if (selectedIndex === null) {
      alert("모임을 선택해주세요!");
      return;
    }
    console.log("✅ 확정된 일정:", selectedMoim);
    setConfirmedMoim(selectedMoim);
    localStorage.setItem("confirmedMoim", JSON.stringify(selectedMoim)); // ✅ localStorage 저장
    const selectedMoim = moimData[selectedIndex];

    console.log("백엔드로 보낼 데이터:", selectedMoim);

    // ✅ 백엔드로 데이터 전송
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedMoim),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("백엔드 응답:", data);
        alert("모임이 확정되었습니다!");
      })
      .catch((error) => console.error("데이터 전송 실패:", error));
  };

  return (
    <section>
      <div className="moim-section">
        {/* ✅ 최소 3개의 빈 박스를 유지하면서 기존 데이터를 유지 */}
        {Array.from({ length: Math.max(3, moimData.length) }, (_, index) => {
          const moim = moimData[index] || {
            id: null,
            title: "모임 없음",
            date: "",
          };

          return (
            <div
              key={index}
              className={`moim-list ${isFirstLoad ? "animated" : ""} ${
                selectedIndex === index ? "selected" : ""
              }`}
              onClick={() => handleSelect(index)}
            >
              <h3>{moim.title}</h3>
              <p>{moim.date}</p>
            </div>
          );
        })}
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
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectMoim;
