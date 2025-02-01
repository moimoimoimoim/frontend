import "./GoogleLoginButton.css";
import google from "../../assets/구글.png";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email profile";
  };

  return (
    <button
      type="button"
      className="google-login-btn center"
      onClick={handleGoogleLogin}
    >
      <img src={google} className="google-icon" alt="google이미지" />
      <span className="google-login-span center">Google 계정으로 로그인</span>
    </button>
  );
};

export default GoogleLoginButton;
