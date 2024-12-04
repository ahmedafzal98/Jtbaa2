import React, { useState } from "react";
import AddressAutocomplete from "../addressAutoComplete/AddressAutocomplete";
import MapComponent from "../googleMap/Map";
import "./PaymentSection.css";
import FormComponent from "../formComponent/Form";
import Form3 from "../form3/Form3";
import MultiStepForm from "../multiStepForm/MultiStepForm";

const PaymentSection = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    itemName: "",
    description: "",
    files: [],
    address: null,
    distance: null,
  });

  const handleDistanceUpdate = (distance) => {
    setFormData((prevData) => ({ ...prevData, distance }));
  };

  const handleAddressSelect = (data) => {
    setFormData((prevData) => ({ ...prevData, address: data }));
  };

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleNext = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1);
    }
  };

  const handlePrevious = () => {
    if (currentForm > 1) {
      setCurrentForm(currentForm - 1);
    }
  };

  return (
    <div className="movingDelievery">
      <div className="movingDelieveryContainer">
        <span className="headline">
          On-demand Moving <br /> And Delivery
        </span>
        <span className="deleiverydesc">
          JTBAA is the easiest way to move anything. Fully insured. On <br />{" "}
          your schedule. Arriving in as little as 30 minutes.&nbsp;
        </span>
        <div>
          <ul className="list">
            <li
              style={{
                display: "flex",
              }}
            >
              <svg
                width={18}
                height={18}
                aria-hidden="true"
                class="e-font-icon-svg e-fas-check"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
              </svg>
              <p
                style={{
                  marginLeft: 20,
                }}
              >
                Book Your Truck
              </p>
            </li>
            <li
              style={{
                display: "flex",
                width: "240px",
              }}
            >
              <svg
                width={18}
                height={18}
                aria-hidden="true"
                class="e-font-icon-svg e-fas-check"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
              </svg>
              <p
                style={{
                  marginLeft: 20,
                }}
              >
                We'll take it from here
              </p>
            </li>
            <li
              style={{
                display: "flex",
                width: "240px",
              }}
            >
              <svg
                width={18}
                height={18}
                aria-hidden="true"
                class="e-font-icon-svg e-fas-check"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
              </svg>
              <p
                style={{
                  marginLeft: 15,
                }}
              >
                Rate & tip for a job well done
              </p>
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
        <div className="formContainer">
          <MultiStepForm />
          {/* {currentForm === 1 && (
            <div className="form1">
              <MapComponent onDistanceUpdate={handleDistanceUpdate} />
              <button
                style={{ width: "100%", marginTop: 20 }}
                className="btnNext"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          )}

          {currentForm === 2 && (
            <div className="form2">
              <FormComponent
                formData={formData}
                handleFormDataChange={handleFormDataChange}
              />
              <div className="buttons">
                <button className="btnNext" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="btnPrev" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}

          {currentForm === 3 && (
            <div className="form3">
              <Form3 distance={formData.distance} />
              <div className="buttons">
                <button className="btnNext" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="btnPrev" onClick={handleNext}>
                  Submit Order
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
