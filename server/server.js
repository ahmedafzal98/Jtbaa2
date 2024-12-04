// backend/server.js
const express = require("express");
const stripe = require("stripe")(import.meta.env.STRIPE_API_KEY);
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd", // Your currency code
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "PaymentIntent creation failed" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
