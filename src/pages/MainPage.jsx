import { Outlet, useNavigate } from "react-router-dom";
import Title from "../components/MainPage/MainPageTitle";
import AddMoim from "../components/MainPage/AddMoim";
import MeetingCard from "../components/MainPage/MeetingCard";
import "../components/MainPage/MainPage.css";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const MainPage = ({ meetings, user }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies]);

  return (
    <div className="main-page">
      <div className="main-content">
        <Title text="모든 모임" />

        {/* ✅ 모임 리스트를 출력 */}
        <div className={`meeting-grid ${meetings.length === 0 ? "empty" : ""}`}>
          {!meetings || meetings.length === 0 ? (
            <p className="no-meeting">현재 진행 중인 모임이 없습니다.</p>
          ) : (
            meetings.map((meeting) => (
              <MeetingCard
                key={meeting._id}
                meeting={meeting}
                isOwner={user && user._id === meeting.owner}
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
