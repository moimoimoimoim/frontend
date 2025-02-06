import React from "react";

const TitleSection = ({ meetingName }) => {
  return (
    <h2 className="title">
      <span className="highlight">{meetingName}</span> 일정 조율에 참여하세요!
    </h2>
  );
};

export default TitleSection;
