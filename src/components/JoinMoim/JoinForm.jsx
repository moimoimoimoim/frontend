import React, { useState } from "react";
import "./JoinForm.css";
// import JoinMoimButton from "./JoinMoimButton";

const JoinForm = ({ onInputChange }) => {
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");

  // ✅ 입력 변경 시 부모 컴포넌트에 전달
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    onInputChange("nickname", value); // 부모에 전달
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCode(value);
    onInputChange("code", value); // 부모에 전달
  };

  return (
    <div className="join-form">
      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={handleNicknameChange}
        className="input-field-join join-form__nickname"
      />
      <input
        type="text"
        placeholder="참여 코드 4자리"
        value={code}
        maxLength={4}
        onChange={handleCodeChange}
        className="input-field-join join-form__join-code"
      />
    </div>
  );
};

export default JoinForm;
