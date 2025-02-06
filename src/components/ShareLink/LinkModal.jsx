import "./LinkModal.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import copy from "../../assets/copy.png";

const LinkModal = ({ isOpen, onClose, meetingLink, ownerScheduleId }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate(); // ✅ 네비게이션 훅 추가

  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링 안 함.

  // 🔥 링크 복사 기능
  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 후 메시지 사라짐
  };

  // ✅ 버튼 클릭 시 /schedule로 이동하는 함수 추가
  const goToSchedule = () => {
    navigate("/schedule/" + ownerScheduleId);
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

          {/* ✅ 공유하기 버튼 -> 클릭 시 /schedule로 이동 */}
          <button className="share-button" onClick={goToSchedule}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
