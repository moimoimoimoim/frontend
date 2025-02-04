import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./ScheduleDragForm.css";

const DraggableCell = ({
  rowIndex,
  colIndex,
  moveCell,
  isSelected,
  onSelect,
  timeBlocks, // 부모로부터 받은 timeBlocks
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
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isSelected ? "#FFA500" : "#FFF",
        border: "1px solid #ccc",
      }}
      onClick={() => onSelect(rowIndex, colIndex)}
    >
      {timeBlocks[rowIndex][colIndex] || "미입력"} {/* timeBlocks의 값 표시 */}
    </td>
  );
};

export default DraggableCell;
