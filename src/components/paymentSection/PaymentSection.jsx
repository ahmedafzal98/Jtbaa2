import React, { useContext, useState } from "react";
import AddressAutocomplete from "../addressAutoComplete/AddressAutocomplete";
import MapComponent from "../googleMap/Map";
import "./PaymentSection.css";
import FormComponent from "../formComponent/Form";
import Form3 from "../form3/Form3";
import MultiStepForm from "../multiStepForm/MultiStepForm";
import { MyContext } from "../../context/Context";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

const PaymentSection = () => {
  const { summaryData } = useContext(MyContext);

  console.log("SummaryData", summaryData);

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    itemName: "",
    description: "",
    files: [],
    address: null,
    distance: null,
  });

  console.log(activeStep);

  const getHeading = () => {
    switch (activeStep) {
      case 0:
        return {
          title: "Pickup & Drop-off",
          description: "Enter your pickup and drop-off addresses",
        };
      case 1:
        return {
          title: "Item Details",
          description: "Enter the details of the item",
        };
      case 2:
        return {
          title: "Payment",
          description: "Enter your payment information",
        };
      default:
        return { title: "", description: "" };
    }
  };

  const handleNext = () => {
    setCurrentForm((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentForm((prev) => prev - 1);
  };
  // Dynamic headings based on the current form step
  const formHeadings = {
    1: {
      title: "Pickup & Drop-off",
      subtitle: "Enter your pickup and drop-off addresses",
    },
    2: {
      title: "More Information",
      subtitle: "Provide more details about the item",
    },
    3: {
      title: "Review & Confirm",
      subtitle: "Review your details and confirm your booking",
    },
  };

  return (
    <div className="movingDelievery">
      <div className="movingDelieveryContainer">
        {!summaryData || !summaryData.isVehicleSelected ? (
          // Code for the on-demand moving and delivery section

          <div
            style={{
              display: "flex",
              height: "80%",
              flexDirection: "column",
            }}
          >
            <span className="headline">
              On-demand Moving <br /> And Delivery
            </span>
            <span className="deleiverydesc">
              JTBAA is the easiest way to move anything. Fully insured. On{" "}
              <br />
              your schedule. Arriving in as little as 30 minutes.&nbsp;
            </span>
            <div>
              <ul className="list">
                <li style={{ display: "flex" }}>
                  <svg
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="e-font-icon-svg e-fas-check"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                  </svg>
                  <p style={{ marginLeft: 20 }}>Book Your Truck</p>
                </li>
                <li style={{ display: "flex", width: "240px" }}>
                  <svg
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="e-font-icon-svg e-fas-check"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                  </svg>
                  <p style={{ marginLeft: 20 }}>We'll take it from here</p>
                </li>
                <li style={{ display: "flex", width: "240px" }}>
                  <svg
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="e-font-icon-svg e-fas-check"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                  </svg>
                  <p style={{ marginLeft: 15 }}>
                    Rate & tip for a job well done
                  </p>
                </li>
              </ul>
            </div>
            <img
              src="https://jtbaa.com/wp-content/uploads/2024/09/VanWithLugger.png"
              alt="Van"
            />
          </div>
        ) : (
          // Code for the summary table section
          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer
              style={{
                position: "sticky",
                bottom: 0, // Stick to the bottom of the viewport
                marginTop: 20,
                borderRadius: 10,
                border: "2px solid #FE5E22",
                backgroundColor: "white", // Make sure it's visible over other content
              }}
              component={Paper}
            >
              <Typography
                style={{ fontWeight: "bold", textAlign: "center" }}
                variant="h4"
                gutterBottom
              >
                Summary
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontSize: "18px" }}>
                      Distance In Miles
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {summaryData.distance && summaryData.distance}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "18px" }}>
                      Selected Vehicle Price
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {summaryData.vehiclePrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "18px" }}>
                      Fuel Price Per Mile
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {summaryData.fuelPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "18px" }}>
                      Item Quantity Price
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {summaryData.itemPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "18px" }}>
                      Stairs Price
                    </TableCell>
                    <TableCell style={{ fontSize: "18px" }}>
                      {summaryData.stairsPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "18px", fontWeight: "bold" }}>
                      <b>Total Price</b>
                    </TableCell>
                    <TableCell style={{ fontSize: "18px", fontWeight: "bold" }}>
                      <b>${summaryData.totalPrice}</b>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
      <div
        style={activeStep === 2 ? { overflow: "scroll" } : {}}
        className="paymentFormSection"
      >
        <div style={{ marginBottom: "30px" }} className="formHeading">
          <h2 style={{ textAlign: "left" }}>{getHeading().title}</h2>
          <p style={{ textAlign: "left", color: "gray", fontSize: "1rem" }}>
            {getHeading().description}
          </p>
        </div>
        <MultiStepForm activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
    </div>
  );
};

export default PaymentSection;
