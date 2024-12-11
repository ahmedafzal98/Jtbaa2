import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Stripe from "stripe";

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with your secret key from .env
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_API_KEY);

const app = express();

// Configure CORS middleware
app.use(cors());
app.use(bodyParser.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Validate the amount received in the backend
  if (!amount || amount <= 0) {
    return res.status(400).send({ error: "Invalid payment amount" });
  }

  try {
    // Stripe expects amount in cents for USD
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars to cents
      currency: "usd",
    });

    console.log("Amount received in dollars:", amount);
    console.log("Amount sent to Stripe in cents:", amount * 100);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Failed to create payment intent" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
