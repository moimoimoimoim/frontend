import "./Header.css";
import { useState } from "react";
import Sidebar from "../pages/MainPage/Sidebar";
import { useLocation } from "react-router-dom";

import menu from "../assets/menu.png";
import logoSimple from "../assets/logo-simple.png";
import logo from "../assets/logo.png";
import logout from "../assets/logout.png";
import calendarAdd from "../assets/Calendar-add.png";

const Header = ({ userName, showMenu }) => {
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
    isLogin: true,
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
          <div>
            {
              <img
                src={logoSimple}
                className="logoSimple-icon"
                alt="로고"
              ></img>
            }
          </div>
        </div>
        <div className="header-component__right">
          <div className="user">
            <div className="user-name logout">{userName}</div>
            {user.isLogin ? (
              <button className="logout">
                로그아웃
                {
                  <img
                    src={logout}
                    className="logout-icon"
                    alt="로그아웃"
                  ></img>
                }
              </button>
            ) : (
              <button className="logout">로그인</button>
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
