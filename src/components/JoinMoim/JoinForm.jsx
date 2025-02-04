import React, { useState } from "react";
import "./JoinForm.css";

const JoinForm = () => {
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="join-form">
      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="input-field-join join-form__nickname"
      />
      <input
        type="text"
        placeholder="참여 코드 4자리"
        value={code}
        maxLength={4}
        onChange={(e) => setCode(e.target.value)}
        className="input-field-join join-form__join-code"
      />
      {/* schedule 버튼으로 변경 필요 */}
      <button className="join-button">다음</button>
    </div>
  );
};

export default JoinForm;
