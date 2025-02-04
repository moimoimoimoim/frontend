import { Outlet } from "react-router-dom";
import Title from "../components/MainPage/MainPageTitle";
import AddMoim from "../components/MainPage/AddMoim";
import MeetingCard from "../components/MainPage/MeetingCard";
import "../components/MainPage/MainPage.css";

const MainPage = ({ meetings }) => {
  return (
    <div className="main-page">
      <div className="main-content">
        <Title text="모든 모임" />

        {/* ✅ 모임 리스트를 출력 (없을 때만 flex 적용) */}
        <div className={`meeting-grid ${meetings.length === 0 ? "empty" : ""}`}>
          {meetings.length === 0 ? (
            <p className="no-meeting">현재 진행 중인 모임이 없습니다.</p>
          ) : (
            meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))
          )}
        </div>

        {/* ✅ 하위 페이지 렌더링 */}
        <Outlet />
      </div>

      <AddMoim />
    </div>
  );
};

export default MainPage;
// import { Outlet } from "react-router-dom";

// const MainPage = () => {
//   return (
//     <div className="main-page">
//       <div className="main-content">
//         <Outlet /> {/* 메인페이지 내부에서 이동 시 해당 컴포넌트 렌더링 */}
//       </div>
//       <h1>메인 페이지</h1>
//     </div>
//   );
// };

// export default MainPage;
