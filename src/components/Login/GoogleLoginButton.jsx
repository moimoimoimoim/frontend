import "./GoogleLoginButton.css";
import google from "../../assets/구글.png";

const GOOGLE_AUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth" +
  `?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
  "&response_type=code" +
  `&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}` +
  "&scope=email profile";

const GoogleLoginButton = () => {
  return (
    <button
      type="button"
      onClick={() => (window.location.href = GOOGLE_AUTH_URL)}
      className="google-login-btn center"
    >
      <img src={google} className="google-icon" alt="google이미지" />
      <a className="google-login-button center">Google 계정으로 로그인</a>
    </button>
  );
};

export default GoogleLoginButton;
