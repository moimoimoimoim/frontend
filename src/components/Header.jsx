import "./Header.css";

import menu from "../assets/menu.png";
import logoSimple from "../assets/logo-simple.png";
import logo from "../assets/logo.png";
import logout from "../assets/logout.png";
import calendarAdd from "../assets/Calendar-add.png";

const Header = ({ userName }) => {
  const user = {
    isLogin: true,
  };
  return (
    <>
      <header className="header-component">
        <div className="header-component__left">
          <div>
            {<img src={menu} className="menu-icon" alt="메뉴 아이콘"></img>}
          </div>
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
    </>
  );
};

export default Header;
