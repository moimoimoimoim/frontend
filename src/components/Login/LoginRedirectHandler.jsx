import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      console.log("✅ JWT Token:", token);
      localStorage.setItem("accessToken", token); // JWT 저장
      navigate("/main"); // 🔹 main 페이지로 이동
    } else {
      console.error("❌ 토큰 없음");
      navigate("/login"); // 로그인 실패 시 다시 로그인 페이지로 이동
    }
  }, [location, navigate]);

  return <div>로그인 중...</div>;
};

export default LoginRedirectHandler;
