import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
        navigate("/main");
      } catch {
        alert("로그인 오류 발생");
      }
    })();
  }, []);

  return (
    <>
      <span>로그인 중...</span>
    </>
  );
}

export default GoogleCallback;
