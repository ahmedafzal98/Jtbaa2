import React from "react";
import pickupTruck from "../../assets/pickup-truck.svg";
import labor from "../../assets/labor.png";

const SelectOptionComponent = ({
  selectedOption,
  handleVehicleChoose,
  handleLaborChoose,
}) => {
  return (
    <>
      {/* <h2 style={{ marginTop: 60, textAlign: "center" }}>Select Option</h2> */}
      <div className="boxContainer">
        <div
          className="boxStyle boxStyleLarge"
          style={{
            border:
              selectedOption === "vehicleOption"
                ? "2px solid #FE5E22"
                : "2px solid transparent",
          }}
          onClick={handleVehicleChoose}
        >
          <img
            src={pickupTruck}
            alt="Vehicle Option"
            className="imgStyle imgStyleLarge"
          />
          <p>Vehicle</p>
        </div>
        <div
          className="boxStyle boxStyleLarge"
          style={{
            border:
              selectedOption === "laborOption"
                ? "2px solid #FE5E22"
                : "2px solid transparent",
          }}
          onClick={handleLaborChoose}
        >
          <img
            src={labor}
            alt="Labor Option"
            className="imgStyle imgStyleLarge"
          />
          <p>Only Labor</p>
        </div>
      </div>
      <p
        style={{
          color: "gray",
          fontWeight: "bold",
          marginTop: "18px",
          textAlign: "center",
        }}
      >
        Note: Please select a vehicle or labor option.
      </p>
    </>
  );
};

export default SelectOptionComponent;
