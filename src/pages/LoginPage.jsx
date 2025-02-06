import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/Login/GoogleLoginButton";
import "../components/Login/LoginPage.css";
import Logo from "../components/JoinMoim/Logo.jsx";
import LoginTitle from "../components/Login/LoginTitle.jsx";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoToMyPage = () => {
    navigate("/mainPage"); // 마이페이지로 이동
  };

  return (
    <div className="center login-container">
      {/* <Logo /> */}
      <LoginTitle />
      {/* 아이디 */}
      {/* 비번 */}
      {/* 로그인 버튼 */}
      {/* 간편 로그인 하시겠습니까? */}
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
