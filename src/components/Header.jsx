import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useNavigate 추가
import Sidebar from "./MainPage/Sidebar";

import menu from "../assets/menu.png";
import logoSimple from "../assets/logo-simple.png";
import logoutIcon from "../assets/logout.png";

const Header = ({ userName, showMenu, logout }) => {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 추가
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation(); // 현재 페이지 경로 가져오기
  const showSidebar = [
    "/main",
    "/AllMeetings",
    "/ClosedMeetings",
    "/OngoingMeetings",
  ].some((path) => location.pathname.startsWith(path));

  const user = {
    isLogin: !!userName,
  };

  return (
    <>
      <header className="header-component">
        <div className="header-component__left">
          {showSidebar && ( // Sidebar가 필요한 페이지에서만 Menu 아이콘 보이게 함
            <div onClick={toggleSidebar} className="menu-container">
              <img src={menu} className="menu-icon" alt="메뉴 아이콘" />
            </div>
          )}
          {/* ✅ 로고 클릭 시 /main으로 이동 */}
          <div onClick={() => navigate("/main")} style={{ cursor: "pointer" }}>
            <img src={logoSimple} className="logoSimple-icon" alt="로고" />
          </div>
        </div>
        <div className="header-component__right center">
          <div className="user">
            {user.isLogin ? (
              <>
                <div className="user-name logout">{userName}</div>
                <span className="user-name__hello center">님 환영합니다!</span>
                <button
                  className="logout"
                  onClick={() => {
                    logout();
                  }}
                >
                  <span className="logout-span"> 로그아웃</span>
                  <img
                    src={logoutIcon}
                    className="logout-icon"
                    alt="로그아웃"
                  />
                </button>
              </>
            ) : (
              <>
                <span className="user-name__hello center">
                  로그인 후 일정을 관리해보세요!
                </span>
                <button className="logout" onClick={() => navigate("/")}>
                  로그인
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {/* showSidebar가 true일 때만 Sidebar 표시 */}
      {showSidebar && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
    </>
  );
};

export default Header;
