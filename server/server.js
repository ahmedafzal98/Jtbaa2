import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Stripe from "stripe";

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with your secret key from .env
const stripe = new Stripe(
  "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"
);

const app = express();

// Configure CORS middleware
app.use(cors());
app.use(bodyParser.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).send({ error: "Invalid payment amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
