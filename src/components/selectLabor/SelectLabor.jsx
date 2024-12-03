import ladder from "../../assets/ladder.svg";
import labor from "../../assets/labor.png";
import { useState } from "react";

const SelectLabor = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <h3 style={{ marginTop: 30 }}>Select Option</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="boxStyle">
          <img src={ladder} alt="Stair Option" className="imgStyle" />
          <p>Stair Option</p>
          <input
            type="radio"
            value="stairOption"
            checked={selectedOption === "stairOption"}
            onChange={handleOptionChange}
          />
        </div>
        <div className="boxStyle">
          <img src={labor} alt="Labor Option" className="imgStyle" />
          <p>Only Labor</p>
          <input
            type="radio"
            value="laborOption"
            checked={selectedOption === "laborOption"}
            onChange={handleOptionChange}
          />
        </div>
      </div>
    </div>
  );
};
export default SelectLabor;
