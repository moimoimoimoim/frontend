import { useState, useEffect } from "react";
import "./ShowMoim.css";
import "../SelectMoim/SelectMoim.css";
import { convertToTime } from "../../utils/convertTimeslot";

const API_URL = import.meta.env.VITE_API_URL;

const ShowMoim = ({ meetingId }) => {
  const [confirmedMoimText, setConfirmedMoimText] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/confirm-schedule/${meetingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.confirmedSchedule?.start && data.confirmedSchedule?.end) {
          const [startDay, startHour, startMinute] = convertToTime(
            data.confirmedSchedule.start
          );
          const [endDay, endHour, endMinute] = convertToTime(
            data.confirmedSchedule.end
          );
          setConfirmedMoimText(
            `${startDay} ${startHour}:${startMinute} ~ ${endDay} ${endHour}:${endMinute}`
          );
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  return (
    <section className="showmoim-section">
      {confirmedMoimText ? (
        <div className="show-elements">
          <div className="selected-moim">{confirmedMoimText}</div>
          <span className="question center">해당 일정으로 확정되었습니다.</span>
        </div>
      ) : (
        <p className="no-data center">확정된 일정이 없습니다.</p>
      )}
    </section>
  );
};

export default ShowMoim;
