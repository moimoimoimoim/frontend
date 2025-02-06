import React, { useState, useRef, useEffect } from "react";
import "./ScheduleDragForm.css";

const ScheduleDragForm = ({ onSubmit, initialTimeslots, meetingTimezone }) => {
  // ✅ props로 onSubmit 받기
  const exBlocks = Array.from({ length: 48 }, (_, i) =>
    Array(7).fill(
      `${String(Math.floor(i / 2)).padStart(2, "0")}:${
        i % 2 === 0 ? "00" : "30"
      }`
    )
  );

  // rowIndex와 colIndex를 기반으로 slot을 계산하는 함수
  const convertToSlot = (colIndex, rowIndex) => colIndex * 48 + rowIndex;
  const convertToIndex = (slot) => [Math.floor(slot / 48), slot % 48];
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [fixedCells, setFixedCells] = useState(new Set());
  const isDragging = useRef(false);
  const [startDrag, setStartDrag] = useState({ row: null, col: null });
  const toggleMode = useRef(false);

  useEffect(() => {
    if (initialTimeslots === undefined) return;
    const newSelectedCells = new Set(selectedCells);
    initialTimeslots.forEach(({ slot }) => {
      const [colIndex, rowIndex] = convertToIndex(slot);
      newSelectedCells.add(`${rowIndex}-${colIndex}`);
    });
    setSelectedCells(newSelectedCells);
  }, [initialTimeslots]);

  useEffect(() => {
    if (meetingTimezone === undefined) return;
    const newFixedCells = new Set(fixedCells);
    meetingTimezone.forEach(({ slot }) => {
      const [colIndex, rowIndex] = convertToIndex(slot);
      newFixedCells.add(`${rowIndex}-${colIndex}-fix`);
    });
    setFixedCells(newFixedCells);
  }, [meetingTimezone]);

  // 마우스를 누를 때 드래그 시작 (토글 방식 적용)
  const handleMouseDown = (rowIndex, colIndex) => {
    if (colIndex < 0 || colIndex > 6) return;

    isDragging.current = true;
    setStartDrag({ row: rowIndex, col: colIndex });

    const cellKey = `${rowIndex}-${colIndex}`;
    const newSelectedCells = new Set(selectedCells);

    if (newSelectedCells.has(cellKey)) {
      newSelectedCells.delete(cellKey);
      toggleMode.current = false;
    } else {
      newSelectedCells.add(cellKey);
      toggleMode.current = true;
    }

    setSelectedCells(newSelectedCells);
  };

  // 마우스를 움직일 때 드래그 영역 선택
  const handleMouseMove = (e) => {
    if (!isDragging.current || startDrag.row === null || startDrag.col === null)
      return;

    const targetRow = Number(e.target.getAttribute("data-row"));
    const targetCol = Number(e.target.getAttribute("data-col"));

    if (
      !isNaN(targetRow) &&
      !isNaN(targetCol) &&
      targetCol >= 0 &&
      targetCol <= 6 &&
      targetCol === startDrag.col
    ) {
      const newSelectedCells = new Set(selectedCells);

      for (
        let r = Math.min(startDrag.row, targetRow);
        r <= Math.max(startDrag.row, targetRow);
        r++
      ) {
        const cellKey = `${r}-${targetCol}`;
        if (toggleMode.current) {
          newSelectedCells.add(cellKey);
        } else {
          newSelectedCells.delete(cellKey);
        }
      }

      setSelectedCells(newSelectedCells);
    }
  };

  // 마우스를 떼면 드래그 종료
  const handleMouseUp = () => {
    isDragging.current = false;
    setStartDrag({ row: null, col: null });

    const selectedSlots = {};
    selectedCells.forEach((cell) => {
      const [rowIndex, colIndex] = cell.split("-").map(Number);
      const slot = convertToSlot(colIndex, rowIndex);

      if (!selectedSlots[slot]) {
        selectedSlots[slot] = new Set();
      }
      selectedSlots[slot].add("user1");
    });

    const formattedData = {
      timeslots: Object.entries(selectedSlots).map(([slot]) => ({
        slot: Number(slot),
      })),
    };

    console.log(
      "📤 ScheduleDragForm에서 부모로 보낼 데이터:",
      JSON.stringify(formattedData, null, 2)
    );

    // ✅ 부모 컴포넌트로 데이터 전달
    if (onSubmit) {
      onSubmit(formattedData);
    } else {
      console.error("⚠️ ScheduleDragForm: onSubmit이 정의되지 않음!");
    }
  };
  // 요일 클릭 시 해당 열 전체 선택/해제
  const handleHeaderClick = (colIndex) => {
    if (colIndex < 0 || colIndex > 6) return;

    const newSelectedCells = new Set(selectedCells);
    const isAlreadySelected = Array.from(newSelectedCells).some((cell) =>
      cell.endsWith(`-${colIndex}`)
    );

    for (let rowIndex = 0; rowIndex < exBlocks.length; rowIndex++) {
      const cellKey = `${rowIndex}-${colIndex}`;
      if (isAlreadySelected) {
        newSelectedCells.delete(cellKey);
      } else {
        newSelectedCells.add(cellKey);
      }
    }

    setSelectedCells(newSelectedCells);
  };

  // 시간 클릭 시 해당 행 전체 선택/해제
  const handleTimeClick = (rowIndex) => {
    const newSelectedCells = new Set(selectedCells);
    const isAlreadySelected = Array.from(newSelectedCells).some((cell) =>
      cell.startsWith(`${rowIndex}-`)
    );

    for (let colIndex = 0; colIndex <= 6; colIndex++) {
      const cellKey = `${rowIndex}-${colIndex}`;
      if (isAlreadySelected) {
        newSelectedCells.delete(cellKey);
      } else {
        newSelectedCells.add(cellKey);
      }
    }

    setSelectedCells(newSelectedCells);
  };

  // **전체 선택 버튼 클릭 시 모든 셀 선택/해제**
  const handleSelectAll = () => {
    const newSelectedCells = new Set(selectedCells);
    const isAnySelected = newSelectedCells.size > 0; // 선택된 셀이 하나라도 있으면 전체 해제

    for (let rowIndex = 0; rowIndex < exBlocks.length; rowIndex++) {
      for (let colIndex = 0; colIndex <= 6; colIndex++) {
        const cellKey = `${rowIndex}-${colIndex}`;
        if (isAnySelected) {
          newSelectedCells.delete(cellKey);
        } else {
          newSelectedCells.add(cellKey);
        }
      }
    }
    // 선택된 셀을 JSON 데이터로 변환
    const getSelectedSlots = () => {
      const selectedSlots = {};
      selectedCells.forEach((cell) => {
        const [rowIndex, colIndex] = cell.split("-").map(Number);
        const slot = convertToSlot(colIndex, rowIndex);

        if (!selectedSlots[slot]) {
          selectedSlots[slot] = new Set();
        }
        selectedSlots[slot].add("user1"); // 현재는 user1만 추가 (다중 유저 확장 가능)
      });

      return {
        timeslots: Object.entries(selectedSlots).map(([slot, members]) => ({
          slot: Number(slot),
          members: Array.from(members),
        })),
      };
    };
    setSelectedCells(newSelectedCells);
  };

  return (
    <div className="table-container center">
      <table className="fixed-table">
        <thead>
          <tr>
            <th
              onClick={handleSelectAll}
              style={{ fontSize: "13px", cursor: "pointer" }}
            >
              전체선택
            </th>
            {["월", "화", "수", "목", "금", "토", "일"].map((day, colIndex) => (
              <th
                key={colIndex}
                onClick={() => handleHeaderClick(colIndex)} // 요일 클릭 이벤트 추가
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exBlocks.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* 첫 번째 열(시간) - 클릭하면 해당 행 전체 선택 */}
              <td
                className="td-style"
                onClick={() => handleTimeClick(rowIndex)}
                style={{
                  cursor: "pointer",
                }}
              >
                {rowIndex % 2 === 0 ? (
                  <span className="time-section">
                    {String(Math.floor(rowIndex / 2)).padStart(2, "0")}시
                  </span>
                ) : (
                  <span className="time-section-30">
                    {String(Math.floor(rowIndex / 2)).padStart(2, "0")} : 30
                  </span>
                )}
              </td>

              {row.map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  data-row={rowIndex}
                  data-col={colIndex}
                  onMouseDown={() =>
                    colIndex >= 0 &&
                    colIndex <= 6 &&
                    handleMouseDown(rowIndex, colIndex)
                  }
                  onMouseMove={(e) =>
                    colIndex >= 0 && colIndex <= 6 && handleMouseMove(e)
                  }
                  onMouseUp={handleMouseUp} // ✅ 데이터 전송을 위해 추가
                  style={{
                    backgroundColor: selectedCells.has(
                      `${rowIndex}-${colIndex}`
                    )
                      ? "#FFA500"
                      : fixedCells.has(`${rowIndex}-${colIndex}-fix`)
                      ? "#fff4d9"
                      : "#FFF",
                    border: "1px solid #EEEEEE",
                    cursor:
                      colIndex >= 0 && colIndex <= 6 ? "pointer" : "default",
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleDragForm;

// 서버 연결시
// import React, { useState, useRef } from "react";
// import "./ScheduleDragForm.css";

// const ScheduleDragForm = ({ onSubmit, timeBlocks }) => {
//   // ✅ props로 onSubmit 받기
//   const exBlocks = Array.from({ length: 48 }, (_, i) =>
//     Array(7).fill(
//       `${String(Math.floor(i / 2)).padStart(2, "0")}:${
//         i % 2 === 0 ? "00" : "30"
//       }`
//     )
//   );
//   // ✅ timeBlocks와 일치하는지 확인하는 함수
//   const isTimeBlockActive = (rowIndex, colIndex) => {
//     if (!timeBlocks) return false;
//     return timeBlocks.some((block) => block.slot === colIndex * 48 + rowIndex);
//   };

//   // rowIndex와 colIndex를 기반으로 slot을 계산하는 함수
//   const convertToSlot = (colIndex, rowIndex) => colIndex * 48 + rowIndex;
//   const [selectedCells, setSelectedCells] = useState(new Set());
//   const isDragging = useRef(false);
//   const [startDrag, setStartDrag] = useState({ row: null, col: null });
//   const toggleMode = useRef(false);

//   // 마우스를 누를 때 드래그 시작 (토글 방식 적용)
//   const handleMouseDown = (rowIndex, colIndex) => {
//     if (colIndex < 0 || colIndex > 6) return;

//     isDragging.current = true;
//     setStartDrag({ row: rowIndex, col: colIndex });

//     const cellKey = `${rowIndex}-${colIndex}`;
//     const newSelectedCells = new Set(selectedCells);

//     if (newSelectedCells.has(cellKey)) {
//       newSelectedCells.delete(cellKey);
//       toggleMode.current = false;
//     } else {
//       newSelectedCells.add(cellKey);
//       toggleMode.current = true;
//     }

//     setSelectedCells(newSelectedCells);
//   };

//   // 마우스를 움직일 때 드래그 영역 선택
//   const handleMouseMove = (e) => {
//     if (!isDragging.current || startDrag.row === null || startDrag.col === null)
//       return;

//     const targetRow = Number(e.target.getAttribute("data-row"));
//     const targetCol = Number(e.target.getAttribute("data-col"));

//     if (
//       !isNaN(targetRow) &&
//       !isNaN(targetCol) &&
//       targetCol >= 0 &&
//       targetCol <= 6 &&
//       targetCol === startDrag.col
//     ) {
//       const newSelectedCells = new Set(selectedCells);

//       for (
//         let r = Math.min(startDrag.row, targetRow);
//         r <= Math.max(startDrag.row, targetRow);
//         r++
//       ) {
//         const cellKey = `${r}-${targetCol}`;
//         if (toggleMode.current) {
//           newSelectedCells.add(cellKey);
//         } else {
//           newSelectedCells.delete(cellKey);
//         }
//       }

//       setSelectedCells(newSelectedCells);
//     }
//   };

//   // 마우스를 떼면 드래그 종료
//   const handleMouseUp = () => {
//     isDragging.current = false;
//     setStartDrag({ row: null, col: null });

//     const selectedSlots = {};
//     selectedCells.forEach((cell) => {
//       const [rowIndex, colIndex] = cell.split("-").map(Number);
//       const slot = convertToSlot(colIndex, rowIndex);

//       if (!selectedSlots[slot]) {
//         selectedSlots[slot] = new Set();
//       }
//       selectedSlots[slot].add("user1");
//     });

//     const formattedData = {
//       timeslots: Object.entries(selectedSlots).map(([slot, members]) => ({
//         slot: Number(slot),
//         members: Array.from(members),
//       })),
//     };

//     console.log(
//       "📤 ScheduleDragForm에서 부모로 보낼 데이터:",
//       JSON.stringify(formattedData, null, 2)
//     );

//     // ✅ 부모 컴포넌트로 데이터 전달
//     if (onSubmit) {
//       onSubmit(formattedData);
//     } else {
//       console.error("⚠️ ScheduleDragForm: onSubmit이 정의되지 않음!");
//     }
//   };

//   // 요일 클릭 시 해당 열 전체 선택/해제
//   const handleHeaderClick = (colIndex) => {
//     if (colIndex < 0 || colIndex > 6) return;

//     const newSelectedCells = new Set(selectedCells);
//     const isAlreadySelected = Array.from(newSelectedCells).some((cell) =>
//       cell.endsWith(`-${colIndex}`)
//     );

//     for (let rowIndex = 0; rowIndex < exBlocks.length; rowIndex++) {
//       const cellKey = `${rowIndex}-${colIndex}`;
//       if (isAlreadySelected) {
//         newSelectedCells.delete(cellKey);
//       } else {
//         newSelectedCells.add(cellKey);
//       }
//     }

//     setSelectedCells(newSelectedCells);
//   };

//   // 시간 클릭 시 해당 행 전체 선택/해제
//   const handleTimeClick = (rowIndex) => {
//     const newSelectedCells = new Set(selectedCells);
//     const isAlreadySelected = Array.from(newSelectedCells).some((cell) =>
//       cell.startsWith(`${rowIndex}-`)
//     );

//     for (let colIndex = 0; colIndex <= 6; colIndex++) {
//       const cellKey = `${rowIndex}-${colIndex}`;
//       if (isAlreadySelected) {
//         newSelectedCells.delete(cellKey);
//       } else {
//         newSelectedCells.add(cellKey);
//       }
//     }

//     setSelectedCells(newSelectedCells);
//   };

//   // **전체 선택 버튼 클릭 시 모든 셀 선택/해제**
//   const handleSelectAll = () => {
//     const newSelectedCells = new Set(selectedCells);
//     const isAnySelected = newSelectedCells.size > 0; // 선택된 셀이 하나라도 있으면 전체 해제

//     for (let rowIndex = 0; rowIndex < exBlocks.length; rowIndex++) {
//       for (let colIndex = 0; colIndex <= 6; colIndex++) {
//         const cellKey = `${rowIndex}-${colIndex}`;
//         if (isAnySelected) {
//           newSelectedCells.delete(cellKey);
//         } else {
//           newSelectedCells.add(cellKey);
//         }
//       }
//     }
//     // 선택된 셀을 JSON 데이터로 변환
//     const getSelectedSlots = () => {
//       const selectedSlots = {};
//       selectedCells.forEach((cell) => {
//         const [rowIndex, colIndex] = cell.split("-").map(Number);
//         const slot = convertToSlot(colIndex, rowIndex);

//         if (!selectedSlots[slot]) {
//           selectedSlots[slot] = new Set();
//         }
//         selectedSlots[slot].add("user1"); // 현재는 user1만 추가 (다중 유저 확장 가능)
//       });

//       return {
//         timeslots: Object.entries(selectedSlots).map(([slot, members]) => ({
//           slot: Number(slot),
//           members: Array.from(members),
//         })),
//       };
//     };
//     setSelectedCells(newSelectedCells);
//   };
//   return (
//     <div className="table-container center">
//       <table className="fixed-table">
//         <thead>
//           <tr>
//             <th style={{ fontSize: "12px", cursor: "pointer" }}>전체 선택</th>
//             {["월", "화", "수", "목", "금", "토", "일"].map((day, colIndex) => (
//               <th
//                 key={colIndex}
//                 style={{ cursor: "pointer", userSelect: "none" }}
//               >
//                 {day}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {exBlocks.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               <td className="td-style">
//                 {rowIndex % 2 === 0 ? (
//                   <span className="time-section">
//                     {String(Math.floor(rowIndex / 2)).padStart(2, "0")}시
//                   </span>
//                 ) : (
//                   <span className="time-section-30">
//                     {String(Math.floor(rowIndex / 2)).padStart(2, "0")} : 30
//                   </span>
//                 )}
//               </td>

//               {row.map((_, colIndex) => (
//                 <td
//   key={`${rowIndex}-${colIndex}`}
//   data-row={rowIndex}
//   data-col={colIndex}
//   style={{
//     backgroundColor: isTimeBlockActive(rowIndex, colIndex)
//       ? "#FFA500" // 활성화된 셀: 주황색
//       : "var(--black05)", // 비활성화된 셀: var(--black05) 색상 적용
//     border: "1px solid #EEEEEE",
//     cursor: isTimeBlockActive(rowIndex, colIndex)
//       ? "pointer"
//       : "default",
//     opacity: isTimeBlockActive(rowIndex, colIndex) ? 1 : 0.3, // 비활성화된 셀 투명도 낮춤
//   }}
// ></td>

//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ScheduleDragForm;
