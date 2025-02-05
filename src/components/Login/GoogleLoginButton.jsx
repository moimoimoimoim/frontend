import "./GoogleLoginButton.css";
import google from "../../assets/구글.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GOOGLE_AUTH_URL = "http://localhost:8080/login/oauth2/google";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL; // 구글 로그인 페이지로 이동
  };

  return (
    <button
      type="button"
      className="google-login-btn center"
      onClick={handleLogin}
    >
      <img src={google} className="google-icon" alt="google이미지" />
      <span className="google-login-span center">Google 계정으로 로그인</span>
    </button>
  );
};

export default GoogleLoginButton;
