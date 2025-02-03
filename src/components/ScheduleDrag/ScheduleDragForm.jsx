import React, { useState, useRef } from "react";
import "./ScheduleDragForm.css";

const DragTable = () => {
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
  };

  // 요일 클릭 시 해당 열 전체 선택/해제
  const handleHeaderClick = (colIndex) => {
    if (colIndex < 0 || colIndex > 6) return;

    const newSelectedCells = new Set(selectedCells);
    const isAlreadySelected = Array.from(newSelectedCells).some((cell) =>
      cell.endsWith(`-${colIndex}`)
    );

    for (let rowIndex = 0; rowIndex < timeBlocks.length; rowIndex++) {
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

    for (let rowIndex = 0; rowIndex < timeBlocks.length; rowIndex++) {
      for (let colIndex = 0; colIndex <= 6; colIndex++) {
        const cellKey = `${rowIndex}-${colIndex}`;
        if (isAnySelected) {
          newSelectedCells.delete(cellKey);
        } else {
          newSelectedCells.add(cellKey);
        }
      }
    }

    setSelectedCells(newSelectedCells);
  };

  return (
    <div className="table-container center">
      <table className="fixed-table">
        <thead>
          <tr>
            <th onClick={handleSelectAll} style={{ cursor: "pointer" }}>
              전체 선택
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
          {timeBlocks.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* 첫 번째 열(시간) - 클릭하면 해당 행 전체 선택 */}
              <td
                onClick={() => handleTimeClick(rowIndex)}
                style={{
                  fontWeight: "bold",
                  userSelect: "none",
                  background: "#f0f0f0",
                  cursor: "pointer",
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
                    colIndex >= 0 &&
                    colIndex <= 6 &&
                    handleMouseDown(rowIndex, colIndex)
                  }
                  onMouseMove={(e) =>
                    colIndex >= 0 && colIndex <= 6 && handleMouseMove(e)
                  }
                  onMouseUp={handleMouseUp}
                  style={{
                    backgroundColor: selectedCells.has(
                      `${rowIndex}-${colIndex}`
                    )
                      ? "#FFA500"
                      : "#FFF",
                    border: "1px solid var(--black10)",
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

export default DragTable;
