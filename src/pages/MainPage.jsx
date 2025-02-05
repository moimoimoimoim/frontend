import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Title from "../components/MainPage/MainPageTitle";
import AddMoim from "../components/MainPage/AddMoim";
import MeetingCard from "../components/MainPage/MeetingCard";
import "../components/MainPage/MainPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ JSON Server 사용 중, 백엔드 연결 시 변경

const MainPage = ({ meetings }) => {
  const [confirmedMoim, setConfirmedMoim] = useState(null);

  // ✅ 백엔드 또는 JSON Server에서 확정된 모임 가져오기
  useEffect(() => {
    fetch(`${API_URL}/confirm-schedule`) // 백엔드 연결 시 `/meetings/confirmed`
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 응답 오류: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setConfirmedMoim(data[0]); // 첫 번째 확정된 모임 사용
        }
      })
      .catch((error) => console.error("❌ 확정된 모임 가져오기 실패:", error));
  }, []);

  return (
    <div className="main-page">
      <div className="main-content">
        <Title text="모든 모임" />

        {/* ✅ 모임 리스트를 출력 */}
        <div className={`meeting-grid ${meetings.length === 0 ? "empty" : ""}`}>
          {meetings.length === 0 ? (
            <p className="no-meeting">현재 진행 중인 모임이 없습니다.</p>
          ) : (
            meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                confirmedMoim={confirmedMoim}
              />
            ))
          )}
        </div>

        <Outlet />
      </div>

      <AddMoim />
    </div>
  );
};

export default MainPage;
