import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import Form1 from "../googleMap/Map"; // Import your forms
import Form2 from "../formComponent/Form";
import Form3 from "../form3/Form3";

const steps = ["Enter Address", "Item Details", "Payment"];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form1 />;
      case 1:
        return <Form2 />;
      case 2:
        return <Form3 />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
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
              <button className="btnPrev" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MultiStepForm;
