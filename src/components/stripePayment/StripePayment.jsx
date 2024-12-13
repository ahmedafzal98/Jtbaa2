import React, { useContext, useState } from "react";
import { Button, TextField, Grid, CircularProgress } from "@mui/material";
import emailjs from "emailjs-com";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MyContext } from "../../context/Context";

// Set up Stripe outside of the component to avoid reloading on each render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const StripePayment = ({ totalPrice, data, required }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { summaryData, setSummaryData } = useContext(MyContext);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded
    }

    setIsProcessing(true);
    setErrorMessage("");

    // Get a reference to the card element
    const cardElement = elements.getElement(CardElement);

    // Create a payment method with the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch(
        "https://jtbaa2-artk.vercel.app/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalPrice }),
        }
      );

      const { clientSecret } = await response.json();
      console.log(totalPrice);

      if (!clientSecret) {
        setErrorMessage("Failed to retrieve client secret.");
        setIsProcessing(false);
        return;
      }

      // Confirm the payment using client secret
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        alert("Payment successful!");

        const emailData = summaryData.isLaborSelected
          ? {
              laborPrice: `$${summaryData.laborPrice || 0}`,
              distance: "",
              selectedVehicle: "",
              vehiclePrice: "",
              fuelPrice: "",
              itemPrice: "",
              stairsPrice: "",
              totalPrice: `$${summaryData.totalPrice || 0}`,
            }
          : {
              laborPrice: "",
              distance: `${summaryData.distance || "N/A"} miles`,
              selectedVehicle: summaryData.selectedVehicle || "N/A",
              vehiclePrice: `$${summaryData.vehiclePrice || 0}`,
              fuelPrice: `$${summaryData.fuelPrice || 0}`,
              itemPrice: `$${summaryData.itemPrice || 0}`,
              stairsPrice: `$${summaryData.stairsPrice || 0}`,
              totalPrice: `$${summaryData.totalPrice || 0}`,
            };

        emailjs
          .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            emailData,
            import.meta.env.VITE_EMAILJS_USER_ID
          )
          .then((result) => {
            console.log(result.text); // Log the result for debugging
            setIsSent(true); // Update UI to show success message
          })
          .catch((error) => {
            console.log(error); // Log any error for debugging
            setIsError(true); // Update UI to show error message
          });
      }
    } catch (error) {
      setErrorMessage("Payment failed.");

      // console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "80%",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "left" }}>Credit or Debit Card</h2>

      {/* Card Information Fields */}
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          width: "100%",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</div>
      )}

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        disabled={isProcessing}
        style={{ marginTop: "20px" }}
      >
        {isProcessing ? <CircularProgress size={24} /> : "Pay Now"}
      </Button>
    </div>
  );
};

// Wrap the StripePayment component with Elements to provide Stripe context
const StripeWrapper = ({ totalPrice }) => (
  <Elements stripe={stripePromise}>
    <StripePayment totalPrice={totalPrice} />
  </Elements>
);

export default StripeWrapper;
