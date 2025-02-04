import { useState, useEffect } from "react";
import "./ShowMoim.css";
import "../SelectMoim/SelectMoim.css";

const ShowMoim = () => {
  const [confirmedMoim, setConfirmedMoim] = useState(null);

  // ✅ localStorage에서 확정된 일정 불러오기
  useEffect(() => {
    const storedMoim = localStorage.getItem("confirmedMoim");
    if (storedMoim) {
      setConfirmedMoim(JSON.parse(storedMoim));
    }
  }, []);

  return (
    <section className="showmoim-section">
      {confirmedMoim ? (
        <div className="show-elements">
          <div className="selected-moim">
            <h3>{confirmedMoim.title}</h3>
            <p>{confirmedMoim.date}</p>
          </div>
          <span className="question center">해당 일정으로 확정되었습니다.</span>
        </div>
      ) : (
        <p className="no-data center">확정된 일정이 없습니다.</p>
      )}
    </section>
  );
};

export default ShowMoim;
