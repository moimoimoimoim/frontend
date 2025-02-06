import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/Login/GoogleLoginButton";
import "../components/Login/LoginPage.css";
import Logo from "../components/JoinMoim/Logo.jsx";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      navigate("/main");
    }
  }, [cookies]);

  return (
    <div className="center login-container">
      <Logo />
      {/* 아이디 */}
      {/* 비번 */}
      {/* 로그인 버튼 */}
      {/* 간편 로그인 하시겠습니까? */}
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
