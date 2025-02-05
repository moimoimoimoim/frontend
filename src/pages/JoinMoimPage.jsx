import React, { useState } from "react";
import TitleSection from "../components/JoinMoim/TitleSection";
import Logo from "../components/JoinMoim/Logo";
import JoinForm from "../components/JoinMoim/JoinForm";
import JoinMoimButton from "../components/JoinMoim/JoinMoimButton";
import Divider from "../components/JoinMoim/Divider";
import GoogleLoginButton from "../components/Login/GoogleLoginButton";
import "../components/JoinMoim/JoinMoimPage.css";

const JoinMoimPage = () => {
  const [formData, setFormData] = useState({ nickname: "", code: "" });

  // ✅ 입력값 변경 시 상태 업데이트
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="join-moim-container center">
      <TitleSection />
      <Logo />
      <JoinForm onInputChange={handleInputChange} />
      <JoinMoimButton nickname={formData.nickname} code={formData.code} />
      <Divider />
      <GoogleLoginButton />
    </div>
  );
};

export default JoinMoimPage;
