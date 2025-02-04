import Title from "./MainPageTitle";
import AddMoim from "./AddMoim";

const ClosedMeetings = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <Title text="마감된 모임" />
      </div>
      <AddMoim />
    </div>
  );
};

export default ClosedMeetings;
