import "./MainPageTitle.css";

const MainPageTitle = ({ text }) => {
  return (
    <div className="underline-title-container">
      <h2 className="underline-title">{text}</h2>
    </div>
  );
};

export default MainPageTitle;
