// src/components/Layout.jsx

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header"; // 공통 헤더

const Layout = ({ user, setUser, removeCookie }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === "/main"; // 메인 페이지인지 확인

  return (
    <div>
      <Header
        logout={() => {
          removeCookie("token");
          setUser(null);
          navigate("/");
        }}
        userName={user && user.nickname}
        showMenu={isMainPage}
      ></Header>
      <main>
        <section className="center">
          <Outlet /> {/* 여기서 현재 페이지를 렌더링 */}
        </section>
      </main>
    </div>
  );
};

export default Layout;
