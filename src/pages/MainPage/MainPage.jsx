import "./MainPage.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="main-page">
      <Sidebar /> {/* ✅ 메인페이지에서만 사이드바 렌더링 */}
      <div className="main-content">
        <Outlet /> {/* ✅ 메인페이지 내부에서 이동 시 해당 컴포넌트 렌더링 */}
      </div>
      <h1>메인 페이지</h1>
    </div>
  );
};

export default MainPage;
