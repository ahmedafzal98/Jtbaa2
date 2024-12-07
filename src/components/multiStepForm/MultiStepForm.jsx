import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import Form1 from "../googleMap/Map";
import Form2 from "../formComponent/Form";
import Form3 from "../form3/Form3";

const steps = ["Step", "Step", "Step"];

const MultiStepForm = ({ activeStep, setActiveStep }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    itemName: "",
    description: "",
    files: [],
    address: null,
    distance: null,
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let currentErrors = {};
    switch (activeStep) {
      case 0:
        if (!formData.address) currentErrors.address = "Address is required.";
        if (!formData.distance)
          currentErrors.distance = "Distance is required.";
        break;
      case 1:
        if (!formData.name) currentErrors.name = "Name is required.";
        if (!formData.phoneNumber)
          currentErrors.phoneNumber = "Phone number is required.";
        break;
      default:
        break;
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      name: "",
      phoneNumber: "",
      itemName: "",
      description: "",
      files: [],
      address: null,
      distance: null,
    });
    setErrors({});
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Form1
            data={formData}
            errors={errors}
            onChange={(key, value) => handleFormChange(key, value)}
          />
        );
      case 1:
        return (
          <Form2
            data={formData}
            errors={errors}
            onChange={(key, value) => handleFormChange(key, value)}
          />
        );
      case 2:
        return (
          <Form3
            distance={formData.distance}
            errors={errors}
            onChange={(key, value) => handleFormChange(key, value)}
          />
        );
      default:
        return "Unknown step";
    }
  };
  const isNextDisabled = () => {
    if (activeStep === 0) {
      return !formData.address || !formData.distance; // Disable if address or distance is missing
    }
    if (activeStep === 1) {
      return !formData.name || !formData.phoneNumber; // Disable if name or phone number is missing
    }
    return false;
  };

  return (
    <div style={{ marginRight: "10px", marginTop: "30px" }} className="stepper">
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "50%",
          },
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel error={!!errors[label.toLowerCase().replace(" ", "")]}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {activeStep === steps.length ? (
            <>
              <p>All steps completed - you're finished!</p>
              <div className="buttons">
                <button className="btnNext" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <div className="buttons">
                {activeStep !== 0 && (
                  <button
                    className="btnNext"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    style={{
                      cursor: activeStep === 0 ? "not-allowed" : "pointer",
                      backgroundColor: activeStep === 0 ? "#ccc" : "#fe5e22",
                    }}
                  >
                    Previous
                  </button>
                )}
                {activeStep < steps.length - 1 && (
                  <button
                    className="btnPrev"
                    onClick={handleNext}
                    disabled={isNextDisabled()} // Disable based on the validation
                    style={{
                      marginRight: "20px",
                      marginLeft: "10px",
                      cursor: isNextDisabled() ? "not-allowed" : "pointer",
                      backgroundColor: isNextDisabled() ? "#ccc" : "#fe5e22",
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default MultiStepForm;
