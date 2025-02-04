import { useState } from "react";
import "./SelectMoim.css";

const SelectMoim = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <section className="moim-section">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`moim-list ${selectedIndex === index ? "selected" : ""}`}
          onClick={() => handleSelect(index)}
        ></div>
      ))}
    </section>
  );
};

export default SelectMoim;
