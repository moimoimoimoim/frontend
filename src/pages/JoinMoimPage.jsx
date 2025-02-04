import React from "react";
import TitleSection from "../components/JoinMoim/TitleSection";
import Logo from "../components/JoinMoim/Logo";
import JoinForm from "../components/JoinMoim/JoinForm";
import Divider from "../components/JoinMoim/Divider";
import GoogleLoginButton from "../components/Login/GoogleLoginButton";
import logo from "../../src/assets/logo.png";
import "../components/JoinMoim/JoinMoimPage.css";

const JoinMoimPage = () => {
  return (
    <div className="join-moim-container center">
      <TitleSection />
      <Logo />
      <JoinForm />
      <Divider />
      <GoogleLoginButton />
    </div>
  );
};

export default JoinMoimPage;
