import "./LinkModal.css";
import { useState } from "react";
import copy from "../../assets/copy.png";
const LinkModal = ({ isOpen, onClose, meetingLink }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링 안 함.
  // 🔥 링크 복사 기능
  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 후 메시지 사라짐
  };
  return (
    <div className="modal-backdrop center" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="content-container center">
          <div className="text-container">
            <p>새로운 모임이 생성되었습니다.</p>
            <p>참여자에게 링크를 공유해 보세요!</p>
          </div>
          {/* 🔗 링크 표시 및 복사 버튼 */}
          <div className={`link-container ${copied ? "copied" : ""}`}>
            <input
              type="text"
              value={meetingLink}
              readOnly
              className="link-input"
            />
            <button className="copy-button" onClick={copyToClipboard}>
              <img src={copy} alt="" />
            </button>
          </div>
          {/* 공유하기 버튼 */}
          <button
            className="share-button"
            onClick={() => console.log("공유하기 기능 추가 예정")}
          >
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default LinkModal;
