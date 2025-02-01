import "./Header.css";

import menu from "../assets/menu.png";
import logoSimple from "../assets/logo-simple.png";
import logo from "../assets/logo.png";
import logout from "../assets/logout.png";
import calendarAdd from "../assets/Calendar-add.png";

const MainHeader = ({ userName }) => {
  const user = {
    isLogin: true,
  };
  return (
    <>
      <header className="header-component">
        <div>{<img src={menu}></img>}</div>
        <div>{<img src={logoSimple}></img>}</div>
        <div className="user">
          <div className="user-name center">{userName}</div>
          {user.isLogin ? (
            <button className="center">
              로그아웃
              {<img src={logout}></img>}
            </button>
          ) : (
            <button className="center">로그인</button>
          )}
        </div>
      </header>
    </>
  );
};

export default MainHeader;
