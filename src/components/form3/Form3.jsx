import React, { useState, useEffect, useContext } from "react";
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
import cargoVan from "../../assets/cargo-van.svg";
import boxTruck from "../../assets/box-truck.svg";
import ladder from "../../assets/ladder.svg";
import labor from "../../assets/labor.png";
import "./Form3.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeWrapper from "../stripePayment/StripePayment";
import { MyContext } from "../../context/Context";

const Form3 = ({ distance }) => {
  const { summaryData, setSummaryData } = useContext(MyContext);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedItemQuantity, setSelectedItemQuantity] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLaborType, setSelectedLaborType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVehicleSelected, setIsVehicleSelected] = useState(false);
  const [isStairOptionSelected, setIsStairOptionSelected] = useState(false);
  const [isLaborSelected, setIsLaborSelected] = useState(false);
  const [laborPrice, setLaborPrice] = useState();

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
      price: 80,
      itemPrices: {
        "1-5 items": 75,
        "6 to 10 items": 105,
        "more than 10 items": 190,
      },
      fuelPrice: 3,
    },
    boxTruck: {
      price: 100,
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

  const handleQuantityChange = (event) => {
    setSelectedItemQuantity(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleVehicleChoose = () => {
    setIsVehicleSelected(true);
    setIsLaborSelected(false);
    setSelectedOption("vehicleOption");
    setSelectedLaborType(""); // Reset labor type
    setTotalPrice(0); // Reset total price
  };
  const handleLaborChoose = () => {
    setIsLaborSelected(true);
    setIsVehicleSelected(false);
    setSelectedOption("laborOption");
    setSelectedVehicle(""); // Reset selected vehicle
    setSelectedItemQuantity(""); // Reset item Quantity
    setTotalPrice(0); // Reset total price
  };

  const handleLaborTypeChange = (event) => {
    setSelectedLaborType(event.target.value);
  };

  const handleStairOptionToggle = (event) => {
    setIsStairOptionSelected((prevState) => !prevState);
  };

  const getItemPrice = () =>
    selectedVehicle
      ? vehiclePrices[selectedVehicle].itemPrices[selectedItemQuantity] || 0
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

    setLaborPrice(laborPrice);

    return vehiclePrice + fuelPrice + itemPrice + stairsPrice + laborPrice;
  };

  useEffect(() => {
    setTotalPrice(Math.round(calculateTotalPrice()));
  }, [
    selectedVehicle,
    selectedItemQuantity,
    selectedOption,
    distance,
    selectedLaborType,
    isStairOptionSelected,
  ]);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  useEffect(() => {
    // Calculate table data whenever relevant data changes
    const tableData = {
      distance,
      vehiclePrice: vehiclePrices[selectedVehicle]?.price || "0",
      fuelPrice: getFuelPrice() || "0",
      itemPrice: getItemPrice() || "0",
      stairsPrice: getStairsPrice() || "0",
      totalPrice,
      isVehicleSelected,
      isLaborSelected,
      selectedVehicle,
      laborPrice,
    };

    setSummaryData(tableData); // Update the summary data state
  }, [selectedVehicle, distance, vehiclePrices, totalPrice]);

  return (
    <>
      <div
        className="container"
        style={{
          ...(selectedOption === "vehicleOption" &&
            {
              // marginTop: "70%",
            }),
        }}
      >
        {selectedOption === "" && (
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
              <input
                type="radio"
                value="vehicleOption"
                checked={isVehicleSelected}
                onChange={() => {}}
                className="hiddenRadio"
              />
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
              <input
                type="radio"
                value="laborOption"
                checked={isLaborSelected}
                onChange={() => {}}
                className="hiddenRadio"
              />
            </div>
          </div>
        )}
        {!selectedOption && (
          <p style={{ color: "gray", fontWeight: "bold", marginTop: "18px" }}>
            Note: Please select a vehicle or labor option.
          </p>
        )}
        <div className="form3">
          {isVehicleSelected && (
            <>
              <h3 style={{ textAlign: "left", marginTop: "30px" }}>
                Select a Vehicle
              </h3>
              <div className="boxContainer">
                <div
                  className="boxStyle"
                  onClick={() => handleVehicleSelect("pickupTruck")}
                  style={{
                    border:
                      selectedVehicle === "pickupTruck"
                        ? "3px solid #FE5E22"
                        : "2px solid transparent",
                  }}
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
                  style={{
                    border:
                      selectedVehicle === "cargoVan"
                        ? "3px solid #FE5E22"
                        : "2px solid transparent",
                  }}
                >
                  <img src={cargoVan} alt="Cargo Van" className="imgStyle" />
                  <p>Cargo Van</p>
                </div>
                <div
                  className="boxStyle"
                  onClick={() => handleVehicleSelect("boxTruck")}
                  style={{
                    border:
                      selectedVehicle === "boxTruck"
                        ? "3px solid #FE5E22"
                        : "2px solid transparent",
                  }}
                >
                  <img src={boxTruck} alt="Box Truck" className="imgStyle" />
                  <p>Box Truck</p>
                </div>
              </div>

              <h3
                style={{
                  textAlign: "left",
                  marginBottom: 10,
                  marginTop: "40px",
                }}
              >
                Select Item Quantity
              </h3>
              <FormControl fullWidth>
                <InputLabel id="item-Quantity-label">Item Quantity</InputLabel>
                <Select
                  labelId="item-Quantity-label"
                  value={selectedItemQuantity}
                  label="Item Quantity"
                  onChange={handleQuantityChange}
                >
                  <MenuItem value="1-5 items">1-5 items</MenuItem>
                  <MenuItem value="6 to 10 items">6 to 10 items</MenuItem>
                  <MenuItem value="more than 10 items">
                    More than 10 items
                  </MenuItem>
                </Select>
              </FormControl>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <h3>Stair Option</h3>
                <p>(Optional)</p>
              </div>

              <div
                className="boxStyle"
                onClick={handleStairOptionToggle}
                style={{
                  // marginTop: 10,
                  cursor: "pointer",
                  border: isStairOptionSelected
                    ? "3px solid #FE5E22"
                    : "2px solid transparent",
                }}
              >
                <img src={ladder} alt="Stair Option" className="imgStyle" />
              </div>
            </>
          )}
          {isLaborSelected && (
            <>
              <h2 style={{ textAlign: "left" }}>Select Service Duration</h2>
              <FormControl fullWidth>
                <InputLabel id="labor-type-label">Service Duration</InputLabel>
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
                      <TableCell
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        Duration
                      </TableCell>
                      <TableCell
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {laborPrices[selectedLaborType] === 75
                          ? "30 min"
                          : laborPrices[selectedLaborType] === 145
                          ? "60 min"
                          : laborPrices[selectedLaborType] === 255
                          ? "120 min"
                          : "0 min"}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
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
        {(isLaborSelected || isVehicleSelected) && (
          <Elements stripe={stripePromise}>
            <StripeWrapper totalPrice={totalPrice} />
          </Elements>
        )}
      </div>
    </>
  );
};

export default Form3;
