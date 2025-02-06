import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../components/Login/LoadingScreen.css";

function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL +
            "/login/oauth2/google/callback?code=" +
            searchParams.get("code"),
          {
            credentials: "include",
            mode: "cors",
          }
        );
        await response.json();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/main");
      } catch {
        alert("로그인 오류 발생");
      }
    })();
  }, []);

  return (
    <>
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">로그인 중...</p>
      </div>
    </>
  );
}

export default GoogleCallback;
