import { useState, useEffect } from "react";
import "./SelectMoim.css";
import SelectButton from "./SelectButton";

const SelectMoim = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [moimData, setMoimData] = useState([]); // 백엔드에서 가져온 데이터 저장

  // ✅ 백엔드에서 모임 데이터 가져오기
  useEffect(() => {
    fetch("https://api.example.com/moims") // 실제 백엔드 API URL로 변경하세요.
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setMoimData(data);
        } else {
          setMoimData([
            {
              id: 1,
              title: "스터디 모임",
              date: "2025-02-10",
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
        setMoimData([
          {
            id: "ㅎㅇㅌ",
            title: "데이터 로딩 실패",
            date: "ㅎㅇ",
          },
        ]); // 오류 발생 시 기본 박스 표시
      });
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

    const selectedMoim = moimData[selectedIndex];

    console.log("백엔드로 보낼 데이터:", selectedMoim);

    // ✅ 백엔드로 데이터 전송
    fetch("https://api.example.com/confirm-moim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    <section className="moim-section">
      {/* ✅ 최소 3개의 빈 박스를 유지 */}
      {[...Array(Math.max(3, moimData.length))].map((_, index) => {
        const moim = moimData[index] || {
          id: " ",
          title: "모임 없음",
          date: " ",
        };

        // 나중에 복붙해야될 곳
        return (
          <div
            key={index}
            className={`moim-list ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <h3>{moim.title}</h3>
            <p>{moim.date}</p>
          </div>
        );
        {
          /* ✅ 선택된 데이터를 `SelectButton`으로 전달 */
        }
      })}
    </section>
  );
};

export default SelectMoim;
