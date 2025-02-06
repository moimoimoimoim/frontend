import "./App.css";
import "./styles/reset.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

//페이지 route
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import SchedulePage from "./pages/SchedulePage";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import JoinMoimPage from "./pages/JoinMoimPage";
import SelectPage from "./pages/SelectPage";
import ShowPage from "./pages/ShowPage";

//메인페이지 Sidebar route
// import Sidebar from "./components/MainPage/Sidebar";
import OngoingMeetings from "./components/MainPage/OngoingMeetings";
import ClosedMeetings from "./components/MainPage/ClosedMeetings";
import Group from "./components/MainPage/Group"; // 동적 그룹 페이지
import GoogleCallback from "./pages/GoogleCallback";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  // ✅ meetings 상태 추가
  const [meetings, setMeetings] = useState([]);
  const [user, setUser] = useState({});
  const [cookies, _, removeCookie] = useCookies(["token"]);

  const setUserInfo = async () => {
    const response = await fetch(API_URL + "/users/my-page", {
      credentials: "include",
    });
    const data = await response.json();
    setUser(data.user);
  };

  const updateMeetings = () => {
    fetch(`${API_URL}/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMeetings(data.filter((item) => item) || []);
      });
  };

  useEffect(() => {
    if (cookies.token) {
      setUserInfo();
    }
  }, [cookies]);

  // polling
  useEffect(() => {
    updateMeetings();
    setInterval(updateMeetings, 1000);
  }, []);

  return (
    <>
      <Routes>
        <Route
          element={
            <Layout user={user} setUser={setUser} removeCookie={removeCookie} />
          }
        >
          <Route path="/" element={<LoginPage />} />
          <Route path="/login/google/callback" element={<GoogleCallback />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* <Route path="/main" element={<MainPage />} /> */}
          <Route
            path="/main"
            element={<MainPage meetings={meetings} user={user} />}
          ></Route>
          {/* <Route path="/create" element={<CreatePage />} /> */}
          <Route path="/mypage" element={<MyPage />} />
          {/* 메인페이지에서 사이드바를 통한 라우트 */}
          {/* <Route path="/main/all-meetings" element={<MainPage />} /> */}
          <Route path="/main/ongoing-meetings" element={<OngoingMeetings />} />
          <Route path="/main/closed-meetings" element={<ClosedMeetings />} />
          <Route path="/main/group/:groupId" element={<Group />} />
          <Route path="/join/:inviteToken" element={<JoinMoimPage />} />
          <Route path="/create" element={<CreatePage />} />
          {/* 생성 페이지 ➡️ 스케줄 페이지 */}
          <Route
            path="/schedule/:scheduleId"
            element={<SchedulePage />}
          ></Route>
          <Route path="/link-modal" element={<SchedulePage />}></Route>
          <Route path="/select/:meetingId" element={<SelectPage />} />
          <Route path="/show/:meetingId" element={<ShowPage />} />
        </Route>
        {/* 동적 그룹 라우팅 (그룹 추가 시 URL 변경) */}
        <Route path="/group/:groupId" element={<Group />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
