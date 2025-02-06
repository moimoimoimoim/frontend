import React, { useEffect, useState } from "react";
import TitleSection from "../components/JoinMoim/TitleSection";
import Logo from "../components/JoinMoim/Logo";
import JoinForm from "../components/JoinMoim/JoinForm";
import JoinMoimButton from "../components/JoinMoim/JoinMoimButton";
import Divider from "../components/JoinMoim/Divider";
import GoogleLoginButton from "../components/Login/GoogleLoginButton";
import "../components/JoinMoim/JoinMoimPage.css";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const JoinMoimPage = () => {
  const { inviteToken } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [formData, setFormData] = useState({ nickname: "", code: "" });

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/join/" + inviteToken);
      const data = await response.json();
      setMeeting(data);
    })();
  }, []);

  // ✅ 입력값 변경 시 상태 업데이트
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="join-moim-container center">
      <TitleSection meetingName={meeting?.meetingName} />
      <Logo />
      <JoinForm onInputChange={handleInputChange} />
      <JoinMoimButton
        inviteToken={inviteToken}
        nickname={formData.nickname}
        code={formData.code}
      />
      <Divider />
      <GoogleLoginButton />
    </div>
  );
};

export default JoinMoimPage;
