// src/components/Layout.jsx

import { Outlet } from "react-router-dom";
import Header from "./Header"; // 공통 헤더

const Layout = () => {
  return (
    <div>
      <Header userName={"장서현"}></Header>
      <main>
        <section className="center">
          <Outlet /> {/* 여기서 현재 페이지를 렌더링 */}
        </section>
      </main>
    </div>
  );
};

export default Layout;
