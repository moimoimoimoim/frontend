import { DndProvider } from "react-dnd"; // <-- 이 줄을 추가해주세요.
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import ScheduleDragForm from "../components/ScheduleDrag/ScheduleDragForm";
import ScheduleButton from "../components/ScheduleDrag/ScheduleButton";

const SchedulePage = () => {
  const [currentStep] = useState(1);
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState(null);

  const handleScheduleSubmit = (data) => {
    setSelectedSlots(data);
  };
  return (
    <div className="">
      <StepIndicator
        title="일정 선택하기"
        steps={[1, 2, 3]}
        currentStep={currentStep}
      />
      <DndProvider backend={HTML5Backend}>
        <ScheduleDragForm />
      </DndProvider>

      <ScheduleButton data={selectedSlots} navigate={navigate} />
    </div>
  );
};

export default SchedulePage;

// import { DndProvider } from "react-dnd"; // <-- 이 줄을 추가해주세요.
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import StepIndicator from "../components/StepIndicator";
// import ScheduleDragForm from "../components/ScheduleDrag/ScheduleDragForm";
// import ScheduleButton from "../components/ScheduleDrag/ScheduleButton";

// const SchedulePage = () => {
//   const navigate = useNavigate();
//   const [currentStep] = useState(1);
//   const [selectedSlots, setSelectedSlots] = useState(null);
//   const [timeBlocks, setTimeBlocks] = useState(null);

//   // ✅ 서버에서 timeBlocks 데이터를 가져오는 부분 (예제)
//   useEffect(() => {
//     fetch("http://localhost:5000/timeBlocks")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(
//           "📥 서버에서 받은 timeBlocks 데이터:",
//           JSON.stringify(data, null, 2)
//         );
//         setTimeBlocks(data); // ✅ timeBlocks 상태 업데이트
//       })
//       .catch((error) =>
//         console.error("🚨 timeBlocks 데이터 불러오기 실패:", error)
//       );
//   }, []);
//   // ✅ `DragTable`에서 받은 데이터를 업데이트하는 함수
//   const handleScheduleSubmit = (data) => {
//     console.log(
//       "📥 SchedulePage에서 받은 데이터:",
//       JSON.stringify(data, null, 2)
//     );
//     setSelectedSlots(data);
//   };
//   return (
//     <div className="">
//       <StepIndicator
//         title="일정 선택하기"
//         steps={[1, 2, 3]}
//         currentStep={currentStep}
//       />
//       <DndProvider backend={HTML5Backend}>
//         {timeBlocks ? ( // ✅ timeBlocks가 로딩되면 렌더링
//           <ScheduleDragForm
//             onSubmit={handleScheduleSubmit}
//             timeBlocks={timeBlocks}
//           />
//         ) : (
//           <p>⏳ 시간 데이터를 불러오는 중...</p> // ✅ 로딩 메시지 추가
//         )}
//         <ScheduleButton data={selectedSlots} navigate={navigate} />
//       </DndProvider>
//     </div>
//   );
// };

// export default SchedulePage;
