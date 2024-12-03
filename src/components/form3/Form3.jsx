import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import pickupTruck from "../../assets/pickup-truck.svg";
import cargoVan from "../../assets/cargo-Van.svg";
import boxTruck from "../../assets/box-truck.svg";
import ladder from "../../assets/ladder.svg";
import labor from "../../assets/labor.png";
import StripeWrapper from "../stripePayment/StripePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Form3.css";

const Form3 = ({ distance }) => {
  const stripePromise = loadStripe(
    "pk_test_51H8R8KH8GKrhT52KpANq9cN6L3diPzls9viXDEXO0AXWlcpgfiu5uZCb7vdZOiBr9GgbiRkq7acILx0Jd1cXQ9HA00zt66FBga"
  );

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedItemQuality, setSelectedItemQuality] = useState("");
  const [selectedOption, setSelectedOption] = useState("vehicleOption");
  const [selectedLaborType, setSelectedLaborType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVehicleSelected, setIsVehicleSelected] = useState(false);
  const [isStairOptionSelected, setIsStairOptionSelected] = useState(false);
  const [isLaborSelected, setIsLaborSelected] = useState(false);

  const vehiclePrices = {
    pickupTruck: {
      price: 35,
      itemPrices: {
        "1-5 items": 25,
        "6 to 10 items": 50,
        "more than 10 items": 95,
      },
      fuelPrice: 2.5,
    },
    cargoVan: {
      price: 55,
      itemPrices: {
        "1-5 items": 75,
        "6 to 10 items": 105,
        "more than 10 items": 190,
      },
      fuelPrice: 3,
    },
    boxTruck: {
      price: 75,
      itemPrices: {
        "1-5 items": 90,
        "6 to 10 items": 150,
        "more than 10 items": 200,
      },
      fuelPrice: 3.5,
    },
  };

  const laborPrices = {
    basic: 75, // 30 minutes
    skilled: 145, // 1 hour
    expert: 255, // 2 hours
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleQualityChange = (event) => {
    setSelectedItemQuality(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleVehicleChoose = () => {
    setIsVehicleSelected(true);
    setIsLaborSelected(false);
    setSelectedLaborType(""); // Reset labor type
    setTotalPrice(0); // Reset total price
  };
  const handleLaborChoose = () => {
    setIsLaborSelected(true);
    setIsVehicleSelected(false);
    setSelectedVehicle(""); // Reset selected vehicle
    setSelectedItemQuality(""); // Reset item quality
    setTotalPrice(0); // Reset total price
  };

  const handleLaborTypeChange = (event) => {
    setSelectedLaborType(event.target.value);
  };

  const handleStairOptionToggle = (event) => {
    setIsStairOptionSelected(event.target.checked);
  };

  const getItemPrice = () =>
    selectedVehicle
      ? vehiclePrices[selectedVehicle].itemPrices[selectedItemQuality] || 0
      : 0;

  const getFuelPrice = () =>
    selectedVehicle ? vehiclePrices[selectedVehicle].fuelPrice : 0;

  const getStairsPrice = () => (isStairOptionSelected ? 10 : 0);

  const getLaborPrice = () => laborPrices[selectedLaborType] || 0;

  const calculateTotalPrice = () => {
    const vehiclePrice = selectedVehicle
      ? vehiclePrices[selectedVehicle].price
      : 0;
    const fuelPrice = getFuelPrice() * distance || 0;
    const itemPrice = getItemPrice() || 0;
    const stairsPrice = getStairsPrice() || 0;
    const laborPrice = getLaborPrice() || 0;

    return vehiclePrice + fuelPrice + itemPrice + stairsPrice + laborPrice;
  };

  useEffect(() => {
    setTotalPrice(Math.round(calculateTotalPrice()));
  }, [
    selectedVehicle,
    selectedItemQuality,
    selectedOption,
    distance,
    selectedLaborType,
    isStairOptionSelected,
  ]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ marginTop: 30 }}>Select Option</h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <div className="boxStyle">
            <img src={pickupTruck} alt="Vehicle Option" className="imgStyle" />
            <p>Vehicle</p>
            <input
              type="radio"
              value="vehicleOption"
              checked={isVehicleSelected}
              onChange={handleVehicleChoose}
            />
          </div>
          <div className="boxStyle">
            <img src={labor} alt="Labor Option" className="imgStyle" />
            <p>Labor</p>
            <input
              type="radio"
              value="laborOption"
              checked={isLaborSelected}
              onChange={handleLaborChoose}
            />
          </div>
        </div>

        <div className="form3">
          {isVehicleSelected && (
            <>
              <h2 style={{ textAlign: "left" }}>Select a Vehicle</h2>
              <div className="boxContaienr">
                <div
                  className="boxStyle"
                  onClick={() => handleVehicleSelect("pickupTruck")}
                >
                  <img
                    src={pickupTruck}
                    alt="Pickup Truck"
                    className="imgStyle"
                  />
                  <p>Pickup Truck</p>
                </div>
                <div
                  className="boxStyle"
                  onClick={() => handleVehicleSelect("cargoVan")}
                >
                  <img src={cargoVan} alt="Cargo Van" className="imgStyle" />
                  <p>Cargo Van</p>
                </div>
                <div
                  className="boxStyle"
                  onClick={() => handleVehicleSelect("boxTruck")}
                >
                  <img src={boxTruck} alt="Box Truck" className="imgStyle" />
                  <p>Box Truck</p>
                </div>
              </div>

              <h3 style={{ textAlign: "left", marginBottom: 10 }}>
                Select Item Quality
              </h3>
              <FormControl fullWidth>
                <InputLabel id="item-quality-label">Item Quality</InputLabel>
                <Select
                  labelId="item-quality-label"
                  value={selectedItemQuality}
                  label="Item Quality"
                  onChange={handleQualityChange}
                >
                  <MenuItem value="1-5 items">1-5 items</MenuItem>
                  <MenuItem value="6 to 10 items">6 to 10 items</MenuItem>
                  <MenuItem value="more than 10 items">
                    More than 10 items
                  </MenuItem>
                </Select>
              </FormControl>

              <TableContainer
                style={{
                  marginTop: 20,
                  borderRadius: 10,
                  border: "2px solid #FE5E22",
                }}
                component={Paper}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Distance In Miles</TableCell>
                      <TableCell>{distance && distance}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Selected Vehicle Price</TableCell>
                      <TableCell>
                        {vehiclePrices[selectedVehicle]?.price || "0"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fuel Price Per Mile</TableCell>
                      <TableCell>{getFuelPrice() || "0"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Item Quantity Price</TableCell>
                      <TableCell>{getItemPrice() || "0"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Total Price</b>
                      </TableCell>
                      <TableCell>
                        <b>${totalPrice}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {isLaborSelected && (
            <>
              <h2 style={{ textAlign: "left" }}>Select Labor Type</h2>
              <FormControl fullWidth>
                <InputLabel id="labor-type-label">Labor Type</InputLabel>
                <Select
                  labelId="labor-type-label"
                  value={selectedLaborType}
                  label="Labor Type"
                  onChange={handleLaborTypeChange}
                >
                  <MenuItem value="basic">30 min $75</MenuItem>
                  <MenuItem value="skilled">1 Hour $145</MenuItem>
                  <MenuItem value="expert">2 Hour $255</MenuItem>
                </Select>
              </FormControl>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="boxStyle">
                  <img src={ladder} alt="Stair Option" className="imgStyle" />
                  <p>Stair Option</p>
                  <input
                    type="checkbox"
                    checked={isStairOptionSelected}
                    onChange={handleStairOptionToggle}
                  />
                </div>
              </div>
              <TableContainer
                style={{
                  marginTop: 20,
                  borderRadius: 10,
                  border: "2px solid #FE5E22",
                }}
                component={Paper}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Labor Price</TableCell>
                      <TableCell>{getLaborPrice() || "0"}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Stairs Price</TableCell>
                      <TableCell>{getStairsPrice() || "0"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Total Price</b>
                      </TableCell>
                      <TableCell>
                        <b>${totalPrice}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>

        <Elements stripe={stripePromise}>
          <StripeWrapper totalPrice={totalPrice} />
        </Elements>
      </div>
    </>
  );
};

export default Form3;
