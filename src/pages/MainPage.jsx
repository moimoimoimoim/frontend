import { Outlet } from "react-router-dom";
import Title from "../components/MainPage/MainPageTitle";
import AddMoim from "../components/MainPage/AddMoim";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <Title text="모든 모임" />
        <Outlet /> {/* 메인페이지 내부에서 이동 시 해당 컴포넌트 렌더링 */}
      </div>
      <AddMoim />
    </div>
  );
};

export default MainPage;
