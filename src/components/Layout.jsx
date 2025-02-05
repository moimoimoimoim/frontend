// src/components/Layout.jsx

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header"; // 공통 헤더
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === "/main"; // 메인 페이지인지 확인
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);

  const setUserInfo = async () => {
    const response = await fetch(API_URL + "/users/my-page", {
      credentials: "include",
    });
    const data = await response.json();
    setUser(data.user);
  };

  useEffect(() => {
    setUserInfo();
  }, [cookies]);

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
