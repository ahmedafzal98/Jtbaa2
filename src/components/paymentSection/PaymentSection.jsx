import React, { useState } from "react";
import AddressAutocomplete from "../addressAutoComplete/AddressAutocomplete";
import MapComponent from "../googleMap/Map";
import "./PaymentSection.css";
import FormComponent from "../formComponent/Form";
import Form3 from "../form3/Form3";
import MultiStepForm from "../multiStepForm/MultiStepForm";

const PaymentSection = () => {

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
        <span className="headline">
          On-demand Moving <br /> And Delivery
        </span>
        <span className="deleiverydesc">
          JTBAA is the easiest way to move anything. Fully insured. On <br />
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
              <p style={{ marginLeft: 15 }}>Rate & tip for a job well done</p>
            </li>
          </ul>
        </div>
        <img
          style={{ width: "100%", maxWidth: "302px", height: "auto" }}
          src="https://jtbaa.com/wp-content/uploads/2024/09/VanWithLugger.png"
          alt="Van"
        />
      </div>

      <div className="paymentFormSection">
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
