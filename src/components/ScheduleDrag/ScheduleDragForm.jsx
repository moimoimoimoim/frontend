import React, { useState, useRef } from "react";
import "./ScheduleDragForm.css";

const DragTable = () => {
  // 시간대 하드코딩 (각 30분 간격)
  const timeBlocks = Array.from({ length: 48 }, (_, i) =>
    Array(7).fill(
      `${String(Math.floor(i / 2)).padStart(2, "0")}:${
        i % 2 === 0 ? "00" : "30"
      }`
    )
  );

  const [selectedCells, setSelectedCells] = useState(new Set());
  const isDragging = useRef(false);
  const [startDrag, setStartDrag] = useState({ row: null, col: null });
  const toggleMode = useRef(false);

  // 마우스를 누를 때 드래그 시작 (토글 방식 적용)
  const handleMouseDown = (rowIndex, colIndex) => {
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

  // 마우스를 움직일 때 드래그 영역 선택 (토글 방식 적용)
  const handleMouseMove = (e) => {
    if (!isDragging.current || startDrag.row === null || startDrag.col === null)
      return;

    const targetRow = Number(e.target.getAttribute("data-row"));
    const targetCol = Number(e.target.getAttribute("data-col"));

    if (!isNaN(targetRow) && !isNaN(targetCol) && targetCol >= 0) {
      const newSelectedCells = new Set(selectedCells);

      for (
        let r = Math.min(startDrag.row, targetRow);
        r <= Math.max(startDrag.row, targetRow);
        r++
      ) {
        for (
          let c = Math.min(startDrag.col, targetCol);
          c <= Math.max(startDrag.col, targetCol);
          c++
        ) {
          const cellKey = `${r}-${c}`;
          if (toggleMode.current) {
            newSelectedCells.add(cellKey);
          } else {
            newSelectedCells.delete(cellKey);
          }
        }
      }

      setSelectedCells(newSelectedCells);
    }
  };

  // 마우스를 떼면 드래그 종료
  const handleMouseUp = () => {
    isDragging.current = false;
    setStartDrag({ row: null, col: null });
  };

  return (
    <div className="table-container center">
      <table className="fixed-table">
        <thead>
          <tr>
            <th>시간</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
            <th>일</th>
          </tr>
        </thead>
        <tbody>
          {timeBlocks.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* 첫 번째 열(시간) - 클릭 및 드래그 방지 */}
              <td
                style={{
                  fontWeight: "bold",
                  userSelect: "none",
                  background: "#f0f0f0",
                }}
              >
                {String(Math.floor(rowIndex / 2)).padStart(2, "0")}:00
              </td>

              {row.map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  data-row={rowIndex}
                  data-col={colIndex}
                  onMouseDown={() =>
                    colIndex >= 0 && handleMouseDown(rowIndex, colIndex)
                  }
                  onMouseMove={(e) => colIndex >= 0 && handleMouseMove(e)}
                  onMouseUp={handleMouseUp}
                  style={{
                    backgroundColor: selectedCells.has(
                      `${rowIndex}-${colIndex}`
                    )
                      ? "#FFA500"
                      : "#FFF",
                    border: "1px solid var(--black10)",
                    cursor: colIndex >= 0 ? "pointer" : "default", // 시간 칼럼은 클릭 X
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

export default DragTable;
