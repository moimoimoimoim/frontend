import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./ScheduleDragForm.css";

const DragTable = () => {
  // 시간대 하드코딩 (각 30분 간격)
  const timeBlocks = [
    Array(7).fill("00:00"),
    Array(7).fill("00:30"),
    Array(7).fill("01:00"),
    Array(7).fill("01:30"),
    Array(7).fill("02:00"),
    Array(7).fill("02:30"),
    Array(7).fill("03:00"),
    Array(7).fill("03:30"),
    Array(7).fill("04:00"),
    Array(7).fill("04:30"),
    Array(7).fill("05:00"),
    Array(7).fill("05:30"),
    Array(7).fill("06:00"),
    Array(7).fill("06:30"),
    Array(7).fill("07:00"),
    Array(7).fill("07:30"),
    Array(7).fill("08:00"),
    Array(7).fill("08:30"),
    Array(7).fill("09:00"),
    Array(7).fill("09:30"),
    Array(7).fill("10:00"),
    Array(7).fill("10:30"),
    Array(7).fill("11:00"),
    Array(7).fill("11:30"),
    Array(7).fill("12:00"),
    Array(7).fill("12:30"),
    Array(7).fill("13:00"),
    Array(7).fill("13:30"),
    Array(7).fill("14:00"),
    Array(7).fill("14:30"),
    Array(7).fill("15:00"),
    Array(7).fill("15:30"),
    Array(7).fill("16:00"),
    Array(7).fill("16:30"),
    Array(7).fill("17:00"),
    Array(7).fill("17:30"),
    Array(7).fill("18:00"),
    Array(7).fill("18:30"),
    Array(7).fill("19:00"),
    Array(7).fill("19:30"),
    Array(7).fill("20:00"),
    Array(7).fill("20:30"),
    Array(7).fill("21:00"),
    Array(7).fill("21:30"),
    Array(7).fill("22:00"),
    Array(7).fill("22:30"),
    Array(7).fill("23:00"),
    Array(7).fill("23:30"),
  ];
  const [selectedCells, setSelectedCells] = useState(new Set());

  const moveCell = (fromRowIndex, fromColIndex, toRowIndex, toColIndex) => {
    const newTimeBlocks = timeBlocks.map((row) => [...row]); // timeBlocks 복사
    const temp = newTimeBlocks[fromRowIndex][fromColIndex];
    newTimeBlocks[fromRowIndex][fromColIndex] =
      newTimeBlocks[toRowIndex][toColIndex];
    newTimeBlocks[toRowIndex][toColIndex] = temp;
    console.log("Moved", newTimeBlocks);
  };

  const handleCellSelect = (rowIndex, colIndex) => {
    const newSelectedCells = new Set(selectedCells);
    const cellId = `${rowIndex}-${colIndex}`;
    if (newSelectedCells.has(cellId)) {
      newSelectedCells.delete(cellId);
    } else {
      newSelectedCells.add(cellId);
    }
    setSelectedCells(newSelectedCells);
  };

  const DraggableCell = ({
    rowIndex,
    colIndex,
    moveCell,
    isSelected,
    onSelect,
    timeBlocks,
  }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "cell",
      item: { rowIndex, colIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop(() => ({
      accept: "cell",
      hover: (item) => {
        if (item.rowIndex === rowIndex && item.colIndex === colIndex) return;
        moveCell(item.rowIndex, item.colIndex, rowIndex, colIndex);
        item.rowIndex = rowIndex;
        item.colIndex = colIndex;
      },
    }));

    return (
      <td
        className="select-td"
        ref={(node) => drag(drop(node))}
        style={{
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isSelected ? "#FFA500" : "#FFF",
          border: "1px solid var(--black10)",
        }}
        onClick={() => onSelect(rowIndex, colIndex)}
      >
        {timeBlocks[rowIndex][colIndex] || "미입력"}{" "}
        {/* timeBlocks의 값 표시 */}
      </td>
    );
  };

  return (
    <div className="table-container center">
      <div className="center">
        <table className="fixed-table ">
          <thead className>
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
                {/* 첫 번째 칸에 시간을 표시 */}
                {rowIndex % 2 === 0 ? (
                  <td className="time-td">
                    <span className="center">
                      {`${Math.floor(rowIndex / 2) < 10 ? "0" : ""}${Math.floor(
                        rowIndex / 2
                      )}`}
                    </span>
                  </td>
                ) : (
                  <td></td>
                )}
                {row.map((cell, colIndex) => {
                  const cellId = `${rowIndex}-${colIndex}`;
                  const isSelected = selectedCells.has(cellId);
                  return (
                    <DraggableCell
                      key={cellId}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      moveCell={moveCell}
                      onSelect={handleCellSelect}
                      isSelected={isSelected}
                      timeBlocks={timeBlocks} // timeBlocks 전달
                    >
                      {cell}
                    </DraggableCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DragTable;
