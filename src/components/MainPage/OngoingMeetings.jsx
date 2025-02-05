import Title from "./MainPageTitle";
import AddMoim from "./AddMoim";

const OngoingMeetings = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <Title text="진행 중인 모임" />
      </div>
      <AddMoim />
    </div>
  );
};

export default OngoingMeetings;
