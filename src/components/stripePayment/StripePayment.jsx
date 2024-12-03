import React, { useState } from "react";
import { Button, TextField, Grid, CircularProgress } from "@mui/material";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Set up Stripe outside of the component to avoid reloading on each render
const stripePromise = loadStripe(
  "pk_test_51H8R8KH8GKrhT52KpANq9cN6L3diPzls9viXDEXO0AXWlcpgfiu5uZCb7vdZOiBr9GgbiRkq7acILx0Jd1cXQ9HA00zt66FBga"
); // Replace with your Stripe publishable key

const StripePayment = ({ totalPrice }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(totalPrice);

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

    console.log("Payment Method:", paymentMethod);
    // Simulate processing (you can replace this with your API call to create a payment intent)

    try {
      const response = await fetch(
        "http://localhost:5000/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalPrice }), // Example amount in cents
        }
      );

      const { clientSecret } = await response.json();

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
      }
    } catch (error) {
      setErrorMessage("Payment failed.");
      console.error(err);
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
          {/* Card Number - handled by Stripe Elements */}
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

      {/* Submit Button */}
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
