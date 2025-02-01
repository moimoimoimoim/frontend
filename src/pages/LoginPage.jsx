import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoToMyPage = () => {
    navigate("/mainpage"); // 마이페이지로 이동
  };

  return (
    <div>
      <h1>로그인 화면</h1>
      <button onClick={handleGoToMyPage}>
        로그인하기(누르면메인페이지이동)
      </button>
    </div>
  );
};

export default LoginPage;
